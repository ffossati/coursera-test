(function () {
  "use strict";

  angular.module('common')
  .service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http', 'ApiPath'];
function RegistrationService($http,ApiPath) {
  var service = this;


  service.getCategory = function (category) {
    var config = {};
    return $http.get(ApiPath + '/menu_items/'+category+".json").then(function (response) {
      return response.data;
    }).catch(function (error) {
        return [];
      })
  };


  service.getUserInfo = function () {
    return service.user;
  }
}





})();
