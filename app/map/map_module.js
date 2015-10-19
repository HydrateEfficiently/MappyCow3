define([
	"map/map_ctrl",
	"map/map_directive"
],
function (mapController, mapDirective) {
	return function (app) {
		mapController(app);
		mapDirective(app);
	};
});