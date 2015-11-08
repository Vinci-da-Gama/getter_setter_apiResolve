(function () {

	var anguNg = ['ngAria', 'ngSanitize', 'ngAnimate', 'ngMessages', 'ngNotify', 'ngTable'];
	var anguEx = ['ui.bootstrap', 'mgcrea.ngStrap', 'angularMoment', 'bootstrapLightbox'];
	var routerCtrl = ['gsar.router', 'gsar.ctrl'];
	var cons = ['gsar.constant', 'gsar.apiresolve.constant'];
	var serv = ['gsar.sig.service', 'gsar.service', 'gsar.gsservice', 'gsar.usercounter.service', 'gsar.companyapi.service', 
	'gsar.inforRequest.service'];
	var dir = ['gsar.dir', 'gsar.cust.dir', 'gsar.custdir.apiresolve'];

	var depedencyArr = anguNg.concat(routerCtrl, anguEx, cons, serv, dir);
	/**
	* gsar Module
	*
	* The main module of this application...
	*/
	angular.module('gsar', depedencyArr);

	angular.module('gsar.router', ['ui.router']);
	angular.module('gsar.constant', []);
	angular.module('gsar.apiresolve.constant', []);
	angular.module('gsar.sig.service', []);
	angular.module('gsar.service', []);
	angular.module('gsar.usercounter.service', []);
	angular.module('gsar.companyapi.service', []);
	angular.module('gsar.inforRequest.service', []);
	angular.module('gsar.gsservice', []);
	angular.module('gsar.ctrl', []);
	angular.module('gsar.dir', ['gsar.service', 'gsar.sig.service']);
	angular.module('gsar.cust.dir', ['gsar.service', 'gsar.sig.service']);
	angular.module('gsar.custdir.apiresolve', ['gsar.service', 'gsar.usercounter.service', 'gsar.companyapi.service', 'gsar.inforRequest.service']);

})();