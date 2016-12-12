import angular from 'angular';

const feature1Module = angular
  .module('feature1', [])
  .controller('FeatureOneController', FeatureOneController);

FeatureOneController.$inject = [
  '$scope'
];

function FeatureOneController($scope) {
  $scope.greeting = 'FeatureOneController';
}

export default feature1Module.name;
