const cron = require('node-cron');
const app = require('./app.js');

cron.schedule('* */5 * * *', function(){
	app();
});
