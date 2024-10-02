(function() {
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        var lunchCtrl = this;
        lunchCtrl.items = "";
        lunchCtrl.message = "";
        lunchCtrl.messageType = "";

        lunchCtrl.checkItems = function() {
            var itemCount = countItems(lunchCtrl.items);
            if (itemCount === 0) {
                lunchCtrl.message = "Please enter data first";
                lunchCtrl.messageType = "error"; // Red text and border
            } else if (itemCount <= 3) {
                lunchCtrl.message = "Enjoy!";
                lunchCtrl.messageType = "success"; // Green text and border
            } else {
                lunchCtrl.message = "Too much!";
                lunchCtrl.messageType = "success"; // Green text and border
            }
        };

        function countItems(items) {
            if (!items) return 0;

            // Split the string by commas and filter out empty or space-only items
            var itemsArray = items.split(',');
            var validItems = itemsArray.filter(function(item) {
                return item.trim() !== ''; // Exclude empty or whitespace-only items
            });

            return validItems.length;
        }
    }
})();
