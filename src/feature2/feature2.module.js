(function() {
  'use strict';
  /* globals angular */

  angular
    .module( 'feature2', [] )
    .controller( 'FeatureTwoController', FeatureTwoController );

  FeatureTwoController.$inject = [
    '$scope'
  ];

  function FeatureTwoController ( $scope ) {
    $scope.greeting = 'FeatureTwoController';
  }


}());
