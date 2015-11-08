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