define([
	// Explicit
	"map/leaflet/leafletMap",

	// Implicit
	"Services"
],
function (LeafletMap) {
	var idCounter = 0;
	return function (app) {
		app.directive("map", function (OutletService, MapStateService, LocationService) {
			var id = "leaflet_" + idCounter++;
			return {
				restrict: "E",
				replace: true,
				template: "<div id='" + id + "' style='height: 100%'></div>",
				link: function(scope, element, attrs) {
					var map = new LeafletMap(id, MapStateService);

					map.findLocation(function (locationEvent) {
						LocationService.locationFound(locationEvent.latlng.lat, locationEvent.latlng.lng);
					});

					scope.$on("outletsFound", function () {
						map.updateOutlets(OutletService.outlets);
					});
				}
			};
		});
	};
});