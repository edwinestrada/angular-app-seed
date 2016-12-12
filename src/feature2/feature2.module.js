import angular from 'angular';

const feature2Module = angular
  .module('feature2', [])
  .controller('FeatureTwoController', FeatureTwoController);

FeatureTwoController.$inject = [
  '$scope'
];

function FeatureTwoController($scope) {
  $scope.greeting = 'FeatureTwoController';
}

export default feature2Module.name;
