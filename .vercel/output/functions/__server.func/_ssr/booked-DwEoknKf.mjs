import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as useGuestBookings, f as lookupBooking } from "./server-g1HW7csS.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as Card } from "./card-CooQR_ud.mjs";
import { t as Input } from "./input-DXw9B9ss.mjs";
import { n as formatDayTime } from "./format-DhmWTvyN.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/booked-DwEoknKf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookedPage() {
	const items = useGuestBookings((s) => s.items);
	const add = useGuestBookings((s) => s.add);
	const [code, setCode] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onLookup() {
		const trimmed = code.trim().toUpperCase();
		if (!trimmed) return;
		setBusy(true);
		try {
			const found = await lookupBooking({ data: { code: trimmed } });
			if (!found) {
				toast.error("No book with that code");
				return;
			}
			add({
				code: found.code,
				slug: found.slug,
				businessName: found.businessName,
				offeringTitle: found.offeringTitle ?? "Held time",
				slotAt: found.slotAt,
				guestHandle: found.guestHandle
			});
			setCode("");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Lookup failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-6 px-4 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: "Held"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-medium tracking-display",
					children: "Your books"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Codes live on this phone. The studio sees the handle and the time."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: code,
					onChange: (e) => setCode(e.target.value.toUpperCase()),
					placeholder: "AX-XXXX",
					maxLength: 16
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					onClick: onLookup,
					disabled: busy,
					children: "Find"
				})]
			}),
			items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border px-4 py-12 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No times held yet."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/discover",
						children: "Find a studio"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-widest text-muted-foreground",
							children: item.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-lg font-medium tracking-display",
							children: item.businessName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: item.offeringTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm tabular-nums text-foreground",
							children: formatDayTime(item.slotAt)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-subtle",
							children: ["For ", item.guestHandle]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							className: "mt-3 px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/b/$slug",
								params: { slug: item.slug },
								children: "Open studio"
							})
						})
					]
				}, item.code))
			})
		]
	});
}
//#endregion
export { BookedPage as component };
