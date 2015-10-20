define([
	// Explicit
	"map/leaflet/leafletMap",

	// Implicit
	"outlet_service",
	"map/mapState_service"
],
function (LeafletMap) {
	var idCounter = 0;
	return function (app) {
		app.directive("map", function (OutletService, MapStateService) {
			var id = "leaflet_" + idCounter++;
			return {
				restrict: "E",
				replace: true,
				template: "<div id='" + id + "' style='height: 100%'></div>",
				link: function(scope, element, attrs) {
					var map = new LeafletMap(id, MapStateService);

					scope.$on("outletsFound", function () {
						map.updateOutlets(OutletService.outlets);
					});
				}
			};
		});
	};
});