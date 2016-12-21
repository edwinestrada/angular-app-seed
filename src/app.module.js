import angular from 'angular';
import uirouter from 'angular-ui-router';

import './stylesheets/app.scss';

import feature1Module from './feature1/feature1.module';
import feature2Module from './feature2/feature2.module';

let appDependencies = [
  uirouter,
  feature1Module,
  feature2Module
];

angular
  .module('AngularAppSeed', appDependencies)
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

let mainAppModule = angular.module('AngularAppSeed').name;
export default mainAppModule;