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










