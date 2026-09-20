import { t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./server-g1HW7csS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/atmosphere-B-1DS6dN.js
var import_jsx_runtime = require_jsx_runtime();
var NICHE_CLASS = {
	barber: "atmosphere-barber",
	tattoo: "atmosphere-tattoo",
	food_truck: "atmosphere-food"
};
function Atmosphere({ niche, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("atmosphere", NICHE_CLASS[niche] ?? "atmosphere-spectrum", className),
		children
	});
}
function Monogram({ name, niche }) {
	const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex size-12 items-center justify-center rounded-md font-display text-sm font-medium tracking-display text-foreground", NICHE_CLASS[niche] ?? "atmosphere-spectrum", "atmosphere"),
		"aria-hidden": "true",
		children: initials
	});
}
function NicheMark({ niche }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
		children: NICHES[niche].label
	});
}
//#endregion
export { Monogram as n, NicheMark as r, Atmosphere as t };
