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
    dataForView.api_uri = process.env.API_URI;
    // Request shopping list from API
   async.series([
     (done) => {
     request.get(`${process.env.API_URI}listItems`)
       .set('content-type', 'application/json')
       .end((apiErr, apiRes) => {
         if (apiErr) {
          handyUtils.debug(`apiErr at ${process.env.API_URI}/listItems`, apiErr);
          done();
         }
         handyUtils.debug(`apiRes at ${process.env.API_URI}/listItems`, apiRes);
         if (apiRes) {
          if (apiRes.body.shoppingList.length === 0) {
            dataForView.shoppingList = [];
              done();
            } else {
              let parsedItemsArray = [];
          for (var i = 0; i < apiRes.body.shoppingList.length; i++) {
            let parsedItem = JSON.parse(apiRes.body.shoppingList[i]);
            parsedItemsArray.push(parsedItem);
            parsedItem = '';
            if ((apiRes.body.shoppingList.length -1) === i) {
              console.log('done in the loop, i:', i);
              dataForView.shoppingList = parsedItemsArray;
              done();
            }
          }
        }
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
