define([
	"app",
	"services/mapStateService",
	"services/outletService"
],
function (app, mapStateService, outletService) {
	mapStateService(app);
	outletService(app);
});