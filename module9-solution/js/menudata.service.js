(function() {
'use strict';


(function() {
    'use strict';
    angular.module('data').service('MenuDataService', MenuDataService);

    MenuDataService.$inject = ['$http'];
    function MenuDataService($http) {
        var service = this;

        service.getAllCategories = function() {
            console.log("MenuDataService: Fetching all categories");
            return $http({
                method: "GET",
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/categories.json'
            }).then(function(response) {
                console.log("MenuDataService: Categories fetched:", response.data);
                return response.data;
            }).catch(function(error) {
                console.error("Error fetching categories:", error);
            });
        };

        service.getItemsForCategory = function(categoryShortName) {
            console.log("MenuDataService: Fetching items for category:", categoryShortName);
            return $http({
                method: "GET",
                url: 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/' + categoryShortName + '.json'
            }).then(function(response) {
                console.log("MenuDataService: Items fetched:", response.data.menu_items);
                return response.data.menu_items;
            }).catch(function(error) {
                console.error("Error fetching items:", error);
            });
        };
    }
})();


})();