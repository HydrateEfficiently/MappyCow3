define([
	"Services"
],
function () {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope, MapStateService) {
			var filters = this;

			filters.showVegan = true;
			filters.showVegetarian = true;
			filters.showVegOptions = true;
			filters.showStores = true;

			return filters;
		});
	};
});