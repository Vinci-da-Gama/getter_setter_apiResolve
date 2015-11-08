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