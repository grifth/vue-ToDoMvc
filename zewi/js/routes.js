/*global app, Router */

(function (app, Router) {

	'use strict';

	var router = new Router();

	['all', 'active', 'completed'].forEach(function (vbl) {
		router.on(vbl, function () {
			app.vbl = vbl;
			console.log(app.vbl);
			
		});
	});

	router.configure({
		notfound: function () {
			window.location.hash = '';
			app.vbl = 'all';
		}
	});

	router.init();

})(app, Router);
