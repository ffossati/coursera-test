(function () {
'use strict';


angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('BasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http','BasePath']
function MenuDataService($http,BasePath) {
  var service = this;
  service.getAllCategories = function () {
    var response = $http({
     method: "GET",
     url: (BasePath + "/categories.json")
   });
   return response;
  };


  service.getItemsForCategory = function (categoryShortName) {
    var response = $http({
      method: "GET",
      url: (BasePath + "/menu_items.json"),
      params: {
        category: categoryShortName
      }
    });
    return response;
  };
}

})();
