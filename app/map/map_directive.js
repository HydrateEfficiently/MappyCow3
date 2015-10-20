define([
	// Explicit
	"map/leaflet/leafletMap",

	// Implicit
	"outlet_service"
],
function (LeafletMap) {
	var idCounter = 0;
	return function (app) {
		app.directive("map", function (OutletService) {
			var id = "leaflet_" + idCounter++;
			return {
				restrict: "E",
				replace: true,
				template: "<div id='" + id + "' style='height: 100%'></div>",
				link: function(scope, element, attrs) {
					var map = new LeafletMap(id);

					scope.$on("outletsFound", function () {
						map.updateOutlets(OutletService.outlets);
					});
				}
			};
		});
	};
});