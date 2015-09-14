(function() {
  'use strict';
  /* globals beforeEach,inject,describe,it,expect */
  var FeatureOneController = {};
  var createController = null;
  var scope = {};
  beforeEach(
    module('feature1')
  );
  
  beforeEach(
    inject(
      function ( $rootScope, $controller ) {
        scope = $rootScope.$new();
        createController = function() {
          return $controller('FeatureOneController', { $scope: scope });
        };
      }
    )
  );

  describe('the FeatureOneController', function(){
    it('should exist as an Object', function(){
      FeatureOneController = createController();
      expect(typeof FeatureOneController).to.equal('object');
    });
  });

}());
