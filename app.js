// Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const handyUtils = require('handyutils');
const exphbs = require('express-handlebars');
// Dot Env File Loader
if (!process.env.PORT) {
  require('dotenv').load();
}
// View engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
// =-=-=-=-=-=-=-=-=-= Config vars =-=-=-=-=-=-=-=-=-=-=-=
const port = process.env.PORT || 8050;
// =-=-=-=-=-=-=-=-=-= Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=
require('./routes/shoppingList')(app);

/**
 * The Server Module that launches the API. Usable by other services like in unit testing.
 * @module Start/Server
 */
exports.server = app.listen(port, () => {
  handyUtils.debug('Server Active On Port', port);
});
