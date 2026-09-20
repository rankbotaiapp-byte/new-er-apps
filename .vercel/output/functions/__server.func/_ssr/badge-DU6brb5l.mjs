import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as cn } from "./server-g1HW7csS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DU6brb5l.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "default", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium", tone === "default" && "border-border text-muted-foreground", tone === "live" && "border-foreground/20 text-foreground", tone === "closed" && "border-border text-subtle", tone === "ok" && "border-success/40 text-success", className),
		...props
	});
}
//#endregion
export { Badge as t };
