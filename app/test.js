define([
	"leaflet",

	"leaflet-markercluster"
],
function (L) {

	return function (app) {

	app.factory('MapService', function MapService($window) {
		var localStorage = $window.localStorage || {};
		var service = {
			getView: getView,
			setView: setView,
			mapDefaults: mapDefaults
		};
		return service;
		////////////////////
		function getView() {
			var view = localStorage.mapView;
			if (typeof view != 'undefined') {
				view = $window.JSON.parse(view || '');
				return view;
			} else {
				return {
					lat: 33.7,
					lng: -117.8,
					zoom: 10
				};
			}
		}
		function setView(view) {
			localStorage.mapView = $window.JSON.stringify(view);
		}
		function mapDefaults() {
			return {
				// Default
				center: [33.7, -117.8],
				zoom: 10,
				//layers: layers
				minZoom: undefined,
				maxZoom: undefined,
				maxBounds: undefined,
				dragging: true,
				touchZoom: true,
				scrollWheelZoom: true,
				doubleClickZoom: true,
				boxZoom: true,
				trackResize: true,
				closePopupOnClick: true,
				zoomControl: false,
				attributionControl: false
			};
		}
	})
	.controller('LeafletCtrl', function LeafletCtrl($scope, $attrs, $parse, RecordService, MapService) {
		/* Aliases */
		var vm = this;
		
		/* Expose Controller API to Link Function */
		vm.init = init;
		
		/* Options */
		var options = $parse($attrs.options)($scope) || {map:{}};
		
		var mapOptions = MapService.mapDefaults();

		angular.extend(mapOptions, options.map);
		
		/* Internal Configurations */
		var icons = {};
		var dataModel = {
			data: [],
			markers: []
		};

		var layers = {};
		layers.markers = L.markerClusterGroup();

		/* Watchers */
		$scope.$watch(RecordService.partials, function(newValue, oldValue) {
				var data = newValue || [];
				refreshMarkers(data, dataModel.markers, layers.markers);
		});

		/* Events */
		$scope.$on('$destroy', function() {
			// Consider destroying Controls & layers first...  .removeFrom(vm.map)
			// Consider tearing down event listeners
			vm.map.remove();
		});
		////////////////////
		/**
		 * @function init
		 */
		function init(id) {
			// Get Data
			RecordService.getPartials();

			// Create map
			vm.map = L.map(id, mapOptions);

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 18,
				id: "michaelfry2002.ciffh9mgk00klsxlxqg3hm7bz",
				accessToken: "pk.eyJ1IjoibWljaGFlbGZyeTIwMDIiLCJhIjoiY2lmZmg5bW9tMDBrb3R0a25sY2hrczhqYyJ9.6gUxriXEPeyvWQbq7znCAg"
			}).addTo(vm.map);

			var zoomControl = L.control.zoom().addTo(vm.map);
			var scaleControl = L.control.scale().addTo(vm.map);

			vm.map.on("moveend", function(event) {
				if (!this._loaded) {
					return;
				}
				var view = {
					lat: this.getCenter().lat,
					lng: this.getCenter().lng,
					zoom: this.getZoom()
				};
				MapService.setView(view);
			});
		}

		/**
		 * @function drawMarkers
		 */
		function drawMarkers(markersArray, layer) {
			angular.forEach(markersArray, function(value, key) {
				layer.addLayer(value);
			});
		}
		
		/**
		 * @function eraseMarkers
		 */
		function eraseMarkers(markersArray, layer) {
			angular.forEach(markersArray, function(value, key) {
				layer.removeLayer(v);
			});
		}

		/**
		 * @function createMarkers
		 */
		function createMarkers(data) {
			var arr = [];
			angular.forEach(data, function(value, key) {
				var marker = L.marker(value.geometry.coordinates, {
					title: value.id,
					riseOnHover: true,
					showOnMouseOver: true
				});
				marker.bindPopup('<div>' + value.name + '<div>');
				arr.push(marker);
			});
			return arr;
		}
		
		/**
		 * @function refreshMarkers
		 */
		function refreshMarkers(data, markersArray, layer) {
			if (markersArray.length > 0) {
				eraseMarkers(markersArray, layer);
			}
			markersArray = createMarkers(data);
			drawMarkers(markersArray, layer);
		}
		
	})

	.directive('leaflet', function leaflet() {
		var _id = 'leaflet-' + new Date().getTime();
		return {
			restrict: 'E',
			controller: 'LeafletCtrl',
			template: function(element, attributes) {
				var id = attributes.leaflet || _id;
				return "<div id='" + id + "' style='height: 100%'></div>";
			},
			controllerAs: "vm",
			link: function(scope, element, attributes, controller) {
				var id = attributes.leaflet || _id;
				controller.init(id);
			}
		};
	})

	.factory('RecordService', function RecordService($http) {
		var service = {
			getPartials: getPartials
		};
		return service;
		
		function getPartials() {
			return $http.get('app/partials.json').then(function(value) {
				return value.data.records;
			});
		}
	});
	};

});