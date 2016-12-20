(function() {
  'use strict';
  /* globals beforeEach,inject,describe,it,expect */

  describe('feature2', function() {
    beforeEach(module('feature2'));

    var $controller;

    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
    }));

    describe('FeatureTwoController', function() {
      var $scope = null;
      var FeatureTwoController = null;
      beforeEach(function() {
        $scope = {};
        FeatureTwoController = $controller('FeatureTwoController', { $scope: $scope });
      });

      it('should exist', function() {
        expect(typeof FeatureTwoController).to.equal('object');
      });

      it('should have a greeting', function() {
        expect($scope.greeting).to.equal('FeatureTwoController');
      });

    });
  });

}());
