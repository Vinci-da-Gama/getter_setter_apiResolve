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
(function () {
	var rM = angular.module('gsar.router');

	rM.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('p1', {
			url: '/',
			views: {
				'': {
					templateUrl: './templates/p1.html',
					controller: 'p1Ctrl'
				},
				'p1Left@p1': {
					templateUrl: './templates/partials/p1/p1Left.html',
					controller: 'p1Ctrl'
				},
				'p1Right@p1': {
					templateUrl: './templates/partials/p1/p1Right.html',
					controller: 'p1RightCtrl'
				}
			}
		})
		.state('p2', {
			url: '/p2',
			views: {
				'': {
					templateUrl: './templates/p2.html',
					controller: 'p2Ctrl'
				},
				'p2Left@p2': {
					templateUrl: './templates/partials/p2/p2Left.html',
					controller: 'p2LeftCtrl'
				},
				'p2Right@p2': {
					templateUrl: './templates/partials/p2/p2Right.html',
					controller: 'p2Ctrl'
				}
			}
		});

	}]);

})();
(function () {
	var cosM = angular.module('gsar.constant');

	cosM.constant('SIGN', {
		tq: String.fromCharCode(9775)
	});

})();
(function () {
	var ctrlM = angular.module('gsar.ctrl');

	ctrlM.controller('p1Ctrl', ['$scope', function($scope){
		console.log('p1Ctrl...');
		$scope.$on('emitSelf', function (event, args) {
			$scope.receiveEmitValue = args;
			console.log('event --> ', event);
			console.log('args --> ', args);
			$scope.anotherTabBindTheEmitReceiveValue = angular.copy($scope.receiveEmitValue);
		});

		$scope.$on('emitDirSelf', function (event, args) {
			$scope.receiveSimpleDirEmitValue = args;
			$scope.lastTabBindTheEmitReceiveValue = angular.copy($scope.receiveSimpleDirEmitValue);
		});

		$scope.tabNgInclude = [
			{title: "$event", content: "what is $event...", url: "./templates/partials/p1/p1_event.html"},
			{title: "one-way-Binding", content: "one-way-Binding", url: "./templates/partials/p1/p1_oneway_bind.html"},
			{title: "one-way-Binding_Benefit", content: "one-way-Binding_Benefit...", url:"./templates/partials/p1/p1_benefit_oneway_bine.html"}
		];

		$scope.triggerNgIncludeFunc = function (event) {
			console.log('the Event is: -- ', event);
		};



	}]);

	ctrlM.controller('p1RightCtrl', ['$scope', function($scope){
		console.log('this is p1RightCtrl...');
	}]);

	ctrlM.controller('p1EventCtrl', ['$scope', function($scope){
		console.log('this is p1EventCtrl...');
		$scope.displayClickEvent = function (event) {
			$scope.eventSelf = event;
			$scope.isTrust = event.originalEvent.isTrusted;
		};
	}]);

	ctrlM.controller('simpleOneWayBingCtrl', ['$scope', function($scope){
		console.log('this is simpleOneWayBingCtrl...');
		var nameFour = ['nameOne', 'nameTwo', 'nameThree', 'nameFour'];
		var counter = 0;
		$scope.triggerOneTwoWayBinging = function () {
			var idx = counter % nameFour.length;
			$scope.nameHere = nameFour[idx];
			counter++;
		};
	}]);

	ctrlM.controller('p2LeftCtrl', ['$scope', function($scope){
		console.log('p2LeftCtrl...');
	}]);

	ctrlM.controller('p2Ctrl', ['$scope', function($scope){
		console.log('p2Ctrl...');
	}]);

})();





















