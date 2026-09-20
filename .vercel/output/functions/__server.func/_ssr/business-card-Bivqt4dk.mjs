import { t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as relativeFrom } from "./format-DhmWTvyN.mjs";
import { a as parseHours, i as isOpenAt, r as hoursLabel } from "./hours-4wmQFcU_.mjs";
import { r as NicheMark, t as Atmosphere } from "./atmosphere-B-1DS6dN.mjs";
import { t as Badge } from "./badge-DU6brb5l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/business-card-Bivqt4dk.js
var import_jsx_runtime = require_jsx_runtime();
function BusinessCard({ business }) {
	const hours = parseHours(business.hoursJson);
	const open = isOpenAt(hours, /* @__PURE__ */ new Date());
	const copy = NICHES[business.niche];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/b/$slug",
		params: { slug: business.id },
		className: "block overflow-hidden rounded-xl border border-border bg-card transition-[border-color] duration-quick hover:border-foreground/25",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {
			niche: business.niche,
			className: "h-36",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NicheMark, { niche: business.niche }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl font-medium tracking-display text-foreground",
					children: business.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-foreground/80",
					children: business.tagline
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: [business.locationName || copy.locationLabel, business.niche === "food_truck" && business.locationUpdatedAt ? ` · ${relativeFrom(business.locationUpdatedAt)}` : ""]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: hoursLabel(hours)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				tone: open ? "live" : "closed",
				children: open ? "Open" : "After hours"
			})]
		})]
	});
}
//#endregion
export { BusinessCard as t };
