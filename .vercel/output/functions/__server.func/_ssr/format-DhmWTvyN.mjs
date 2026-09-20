//#region node_modules/.nitro/vite/services/ssr/assets/format-DhmWTvyN.js
var TZ = "America/Los_Angeles";
function money(cents) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: cents % 100 === 0 ? 0 : 2
	}).format(cents / 100);
}
function parseStamp(value) {
	const normalized = value.trim().replace(" ", "T").replace(/([+-]\d{2})$/, "$1:00");
	return new Date(normalized);
}
function formatTime(iso) {
	const date = parseStamp(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat("en-US", {
		timeZone: TZ,
		hour: "numeric",
		minute: "2-digit"
	}).format(date);
}
function formatDay(iso) {
	const date = parseStamp(iso);
	if (Number.isNaN(date.getTime())) return iso;
	return new Intl.DateTimeFormat("en-US", {
		timeZone: TZ,
		weekday: "short",
		month: "short",
		day: "numeric"
	}).format(date);
}
function formatDayTime(iso) {
	return `${formatDay(iso)} · ${formatTime(iso)}`;
}
function clockNow(date = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-US", {
		timeZone: TZ,
		hour: "numeric",
		minute: "2-digit"
	}).format(date);
}
function relativeFrom(iso) {
	if (!iso) return "Not posted";
	const then = parseStamp(iso).getTime();
	if (Number.isNaN(then)) return "Posted";
	const delta = Date.now() - then;
	const mins = Math.max(0, Math.round(delta / 6e4));
	if (mins < 2) return "Just now";
	if (mins < 60) return `${mins}m ago`;
	const hours = Math.round(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.round(hours / 24)}d ago`;
}
function slugify(name) {
	return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "studio";
}
//#endregion
export { relativeFrom as a, parseStamp as i, formatDayTime as n, slugify as o, money as r, clockNow as t };
