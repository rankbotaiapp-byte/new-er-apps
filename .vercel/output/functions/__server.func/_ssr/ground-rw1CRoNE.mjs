//#region node_modules/.nitro/vite/services/ssr/assets/ground-rw1CRoNE.js
var PROMISE_RE = /\b(free|complimentary|guaranteed|no wait|half off|50%\s*off|cheapest|always open|walk-?ins?\s*24)\b/i;
var HOURS_LIE_RE = /\b(open (until )?midnight|open all night|24\s*hours|always open)\b/i;
var PRICE_RE = /\$\s?(\d+(?:\.\d{1,2})?)|(\d+(?:\.\d{1,2})?)\s*dollars?/gi;
function money(cents) {
	const dollars = cents / 100;
	if (Number.isInteger(dollars)) return `$${dollars}`;
	return `$${dollars.toFixed(2)}`;
}
function catalogBlock(catalog) {
	const offerings = catalog.offerings.map((o) => `- ${o.title} | ${o.durationMin}m | ${money(o.priceCents)} | ${o.description || "no note"}`).join("\n");
	const team = catalog.team.map((m) => `- ${m.displayName} (${m.role})`).join("\n");
	const ledger = catalog.ledger.length ? catalog.ledger.map((t) => `- ${t}`).join("\n") : "- (empty)";
	return `Studio: ${catalog.name}
Walk-in open now: ${catalog.openNow ? "yes" : "no — after hours, book only"}
Offerings (exact titles and prices — never invent):
${offerings || "- (none)"}
Team (exact names):
${team || "- (none)"}
Owner ledger (never contradict):
${ledger}`;
}
function pickOffering(question, offerings) {
	if (offerings.length === 0) return null;
	const words = tokenize(question);
	let best = offerings[0];
	let bestScore = -1;
	for (const offering of offerings) {
		const hay = tokenize(`${offering.title} ${offering.description}`);
		const score = words.reduce((n, w) => n + (hay.includes(w) ? 2 : 0), 0) + (hay.some((h) => question.toLowerCase().includes(h)) ? 1 : 0);
		if (score > bestScore) {
			best = offering;
			bestScore = score;
		}
	}
	return best;
}
function speakOffering(offering) {
	return `${offering.title} is the hold — ${offering.durationMin} minutes, ${money(offering.priceCents)}. Book it through Axiom.`;
}
function catalogPrices(catalog) {
	return new Set(catalog.offerings.flatMap((o) => {
		const dollars = o.priceCents / 100;
		return [
			String(Math.round(dollars)),
			dollars.toFixed(0),
			dollars.toFixed(2)
		];
	}));
}
function auditQuestion(question, catalog) {
	const flags = [];
	const prices = catalogPrices(catalog);
	for (const match of question.matchAll(PRICE_RE)) {
		const raw = match[1] ?? match[2];
		if (!raw) continue;
		const whole = String(Math.round(Number(raw)));
		if (!prices.has(raw) && !prices.has(whole)) flags.push({
			code: "wrong_price",
			detail: `Guest asked for ${match[0]?.trim()} — not on the book`
		});
	}
	if (PROMISE_RE.test(question)) flags.push({
		code: "extra_promise",
		detail: "Guest asked for a freebie or guarantee the book does not list"
	});
	if (HOURS_LIE_RE.test(question) && !catalog.openNow) flags.push({
		code: "invented_hours",
		detail: "Guest asked for walk-in hours that are not true"
	});
	return uniqueFlags(flags);
}
function auditDraft(draft, catalog) {
	const flags = [];
	const lower = draft.toLowerCase();
	const prices = catalogPrices(catalog);
	const named = catalog.offerings.filter((o) => lower.includes(o.title.toLowerCase()));
	if (catalog.offerings.length > 0 && named.length === 0) flags.push({
		code: "off_catalog",
		detail: "Reply named no offering on the book"
	});
	for (const match of draft.matchAll(PRICE_RE)) {
		const raw = match[1] ?? match[2];
		if (!raw) continue;
		const whole = String(Math.round(Number(raw)));
		if (!prices.has(raw) && !prices.has(whole)) flags.push({
			code: "wrong_price",
			detail: `Quoted ${match[0]?.trim()} — not on the book`
		});
	}
	if (PROMISE_RE.test(draft)) flags.push({
		code: "extra_promise",
		detail: "Promised something the book does not list"
	});
	if (HOURS_LIE_RE.test(draft) && !catalog.openNow) flags.push({
		code: "invented_hours",
		detail: "Implied walk-in hours that are not true"
	});
	for (const offering of catalog.offerings) {
		if (!lower.includes(offering.title.toLowerCase())) continue;
		const quoted = [...draft.matchAll(PRICE_RE)].map((m) => m[1] ?? m[2]);
		if (quoted.length === 0) continue;
		const expected = String(Math.round(offering.priceCents / 100));
		if (quoted.some((q) => q && String(Math.round(Number(q))) !== expected)) flags.push({
			code: "wrong_price",
			detail: `${offering.title} was given the wrong price`
		});
	}
	const teamNames = catalog.team.map((m) => m.displayName.toLowerCase());
	const withMatch = draft.match(/\bwith ([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)\b/);
	if (withMatch?.[1] && teamNames.length > 0) {
		const name = withMatch[1].toLowerCase();
		if (!teamNames.some((n) => n.includes(name) || name.includes(n.split(" ")[0] ?? ""))) flags.push({
			code: "invented_person",
			detail: `Named ${withMatch[1]}, who is not on the team`
		});
	}
	for (const truth of catalog.ledger) {
		const key = truth.toLowerCase().slice(0, 24);
		if (key.length < 8) continue;
		if (lower.includes("not") && lower.includes(key.slice(0, 12))) flags.push({
			code: "off_catalog",
			detail: "Contradicted the owner ledger"
		});
	}
	return uniqueFlags(flags);
}
function groundReply(question, draft, catalog) {
	const pick = pickOffering(question, catalog.offerings);
	if (!pick) return {
		spoken: "The book is empty. Hold a listed offering when the studio adds one.",
		flags: [{
			code: "off_catalog",
			detail: "No offerings to ground against"
		}],
		status: "corrected"
	};
	const probe = auditQuestion(question, catalog);
	const draftFlags = draft.trim() ? auditDraft(draft, catalog) : [];
	const flags = uniqueFlags([...probe, ...draftFlags]);
	if (flags.length === 0) return {
		spoken: draft.trim() || speakOffering(pick),
		flags,
		status: "clean"
	};
	return {
		spoken: speakOffering(pick),
		flags,
		status: "corrected"
	};
}
function ledgerLine(flag) {
	return `Never: ${flag.detail}`.slice(0, 180);
}
function tokenize(value) {
	return value.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2);
}
function uniqueFlags(flags) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const flag of flags) {
		const key = `${flag.code}:${flag.detail}`;
		if (seen.has(key)) continue;
		seen.add(key);
		out.push(flag);
	}
	return out;
}
var FLAG_LABEL = {
	invented_service: "Invented work",
	wrong_price: "Wrong price",
	invented_person: "Invented name",
	invented_hours: "Wrong hours",
	extra_promise: "Extra promise",
	off_catalog: "Off the book"
};
//#endregion
export { pickOffering as a, ledgerLine as i, catalogBlock as n, speakOffering as o, groundReply as r, FLAG_LABEL as t };
