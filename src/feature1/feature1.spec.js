(function () {
  'use strict';
  /* globals beforeEach,inject,describe,it,expect */

  describe('feature1', function () {
    beforeEach(module('feature1'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
    }));

    describe('FeatureOneController', function () {
      var $scope = null;
      var FeatureOneController = null;
      beforeEach(function () {
        $scope = {};
        FeatureOneController = $controller('FeatureOneController', { $scope: $scope });
      });

      it('should exist', function () {
        expect(typeof FeatureOneController).to.equal('object');
      });

      it('should have a greeting', function () {
        expect($scope.greeting).to.equal('FeatureOneController');
      });

    });
  });

}());
