
(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
  .filter('customCurrency', CustomCurrencyFilter);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;

    var toBuyItems = [
      { name: "cookies", quantity: 10, pricePerItem: 2 },
      { name: "chips", quantity: 5, pricePerItem: 3 },
      { name: "soda", quantity: 6, pricePerItem: 1.5 },
      { name: "chocolates", quantity: 12, pricePerItem: 0.75 },
      { name: "apples", quantity: 4, pricePerItem: 1.25 }
    ];

    var boughtItems = [];

    service.buyItem = function (itemIndex) {
      var item = toBuyItems[itemIndex];
      toBuyItems.splice(itemIndex, 1);
      boughtItems.push(item);
    };

    service.getToBuyItems = function () {
      return toBuyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };
  }

  function CustomCurrencyFilter() {
    return function (input) {
      return "$$$" + Number(input).toFixed(2);
    };
  }

})();
