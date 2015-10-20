define([
	// Explicit
	"filters/filterParameters",

	// Implicit
	"Services"
],
function (FilterParameters) {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope, OutletFilterService) {
			var filters = this;

			filters.filterParameters = new FilterParameters();

			filters.applyFilters = function () {
				OutletFilterService.filterOutlets(filters.filterParameters);
			};

			return filters;
		});
	};
});