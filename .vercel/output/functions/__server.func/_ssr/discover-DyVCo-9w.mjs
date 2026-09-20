import { o as __toESM } from "../_runtime.mjs";
import { n as NICHE_LIST, t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as Route$3 } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as BusinessCard } from "./business-card-Bivqt4dk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/discover-DyVCo-9w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Discover() {
	const businesses = Route$3.useLoaderData();
	const [niche, setNiche] = (0, import_react.useState)("all");
	const shown = niche === "all" ? businesses : businesses.filter((b) => b.niche === niche);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col px-4 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Studios"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-2xl font-medium tracking-display",
				children: "Find a chair"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Book through the night. The studio confirms when they open."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-5 flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: niche === "all",
					onClick: () => setNiche("all"),
					children: "All"
				}), NICHE_LIST.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					active: niche === key,
					onClick: () => setNiche(key),
					children: NICHES[key].label
				}, key))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-col gap-4",
				children: shown.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-12 text-center text-sm text-muted-foreground",
					children: "No studios in this niche yet."
				}) : shown.map((business) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessCard, { business }, business.id))
			})
		]
	});
}
function FilterChip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		size: "sm",
		variant: active ? "default" : "secondary",
		className: "shrink-0 rounded-full",
		onClick,
		children
	});
}
//#endregion
export { Discover as component };
