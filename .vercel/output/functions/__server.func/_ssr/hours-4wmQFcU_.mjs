//#region node_modules/.nitro/vite/services/ssr/assets/hours-4wmQFcU_.js
var DEFAULT_HOURS = {
	tz: "America/Los_Angeles",
	days: {
		sun: null,
		mon: "10:00-18:00",
		tue: "10:00-18:00",
		wed: "10:00-18:00",
		thu: "10:00-18:00",
		fri: "10:00-18:00",
		sat: "10:00-16:00"
	}
};
var FOOD_HOURS = {
	tz: "America/Los_Angeles",
	days: {
		sun: "11:00-20:00",
		mon: "11:00-20:00",
		tue: "11:00-20:00",
		wed: "11:00-20:00",
		thu: "11:00-20:00",
		fri: "11:00-21:00",
		sat: "11:00-21:00"
	}
};
var WEEKDAYS = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thu",
	"fri",
	"sat"
];
function parseHours(json) {
	try {
		const parsed = JSON.parse(json);
		if (!parsed?.days) return DEFAULT_HOURS;
		return parsed;
	} catch {
		return DEFAULT_HOURS;
	}
}
function isOpenAt(hours, date) {
	const parts = new Intl.DateTimeFormat("en-US", {
		timeZone: hours.tz || "America/Los_Angeles",
		weekday: "short",
		hour: "2-digit",
		minute: "2-digit",
		hourCycle: "h23"
	}).formatToParts(date);
	const key = (parts.find((p) => p.type === "weekday")?.value ?? "Sun").slice(0, 3).toLowerCase();
	const window = hours.days[key] ?? null;
	if (!window) return false;
	const hour = parts.find((p) => p.type === "hour")?.value ?? "00";
	const minute = parts.find((p) => p.type === "minute")?.value ?? "00";
	const now = `${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`;
	const [start, end] = window.split("-");
	if (!start || !end) return false;
	return now >= start && now < end;
}
function hoursLabel(hours) {
	const openDays = WEEKDAYS.filter((d) => hours.days[d]);
	if (openDays.length === 0) return "Hours on request";
	const first = hours.days[openDays[0]];
	return first ? `In-person ${first}` : "Hours on request";
}
//#endregion
export { parseHours as a, isOpenAt as i, FOOD_HOURS as n, hoursLabel as r, DEFAULT_HOURS as t };
