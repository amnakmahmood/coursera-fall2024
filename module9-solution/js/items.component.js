(function() {
'use strict';


(function() {
    'use strict';

    angular.module('MenuApp')
    .component('items', {
        templateUrl: 'items.template.html',
        bindings: {
            items: '<'
        }
    });
})();


})();