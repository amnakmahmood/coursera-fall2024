
(function () {
  "use strict";

  angular.module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['UsersService', 'MenuService'];

  function SignUpController(UsersService, MenuService) {
    var ctrl = this;  // Use "ctrl" instead of "$ctrl" for uniqueness
    ctrl.isValidDish = null;  // simplified from isDishValid

    ctrl.checkDish = function () {
      if (!ctrl.favoriteDish) {
        ctrl.isValidDish = null;  // Clear if empty
        return;
      }
      MenuService.getMenuItem(ctrl.favoriteDish)
        .then(() => ctrl.isValidDish = true)
        .catch(() => ctrl.isValidDish = false);
    };

    ctrl.submitForm = function (event) {
      event.preventDefault();
      if (ctrl.isValidDish === false) {
        alert("Invalid favorite dish. Please correct and try again.");
        return;
      }
      UsersService.setUser({
        firstName: ctrl.firstName,
        lastName: ctrl.lastName,
        email: ctrl.email,
        phone: ctrl.phone,
        favoriteDish: ctrl.favoriteDish
      });
      ctrl.successfulRegistration = true;
    };
  }
})();
