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