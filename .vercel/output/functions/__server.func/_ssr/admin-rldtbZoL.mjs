import { o as __toESM } from "../_runtime.mjs";
import { n as NICHE_LIST, t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { S as verifyStudio, c as createStudio, o as cn, w as useStudioSession } from "./server-g1HW7csS.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as Delete } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { o as Route$5 } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as Card } from "./card-CooQR_ud.mjs";
import { t as Input } from "./input-DXw9B9ss.mjs";
import { t as Label } from "./label-C9VzAeLD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-rldtbZoL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEYS = [
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"",
	"0",
	"del"
];
function PinPad({ onComplete, disabled }) {
	const [digits, setDigits] = (0, import_react.useState)("");
	function press(key) {
		if (disabled) return;
		if (key === "del") {
			setDigits((d) => d.slice(0, -1));
			return;
		}
		if (!key || digits.length >= 4) return;
		const next = digits + key;
		setDigits(next);
		if (next.length === 4) {
			onComplete(next);
			setTimeout(() => setDigits(""), 200);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-3",
			"aria-label": "PIN digits",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2.5 rounded-full border border-border transition-colors duration-quick", i < digits.length ? "bg-accent border-accent" : "bg-transparent") }, i))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid w-full max-w-xs grid-cols-3 gap-2",
			children: KEYS.map((key, i) => {
				if (key === "") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, `empty-${i}`);
				if (key === "del") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					className: "h-14",
					onClick: () => press("del"),
					disabled,
					"aria-label": "Delete",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delete, { className: "size-5" })
				}, "del");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "secondary",
					className: "h-14 font-display text-lg",
					onClick: () => press(key),
					disabled,
					children: key
				}, key);
			})
		})]
	});
}
function AdminPage() {
	const businesses = Route$5.useLoaderData();
	const navigate = useNavigate();
	const enter = useStudioSession((s) => s.enter);
	const [mode, setMode] = (0, import_react.useState)("enter");
	const [slug, setSlug] = (0, import_react.useState)(businesses[0]?.id ?? "");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [tagline, setTagline] = (0, import_react.useState)("");
	const [niche, setNiche] = (0, import_react.useState)("barber");
	const [newPin, setNewPin] = (0, import_react.useState)("");
	async function onPin(pin) {
		if (!slug) {
			toast.error("Choose a studio");
			return;
		}
		setBusy(true);
		try {
			const result = await verifyStudio({ data: {
				slug,
				pin
			} });
			enter(result.slug, pin);
			await navigate({
				to: "/studio/$slug",
				params: { slug: result.slug }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "PIN failed");
		} finally {
			setBusy(false);
		}
	}
	async function onCreate() {
		if (newPin.length !== 4) {
			toast.error("Choose a four-digit PIN");
			return;
		}
		setBusy(true);
		try {
			const result = await createStudio({ data: {
				name,
				niche,
				pin: newPin,
				tagline
			} });
			enter(result.slug, newPin);
			toast.success("Studio is live");
			await navigate({
				to: "/studio/$slug",
				params: { slug: result.slug }
			});
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not open studio");
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
					children: "Owners"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-medium tracking-display",
					children: "Studio key"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Four digits. Customize the halo, the team, the menu, and tonight’s book in real time."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "enter" ? "default" : "secondary",
					onClick: () => setMode("enter"),
					children: "Enter"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: mode === "create" ? "default" : "secondary",
					onClick: () => setMode("create"),
					children: "Open new"
				})]
			}),
			mode === "enter" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col gap-2",
					children: businesses.map((biz) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSlug(biz.id),
						className: cn("rounded-lg border px-4 py-3 text-left transition-colors duration-quick", slug === biz.id ? "border-accent bg-card" : "border-border bg-card"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: biz.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: NICHES[biz.niche].label
						})]
					}, biz.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-subtle",
					children: "Preview studios use PIN 4242"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinPad, {
					onComplete: onPin,
					disabled: busy || !slug
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Niche" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-3 gap-2",
							children: NICHE_LIST.map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setNiche(key),
								className: cn("rounded-md border px-2 py-3 text-xs font-medium", niche === key ? "border-accent bg-card" : "border-border bg-muted"),
								children: NICHES[key].label
							}, key))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "studio-name",
							children: "Studio name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "studio-name",
							value: name,
							onChange: (e) => setName(e.target.value),
							maxLength: 48
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "studio-tag",
							children: "Tagline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "studio-tag",
							value: tagline,
							onChange: (e) => setTagline(e.target.value),
							placeholder: "The chair is waiting.",
							maxLength: 80
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "studio-pin",
							children: "Four-digit PIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "studio-pin",
							inputMode: "numeric",
							pattern: "\\d{4}",
							maxLength: 4,
							value: newPin,
							onChange: (e) => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 4))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						onClick: onCreate,
						disabled: busy || name.trim().length < 2,
						children: "Open studio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs leading-normal text-muted-foreground",
							children: "You can add barbers or artists, upload a reference image per offering, post the lot every day, and take books while the door is locked."
						})
					})
				]
			})
		]
	});
}
//#endregion
export { AdminPage as component };
