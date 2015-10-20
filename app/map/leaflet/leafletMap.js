define([
	// Explicit
	"leaflet",
	"map/leaflet/outletMarkerLayer",

	// Implicit
	"leaflet-locatecontrol"
],
function (L, OutletMarkerLayer) {

	function LeafletMap(elementId, MapStateService) {
		var map = this._innerMap = L.map(elementId, {
			center: MapStateService.center,
			zoom: 10
		});

		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
			maxZoom: 18,
			id: "michaelfry2002.ciffh9mgk00klsxlxqg3hm7bz",
			accessToken: "pk.eyJ1IjoibWljaGFlbGZyeTIwMDIiLCJhIjoiY2lmZmg5bW9tMDBrb3R0a25sY2hrczhqYyJ9.6gUxriXEPeyvWQbq7znCAg"
		}).addTo(map);

		L.control.locate({ position: "topright" }).addTo(map);

		this._outletMarkerLayer = new OutletMarkerLayer();
		map.addLayer(this._outletMarkerLayer);

		map.on("moveend", function (ev) {
			var latLng = map.getCenter();
			MapStateService.setCenter(latLng.lat, latLng.lng);
		});
	}

	LeafletMap.prototype.updateOutlets = function (outletsGeoJson) {
		this._outletMarkerLayer.setData(outletsGeoJson);
		this._innerMap.fitBounds(this._outletMarkerLayer.getBounds());
		console.log(outletsGeoJson);
	};

	return LeafletMap;
});