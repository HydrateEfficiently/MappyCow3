define([
	// Explicit
	"angular",
	"home/home_module",
	"map/map_module",

	// Implicit
	"ngRoute"],

function (angular, homeModule, mapModule) {

	var app = angular.module("MappyCow", ["ngRoute"]);
	var homeRoute = homeModule(app);
	mapModule(app);

	app.config(function ($routeProvider) {
		$routeProvider.when(homeRoute.path, homeRoute.route);
		$routeProvider.otherwise({redirectTo: "/home"});
	});

	return angular.bootstrap(document, ['MappyCow']);
});