define([
	"app",
	"home/config",
	"home/homeCtrl"
],
function (app, config, controller) {
	controller(app, config.controller);
});