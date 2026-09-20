import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Route$6 } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as clockNow } from "./format-DhmWTvyN.mjs";
import { a as parseHours, i as isOpenAt } from "./hours-4wmQFcU_.mjs";
import { t as BusinessCard } from "./business-card-Bivqt4dk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ct7-dAm9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Presence() {
	const businesses = Route$6.useLoaderData();
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 3e4);
		return () => clearInterval(id);
	}, []);
	const openCount = businesses.filter((b) => isOpenAt(parseHours(b.hoursJson), now)).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col px-4 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "presence-rise text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Always present"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "presence-rise mt-3 font-display text-3xl font-medium tracking-wordmark text-foreground",
				children: "AXIOM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "presence-rise mt-3 max-w-xs text-sm leading-normal text-muted-foreground",
				children: "A living halo for studios that book. Barbers, tattoo, food — the ring holds the chair through the night."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "presence-rise mt-6 flex items-baseline justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-subtle",
					children: ["Portland · ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-foreground",
						children: clockNow(now)
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: openCount > 0 ? `${openCount} open now` : "After hours · still booking"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 flex flex-col gap-4",
				children: businesses.map((business, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "presence-rise",
					style: { animationDelay: `${i * 40}ms` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BusinessCard, { business })
				}, business.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						children: "Browse studios"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/admin",
						children: "Open your studio"
					})
				})]
			})
		]
	});
}
//#endregion
export { Presence as component };
