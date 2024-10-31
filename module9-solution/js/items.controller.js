(function() {
'use strict';


(function() {
    'use strict';
    angular.module('MenuApp').controller('itemsController', itemsController);

    itemsController.$inject = ['$stateParams', 'items'];
    function itemsController($stateParams, items) {
        console.log("itemsController initialized with category:", $stateParams.categoryShortName);
        var itemsCtrl = this;
        itemsCtrl.items = items;
        console.log("itemsController: Items data received:", items);
    }
})();


})();