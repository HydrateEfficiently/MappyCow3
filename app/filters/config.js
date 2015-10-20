define([
	"require"
],
function (require) {
	return {
		path: "/filters",
		templateUrl: require.toUrl("filters/filters.html"),
		controller: "FiltersController",
		controllerAs: "filters"
	};
});