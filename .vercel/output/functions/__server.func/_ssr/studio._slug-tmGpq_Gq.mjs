import { o as __toESM } from "../_runtime.mjs";
import { t as NICHES } from "./niches-LEjJK8qY.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as setBookingStatus, b as updateOffering, g as removePost, h as removeOffering, i as addPost, m as removeMember, n as addMember, o as cn, p as removeLedgerTruth, r as addOffering, t as addLedgerTruth, u as getStudio, v as setLocation, w as useStudioSession, x as updateStudio, y as updateMember } from "./server-g1HW7csS.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as HALO_THEME_LIST } from "./pin-Dhjr4KG2.mjs";
import { i as ImagePlus } from "../_libs/lucide-react.mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useHaloMood, l as useHaloTheme, n as Route } from "./router-_ElrSh8m.mjs";
import { t as Button } from "./button-CFMcH678.mjs";
import { t as Card } from "./card-CooQR_ud.mjs";
import { t as Input } from "./input-DXw9B9ss.mjs";
import { t as Label } from "./label-C9VzAeLD.mjs";
import { n as formatDayTime, r as money } from "./format-DhmWTvyN.mjs";
import { a as parseHours } from "./hours-4wmQFcU_.mjs";
import { t as Badge } from "./badge-DU6brb5l.mjs";
import { t as Textarea } from "./textarea-CJQfjePz.mjs";
import { t as FLAG_LABEL } from "./ground-rw1CRoNE.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio._slug-tmGpq_Gq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_CHARS = 16e4;
var MAX_EDGE = 720;
async function fileToDataUrl(file) {
	if (!file.type.startsWith("image/")) throw new Error("Choose an image");
	const url = URL.createObjectURL(file);
	try {
		const img = await loadImage(url);
		const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
		const width = Math.max(1, Math.round(img.width * scale));
		const height = Math.max(1, Math.round(img.height * scale));
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Could not read image");
		ctx.drawImage(img, 0, 0, width, height);
		let quality = .74;
		let out = canvas.toDataURL("image/jpeg", quality);
		while (out.length > MAX_CHARS && quality > .4) {
			quality -= .1;
			out = canvas.toDataURL("image/jpeg", quality);
		}
		if (out.length > MAX_CHARS) throw new Error("Image is still too large after compressing");
		return out;
	} finally {
		URL.revokeObjectURL(url);
	}
}
function loadImage(src) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => resolve(img);
		img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read image"));
		img.src = src;
	});
}
function ImageField({ label, value, onChange }) {
	const inputRef = (0, import_react.useRef)(null);
	const [error, setError] = (0, import_react.useState)(null);
	async function onFile(file) {
		if (!file) return;
		setError(null);
		try {
			onChange(await fileToDataUrl(file));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Could not read image");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: "image/*",
				className: "sr-only",
				onChange: (e) => onFile(e.target.files?.[0])
			}),
			value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-md border border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: value,
					alt: "",
					className: "h-32 w-full object-cover"
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => inputRef.current?.click(),
				className: "flex h-32 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border bg-muted text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" }), "Add a reference image"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => inputRef.current?.click(),
					children: value ? "Replace" : "Upload"
				}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: () => onChange(null),
					children: "Remove"
				}) : null]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-danger",
				children: error
			}) : null
		]
	});
}
function Tabs({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		className: cn("flex flex-col gap-4", className),
		...props
	});
}
function TabsList({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
		className: cn("no-scrollbar flex gap-1 overflow-x-auto rounded-lg bg-muted p-1", className),
		...props
	});
}
function TabsTrigger({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
		className: cn("h-9 shrink-0 rounded-sm px-3 text-xs font-medium text-muted-foreground transition-[background-color,color] duration-quick ease-smooth data-[state=active]:bg-card data-[state=active]:text-foreground", className),
		...props
	});
}
function TabsContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
		className: cn("outline-none", className),
		...props
	});
}
function StudioPage() {
	const { slug } = Route.useParams();
	const navigate = useNavigate();
	const session = useStudioSession((s) => s.session);
	const ready = useStudioSession((s) => s.ready);
	const leave = useStudioSession((s) => s.leave);
	const queryClient = useQueryClient();
	const query = useQuery({
		queryKey: ["studio", slug],
		enabled: ready && session?.slug === slug,
		queryFn: () => getStudio({ data: {
			slug,
			pin: session.pin
		} }),
		refetchInterval: 12e3
	});
	useHaloMood("focus");
	useHaloTheme(query.data?.haloTheme ?? "spectrum");
	(0, import_react.useEffect)(() => {
		if (ready && session?.slug !== slug) navigate({ to: "/admin" });
	}, [
		ready,
		session,
		slug,
		navigate
	]);
	if (!ready || session?.slug !== slug) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-16 text-center text-sm text-muted-foreground",
		children: "Opening studio…"
	});
	if (query.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "px-4 py-16 text-center text-sm text-muted-foreground",
		children: "Loading the book…"
	});
	if (query.error || !query.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "px-4 py-16 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Could not open this studio."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4",
			variant: "outline",
			onClick: () => leave(),
			children: "Leave"
		})]
	});
	const studio = query.data;
	const copy = NICHES[studio.niche];
	const pin = session.pin;
	function refresh() {
		queryClient.invalidateQueries({ queryKey: ["studio", slug] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex flex-col gap-4 px-4 pb-8 pt-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: copy.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-medium tracking-display",
					children: studio.name
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					onClick: () => {
						leave();
						navigate({ to: "/admin" });
					},
					children: "Lock"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Changes land on the public page as soon as you save."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: "presence",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "presence",
							children: "Presence"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "team",
							children: copy.teamLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "offer",
							children: copy.offeringLabel
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "place",
							children: "Place"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "posts",
							children: "Posts"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "book",
							children: "Book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "loop",
							children: "Receipts"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "presence",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PresenceForm, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "team",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TeamForm, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "offer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferingForm, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "place",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceForm, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "posts",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PostForm, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "book",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsList, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "loop",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptsPanel, {
							studio,
							slug,
							pin,
							onSaved: refresh
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/b/$slug",
					params: { slug },
					children: "View public page"
				})
			})
		]
	});
}
function PresenceForm({ studio, slug, pin, onSaved }) {
	const [name, setName] = (0, import_react.useState)(studio.name);
	const [tagline, setTagline] = (0, import_react.useState)(studio.tagline);
	const [about, setAbout] = (0, import_react.useState)(studio.about);
	const [haloTheme, setHaloTheme] = (0, import_react.useState)(studio.haloTheme);
	const [hoursJson, setHoursJson] = (0, import_react.useState)(studio.hoursJson);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		setBusy(true);
		try {
			parseHours(hoursJson);
			await updateStudio({ data: {
				slug,
				pin,
				name,
				tagline,
				about,
				haloTheme,
				hoursJson
			} });
			toast.success("Presence saved");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Save failed");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Name",
				value: name,
				onChange: setName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Tagline",
				value: tagline,
				onChange: setTagline
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "About" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: about,
					onChange: (e) => setAbout(e.target.value),
					maxLength: 600
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Halo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2",
					children: HALO_THEME_LIST.map((theme) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setHaloTheme(theme),
						className: cn("rounded-md border px-2 py-2 text-xs capitalize", haloTheme === theme ? "border-accent bg-card" : "border-border bg-muted"),
						children: theme
					}, theme))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "Walk-in hours stay on the public page. The book itself stays open after close."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				disabled: busy,
				children: "Save presence"
			})
		]
	});
}
function TeamForm({ studio, slug, pin, onSaved }) {
	const copy = NICHES[studio.niche];
	const [displayName, setDisplayName] = (0, import_react.useState)("");
	const [role, setRole] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function add() {
		setBusy(true);
		try {
			await addMember({ data: {
				slug,
				pin,
				displayName,
				role,
				bio
			} });
			setDisplayName("");
			setRole("");
			setBio("");
			toast.success("Added");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [studio.team.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemberEditor, {
			member,
			slug,
			pin,
			onSaved
		}, member.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-col gap-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: ["Add ", copy.teamLabel.toLowerCase()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Display name",
					value: displayName,
					onChange: setDisplayName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Role",
					value: role,
					onChange: setRole
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: bio,
						onChange: (e) => setBio(e.target.value),
						maxLength: 180,
						className: "min-h-20"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: add,
					disabled: busy || displayName.trim().length < 2,
					children: "Add"
				})
			]
		})]
	});
}
function MemberEditor({ member, slug, pin, onSaved }) {
	const [displayName, setDisplayName] = (0, import_react.useState)(member.displayName);
	const [role, setRole] = (0, import_react.useState)(member.role);
	const [bio, setBio] = (0, import_react.useState)(member.bio);
	const [available, setAvailable] = (0, import_react.useState)(member.available);
	async function save() {
		try {
			await updateMember({ data: {
				slug,
				pin,
				id: member.id,
				displayName,
				role,
				bio,
				available
			} });
			toast.success("Saved");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Save failed");
		}
	}
	async function remove() {
		try {
			await removeMember({ data: {
				slug,
				pin,
				id: member.id
			} });
			toast.success("Removed");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Remove failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col gap-3 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Display name",
				value: displayName,
				onChange: setDisplayName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Role",
				value: role,
				onChange: setRole
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Bio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: bio,
					onChange: (e) => setBio(e.target.value),
					maxLength: 180,
					className: "min-h-20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: available,
					onChange: (e) => setAvailable(e.target.checked),
					className: "size-4 accent-accent"
				}), "Taking books"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: save,
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: remove,
					children: "Remove"
				})]
			})
		]
	});
}
function OfferingForm({ studio, slug, pin, onSaved }) {
	const copy = NICHES[studio.niche];
	const kind = studio.niche === "food_truck" ? "menu" : "service";
	const [title, setTitle] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
	const [durationMin, setDurationMin] = (0, import_react.useState)(studio.niche === "food_truck" ? "15" : "45");
	const [price, setPrice] = (0, import_react.useState)("");
	const [memberId, setMemberId] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function add() {
		setBusy(true);
		try {
			const dollars = Number(price);
			if (!Number.isFinite(dollars)) throw new Error("Enter a price");
			await addOffering({ data: {
				slug,
				pin,
				title,
				description,
				durationMin: Number(durationMin),
				priceCents: Math.round(dollars * 100),
				memberId: memberId ? Number(memberId) : null,
				image,
				kind
			} });
			setTitle("");
			setDescription("");
			setPrice("");
			setImage(null);
			toast.success("Added");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not add");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [studio.offerings.map((offering) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExistingOffering, {
			offering,
			studio,
			slug,
			pin,
			onSaved
		}, offering.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-col gap-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
					children: ["Add ", copy.offeringSingular.toLowerCase()]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					value: title,
					onChange: setTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Description" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: description,
						onChange: (e) => setDescription(e.target.value),
						maxLength: 180,
						className: "min-h-20"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Minutes",
						value: durationMin,
						onChange: setDurationMin
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Price USD",
						value: price,
						onChange: setPrice
					})]
				}),
				studio.team.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Who offers this" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: memberId,
						onChange: (e) => setMemberId(e.target.value),
						className: "h-11 rounded-sm border border-border bg-muted px-3 text-sm text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "The studio"
						}), studio.team.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: member.id,
							children: member.displayName
						}, member.id))]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
					label: "Reference image",
					value: image,
					onChange: setImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: add,
					disabled: busy || title.trim().length < 2,
					children: "Add"
				})
			]
		})]
	});
}
function ExistingOffering({ offering, studio, slug, pin, onSaved }) {
	const [title, setTitle] = (0, import_react.useState)(offering.title);
	const [description, setDescription] = (0, import_react.useState)(offering.description);
	const [durationMin, setDurationMin] = (0, import_react.useState)(String(offering.durationMin));
	const [price, setPrice] = (0, import_react.useState)(String(offering.priceCents / 100));
	const [memberId, setMemberId] = (0, import_react.useState)(offering.memberId ? String(offering.memberId) : "");
	const [image, setImage] = (0, import_react.useState)(offering.image);
	async function save() {
		try {
			await updateOffering({ data: {
				slug,
				pin,
				id: offering.id,
				title,
				description,
				durationMin: Number(durationMin),
				priceCents: Math.round(Number(price) * 100),
				memberId: memberId ? Number(memberId) : null,
				image,
				kind: offering.kind
			} });
			toast.success("Saved");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Save failed");
		}
	}
	async function remove() {
		try {
			await removeOffering({ data: {
				slug,
				pin,
				id: offering.id
			} });
			toast.success("Removed");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Remove failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col gap-3 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-baseline justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: offering.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "tabular-nums text-sm text-muted-foreground",
					children: money(offering.priceCents)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				value: title,
				onChange: setTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: description,
				onChange: (e) => setDescription(e.target.value),
				maxLength: 180,
				className: "min-h-20"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Minutes",
					value: durationMin,
					onChange: setDurationMin
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Price USD",
					value: price,
					onChange: setPrice
				})]
			}),
			studio.team.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
				value: memberId,
				onChange: (e) => setMemberId(e.target.value),
				className: "h-11 rounded-sm border border-border bg-muted px-3 text-sm text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: "",
					children: "The studio"
				}), studio.team.map((member) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
					value: member.id,
					children: member.displayName
				}, member.id))]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
				label: "Reference image",
				value: image,
				onChange: setImage
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: save,
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: remove,
					children: "Remove"
				})]
			})
		]
	});
}
function PlaceForm({ studio, slug, pin, onSaved }) {
	const copy = NICHES[studio.niche];
	const [locationName, setLocationName] = (0, import_react.useState)(studio.locationName);
	const [locationNote, setLocationNote] = (0, import_react.useState)(studio.locationNote);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function save() {
		setBusy(true);
		try {
			await setLocation({ data: {
				slug,
				pin,
				locationName,
				locationNote
			} });
			toast.success("Place posted");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not post");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: studio.niche === "food_truck" ? "Post the lot every morning. The public page updates immediately." : "Where people find you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: copy.locationLabel,
				value: locationName,
				onChange: setLocationName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1.5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Note" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: locationNote,
					onChange: (e) => setLocationNote(e.target.value),
					maxLength: 160,
					className: "min-h-20"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: save,
				disabled: busy,
				children: "Post place"
			})
		]
	});
}
function PostForm({ studio, slug, pin, onSaved }) {
	const [body, setBody] = (0, import_react.useState)("");
	const [image, setImage] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function add() {
		setBusy(true);
		try {
			await addPost({ data: {
				slug,
				pin,
				body,
				image
			} });
			setBody("");
			setImage(null);
			toast.success("Posted");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not post");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "flex flex-col gap-3 p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: body,
					onChange: (e) => setBody(e.target.value),
					placeholder: "What’s on tonight…",
					maxLength: 280
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageField, {
					label: "Image",
					value: image,
					onChange: setImage
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: add,
					disabled: busy || body.trim().length < 2,
					children: "Post"
				})
			]
		}), studio.posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					className: "mt-2 px-0",
					onClick: async () => {
						await removePost({ data: {
							slug,
							pin,
							id: post.id
						} });
						onSaved();
					},
					children: "Remove"
				})
			]
		}, post.id))]
	});
}
function BookingsList({ studio, slug, pin, onSaved }) {
	if (studio.bookings.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "py-8 text-center text-sm text-muted-foreground",
		children: "No books yet. The ring is waiting."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-col gap-3",
		children: studio.bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: booking.guestHandle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [booking.offeringTitle ?? "Held time", booking.memberName ? ` · ${booking.memberName}` : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm tabular-nums",
						children: formatDayTime(booking.slotAt)
					}),
					booking.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-subtle",
						children: booking.note
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs uppercase tracking-widest text-subtle",
						children: booking.code
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: booking.status === "confirmed" ? "ok" : "default",
					children: booking.status
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [booking.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: async () => {
						await setBookingStatus({ data: {
							slug,
							pin,
							id: booking.id,
							status: "confirmed"
						} });
						onSaved();
					},
					children: "Confirm"
				}) : null, booking.status !== "cancelled" && booking.status !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: async () => {
						await setBookingStatus({ data: {
							slug,
							pin,
							id: booking.id,
							status: "cancelled"
						} });
						onSaved();
					},
					children: "Release"
				}) : null]
			})]
		}, booking.id))
	});
}
function ReceiptsPanel({ studio, slug, pin, onSaved }) {
	const [truth, setTruth] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const receipts = studio.receipts ?? [];
	const ledger = studio.ledger ?? [];
	const caught = receipts.filter((r) => r.status === "corrected").length;
	async function teach(fromReceipt) {
		const next = (fromReceipt ? `Never repeat: ${fromReceipt.flags[0]?.detail ?? fromReceipt.draft}` : truth).trim();
		if (next.length < 4) return;
		setBusy(true);
		try {
			await addLedgerTruth({ data: {
				slug,
				pin,
				truth: next
			} });
			setTruth("");
			toast.success("Written to the ledger");
			onSaved();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Could not write");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Every ask is receipted. Axiom checks the book in the background, rewrites anything false, and writes the catch to the ledger. The guest only hears the true line."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs tabular-nums text-subtle",
				children: [
					receipts.length,
					" receipts · ",
					caught,
					" corrected · ",
					ledger.length,
					" ledger lines"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "flex flex-col gap-3 p-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
						children: "Ledger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-subtle",
						children: "Facts Axiom must not contradict. Catches land here on their own. Add more, or remove a line."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: truth,
						onChange: (e) => setTruth(e.target.value),
						maxLength: 180,
						placeholder: "Skin fade is $45. No complimentary extras.",
						className: "min-h-20"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void teach(),
						disabled: busy || truth.trim().length < 4,
						children: "Write truth"
					}),
					ledger.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2 rounded-md border border-border px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: item.truth
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: async () => {
								await removeLedgerTruth({ data: {
									slug,
									pin,
									id: item.id
								} });
								onSaved();
							},
							children: "Remove"
						})]
					}, item.id))
				]
			}),
			receipts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-sm text-muted-foreground",
				children: "No receipts yet. When a guest asks Axiom, the loop lands here."
			}) : receipts.map((receipt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReceiptCard, {
				receipt,
				onTeach: () => void teach(receipt),
				busy
			}, receipt.id))
		]
	});
}
function ReceiptCard({ receipt, onTeach, busy }) {
	const caught = receipt.status === "corrected";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "flex flex-col gap-3 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-subtle",
					children: formatDayTime(receipt.createdAt)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: caught ? "closed" : "ok",
					children: caught ? "Corrected" : "Clean"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Guest asked"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: receipt.question
			})] }),
			caught && receipt.draft && receipt.draft !== receipt.spoken ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Draft caught"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-subtle",
				children: receipt.draft
			})] }) : caught && !receipt.draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-subtle",
				children: "The model was not asked. Axiom answered from the book."
			}) : null,
			receipt.flags.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: receipt.flags.map((flag, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "closed",
					children: FLAG_LABEL[flag.code] ?? flag.code
				}, `${flag.code}-${i}`))
			}) : null,
			receipt.flags[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: receipt.flags[0].detail
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-widest text-muted-foreground",
				children: "Guest heard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm",
				children: receipt.spoken
			})] }),
			caught ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "outline",
				onClick: onTeach,
				disabled: busy,
				children: "Write this catch to the ledger"
			}) : null
		]
	});
}
function Field({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
//#endregion
export { StudioPage as component };
