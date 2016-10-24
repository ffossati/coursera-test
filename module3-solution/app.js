(function () {
  'use strict';
angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController )
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('RestBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&',
      onError: '='
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject=['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.itemDesc = "";
  narrow.onError=false;
  narrow.title = "Narrow Down Your Chinese Menu Choice";
  narrow.getMatchedMenuItems= function () {
    narrow.found = [];
    narrow.onError=false;
    if(narrow.itemDesc != ""){
      var promise = MenuSearchService.getMatchedMenuItems(narrow.itemDesc);
      promise.then(function (response) {
        narrow.found = response;
        if(narrow.found.length==0){
          narrow.onError=true;
        }else{
          narrow.onError=false;
        }
      })
    }else{
      narrow.found = [];
      narrow.onError=true;
    }
};
  narrow.removeItem = function (itemIndex) {
  MenuSearchService.removeItem(itemIndex);
  console.log("'this' is: ", this);
  };
}




MenuSearchService.$inject = ['$http', 'RestBasePath']
function MenuSearchService($http, RestBasePath) {
  var service = this;
  var foundItems = [];
  service.getMatchedMenuItems = function (shortName) {
    return $http({
      method: "GET",
      url: (RestBasePath)
    }).then(function (response) {
      service.categories = response.data;
      for (var i = 0; i < service.categories.menu_items.length; i++) {
        var item = service.categories.menu_items[i];
        if(item.description.indexOf(shortName)!=-1){
          foundItems.push(item);
        }
      }
      console.log(foundItems);
      return foundItems;
    });

  };


  service.removeItem = function (itemIndex) {
    foundItems.splice(itemIndex, 1);
  };
}



})()
