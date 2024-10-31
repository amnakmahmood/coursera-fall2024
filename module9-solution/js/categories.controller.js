(function() {
'use strict';


(function() {
    'use strict';
    angular.module('MenuApp').controller('categoriesController', categoriesController);

    categoriesController.$inject = ['categories'];
    function categoriesController(categories) {
        console.log("categoriesController initialized");
        var categoriesCtrl = this;
        categoriesCtrl.categories = categories;
        console.log("categoriesController: Categories data received:", categories);
    }
})();


})();