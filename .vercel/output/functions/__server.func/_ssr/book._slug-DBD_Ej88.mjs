import { o as __toESM } from "../_runtime.mjs";
import { t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as useGuestBookings, a as askAxiom, o as cn, s as createBooking } from "./server-g1HW7csS.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useHaloMood, l as useHaloTheme, r as Route$1 } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as Input } from "./input-DXw9B9ss.mjs";
import { t as Label } from "./label-C9VzAeLD.mjs";
import { i as parseStamp, n as formatDayTime, r as money } from "./format-DhmWTvyN.mjs";
import { a as parseHours, i as isOpenAt } from "./hours-4wmQFcU_.mjs";
import { t as Atmosphere } from "./atmosphere-B-1DS6dN.mjs";
import { t as Textarea } from "./textarea-CJQfjePz.mjs";
import { a as addDays, i as startOfDay, n as setHours, r as isBefore, t as setMinutes } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book._slug-DBD_Ej88.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BookPage() {
	const business = Route$1.useLoaderData();
	const { slug } = Route$1.useParams();
	const navigate = useNavigate();
	useHaloTheme(business?.haloTheme ?? "spectrum");
	useHaloMood("focus");
	const [offeringId, setOfferingId] = (0, import_react.useState)(business?.offerings[0]?.id ?? null);
	const [memberId, setMemberId] = (0, import_react.useState)(null);
	const [dayIndex, setDayIndex] = (0, import_react.useState)(0);
	const [slotAt, setSlotAt] = (0, import_react.useState)(null);
	const [handle, setHandle] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [question, setQuestion] = (0, import_react.useState)("");
	const askRef = (0, import_react.useRef)(null);
	const [advice, setAdvice] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [asking, setAsking] = (0, import_react.useState)(false);
	const addGuest = useGuestBookings((s) => s.add);
	const days = (0, import_react.useMemo)(() => Array.from({ length: 14 }, (_, i) => addDays(startOfDay(/* @__PURE__ */ new Date()), i)), []);
	const selectedDay = days[dayIndex] ?? days[0];
	if (!business) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "px-4 py-16 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "That studio is not on Axiom."
		})
	});
	const copy = NICHES[business.niche];
	const offering = business.offerings.find((o) => o.id === offeringId) ?? null;
	const lockedMember = offering?.memberId ? business.team.find((m) => m.id === offering.memberId) ?? null : null;
	const activeMemberId = lockedMember?.id ?? memberId;
	const slots = buildSlots(selectedDay, business.takenSlots, activeMemberId, parseHours(business.hoursJson));
	async function onAsk() {
		const typed = (askRef.current?.value || (typeof document !== "undefined" ? document.getElementById("axiom-ask")?.value : "") || question).trim();
		if (!typed) return;
		setQuestion(typed);
		setAsking(true);
		try {
			const result = await askAxiom({ data: {
				slug,
				question: typed
			} });
			if (result.ok) {
				setAdvice(result.text);
				const match = result.offeringTitle ? business?.offerings.find((o) => o.title === result.offeringTitle) : business?.offerings.find((o) => result.text.toLowerCase().includes(o.title.toLowerCase()));
				if (match) setOfferingId(match.id);
			} else toast.error(result.error);
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Axiom is quiet");
		} finally {
			setAsking(false);
		}
	}
	async function onBook() {
		if (!offering || !slotAt) {
			toast.error("Choose a service and a time");
			return;
		}
		setBusy(true);
		try {
			const result = await createBooking({ data: {
				slug,
				offeringId: offering.id,
				memberId: activeMemberId,
				guestHandle: handle,
				slotAt,
				note
			} });
			addGuest({
				code: result.code,
				slug: result.slug,
				businessName: result.businessName,
				offeringTitle: result.offeringTitle,
				slotAt: result.slotAt,
				guestHandle: result.guestHandle
			});
			toast.success(`Held · ${result.code}`);
			await navigate({ to: "/booked" });
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not hold the time");
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
					children: business.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-medium tracking-display",
					children: copy.bookLabel
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Times stay open after close. They confirm when they walk in."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "axiom-ask",
						children: "Ask Axiom"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Answers come from this studio’s book only."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							onAsk();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "axiom-ask",
							name: "question",
							ref: askRef,
							defaultValue: "",
							placeholder: "Fade, flash, chili…",
							autoComplete: "off"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "secondary",
							disabled: asking,
							children: asking ? "Checking the book…" : "Ask"
						})]
					}),
					asking ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "text-sm text-subtle",
						children: "Checking the book…"
					}) : advice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						className: "border-l border-border pl-3 text-sm text-muted-foreground",
						children: advice
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: copy.offeringLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 flex flex-col gap-2",
				children: business.offerings.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferingChoice, {
					offering: item,
					active: item.id === offeringId,
					niche: business.niche,
					onSelect: () => {
						setOfferingId(item.id);
						setSlotAt(null);
					}
				}, item.id))
			})] }),
			!lockedMember && business.niche !== "food_truck" && business.team.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: copy.teamLabel
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: memberId == null ? "default" : "secondary",
					className: "rounded-full",
					onClick: () => setMemberId(null),
					children: "Any"
				}), business.team.filter((m) => m.available).map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: memberId === member.id ? "default" : "secondary",
					className: "rounded-full",
					onClick: () => setMemberId(member.id),
					children: member.displayName
				}, member.id))]
			})] }) : lockedMember ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted-foreground",
				children: ["With ", lockedMember.displayName]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Day"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1",
				children: days.map((day, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setDayIndex(i);
						setSlotAt(null);
					},
					className: cn("flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-md border text-xs transition-colors duration-quick", i === dayIndex ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-muted-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "uppercase",
						children: day.toLocaleDateString("en-US", { weekday: "short" }).slice(0, 2)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums font-medium",
						children: day.getDate()
					})]
				}, day.toISOString()))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Time"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: slots.map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					disabled: slot.taken,
					onClick: () => setSlotAt(slot.iso),
					className: cn("h-11 rounded-sm border text-xs tabular-nums transition-colors duration-quick disabled:opacity-30", slotAt === slot.iso ? "border-accent bg-accent text-accent-foreground" : "border-border bg-card text-foreground", slot.afterHours && slotAt !== slot.iso ? "text-muted-foreground" : ""),
					children: slot.label
				}, slot.iso))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "handle",
						children: "What should we call you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "handle",
						value: handle,
						onChange: (e) => setHandle(e.target.value),
						placeholder: "Rin",
						maxLength: 24,
						autoComplete: "nickname"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "note",
						children: "Note for the chair"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "note",
						value: note,
						onChange: (e) => setNote(e.target.value),
						placeholder: "Skin fade, no skin on the sides…",
						maxLength: 80,
						className: "min-h-20"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "lg",
				onClick: onBook,
				disabled: busy || !offering || !slotAt,
				children: busy ? "Holding…" : slotAt ? `Hold ${formatDayTime(slotAt)}` : "Hold a time"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/b/$slug",
					params: { slug },
					children: ["Back to ", business.name]
				})
			})
		]
	});
}
function OfferingChoice({ offering, active, niche, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onSelect,
		className: cn("flex gap-3 overflow-hidden rounded-lg border text-left transition-colors duration-quick", active ? "border-accent bg-card" : "border-border bg-card"),
		children: [offering.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: offering.image,
			alt: "",
			className: "h-20 w-20 shrink-0 object-cover"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {
			niche,
			className: "h-20 w-20 shrink-0"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0 py-3 pr-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: offering.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular-nums text-sm",
					children: money(offering.priceCents)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [
					offering.durationMin,
					"m",
					offering.description ? ` · ${offering.description}` : ""
				]
			})]
		})]
	});
}
function buildSlots(day, taken, memberId, hours) {
	const out = [];
	for (let hour = 8; hour <= 21; hour += 1) for (const minute of [0, 30]) {
		if (hour === 21 && minute === 30) continue;
		const local = setMinutes(setHours(day, hour), minute);
		if (isBefore(local, /* @__PURE__ */ new Date())) continue;
		const iso = local.toISOString();
		const takenHere = taken.some((slot) => {
			const a = parseStamp(slot.slotAt).getTime();
			if (Math.abs(a - local.getTime()) > 6e4) return false;
			return slot.memberId == null || memberId == null || slot.memberId === memberId;
		});
		out.push({
			iso,
			label: local.toLocaleTimeString("en-US", {
				hour: "numeric",
				minute: "2-digit"
			}),
			taken: takenHere,
			afterHours: !isOpenAt(hours, local)
		});
	}
	return out;
}
//#endregion
export { BookPage as component };
