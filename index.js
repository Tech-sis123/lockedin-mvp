require ('dotenv').config();
const {checkNewSubmissions} = require('./services/googleSheets.js');
const {scheduleReminders} = require('./services/scheduler.js');
setInterval(() => {
    checkNewSubmissions().then (newSubs => {newSubs.forEach(scheduleReminders);
 }). catch (console.error);
}, 5 * 60 * 1000);

console.log("Reminder bot is running!");