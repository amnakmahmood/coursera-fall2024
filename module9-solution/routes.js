
(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Welcome to our Restaurant</h1>'
      })
      .state('categories', {
        url: '/categories',
        component: 'categories',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('items', {
        url: '/items/{categoryShortName}',
        component: 'items',
        resolve: {
          items: ['MenuDataService', '$transition$', function (MenuDataService, $transition$) {
            return MenuDataService.getItemsForCategory($transition$.params().categoryShortName);
          }]
        }
      });
  }
})();
