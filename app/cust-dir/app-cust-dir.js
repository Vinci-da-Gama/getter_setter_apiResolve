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