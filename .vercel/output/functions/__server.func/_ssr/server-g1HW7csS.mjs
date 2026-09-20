import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as assertPinShape } from "./pin-Dhjr4KG2.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-Cl5Tfz_M.js
var useGuestBookings = create()(persist((set, get) => ({
	items: [],
	add: (item) => set({ items: [item, ...get().items.filter((x) => x.code !== item.code)].slice(0, 24) })
}), { name: "axiom-guest-books" }));
var SESSION_KEY = "axiom-studio";
var useStudioSession = create((set) => ({
	session: null,
	ready: false,
	hydrate: () => {
		if (typeof window === "undefined") {
			set({ ready: true });
			return;
		}
		try {
			const raw = sessionStorage.getItem(SESSION_KEY);
			set({
				session: raw ? JSON.parse(raw) : null,
				ready: true
			});
		} catch {
			set({
				session: null,
				ready: true
			});
		}
	},
	enter: (slug, pin) => {
		const session = {
			slug,
			pin
		};
		sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
		set({
			session,
			ready: true
		});
	},
	leave: () => {
		sessionStorage.removeItem(SESSION_KEY);
		set({
			session: null,
			ready: true
		});
	}
}));
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/server-g1HW7csS.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function text(value, max, label) {
	if (typeof value !== "string") throw new Error(`${label} is required`);
	const next = value.trim();
	if (!next) throw new Error(`${label} is required`);
	if (next.length > max) throw new Error(`${label} is too long`);
	return next;
}
function optionalText(value, max) {
	if (value == null || value === "") return "";
	if (typeof value !== "string") return "";
	return value.trim().slice(0, max);
}
function optionalImage(value) {
	if (value == null || value === "") return null;
	if (typeof value !== "string") throw new Error("Invalid image");
	if (value.startsWith("/")) return value;
	if (!value.startsWith("data:image/")) throw new Error("Invalid image");
	if (value.length > 18e4) throw new Error("Image is too large");
	return value;
}
function intOrNull(value) {
	if (value == null || value === "") return null;
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isInteger(n)) throw new Error("Invalid id");
	return n;
}
function moneyCents(value) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isFinite(n) || n < 0 || n > 1e6) throw new Error("Invalid price");
	return Math.round(n);
}
function duration(value) {
	const n = typeof value === "number" ? value : Number(value);
	if (!Number.isInteger(n) || n < 5 || n > 480) throw new Error("Invalid duration");
	return n;
}
var listBusinesses = createServerFn({ method: "GET" }).handler(createSsrRpc("a911fac647dfd3b85b0543334f30ad791cc79434895c737465f73fc9dd22438a"));
var getBusiness = createServerFn({ method: "GET" }).validator((input) => ({ slug: text(input.slug, 64, "Studio") })).handler(createSsrRpc("5afc28352297aef9ecba366331c021e0bb88cbd0626b5ae8cd7d28bc5fe1f150"));
var createBooking = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	memberId: intOrNull(input.memberId ?? null),
	offeringId: intOrNull(input.offeringId) ?? (() => {
		throw new Error("Choose an offering");
	})(),
	guestHandle: text(input.guestHandle, 24, "Handle"),
	slotAt: text(input.slotAt, 40, "Time"),
	note: optionalText(input.note, 80)
})).handler(createSsrRpc("2c61f6c5d07f7ac5f6cfbdc53f8c7038bf8884f7c4a21cf7c5f5e5ab30064b8f"));
var lookupBooking = createServerFn({ method: "GET" }).validator((input) => ({ code: text(input.code, 16, "Code").toUpperCase() })).handler(createSsrRpc("2681a0bb20dbb93d7f1b88a676e3f4201e3e12dc25edf6f048ec0bc403143845"));
var askAxiom = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	question: text(input.question, 240, "Question")
})).handler(createSsrRpc("bff62c0381486c531acc4074474c8e140c1888e625da0ac7293d932e02df4ed1"));
var verifyStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN"))
})).handler(createSsrRpc("084f2962ca5a6140fc054424176f7997408d0e2e4151730729a08f51f2ba7206"));
var getStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN"))
})).handler(createSsrRpc("57f02227e87813cb488967b8064190d42147dd20f9c84e83dfe0ca81a18ad20b"));
var createStudio = createServerFn({ method: "POST" }).validator((input) => ({
	name: text(input.name, 48, "Name"),
	niche: text(input.niche, 24, "Niche"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	tagline: optionalText(input.tagline, 80)
})).handler(createSsrRpc("58933b56d93f89c71cc1e8f8c082d6e69543ee49dc12e28f792cdf6c135decc9"));
var updateStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	name: text(input.name, 48, "Name"),
	tagline: optionalText(input.tagline, 80),
	about: optionalText(input.about, 600),
	haloTheme: text(input.haloTheme, 24, "Halo"),
	hoursJson: text(input.hoursJson, 2e3, "Hours")
})).handler(createSsrRpc("a0aea865e4e5ab8c23cb45ea0214f9b24df9e58fc3f0049d8ecf0c6a87a38be0"));
var setLocation = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	locationName: optionalText(input.locationName, 80),
	locationNote: optionalText(input.locationNote, 160)
})).handler(createSsrRpc("80614ceba7366698fec5e06d5ecda6e9b0192147cc224de7462724152a0727ac"));
var addMember = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	displayName: text(input.displayName, 40, "Name"),
	role: optionalText(input.role, 40),
	bio: optionalText(input.bio, 180)
})).handler(createSsrRpc("b1f3bd79c33d8d5ef86a28da5ab8325654abcd26cbc521a4be70300179871bfe"));
var updateMember = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing member");
	})(),
	displayName: text(input.displayName, 40, "Name"),
	role: optionalText(input.role, 40),
	bio: optionalText(input.bio, 180),
	available: Boolean(input.available)
})).handler(createSsrRpc("c186a6a3301c4b2776f8b6143b320cc41bd2f9a73251dbd5e0b3b9765fb1df28"));
var removeMember = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing member");
	})()
})).handler(createSsrRpc("7dcb8bcbcbb56ac1b7a8dcf266fbdca2d1614cb5a9d5aa7f9dbe2f28beab0826"));
var addOffering = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	memberId: intOrNull(input.memberId ?? null),
	title: text(input.title, 48, "Title"),
	description: optionalText(input.description, 180),
	durationMin: duration(input.durationMin),
	priceCents: moneyCents(input.priceCents),
	image: optionalImage(input.image),
	kind: text(input.kind, 16, "Kind")
})).handler(createSsrRpc("436c43f4465d9ffc77deea105f825a8e82e266c0fcada4a8c68c24c70b33fde6"));
var updateOffering = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing offering");
	})(),
	memberId: intOrNull(input.memberId ?? null),
	title: text(input.title, 48, "Title"),
	description: optionalText(input.description, 180),
	durationMin: duration(input.durationMin),
	priceCents: moneyCents(input.priceCents),
	image: optionalImage(input.image),
	kind: text(input.kind, 16, "Kind")
})).handler(createSsrRpc("11122eaf9a92748fd6df922f85a3f313fa10dfd9aabe69c9aa438a6d2c86c83e"));
var removeOffering = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing offering");
	})()
})).handler(createSsrRpc("fa2e5901a008d67b62bb14ffe839f20a99f41c966ca0ede723dbb99815f65e26"));
var addPost = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	body: text(input.body, 280, "Post"),
	image: optionalImage(input.image)
})).handler(createSsrRpc("bc0dd344b6825c0f9ae43cbccfb3e67f592d77fcee7c8320edb3425c663a10df"));
var removePost = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing post");
	})()
})).handler(createSsrRpc("72493b587438057afc13a70e23aa2be1eee56a05f9c7e55aa6c4436accdf2fe2"));
var setBookingStatus = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing booking");
	})(),
	status: text(input.status, 16, "Status")
})).handler(createSsrRpc("63e0cc2d2a6c09edd22d285d40b33f57233d711b3afb855c50512637adab288b"));
var addLedgerTruth = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	truth: text(input.truth, 180, "Truth")
})).handler(createSsrRpc("d8e1ed2e3511e6dcfe92089e892b1f4a9b25da498e750b8ce12fa860bb3cd95c"));
var removeLedgerTruth = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing truth");
	})()
})).handler(createSsrRpc("a8f705174eefd0a3b9abf20ce5be7c94f4e4304432fe8e3e105dd211a9cc0554"));
//#endregion
export { useGuestBookings as C, verifyStudio as S, setBookingStatus as _, askAxiom as a, updateOffering as b, createStudio as c, listBusinesses as d, lookupBooking as f, removePost as g, removeOffering as h, addPost as i, getBusiness as l, removeMember as m, addMember as n, cn as o, removeLedgerTruth as p, addOffering as r, createBooking as s, addLedgerTruth as t, getStudio as u, setLocation as v, useStudioSession as w, updateStudio as x, updateMember as y };
