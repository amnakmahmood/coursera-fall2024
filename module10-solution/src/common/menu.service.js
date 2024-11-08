
(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);

  MenuService.$inject = ['$http', 'ApiPath'];

  function MenuService($http, ApiPath) {
    var svc = this;  // renamed from "service" for uniqueness

    // Direct URL construction within getMenuItem
    svc.getCategories = () => $http.get(ApiPath + '/categories.json').then(response => response.data);

    svc.getMenuItems = (category) => {
      const config = category ? { params: { 'category': category } } : {};
      return $http.get(ApiPath + '/menu_items.json', config).then(response => response.data);
    };

    svc.getMenuItem = function (shortName) {
      const category = shortName.replace(/[^a-zA-Z]/g, '').toUpperCase();
      const itemNumber = shortName.replace(/[^0-9]/g, '');
      const path = `/menu_items/${category}/menu_items/${itemNumber}.json`;

      return $http.get(ApiPath + path).then(response => {
        if (!response.data) throw new Error("Item not found");
        return { ...response.data, shortName };
      });
    };
  }
})();
