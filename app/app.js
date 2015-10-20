define([
	// Explicit
	"angular",
	"home/config",

	// Implicit
	"ngRoute"],

function (angular, homeConfig) {
	var app = angular.module("MappyCow", ["ngRoute"]);

	app.config(function ($routeProvider) {
		applyModuleConfig(homeConfig, $routeProvider);
		$routeProvider.otherwise({redirectTo: "/home"});
	});

	function applyModuleConfig(config, $routeProvider) {
		$routeProvider.when(config.path, {
			templateUrl: config.templateUrl,
			controller: config.controller,
			controllerAs: config.controllerAs
		});
	}

	require(["Home", "Services", "Map"], function () {
		angular.bootstrap(document, ['MappyCow']);
	});

	return app;
});