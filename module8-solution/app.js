
(function () {
  'use strict';

  // Declare the Angular module and define the API base path
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com')  // Define the base path
  .directive('foundItems', FoundItemsDirective);

  // NarrowItDownController setup
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var ctrl = this;
    ctrl.searchTerm = '';
    ctrl.found = [];
    ctrl.errorMessage = '';

    // Method to search menu items
    ctrl.narrowItDown = function () {
      if (ctrl.searchTerm === '') {
        ctrl.errorMessage = 'Nothing found';
        ctrl.found = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
      .then(function (result) {
        ctrl.found = result;
        ctrl.errorMessage = (ctrl.found.length === 0) ? 'Nothing found' : '';
      })
      .catch(function (error) {
        console.log("Something went wrong: ", error);
      });
    };

    // Method to remove an item from the list
    ctrl.removeItem = function (index) {
      ctrl.found.splice(index, 1);
    };
  }

  // MenuSearchService to fetch and filter menu items
  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: (ApiBasePath + '/menu_items.json')  // Use the base path and relative endpoint
      }).then(function (response) {
        console.log("Fetched data:", response.data); // Log the response data

        var foundResults = [];
        var items = response.data;

        // Traverse categories and search within menu_items
        for (var currCategory in items) {
          var category = items[currCategory].menu_items;
          
          // Search within each item in the category
          for (var currItem in category) {
            var description = category[currItem].description;
            if (description.toLowerCase().includes(searchTerm.trim().toLowerCase())) {
              foundResults.push(category[currItem]);
            }
          }
        }

        console.log("Filtered items:", foundResults); // Log the filtered items
        return foundResults;
      }).catch(function (error) {
        console.error("Error fetching data:", error); // Log any error that occurs during the fetch
      });
    };
  }

  // Directive to display found items
  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
    return ddo;
  }

  // Controller for the foundItems directive
  function FoundItemsDirectiveController() {
    var list = this;
  }

})();
