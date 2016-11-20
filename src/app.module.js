import angular from 'angular';
import uirouter from 'angular-ui-router';
import './stylesheets/app.scss';

let appDependencies = [
  uirouter
];

angular
  .module('mainApp', appDependencies)
  .config(config);

config.$inject = [
  '$stateProvider',
  '$urlRouterProvider'
];

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/state1');

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

let mainAppModule = angular.module('mainApp').name;
export default mainAppModule;