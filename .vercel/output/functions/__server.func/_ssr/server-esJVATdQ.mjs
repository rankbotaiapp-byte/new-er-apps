import { r as isNiche, t as NICHES } from "./niches-LEjJK8qY.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as isHaloTheme, i as hashPin, n as assertPinShape } from "./pin-Dhjr4KG2.mjs";
import { o as slugify } from "./format-DhmWTvyN.mjs";
import { a as parseHours, i as isOpenAt, n as FOOD_HOURS, t as DEFAULT_HOURS } from "./hours-4wmQFcU_.mjs";
import { a as pickOffering, i as ledgerLine, n as catalogBlock, o as speakOffering, r as groundReply } from "./ground-rw1CRoNE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-esJVATdQ.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_axiom_default = "-- AXIOM: booking presence for studios. Unowned rows; owner PIN is hashed on the row.\ncreate table if not exists businesses (\n  id text primary key,\n  name text not null,\n  niche text not null,\n  tagline text not null default '',\n  about text not null default '',\n  pin_hash text not null,\n  hours_json text not null default '{}',\n  halo_theme text not null default 'spectrum',\n  location_name text not null default '',\n  location_note text not null default '',\n  location_updated_at timestamptz,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists team_members (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  display_name text not null,\n  role text not null default '',\n  bio text not null default '',\n  available boolean not null default true,\n  sort_order int not null default 0\n);\n\ncreate table if not exists offerings (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  member_id int references team_members(id) on delete set null,\n  title text not null,\n  description text not null default '',\n  duration_min int not null default 30,\n  price_cents int not null default 0,\n  image text,\n  kind text not null default 'service'\n);\n\ncreate table if not exists posts (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  body text not null,\n  image text,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists bookings (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  member_id int,\n  offering_id int,\n  guest_handle text not null,\n  slot_at timestamptz not null,\n  status text not null default 'pending',\n  code text not null unique,\n  note text not null default '',\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists team_business_idx on team_members (business_id);\ncreate index if not exists offerings_business_idx on offerings (business_id);\ncreate index if not exists posts_business_idx on posts (business_id);\ncreate index if not exists bookings_business_slot_idx on bookings (business_id, slot_at);\n";
var _0003_receipts_default = "-- Axiom interaction receipts + owner ledger. No guest contact fields.\ncreate table if not exists axiom_receipts (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  question text not null,\n  draft text not null default '',\n  spoken text not null,\n  flags_json text not null default '[]',\n  status text not null default 'clean',\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists axiom_ledger (\n  id serial primary key,\n  business_id text not null references businesses(id) on delete cascade,\n  truth text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists axiom_receipts_biz_idx on axiom_receipts (business_id, created_at desc);\ncreate index if not exists axiom_ledger_biz_idx on axiom_ledger (business_id);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_axiom.sql": _0002_axiom_default,
			"/migrations/0003_receipts.sql": _0003_receipts_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
var DEMO_PIN = "4242";
async function ensureSeed(sql) {
	if (((await sql`select count(*)::int as n from businesses`)[0]?.n ?? 0) > 0) return;
	await insertStudio(sql, {
		id: "ember-fade",
		name: "Ember Fade",
		niche: "barber",
		tagline: "The chair is waiting.",
		about: "A quiet barbering room on Alberta. Fades, steel, and hot cloth. Book the chair even after we lock the door — Axiom holds the time.",
		halo: "ember",
		hours: DEFAULT_HOURS,
		locationName: "Alberta Street, Portland",
		locationNote: "Walk-up chairs until six. After hours is by book only.",
		team: [{
			name: "Marcus Vale",
			role: "Master barber",
			bio: "Skin fades and quiet chairs. Twenty years in the steel."
		}, {
			name: "Juniper Cole",
			role: "Texture & beard",
			bio: "Curls, beards, and the long cut. Soft hands, sharp lines."
		}],
		offerings: [
			{
				member: 0,
				title: "Skin fade",
				description: "Tight blend, clean edge, no rush.",
				minutes: 45,
				cents: 4500,
				kind: "service"
			},
			{
				member: 0,
				title: "Hot towel shave",
				description: "Cloth, brush, and a close pass.",
				minutes: 40,
				cents: 4e3,
				kind: "service"
			},
			{
				member: 1,
				title: "Beard sculpt",
				description: "Line, shape, and oil.",
				minutes: 25,
				cents: 2800,
				kind: "service"
			}
		],
		posts: ["Two chairs open after six if you book through Axiom. Walk-ins stop at close."]
	});
	await insertStudio(sql, {
		id: "atelier-ink",
		name: "Atelier Ink",
		niche: "tattoo",
		tagline: "Stay still. We'll do the rest.",
		about: "Blackwork and color in a private room. Flash on the wall, custom in the book. Sessions held through the night — we confirm in the morning.",
		halo: "ink",
		hours: DEFAULT_HOURS,
		locationName: "Division, Portland",
		locationNote: "Private room. Ring the side door after hours.",
		team: [{
			name: "Sable Wren",
			role: "Blackwork",
			bio: "Moths, line, and negative space. Flash Fridays."
		}, {
			name: "Rio Hale",
			role: "Color",
			bio: "Botanicals and saturated fields. Custom only."
		}],
		offerings: [{
			member: 0,
			title: "Flash session",
			description: "From the wall. Small to mid.",
			minutes: 90,
			cents: 18e3,
			kind: "service"
		}, {
			member: 1,
			title: "Custom consult",
			description: "Draw, place, and hold the date.",
			minutes: 30,
			cents: 5e3,
			kind: "service"
		}],
		posts: ["Flash sheet rotated this morning. Walk the wall, then book the hour."]
	});
	await insertStudio(sql, {
		id: "solstice-kitchen",
		name: "Solstice Kitchen",
		niche: "food_truck",
		tagline: "Find us by the steam.",
		about: "A night kitchen on wheels. We post the lot every morning. Pre-order the plate — it will be at the window.",
		halo: "solstice",
		hours: FOOD_HOURS,
		locationName: "SE Division & 28th",
		locationNote: "The gravel lot behind the cedar fence. Look for the steam.",
		team: [{
			name: "Solstice",
			role: "Window",
			bio: "Night kitchen. Chili, bao, citrus."
		}],
		offerings: [
			{
				member: 0,
				title: "Ember chili",
				description: "Deep red, citrus zest, charcoal oil.",
				minutes: 15,
				cents: 1400,
				kind: "menu"
			},
			{
				member: 0,
				title: "Night market bao",
				description: "Steamed, torn, pickle on the side.",
				minutes: 15,
				cents: 1300,
				kind: "menu"
			},
			{
				member: 0,
				title: "Citrus agua",
				description: "Lime, orange, crushed ice.",
				minutes: 10,
				cents: 500,
				kind: "menu"
			}
		],
		posts: ["Lot is Division & 28th until 9. Pre-order through Axiom if you want it waiting."]
	});
}
async function insertStudio(sql, seed) {
	const pinHash = await hashPin(seed.id, DEMO_PIN);
	const hoursJson = JSON.stringify(seed.hours);
	await sql`
    insert into businesses (
      id, name, niche, tagline, about, pin_hash, hours_json, halo_theme,
      location_name, location_note, location_updated_at
    ) values (
      ${seed.id}, ${seed.name}, ${seed.niche}, ${seed.tagline}, ${seed.about},
      ${pinHash}, ${hoursJson}, ${seed.halo}, ${seed.locationName},
      ${seed.locationNote}, now()
    )
  `;
	const memberIds = [];
	for (let i = 0; i < seed.team.length; i += 1) {
		const member = seed.team[i];
		const inserted = await sql`
      insert into team_members (business_id, display_name, role, bio, sort_order)
      values (${seed.id}, ${member.name}, ${member.role}, ${member.bio}, ${i})
      returning id
    `;
		memberIds.push(inserted[0].id);
	}
	for (const offering of seed.offerings) {
		const memberId = memberIds[offering.member] ?? null;
		await sql`
      insert into offerings (
        business_id, member_id, title, description, duration_min, price_cents, kind
      ) values (
        ${seed.id}, ${memberId}, ${offering.title}, ${offering.description},
        ${offering.minutes}, ${offering.cents}, ${offering.kind}
      )
    `;
	}
	for (const body of seed.posts) await sql`insert into posts (business_id, body) values (${seed.id}, ${body})`;
}
var HANDLE_RE = /^[A-Za-z][A-Za-z0-9 .'-]{1,23}$/;
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
function bookingCode() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "AX-";
	for (let i = 0; i < 4; i += 1) out += alphabet[Math.floor(Math.random() * 32)];
	return out;
}
function parseFlags(raw) {
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((f) => f && typeof f.code === "string" && typeof f.detail === "string");
	} catch {
		return [];
	}
}
async function ensureLoopTables(sql) {
	await sql.query(`
    create table if not exists axiom_receipts (
      id serial primary key,
      business_id text not null references businesses(id) on delete cascade,
      question text not null,
      draft text not null default '',
      spoken text not null,
      flags_json text not null default '[]',
      status text not null default 'clean',
      created_at timestamptz not null default now()
    )
  `);
	await sql.query(`
    create table if not exists axiom_ledger (
      id serial primary key,
      business_id text not null references businesses(id) on delete cascade,
      truth text not null,
      created_at timestamptz not null default now()
    )
  `);
	await sql.query(`create index if not exists axiom_receipts_biz_idx on axiom_receipts (business_id, created_at desc)`);
	await sql.query(`create index if not exists axiom_ledger_biz_idx on axiom_ledger (business_id)`);
}
async function requirePin(slug, pin) {
	const sql = await getSql();
	assertPinShape(pin);
	const row = (await sql`
    select pin_hash as "pinHash", name from businesses where id = ${slug}
  `)[0];
	if (!row || row.pinHash !== await hashPin(slug, pin)) throw new Error("PIN does not match this studio");
	return {
		sql,
		name: row.name
	};
}
async function loadTeam(sql, slug) {
	return sql`
    select id,
      display_name as "displayName",
      role, bio, available,
      sort_order as "sortOrder"
    from team_members
    where business_id = ${slug}
    order by sort_order asc, id asc
  `;
}
async function loadOfferings(sql, slug) {
	return sql`
    select id,
      member_id as "memberId",
      title, description,
      duration_min as "durationMin",
      price_cents as "priceCents",
      image, kind
    from offerings
    where business_id = ${slug}
    order by id asc
  `;
}
async function loadPosts(sql, slug) {
	return sql`
    select id, body, image, created_at::text as "createdAt"
    from posts
    where business_id = ${slug}
    order by created_at desc
    limit 12
  `;
}
async function loadTaken(sql, slug) {
	return sql`
    select slot_at::text as "slotAt", member_id as "memberId"
    from bookings
    where business_id = ${slug}
      and status <> 'cancelled'
      and slot_at >= now() - interval '1 hour'
  `;
}
async function loadProfile(slug) {
	const sql = await getSql();
	await ensureSeed(sql);
	const card = (await sql`
    select id, name, niche, tagline, about,
      halo_theme as "haloTheme",
      location_name as "locationName",
      location_note as "locationNote",
      location_updated_at::text as "locationUpdatedAt",
      hours_json as "hoursJson"
    from businesses
    where id = ${slug}
  `)[0];
	if (!card) return null;
	const [team, offerings, posts, takenSlots] = await Promise.all([
		loadTeam(sql, slug),
		loadOfferings(sql, slug),
		loadPosts(sql, slug),
		loadTaken(sql, slug)
	]);
	return {
		...card,
		niche: card.niche,
		haloTheme: card.haloTheme,
		team,
		offerings,
		posts,
		takenSlots
	};
}
var listBusinesses_createServerFn_handler = createServerRpc({
	id: "a911fac647dfd3b85b0543334f30ad791cc79434895c737465f73fc9dd22438a",
	name: "listBusinesses",
	filename: "src/lib/axiom/server.ts"
}, (opts) => listBusinesses.__executeServer(opts));
var listBusinesses = createServerFn({ method: "GET" }).handler(listBusinesses_createServerFn_handler, async () => {
	const sql = await getSql();
	await ensureSeed(sql);
	return (await sql`
    select id, name, niche, tagline,
      halo_theme as "haloTheme",
      location_name as "locationName",
      location_note as "locationNote",
      location_updated_at::text as "locationUpdatedAt",
      hours_json as "hoursJson"
    from businesses
    order by created_at asc
  `).map((row) => ({
		...row,
		niche: row.niche,
		haloTheme: row.haloTheme
	}));
});
var getBusiness_createServerFn_handler = createServerRpc({
	id: "5afc28352297aef9ecba366331c021e0bb88cbd0626b5ae8cd7d28bc5fe1f150",
	name: "getBusiness",
	filename: "src/lib/axiom/server.ts"
}, (opts) => getBusiness.__executeServer(opts));
var getBusiness = createServerFn({ method: "GET" }).validator((input) => ({ slug: text(input.slug, 64, "Studio") })).handler(getBusiness_createServerFn_handler, async ({ data }) => loadProfile(data.slug));
var createBooking_createServerFn_handler = createServerRpc({
	id: "2c61f6c5d07f7ac5f6cfbdc53f8c7038bf8884f7c4a21cf7c5f5e5ab30064b8f",
	name: "createBooking",
	filename: "src/lib/axiom/server.ts"
}, (opts) => createBooking.__executeServer(opts));
var createBooking = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	memberId: intOrNull(input.memberId ?? null),
	offeringId: intOrNull(input.offeringId) ?? (() => {
		throw new Error("Choose an offering");
	})(),
	guestHandle: text(input.guestHandle, 24, "Handle"),
	slotAt: text(input.slotAt, 40, "Time"),
	note: optionalText(input.note, 80)
})).handler(createBooking_createServerFn_handler, async ({ data }) => {
	if (!HANDLE_RE.test(data.guestHandle)) throw new Error("Use a short handle — letters first, no email");
	if (data.note.includes("@")) throw new Error("Keep the note short and without contact details");
	const slot = new Date(data.slotAt);
	if (Number.isNaN(slot.getTime())) throw new Error("Invalid time");
	if (slot.getTime() < Date.now() - 6e4) throw new Error("That time has already passed");
	const slotIso = slot.toISOString();
	const sql = await getSql();
	const offering = await sql`
      select id, title, member_id as "memberId"
      from offerings
      where id = ${data.offeringId} and business_id = ${data.slug}
    `;
	if (!offering[0]) throw new Error("Offering not found");
	const memberId = offering[0].memberId ?? data.memberId;
	if ((await sql.query(`select id from bookings
       where business_id = $1
         and slot_at = $2::timestamptz
         and status <> 'cancelled'
         and member_id is not distinct from $3`, [
		data.slug,
		slotIso,
		memberId
	]))[0]) throw new Error("That time is already held");
	const code = bookingCode();
	const row = (await sql.query(`insert into bookings (
        business_id, member_id, offering_id, guest_handle, slot_at, status, code, note
      ) values ($1, $2, $3, $4, $5::timestamptz, 'pending', $6, $7)
      returning code`, [
		data.slug,
		memberId,
		data.offeringId,
		data.guestHandle,
		slotIso,
		code,
		data.note
	]))[0];
	const biz = await sql`select name from businesses where id = ${data.slug}`;
	return {
		code: row.code,
		slotAt: slotIso,
		offeringTitle: offering[0].title,
		businessName: biz[0]?.name ?? data.slug,
		guestHandle: data.guestHandle,
		slug: data.slug
	};
});
var lookupBooking_createServerFn_handler = createServerRpc({
	id: "2681a0bb20dbb93d7f1b88a676e3f4201e3e12dc25edf6f048ec0bc403143845",
	name: "lookupBooking",
	filename: "src/lib/axiom/server.ts"
}, (opts) => lookupBooking.__executeServer(opts));
var lookupBooking = createServerFn({ method: "GET" }).validator((input) => ({ code: text(input.code, 16, "Code").toUpperCase() })).handler(lookupBooking_createServerFn_handler, async ({ data }) => {
	return (await (await getSql())`
      select b.code, b.slot_at::text as "slotAt", b.status,
        b.guest_handle as "guestHandle",
        s.name as "businessName",
        o.title as "offeringTitle",
        b.business_id as slug
      from bookings b
      join businesses s on s.id = b.business_id
      left join offerings o on o.id = b.offering_id
      where b.code = ${data.code}
    `)[0] ?? null;
});
var askAxiom_createServerFn_handler = createServerRpc({
	id: "bff62c0381486c531acc4074474c8e140c1888e625da0ac7293d932e02df4ed1",
	name: "askAxiom",
	filename: "src/lib/axiom/server.ts"
}, (opts) => askAxiom.__executeServer(opts));
var askAxiom = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	question: text(input.question, 240, "Question")
})).handler(askAxiom_createServerFn_handler, async ({ data }) => {
	if (data.question.includes("@")) throw new Error("Keep the question about the work, not contact");
	const profile = await loadProfile(data.slug);
	if (!profile) return {
		ok: false,
		error: "Studio not found"
	};
	const sql = await getSql();
	try {
		await ensureLoopTables(sql);
	} catch {}
	let ledger = [];
	try {
		ledger = (await sql`
        select truth from axiom_ledger where business_id = ${data.slug} order by id asc
      `).map((r) => r.truth);
	} catch {
		ledger = [];
	}
	const catalog = {
		name: profile.name,
		offerings: profile.offerings,
		team: profile.team,
		ledger,
		openNow: isOpenAt(parseHours(profile.hoursJson), /* @__PURE__ */ new Date())
	};
	const fallbackPick = pickOffering(data.question, profile.offerings);
	const groundedFallback = fallbackPick ? speakOffering(fallbackPick) : "The book is empty. Hold a listed offering when the studio adds one.";
	const skipModel = groundReply(data.question, "", catalog).flags.length > 0;
	let draft = skipModel ? "" : groundedFallback;
	const apiKey = process.env.XAI_API_KEY;
	if (!skipModel && apiKey) try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			signal: AbortSignal.timeout(3500),
			body: JSON.stringify({
				model: "grok-4.5",
				max_tokens: 80,
				messages: [{
					role: "system",
					content: "You are Axiom. Two short sentences. No emoji. Recommend one offering by exact title and exact price from the catalog. Never invent work, prices, people, hours, or discounts. After hours is book-only. Never repeat a price or promise that is not on the book."
				}, {
					role: "user",
					content: `${catalogBlock(catalog)}\n\nGuest: ${data.question}`
				}]
			})
		});
		if (res.ok) {
			const textOut = (await res.json()).choices?.[0]?.message?.content?.trim();
			if (textOut) draft = textOut;
		}
	} catch {
		draft = groundedFallback;
	}
	const grounded = groundReply(data.question, draft, catalog);
	try {
		const existing = await sql`
        select truth from axiom_ledger where business_id = ${data.slug}
      `;
		const have = new Set(existing.map((r) => r.truth));
		for (const flag of grounded.flags) {
			const truth = ledgerLine(flag);
			if (have.has(truth)) continue;
			have.add(truth);
			await sql`
          insert into axiom_ledger (business_id, truth)
          values (${data.slug}, ${truth})
        `;
		}
		await sql`
        insert into axiom_receipts (business_id, question, draft, spoken, flags_json, status)
        values (
          ${data.slug},
          ${data.question},
          ${draft},
          ${grounded.spoken},
          ${JSON.stringify(grounded.flags)},
          ${grounded.status}
        )
      `;
	} catch {}
	const match = profile.offerings.find((o) => grounded.spoken.toLowerCase().includes(o.title.toLowerCase()));
	return {
		ok: true,
		text: grounded.spoken,
		offeringTitle: match?.title ?? null
	};
});
var verifyStudio_createServerFn_handler = createServerRpc({
	id: "084f2962ca5a6140fc054424176f7997408d0e2e4151730729a08f51f2ba7206",
	name: "verifyStudio",
	filename: "src/lib/axiom/server.ts"
}, (opts) => verifyStudio.__executeServer(opts));
var verifyStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN"))
})).handler(verifyStudio_createServerFn_handler, async ({ data }) => {
	const { name } = await requirePin(data.slug, data.pin);
	return {
		ok: true,
		name,
		slug: data.slug
	};
});
var getStudio_createServerFn_handler = createServerRpc({
	id: "57f02227e87813cb488967b8064190d42147dd20f9c84e83dfe0ca81a18ad20b",
	name: "getStudio",
	filename: "src/lib/axiom/server.ts"
}, (opts) => getStudio.__executeServer(opts));
var getStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN"))
})).handler(getStudio_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await ensureLoopTables(sql);
	const profile = await loadProfile(data.slug);
	if (!profile) throw new Error("Studio not found");
	const bookings = await sql`
      select b.id,
        b.member_id as "memberId",
        b.offering_id as "offeringId",
        b.guest_handle as "guestHandle",
        b.slot_at::text as "slotAt",
        b.status, b.code, b.note,
        b.created_at::text as "createdAt",
        o.title as "offeringTitle",
        m.display_name as "memberName"
      from bookings b
      left join offerings o on o.id = b.offering_id
      left join team_members m on m.id = b.member_id
      where b.business_id = ${data.slug}
      order by b.slot_at desc
      limit 80
    `;
	let ledger = [];
	let receiptRows = [];
	try {
		ledger = await sql`
        select id, truth, created_at::text as "createdAt"
        from axiom_ledger
        where business_id = ${data.slug}
        order by id desc
        limit 40
      `;
		receiptRows = await sql`
        select id, question, draft, spoken,
          flags_json as "flagsJson",
          status,
          created_at::text as "createdAt"
        from axiom_receipts
        where business_id = ${data.slug}
        order by created_at desc
        limit 40
      `;
	} catch {
		ledger = [];
		receiptRows = [];
	}
	const receipts = receiptRows.map((row) => ({
		id: row.id,
		question: row.question,
		draft: row.draft,
		spoken: row.spoken,
		flags: parseFlags(row.flagsJson),
		status: row.status,
		createdAt: row.createdAt
	}));
	return {
		...profile,
		bookings,
		receipts,
		ledger
	};
});
var createStudio_createServerFn_handler = createServerRpc({
	id: "58933b56d93f89c71cc1e8f8c082d6e69543ee49dc12e28f792cdf6c135decc9",
	name: "createStudio",
	filename: "src/lib/axiom/server.ts"
}, (opts) => createStudio.__executeServer(opts));
var createStudio = createServerFn({ method: "POST" }).validator((input) => ({
	name: text(input.name, 48, "Name"),
	niche: text(input.niche, 24, "Niche"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	tagline: optionalText(input.tagline, 80)
})).handler(createStudio_createServerFn_handler, async ({ data }) => {
	if (!isNiche(data.niche)) throw new Error("Choose a niche");
	const sql = await getSql();
	await ensureSeed(sql);
	let slug = slugify(data.name);
	if ((await sql`select id from businesses where id = ${slug}`)[0]) slug = `${slug}-${Math.random().toString(36).slice(2, 6)}`;
	const pinHash = await hashPin(slug, data.pin);
	const hours = data.niche === "food_truck" ? FOOD_HOURS : DEFAULT_HOURS;
	const halo = NICHES[data.niche].halo;
	const tagline = data.tagline || "Book through the night.";
	await sql`
      insert into businesses (
        id, name, niche, tagline, about, pin_hash, hours_json, halo_theme
      ) values (
        ${slug}, ${data.name}, ${data.niche}, ${tagline}, '',
        ${pinHash}, ${JSON.stringify(hours)}, ${halo}
      )
    `;
	await sql`
      insert into posts (business_id, body)
      values (${slug}, ${"Studio is live. Customize the halo, the team, and tonight's book."})
    `;
	return { slug };
});
var updateStudio_createServerFn_handler = createServerRpc({
	id: "a0aea865e4e5ab8c23cb45ea0214f9b24df9e58fc3f0049d8ecf0c6a87a38be0",
	name: "updateStudio",
	filename: "src/lib/axiom/server.ts"
}, (opts) => updateStudio.__executeServer(opts));
var updateStudio = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	name: text(input.name, 48, "Name"),
	tagline: optionalText(input.tagline, 80),
	about: optionalText(input.about, 600),
	haloTheme: text(input.haloTheme, 24, "Halo"),
	hoursJson: text(input.hoursJson, 2e3, "Hours")
})).handler(updateStudio_createServerFn_handler, async ({ data }) => {
	if (!isHaloTheme(data.haloTheme)) throw new Error("Unknown halo");
	JSON.parse(data.hoursJson);
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      update businesses
      set name = ${data.name},
          tagline = ${data.tagline},
          about = ${data.about},
          halo_theme = ${data.haloTheme},
          hours_json = ${data.hoursJson}
      where id = ${data.slug}
    `;
	return { ok: true };
});
var setLocation_createServerFn_handler = createServerRpc({
	id: "80614ceba7366698fec5e06d5ecda6e9b0192147cc224de7462724152a0727ac",
	name: "setLocation",
	filename: "src/lib/axiom/server.ts"
}, (opts) => setLocation.__executeServer(opts));
var setLocation = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	locationName: optionalText(input.locationName, 80),
	locationNote: optionalText(input.locationNote, 160)
})).handler(setLocation_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      update businesses
      set location_name = ${data.locationName},
          location_note = ${data.locationNote},
          location_updated_at = now()
      where id = ${data.slug}
    `;
	return { ok: true };
});
var addMember_createServerFn_handler = createServerRpc({
	id: "b1f3bd79c33d8d5ef86a28da5ab8325654abcd26cbc521a4be70300179871bfe",
	name: "addMember",
	filename: "src/lib/axiom/server.ts"
}, (opts) => addMember.__executeServer(opts));
var addMember = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	displayName: text(input.displayName, 40, "Name"),
	role: optionalText(input.role, 40),
	bio: optionalText(input.bio, 180)
})).handler(addMember_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      insert into team_members (business_id, display_name, role, bio, sort_order)
      values (
        ${data.slug}, ${data.displayName}, ${data.role}, ${data.bio},
        (select coalesce(max(sort_order), 0) + 1 from team_members where business_id = ${data.slug})
      )
    `;
	return { ok: true };
});
var updateMember_createServerFn_handler = createServerRpc({
	id: "c186a6a3301c4b2776f8b6143b320cc41bd2f9a73251dbd5e0b3b9765fb1df28",
	name: "updateMember",
	filename: "src/lib/axiom/server.ts"
}, (opts) => updateMember.__executeServer(opts));
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
})).handler(updateMember_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      update team_members
      set display_name = ${data.displayName},
          role = ${data.role},
          bio = ${data.bio},
          available = ${data.available}
      where id = ${data.id} and business_id = ${data.slug}
    `;
	return { ok: true };
});
var removeMember_createServerFn_handler = createServerRpc({
	id: "7dcb8bcbcbb56ac1b7a8dcf266fbdca2d1614cb5a9d5aa7f9dbe2f28beab0826",
	name: "removeMember",
	filename: "src/lib/axiom/server.ts"
}, (opts) => removeMember.__executeServer(opts));
var removeMember = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing member");
	})()
})).handler(removeMember_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`delete from team_members where id = ${data.id} and business_id = ${data.slug}`;
	return { ok: true };
});
var addOffering_createServerFn_handler = createServerRpc({
	id: "436c43f4465d9ffc77deea105f825a8e82e266c0fcada4a8c68c24c70b33fde6",
	name: "addOffering",
	filename: "src/lib/axiom/server.ts"
}, (opts) => addOffering.__executeServer(opts));
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
})).handler(addOffering_createServerFn_handler, async ({ data }) => {
	const kind = data.kind === "menu" ? "menu" : "service";
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      insert into offerings (
        business_id, member_id, title, description, duration_min, price_cents, image, kind
      ) values (
        ${data.slug}, ${data.memberId}, ${data.title}, ${data.description},
        ${data.durationMin}, ${data.priceCents}, ${data.image}, ${kind}
      )
    `;
	return { ok: true };
});
var updateOffering_createServerFn_handler = createServerRpc({
	id: "11122eaf9a92748fd6df922f85a3f313fa10dfd9aabe69c9aa438a6d2c86c83e",
	name: "updateOffering",
	filename: "src/lib/axiom/server.ts"
}, (opts) => updateOffering.__executeServer(opts));
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
})).handler(updateOffering_createServerFn_handler, async ({ data }) => {
	const kind = data.kind === "menu" ? "menu" : "service";
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      update offerings
      set member_id = ${data.memberId},
          title = ${data.title},
          description = ${data.description},
          duration_min = ${data.durationMin},
          price_cents = ${data.priceCents},
          image = ${data.image},
          kind = ${kind}
      where id = ${data.id} and business_id = ${data.slug}
    `;
	return { ok: true };
});
var removeOffering_createServerFn_handler = createServerRpc({
	id: "fa2e5901a008d67b62bb14ffe839f20a99f41c966ca0ede723dbb99815f65e26",
	name: "removeOffering",
	filename: "src/lib/axiom/server.ts"
}, (opts) => removeOffering.__executeServer(opts));
var removeOffering = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing offering");
	})()
})).handler(removeOffering_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`delete from offerings where id = ${data.id} and business_id = ${data.slug}`;
	return { ok: true };
});
var addPost_createServerFn_handler = createServerRpc({
	id: "bc0dd344b6825c0f9ae43cbccfb3e67f592d77fcee7c8320edb3425c663a10df",
	name: "addPost",
	filename: "src/lib/axiom/server.ts"
}, (opts) => addPost.__executeServer(opts));
var addPost = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	body: text(input.body, 280, "Post"),
	image: optionalImage(input.image)
})).handler(addPost_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      insert into posts (business_id, body, image)
      values (${data.slug}, ${data.body}, ${data.image})
    `;
	return { ok: true };
});
var removePost_createServerFn_handler = createServerRpc({
	id: "72493b587438057afc13a70e23aa2be1eee56a05f9c7e55aa6c4436accdf2fe2",
	name: "removePost",
	filename: "src/lib/axiom/server.ts"
}, (opts) => removePost.__executeServer(opts));
var removePost = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing post");
	})()
})).handler(removePost_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`delete from posts where id = ${data.id} and business_id = ${data.slug}`;
	return { ok: true };
});
var setBookingStatus_createServerFn_handler = createServerRpc({
	id: "63e0cc2d2a6c09edd22d285d40b33f57233d711b3afb855c50512637adab288b",
	name: "setBookingStatus",
	filename: "src/lib/axiom/server.ts"
}, (opts) => setBookingStatus.__executeServer(opts));
var setBookingStatus = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing booking");
	})(),
	status: text(input.status, 16, "Status")
})).handler(setBookingStatus_createServerFn_handler, async ({ data }) => {
	if (![
		"pending",
		"confirmed",
		"completed",
		"cancelled"
	].includes(data.status)) throw new Error("Invalid status");
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      update bookings set status = ${data.status}
      where id = ${data.id} and business_id = ${data.slug}
    `;
	return { ok: true };
});
var addLedgerTruth_createServerFn_handler = createServerRpc({
	id: "d8e1ed2e3511e6dcfe92089e892b1f4a9b25da498e750b8ce12fa860bb3cd95c",
	name: "addLedgerTruth",
	filename: "src/lib/axiom/server.ts"
}, (opts) => addLedgerTruth.__executeServer(opts));
var addLedgerTruth = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	truth: text(input.truth, 180, "Truth")
})).handler(addLedgerTruth_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`
      insert into axiom_ledger (business_id, truth)
      values (${data.slug}, ${data.truth})
    `;
	return { ok: true };
});
var removeLedgerTruth_createServerFn_handler = createServerRpc({
	id: "a8f705174eefd0a3b9abf20ce5be7c94f4e4304432fe8e3e105dd211a9cc0554",
	name: "removeLedgerTruth",
	filename: "src/lib/axiom/server.ts"
}, (opts) => removeLedgerTruth.__executeServer(opts));
var removeLedgerTruth = createServerFn({ method: "POST" }).validator((input) => ({
	slug: text(input.slug, 64, "Studio"),
	pin: assertPinShape(text(input.pin, 4, "PIN")),
	id: intOrNull(input.id) ?? (() => {
		throw new Error("Missing truth");
	})()
})).handler(removeLedgerTruth_createServerFn_handler, async ({ data }) => {
	const { sql } = await requirePin(data.slug, data.pin);
	await sql`delete from axiom_ledger where id = ${data.id} and business_id = ${data.slug}`;
	return { ok: true };
});
//#endregion
export { addLedgerTruth_createServerFn_handler, addMember_createServerFn_handler, addOffering_createServerFn_handler, addPost_createServerFn_handler, askAxiom_createServerFn_handler, createBooking_createServerFn_handler, createStudio_createServerFn_handler, getBusiness_createServerFn_handler, getStudio_createServerFn_handler, listBusinesses_createServerFn_handler, lookupBooking_createServerFn_handler, removeLedgerTruth_createServerFn_handler, removeMember_createServerFn_handler, removeOffering_createServerFn_handler, removePost_createServerFn_handler, setBookingStatus_createServerFn_handler, setLocation_createServerFn_handler, updateMember_createServerFn_handler, updateOffering_createServerFn_handler, updateStudio_createServerFn_handler, verifyStudio_createServerFn_handler };
