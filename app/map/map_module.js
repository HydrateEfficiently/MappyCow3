define([
	"map/map_directive"
],
function (mapDirective) {
	return function (app) {
		mapDirective(app);
	};
});