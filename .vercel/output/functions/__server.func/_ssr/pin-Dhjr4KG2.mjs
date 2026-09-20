//#region node_modules/.nitro/vite/services/ssr/assets/pin-Dhjr4KG2.js
var HALO_THEMES = {
	spectrum: [
		"#5ce1e6",
		"#7a6cff",
		"#ff5c8a",
		"#ff8a4c",
		"#f0c05a",
		"#4dffb4"
	],
	ember: [
		"#ffb070",
		"#ff6a3d",
		"#c43c22",
		"#ffd19a",
		"#ff8a4c",
		"#8a2a12"
	],
	ink: [
		"#7ad4ff",
		"#6a7dff",
		"#e8eaff",
		"#3ee0e8",
		"#9aa4ff",
		"#f4f4ff"
	],
	solstice: [
		"#f0c05a",
		"#7d9b7a",
		"#e07a3d",
		"#f4e2b8",
		"#c45c4a",
		"#5a7a4a"
	]
};
var HALO_THEME_LIST = [
	"spectrum",
	"ember",
	"ink",
	"solstice"
];
function isHaloTheme(value) {
	return value === "spectrum" || value === "ember" || value === "ink" || value === "solstice";
}
function haloGradient(theme) {
	const colors = HALO_THEMES[theme];
	return `conic-gradient(from var(--halo-angle), ${colors.join(", ")}, ${colors[0]})`;
}
async function hashPin(businessId, pin) {
	const bytes = new TextEncoder().encode(`axiom:v1:${businessId}:${pin}`);
	const digest = await crypto.subtle.digest("SHA-256", bytes);
	return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function assertPinShape(pin) {
	if (!/^\d{4}$/.test(pin)) throw new Error("PIN must be four digits");
	return pin;
}
//#endregion
export { isHaloTheme as a, hashPin as i, assertPinShape as n, haloGradient as r, HALO_THEME_LIST as t };
