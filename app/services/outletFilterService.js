define([
	// Explicit
	"app",
	"angular",
	"lodash",

	// Implicit
	"services/outletRequestService"
],
function (app, angular, _) {

	function filterFunction(filterParams, outlet) {
		switch (outlet.properties.outletType.id) {
			case 1: 
				if (!filterParams.stores) {
					return false;
				}
				break;
			case 2: 
				if (!filterParams.vegetarian) {
					return false;
				}
				break;
			case 3: 
				if (!filterParams.vegan) {
					return false;
				}
				break;
			case 4: 
				if (!filterParams.vegFriendly) {
					return false;
				}
				break;
		}
		return true;
	}

	app.factory("OutletFilterService", function (OutletRequestService) {
		var outletFilterService = {},
			onOutletsFilteredCallbacks = [];

		outletFilterService.filterOutlets = function (filterParams) {
			var outlets = OutletRequestService.outlets,
				filteredOutletFeatures = _.filter(outlets.features, function (outlet) { return filterFunction(filterParams, outlet); }),
				filteredFeatureCollection = { type: "FeatureCollection", features: filteredOutletFeatures };

			angular.forEach(onOutletsFilteredCallbacks, function (callback) {
				callback(filteredFeatureCollection);
			});
		};

		outletFilterService.onOutletsFiltered = function (callback) {
			onOutletsFilteredCallbacks.push(callback);
		};

		return outletFilterService;
	});
});