define([
	// Explicit
	"angular",
	"home/config",
	"filters/config",

	// Implicit
	"ngRoute"],

function (angular, homeConfig, filtersConfig) {
	var app = angular.module("MappyCow", ["ngRoute"]);

	app.config(function ($routeProvider) {
		applyModuleConfig(homeConfig, $routeProvider);
		applyModuleConfig(filtersConfig, $routeProvider);
		$routeProvider.otherwise({redirectTo: "/home"});
	});

	function applyModuleConfig(config, $routeProvider) {
		$routeProvider.when(config.path, {
			templateUrl: config.templateUrl,
			controller: config.controller,
			controllerAs: config.controllerAs
		});
	}

	require(["Home", "Services", "Map", "Filters"], function () {
		require(["appCtrl"], function () {
			angular.bootstrap(document, ['MappyCow']);
		});
	});

	return app;
});