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