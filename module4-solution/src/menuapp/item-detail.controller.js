(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['MenuDataService','$stateParams', 'item'];
function ItemDetailController(MenuDataService,$stateParams, item) {
  var itemDetail = this;
  itemDetail.items = item.data.menu_items;
}

})();
