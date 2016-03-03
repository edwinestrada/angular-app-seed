(function () {
  'use strict';
  /* globals angular */

  angular
    .module('feature1', [])
    .controller('FeatureOneController', FeatureOneController);

  FeatureOneController.$inject = [
    '$scope'
  ];

  function FeatureOneController($scope) {
    $scope.greeting = 'FeatureOneController';
  }

}());
