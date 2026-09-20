import "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./server-g1HW7csS.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-md border border-border bg-muted px-3 py-3 text-sm text-foreground placeholder:text-subtle outline-none transition-[border-color,box-shadow] duration-quick ease-smooth focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 disabled:opacity-40", className),
		...props
	});
}
//#endregion
export { Textarea as t };
