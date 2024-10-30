
(function () {
  'use strict';
  angular.module('data')
    .service('MenuDataService', MenuDataService);

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;
    var categoryCache, itemsCache = {};

    service.getAllCategories = function () {
      if (!categoryCache) {
        categoryCache = $http.get("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json")
          .then(response => response.data);
      }
      return categoryCache;
    };

    service.getItemsForCategory = function (categoryShortName) {
      if (!itemsCache[categoryShortName]) {
        itemsCache[categoryShortName] = $http.get("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json")
          .then(response => response.data);
      }
      return itemsCache[categoryShortName];
    };
  }
})();
