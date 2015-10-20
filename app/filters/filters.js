define([
	"app",
	"filters/config",
	"filters/filtersCtrl"
],
function (app, config, controller) {
	controller(app, config.controller);
});