(function () {
	var cdM = angular.module('gsar.cust.dir');

	cdM.directive('p1leftSetterData', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude, verifyNumStrObjArrUndefinedElem, getterSetterService) {
				$scope.checkValueAndSetValueToService = function ($event) {
					// console.log('$event--> ', $event);
					var keyCode = $event.keyCode;
					if (keyCode === 13) {
						checkValue ();
					} else{
						console.log('not enter...');
					}
				};

				function checkValue () {
					var inputBool = verifyNumStrObjArrUndefinedElem.IsUndefined($scope.p1leftTabInput);
					if (inputBool) {
						getterSetterService.setterTarget($scope.p1leftTabInput);
					} else{
						console.log('It is undefined');
					}
				}
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p1/p1left-setter-data.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);

	cdM.directive('p1leftEmitSetterConstruct', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude) {
				$scope.emitCustValue = function (kc) {
					if (kc === 13) {
						// console.log('$scope.custEmitVal --> '+$scope.custEmitVal);
						$scope.$emit('emitSelf', $scope.custEmitVal);
					}
				};
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p1/p1left-emit-setter-construct.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);

})();
(function () {
	var dM = angular.module('gsar.dir');

	dM.directive('p1rightReceiveData', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude, getterSetterService) {
				$scope.$on('broadcastName', function () {
					$scope.receiveData = getterSetterService.getterTarget();
				});
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p1/p1right-receive-data.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);

	dM.directive('p1leftEmitSetterDire', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude) {
				$scope.EmitDirValue = function (kc) {
					if (kc === 13) {
						$scope.$emit('emitDirSelf', $scope.emitDirVal);
					}
				};
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p1/p1left-emit-setter-dire.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);

})();
// service js Document
// $log.log("sigSrevice error line -- 15 --- data : "+data+" config: "+config+" status: "+status+".---");
(function () {
	var sM = angular.module('gsar.service');

	sM.service('verifyNumStrObjArrUndefinedElem', ['$log', function($log){
		
		this.IsNumberAndGreaterThanZero = function (figure) {
			var numBool = angular.isNumber(figure) && !isNaN(figure) && figure > 0;
			return numBool;
		};

		this.IsNumberAndGreaterThanWhileEqualZero = function (figure) {
			var numBool = angular.isNumber(figure) && !isNaN(figure) && figure >= 0;
			return numBool;
		};

		this.IsStringAndNotNull = function (str) {
			var strBool = angular.isString(str) && str.length > 0 && str !== null && str !== '';
			return strBool;
		};

		this.IsUndefined = function (testimony) {
			var refBool = !angular.isUndefined(testimony) && testimony !== null;
			return refBool;
		};

		this.IsJqOrDomElem = function (jqdomElem) {
			var argBool = angular.isElement(jqdomElem) && typeof(jqdomElem) !== 'undefined';
			return argBool;
		};

		this.IsObjAndNotEmpty = function (obj) {
			var objBool = angular.isObject(obj) && Object.keys(obj).length > 0 && typeof(obj) !== 'undefined';
			return objBool;
		};

		this.IsArrayAndNotUnfilled = function (arr) {
			var arrBool = angular.isArray(arr) && arr.length > 0 && typeof(arr) !== 'undefined';
			return arrBool;
		};

	}]);

})();
(function () {
	var gsM = angular.module('gsar.gsservice');

	gsM.service('getterSetterService', ['$log', '$rootScope', 
		function($log, $rootScope){

		var targetValue = null;

		this.setterTarget = function (prepareToBeAssignedValue) {
			targetValue = angular.copy(prepareToBeAssignedValue);
			console.log('targetValue --> '+prepareToBeAssignedValue);
			$rootScope.$broadcast('broadcastName', targetValue);
		};
		// console.log('outside --:-- the targetValue is -> '+targetValue);

		this.getterTarget = function () {
			var passToOtherDirectiveValue = angular.copy(targetValue);
			return passToOtherDirectiveValue;
		};

	}]);

})();
// service js Document
// $log.log("sigSrevice error line -- 14 --- data : "+data+" config: "+config+" status: "+status+".---");
/*sigM.service('inquireInfo', ['$http', '$log', 'appnameDb', function($http, $log, appnameDb){
	var dbPath = appnameDb.dbDot+appnameDb.delimiter+appnameDb.dbPrefix+appnameDb.delimiter+appnameDb.dbName+appnameDb.dbExtension;

	this.obtainDossier = function (func) {
		$http.get(dbPath)
		.then(function (testimony) {
			func(testimony.data);
			$log.log('get data successfully. '+dbPath);
		})
		.catch(function (data, config, status) {
			$log.log("sigSrevice error line -- 16 -\&\#1046\;- data : "+data+" config: "+config+" status: "+status+".---");
		})
		.finally(function () {
			$log.log('sigSrevice line 19, finally method.');
		});
	};

}]);*/
(function () {
	var ssM = angular.module('gsar.sig.service');

	// ssM

})();
// jQuery Js Document
$(document).ready(function() {
});