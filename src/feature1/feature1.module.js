import angular from 'angular';

const feature1Module = angular
  .module('feature1', [])
  .controller('FeatureOneController', FeatureOneController);

FeatureOneController.$inject = [];

function FeatureOneController() {
  let vm = this;
  vm.greeting = 'FeatureOneController';
}

export default feature1Module.name;
