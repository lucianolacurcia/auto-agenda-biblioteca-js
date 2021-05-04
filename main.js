const cron = require('node-cron');
const app = require('./app.js');

cron.schedule('0 */5 * * *', function(){
	app();
});
