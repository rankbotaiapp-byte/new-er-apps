import "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./server-g1HW7csS.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,border-color] duration-quick ease-smooth disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 active:opacity-80 [&_svg]:pointer-events-none [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-accent text-accent-foreground hover:opacity-90",
			secondary: "bg-muted text-foreground border border-border hover:border-foreground/30",
			ghost: "text-foreground hover:bg-muted",
			outline: "border border-border bg-transparent text-foreground hover:bg-muted",
			danger: "bg-danger text-foreground"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
//#endregion
export { Button as t };
