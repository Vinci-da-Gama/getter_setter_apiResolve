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
					controller: 'p2Ctrl',
					// resolve must in main View and Still need to put to partialView
					resolve: {
						CompanyList: ['CompanyAPI', function (CompanyAPI) {
							return CompanyAPI.contentQuery(10, 1);
						}]
					}
				},
				'p2Left@p2': {
					templateUrl: './templates/partials/p2/p2Left.html',
					controller: 'p2LeftCtrl'
				},
				'p2Right@p2': {
					templateUrl: './templates/partials/p2/p2Right.html',
					controller: 'p2Ctrl',
					// resolve Still need to put to partialView, beacuse they share same controller.
					resolve: {
						CompanyList: ['CompanyAPI', function (CompanyAPI) {
							return CompanyAPI.contentQuery(10, 1);
						}]
					}
				}
			}
		});

	}]);

})();
(function () {
	var arcM = angular.module('gsar.apiresolve.constant');

	arcM.constant('apiURL', 'http://api.demo.muulla.com/cms/merchant/all/active/');

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
		$scope.p1leftModalTitle = "May_Day in page 1 right...";
		$scope.p1leftModalContent = "Content modal wocao in page 1 right...";
		
		$scope.sayHiInCurrentLevel = function (p1RightModalPassedIn) {
			alert('p1-Right-Modal-Passed-In --> '+p1RightModalPassedIn);
			console.log('p1-Right-Modal-Passed-In --> '+p1RightModalPassedIn);
		};
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
		$scope.modalTitle = "Modat_Great_Title";
		$scope.textModal = "Modat_callback-alert-function...May_Day.May_Day.";
		$scope.sayHelloLocalLevel = function (p2leftCtrlTitle) {
			alert('p2LeftCtrl modal Title - is -> '+p2leftCtrlTitle);
			console.log('p2LeftCtrl modal Title - is -> '+p2leftCtrlTitle);
		};
	}]);

	ctrlM.controller('p2Ctrl', ['$scope', 'CompanyList', function($scope, CompanyList){
		console.log('p2Ctrl...');

		// pass value to directive
		$scope.companyAllInP2Ctrl = CompanyList.data;
		$scope.pageAllInP2Ctrl = CompanyList.pagination;

		console.log('$scope.companyAllInP2Ctrl --> ', $scope.companyAllInP2Ctrl);
		console.log('$scope.pageAllInP2Ctrl --> ', $scope.pageAllInP2Ctrl);

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

	cdM.directive('p1rightModal', ['$uibModal', function($uibModal){
		return {
			scope: {
				'modalTitle': '@',
				'modalContent': '@',
				'callbackfunction': '&'
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				iElm.bind('click', function() {
					$scope.curModalTitle = $scope.modalTitle;
					$scope.curModalText = $scope.modalContent;

					var modalObj = {
						scope: $scope,
						templateUrl: './templates/partials/p1/p1right-modal.html',
						size: 'md'
					};

					$scope.modalInstance = $uibModal.open(modalObj);
					$scope.modalInstance.result.then($scope.callbackfunction);

				});

				$scope.save = function (saveItem) {
					alert('p1 right modal value -> '+saveItem);
					console.log('p1 right modal value -> '+saveItem);
					$scope.modalInstance.close();
				};

				$scope.close = function (saveItem) {
					$scope.modalInstance.dismiss('cancel');
				};
			}
		};
	}]);

	cdM.directive('p2leftModal', ['$uibModal', function($uibModal){
		return {
			scope: {
				// 'callback': '&',
				'modalTitle': '@',
				'modalText': '@',
				'callbackfunction': '&'
			}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude, $uibModal) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: './templates/partials/p2/p2Left-modal.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, ctrl) {
				iElm.bind('click', function() {
					var modalObj = {
						scope: $scope,
						templateUrl: './templates/partials/p2/p2Left-modal.html',
						size: 'md'
					};

					$scope.modalInstance = $uibModal.open(modalObj);
					$scope.modalInstance.result.then($scope.callbackfunction);
					$scope.currentModalTitle = $scope.modalTitle;
					$scope.currentModalText = $scope.modalText;

				});

				$scope.save = function (maydayTitle) {
					alert('inside modal - Title is -> '+maydayTitle);
					console.log('inside modal - Title is -> '+maydayTitle);
					$scope.modalInstance.close();
				};

				$scope.close = function (maydayTitle) {
					$scope.modalInstance.dismiss('cancel');
				};

			}
		};
	}]);

})();
(function () {
	var arM = angular.module('gsar.custdir.apiresolve');

	arM.directive('paginationResolve', [function(){
		return {
			scope: {
				'resolveValue': '=',
				'resolvePagination': '='
			}, // {} = isolate, true = child, false/undefined = no change
			// CompanyList,
			controller: function($scope, $element, $attrs, $transclude, CompanyAPI, $timeout) {
				$scope.companyAll = $scope.resolveValue;
				$scope.pageAll = $scope.resolvePagination;

				console.log('$scope.companyAll --> ', $scope.companyAll);
				console.log('$scope.pageAll --> ', $scope.pageAll);

				// This is for displaying...
				$scope.setPerPage = function (itemEachPage) {
					var iep = parseInt(itemEachPage);
					$scope.pageAll.page_size = iep;
					$scope.pageAll.page_number = 1;
				};

				$scope.$watch('pageAll', function (nv, ov) {
					if (nv !== ov) {
						var howManyItemsPerPage = $scope.pageAll.page_size;
						var howManyPagesWouldBeTurnedEachTime = $scope.pageAll.page_number;
						CompanyAPI.contentQuery(howManyItemsPerPage, howManyPagesWouldBeTurnedEachTime)
						.then(function (res) {
							$scope.companyAll = res.data;
						});
					} else{
						console.log('pagination doesn\'t change.');
					}
				}, true);

				$scope.reformatAddress = function (companyAddress) {
					var addr = [];

					// these expressions are correct, but jshint prefer function...
					companyAddress.address1 ? addr.push(companyAddress.address1) : null;
					companyAddress.address2 ? addr.push(companyAddress.address2) : null;
					companyAddress.suburb ? addr.push(companyAddress.suburb) : null;
					companyAddress.state ? addr.push(companyAddress.state.split('-')[1]) : null;
					companyAddress.country ? addr.push(companyAddress.country) : null;
					companyAddress.postcode ? addr.push(companyAddress.postcode) : null;

					return addr.join(', ');
				};
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p2/p2Right/pagination-resolve.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	}]);

	arM.directive('spinnerLoader', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude, countLoad) {
				$scope.loadCountFunc = countLoad.getCounter;
				console.log('$scope.loadCountFunc --> ', $scope.loadCountFunc());
				$scope.counterNum = countLoad.getCounter();
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './templates/partials/p2/p2Right/spinner-loader.html',
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
(function () {
	var capiM = angular.module('gsar.companyapi.service');

	capiM.service('CompanyAPI', ['userInfor', 'apiURL', 'inforInquiry', function(userInfor, apiURL, inforInquiry){
		this.contentQuery = function (HowManyItemsEachPage, HowManyPagesWouldBeTurnedEachTime) {
			var authorizedUser = userInfor.getUser();
			var headerLocal = {
				Authorization: authorizedUser.name+' '+authorizedUser.token
			};
			var cpyURL = apiURL+HowManyItemsEachPage+'/'+HowManyPagesWouldBeTurnedEachTime;
			// don't forget return this function
			return inforInquiry.$get(cpyURL, headerLocal);
		};
	}]);

})();
(function () {
	var irM = angular.module('gsar.inforRequest.service');

	irM.service('inforInquiry', ['$q', '$http', 'countLoad', function($q, $http, countLoad){
		this.$get = function (url, header) {
			var _def = $q.defer();
			var httpObj = {
				url: url,
				headers: header,
				method: 'GET'
			};

			countLoad.increaseLoadCount();

			$http(httpObj)
			.success(function (res) {
				// after error, don't forget success...
				countLoad.decreaseLoadCount();
				_def.resolve(res);
			})
			.error(function(msg, config, status) {
				countLoad.decreaseLoadCount();
				_def.reject(msg);
				console.log('error msg is: '+msg+' Error status: '+status+' The Config:--> '+ config);
			});

			// return promise, not promise function (promise())
			return _def.promise;
			// return _def.promise();
		};

	}]);

})();
(function () {
	var ucsM = angular.module('gsar.usercounter.service');

	ucsM.service('countLoad', [function(){
		var loadCount = 0;

		this.getCounter = function () {
			return loadCount;
		};

		this.increaseLoadCount = function () {
			return ++loadCount;
		};

		this.decreaseLoadCount = function () {
			return --loadCount;
		};

	}]);

	ucsM.service('userInfor', [function(){
		var name = 'Bearer';
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NGQxOTY4MGI1MWMxNTI2MGI5NDRmZDUiLCJpc3N1ZV9kYXRlIjoiMjAxNS0wOS0wOVQwNToxMzo1My40NThaIn0.Hk2XypA_KMUnIKdSVYnwq3Rn3QyMNSQ-e80-sZsA9bY';
		
		this.getUser = function () {
			return {
				name: name,
				token: token
			};
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