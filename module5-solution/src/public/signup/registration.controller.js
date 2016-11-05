(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);


RegistrationController.$inject=['RegistrationService'];
function RegistrationController(RegistrationService) {
  var reg = this;

  reg.submit = function () {
    reg.completed = true;
    reg.category=[];
    var promise = RegistrationService.getCategory(reg.user.favorite);
    promise.then(function (response) {
        if(response.length==0){
          reg.onError=true;
        }else{
          reg.onError=false;
          reg.valid=true;
        }
        if(reg.valid){
          reg.user.description=response.description;
          RegistrationService.user=reg.user;
        }
      })
  };
}


})();
