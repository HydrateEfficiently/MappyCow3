define([
	"app",
	"services/mapStateService",
	"services/outletService",
	"services/locationService"
],
function (app, mapStateService, outletService, locationService) {
	mapStateService(app);
	outletService(app);
	locationService(app);
});