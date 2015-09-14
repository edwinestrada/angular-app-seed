(function(angular) {
  'use strict';

  var PixbitAppSeedDependencies = [
    'ui.router',
    'feature1',
    'feature2'
  ];

  angular
    .module( 'PixbitAppSeed', PixbitAppSeedDependencies )
    .config( config );

  config.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function config ( $stateProvider, $urlRouterProvider ) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('state1', {
        url: '/state1',
        templateUrl: 'feature1/feature1.html',
        controller: 'FeatureOneController'
      })
      .state('state2', {
        url: '/state2',
        templateUrl: 'feature2/feature2.html',
        controller: 'FeatureTwoController'
      });
  }

}());
