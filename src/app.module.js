import angular from 'angular';
import uirouter from 'angular-ui-router';
import './stylesheets/app.scss';

let appDependencies = [
  uirouter
];

angular
  .module('mainApp', appDependencies)
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');

  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'feature1/feature1.html',
      controller: 'LoginController',
      controllerAs: 'LoginCtrl'
    });
}

let mainAppModule = angular.module('mainApp').name;
export default mainAppModule;