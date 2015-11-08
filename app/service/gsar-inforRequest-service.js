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