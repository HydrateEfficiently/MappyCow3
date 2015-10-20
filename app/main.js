require.config({
	baseUrl: "app",    
	paths: {
		// External libraries
		"angular": "bower_components/angular/angular.min",
		"ngRoute": "bower_components/angular-route/angular-route.min",
		"d3": "bower_components/d3/d3.min",
		"leaflet": "bower_components/leaflet/dist/leaflet",
		"leaflet-locatecontrol": "bower_components/leaflet.locatecontrol/dist/L.Control.Locate.min",
		"leaflet-markercluster": "bower_components/leaflet.markercluster/dist/leaflet.markercluster",

		// Modules
		"Home": "home/home",
		"Services": "services/services",
		"Map": "map/map"
	},
	shim: {
		"angular": {
			exports: "angular"
		},
		"ngRoute": ["angular"],
		"leaflet": {
			exports: "L"
		},
		"leaflet-locatecontrol": {
			deps: ["leaflet"],
			exports: "L.control.locate"
		},
		"leaflet-markercluster": {
			deps: ["leaflet"],
			exports: "L.markerClusterGroup"
		}
	},
	deps: ["app"]
});