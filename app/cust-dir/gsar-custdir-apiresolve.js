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