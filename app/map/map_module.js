define([
	"map/mapState_service",
	"map/map_directive"
],
function (mapStateService, mapDirective) {
	return function (app) {
		mapStateService(app);
		mapDirective(app);
	};
});