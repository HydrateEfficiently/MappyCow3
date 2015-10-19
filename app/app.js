define([
	// Explicit
	"angular",
	"home/home_module",
	"map/map_module",
	"outlet_service",

	// Implicit
	"ngRoute"],

function (angular, homeModule, mapModule, outletService) {

	var app = angular.module("MappyCow", ["ngRoute"]);
	var homeRoute = homeModule(app);
	mapModule(app);

	outletService(app);

	app.config(function ($routeProvider) {
		$routeProvider.when(homeRoute.path, homeRoute.route);
		$routeProvider.otherwise({redirectTo: "/home"});
	});

	return angular.bootstrap(document, ['MappyCow']);
});