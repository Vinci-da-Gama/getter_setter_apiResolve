(function () {

	var anguNg = ['ngAria', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngNotify', 'ngTable'];
	var anguEx = ['ui.bootstrap', 'mgcrea.ngStrap', 'angularMoment', 'bootstrapLightbox'];
	var routerCtrl = ['gsar.router', 'gsar.ctrl'];
	var cons = ['gsar.constant'];
	var serv = ['gsar.sig.service', 'gsar.service', 'gsar.gsservice'];
	var dir = ['gsar.dir', 'gsar.cust.dir'];

	var depedencyArr = anguNg.concat(routerCtrl, anguEx, cons, serv, dir);
	/**
	* gsar Module
	*
	* The main module of this application...
	*/
	angular.module('gsar', depedencyArr);

	angular.module('gsar.router', ['ui.router']);
	angular.module('gsar.constant', []);
	angular.module('gsar.sig.service', []);
	angular.module('gsar.service', []);
	angular.module('gsar.gsservice', []);
	angular.module('gsar.ctrl', []);
	angular.module('gsar.dir', ['gsar.service', 'gsar.sig.service']);
	angular.module('gsar.cust.dir', ['gsar.service', 'gsar.sig.service']);

})();