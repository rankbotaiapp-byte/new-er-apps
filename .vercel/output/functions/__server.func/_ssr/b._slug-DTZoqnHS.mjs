import { t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./server-g1HW7csS.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as MapPin } from "../_libs/lucide-react.mjs";
import { i as Route$2, l as useHaloTheme } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as Card } from "./card-CooQR_ud.mjs";
import { a as relativeFrom, n as formatDayTime, r as money } from "./format-DhmWTvyN.mjs";
import { a as parseHours, i as isOpenAt, r as hoursLabel } from "./hours-4wmQFcU_.mjs";
import { n as Monogram, r as NicheMark, t as Atmosphere } from "./atmosphere-B-1DS6dN.mjs";
import { t as Badge } from "./badge-DU6brb5l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/b._slug-DTZoqnHS.js
var import_jsx_runtime = require_jsx_runtime();
function Separator({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("h-px w-full bg-border", className) });
}
function BusinessPage() {
	const business = Route$2.useLoaderData();
	const { slug } = Route$2.useParams();
	useHaloTheme(business?.haloTheme ?? "spectrum");
	if (!business) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "That studio is not on Axiom."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/discover",
				children: "Back to studios"
			})
		})]
	});
	const copy = NICHES[business.niche];
	const hours = parseHours(business.hoursJson);
	const open = isOpenAt(hours, /* @__PURE__ */ new Date());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {
			niche: business.niche,
			className: "h-44",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0 flex flex-col justify-between p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NicheMark, { niche: business.niche }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-medium tracking-display",
					children: business.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-foreground/85",
					children: business.tagline
				})] })]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 px-4 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: hoursLabel(hours)
					}), business.locationName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 flex items-center gap-1.5 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), business.locationName]
					}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: open ? "live" : "closed",
						children: open ? "Open" : "After hours"
					})]
				}),
				!open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border border-border bg-muted px-3 py-2 text-sm text-muted-foreground",
					children: "Closed for walk-ins. Axiom is still taking the book."
				}) : null,
				business.niche === "food_truck" || business.locationNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
							children: copy.locationLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-lg font-medium tracking-display",
							children: business.locationName || "Location posts daily"
						}),
						business.locationNote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: business.locationNote
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-subtle",
							children: relativeFrom(business.locationUpdatedAt)
						})
					]
				}) : null,
				business.about ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-normal text-muted-foreground",
					children: business.about
				}) : null,
				business.posts[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-normal text-foreground",
						children: business.posts[0].body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-subtle",
						children: relativeFrom(business.posts[0].createdAt)
					})
				] }) : null,
				business.team.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: copy.teamLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-3",
					children: business.team.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 rounded-lg border border-border bg-card p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monogram, {
							name: member.displayName,
							niche: business.niche
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: member.displayName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: member.role
								}),
								member.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-subtle",
									children: member.bio
								}) : null
							]
						})]
					}, member.id))
				})] }) : null,
				business.offerings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: copy.offeringLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-1 gap-3",
					children: business.offerings.map((offering) => {
						const owner = business.team.find((m) => m.id === offering.memberId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "overflow-hidden rounded-lg border border-border bg-card",
							children: [offering.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: offering.image,
								alt: "",
								className: "h-36 w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atmosphere, {
								niche: business.niche,
								className: "h-20"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-medium",
											children: offering.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "tabular-nums text-sm",
											children: money(offering.priceCents)
										})]
									}),
									offering.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: offering.description
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-subtle",
										children: [
											offering.durationMin,
											"m",
											owner ? ` · ${owner.displayName}` : ""
										]
									})
								]
							})]
						}, offering.id);
					})
				})] }) : null,
				business.posts.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: "Posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-3",
					children: business.posts.slice(1).map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-3",
						children: [
							post.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: post.image,
								alt: "",
								className: "mb-3 h-32 w-full rounded-md object-cover"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: post.body
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-subtle",
								children: formatDayTime(post.createdAt)
							})
						]
					}, post.id))
				})] }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "lg",
					className: "w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book/$slug",
						params: { slug },
						children: copy.bookLabel
					})
				})
			]
		})]
	});
}
//#endregion
export { BusinessPage as component };
