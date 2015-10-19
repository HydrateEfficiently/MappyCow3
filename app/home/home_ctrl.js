define(function (require) {
	return function (app, controllerName) {
		app.controller(controllerName, function ($scope) {
			$scope.name = "test";
		});
	};
});