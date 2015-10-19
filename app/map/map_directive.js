define([
	// Explicit
	"leaflet",

	// Implicit
	"leaflet-locatecontrol"
],
function (L) {
	var idCounter = 0;
	return function (app) {
		app.directive("map", function() {
			var id = "leaflet_" + idCounter++;
			return {
				restrict: "E",
				replace: true,
				template: "<div id='" + id + "' style='height: 100%'></div>",
				link: function(scope, element, attrs) {
					var map = L.map(id, {
						center: [40, -86],
						zoom: 10
					});

					L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
						attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
						maxZoom: 18,
						id: "michaelfry2002.ciffh9mgk00klsxlxqg3hm7bz",
						accessToken: "pk.eyJ1IjoibWljaGFlbGZyeTIwMDIiLCJhIjoiY2lmZmg5bW9tMDBrb3R0a25sY2hrczhqYyJ9.6gUxriXEPeyvWQbq7znCAg"
					}).addTo(map);

					L.control.locate({ position: "topright" }).addTo(map);

					//add markers dynamically
					var points = [{lat: 40, lng: -86},{lat: 40.1, lng: -86.2}];
					updatePoints(points);

					function updatePoints(pts) {
					   for (var p in pts) {
						  L.marker([pts[p].lat, pts[p].lng]).addTo(map);
					   }
					}

					//add a watch on the scope to update your points.
					// whatever scope property that is passed into
					// the poinsource="" attribute will now update the points
					scope.$watch(attrs.pointsource, function(value) {
					   updatePoints(value);
					});
				}
			};
		});
	};
});