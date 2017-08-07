(function () {
'use strict';
angular.module('LunchCheck',[])

.controller('LunchCheckController',LunchCheckController)
 
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
  $scope.lunch = "";
  $scope.message="";
  $scope.lunchCheck = function () {
    $scope.message = "";
    var items = $scope.lunch.split(',');
    items = trimArray(items);
    if (items.length !=0 ) {
      if(items.length <= 3){
        $scope.message = "Enjoy";
      }else{
        $scope.message = "Too much!";
      }
    } else {
      $scope.message = "Please enter data first";
    }
  }
}


function trimArray(array) {
  for(var i = array.length - 1 ; i >= 0; i--){
    if(array[i].trim() == "") array.splice(i,1);
  }
  return array;
}
})();
