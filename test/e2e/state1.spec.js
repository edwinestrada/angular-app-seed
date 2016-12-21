(function() {
  'use strict';
  var HOME_URL = 'http://localhost:3001/#/';

  /* globals describe,beforeEach,it,browser,expect */

  describe('the home page', function(){
    beforeEach(function() {
      browser.get(HOME_URL);
    });

    it('should have a title', function(){
      browser
        .getTitle()
        .then(function(title) {
          expect(title).toEqual('Template Angular Application');
        });
    });
  });
})();
