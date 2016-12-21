import angular from 'angular';

const feature2Module = angular
  .module('feature2', [])
  .controller('FeatureTwoController', FeatureTwoController);

FeatureTwoController.$inject = [

];

function FeatureTwoController() {
  let vm = this;
  vm.greeting = 'FeatureTwoController';
}

export default feature2Module.name;
