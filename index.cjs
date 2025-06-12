const dotenv = require('dotenv');
dotenv.config();
const {checkNewSubmissions} = require('./services/googleSheets.cjs');
const {scheduleReminders} = require('./services/scheduler.cjs');
// On startup
setInterval(() => {
    checkNewSubmissions().then (newSubs => {newSubs.forEach(scheduleReminders);
 }). catch (console.error);
},5* 60* 1000);

console.log("Reminder bot is running!");