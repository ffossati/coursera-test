(function () {
angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController',ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var buyList = this;
  buyList.items=ShoppingListCheckOffService.getToBuy();
  buyList.removeItem=function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  }
}

AlreadyBoughtController.$inject=(['ShoppingListCheckOffService']);
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items=ShoppingListCheckOffService.getAlreadyBought();
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuy = [{name : 'Milk', quantity : '1'},
                {name : 'Chocolate', quantity : '2'},
                {name : 'Cookies', quantity : '10'},
                {name : 'Peanut Butter', quantity : '1'},
                {name : 'Donuts', quantity : '5'}];
  var bought = [];

  service.getToBuy=function () {
    return toBuy;
  };
  service.getAlreadyBought=function () {
    return bought;
  };
  service.removeItem = function ($index) {
    bought.push(toBuy[$index]);
    toBuy.splice($index,1);
  };
}
})();
