//#region node_modules/.nitro/vite/services/ssr/assets/niches-LEjJK8qY.js
var NICHES = {
	barber: {
		label: "Barber",
		teamLabel: "Barbers",
		offeringLabel: "Services",
		offeringSingular: "Service",
		bookLabel: "Book a chair",
		locationLabel: "Shop",
		halo: "ember"
	},
	tattoo: {
		label: "Tattoo",
		teamLabel: "Artists",
		offeringLabel: "Work",
		offeringSingular: "Session",
		bookLabel: "Book a session",
		locationLabel: "Studio",
		halo: "ink"
	},
	food_truck: {
		label: "Food",
		teamLabel: "Kitchen",
		offeringLabel: "Menu",
		offeringSingular: "Plate",
		bookLabel: "Reserve a pickup",
		locationLabel: "Today's lot",
		halo: "solstice"
	}
};
var NICHE_LIST = [
	"barber",
	"tattoo",
	"food_truck"
];
function isNiche(value) {
	return value === "barber" || value === "tattoo" || value === "food_truck";
}
//#endregion
export { NICHE_LIST as n, isNiche as r, NICHES as t };
