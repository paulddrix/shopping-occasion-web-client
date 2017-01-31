module.exports = (app) => {
  const async = require('async');
  const handyUtils = require('handyutils');
  const request = require('superagent');
  /*
  SHOPPING LIST
  */
  app.get('/shoppinglist', (req, res) => {
    // Store reference of req object.
    const reqRef = req;
    // object to send to the view
    const dataForView ={};
    // Request shopping list from API
   async.series([
     (done) => {
     request.get('localhost:8988/listItems')
       .set('content-type', 'application/json')
       .end((apiErr, apiRes) => {
         if (apiErr) {
          handyUtils.debug('apiErr at localhost:8988/listItems', apiErr);
          done();
         }
         handyUtils.debug('apiRes at localhost:8988/listItems', apiRes);
         if (apiRes) {
          dataForView.shoppingList = apiRes.body.shoppingList;
          done();
         }
       });
     },
     (done) => {
      handyUtils.debug('dataForView', dataForView);
       res.render('shoppingList', dataForView);
       done();
     },
   ]);
  });
};
