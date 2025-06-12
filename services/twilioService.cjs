const twilio = require('twilio');
const { distributeTasks } = require('./utils/helpers');
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

const MOTIVATIONAL_QUOTES = [
  "You can do this!",
  "One step at a time!",
  "Progress is progress!"
];

function scheduleReminders(user) {
  const tasks = user.taskSource === 'AI' 
    ? generateTasks(user.goals)
    : user.manualTasks.split(';');
    
  const schedule = distributeTasks(tasks, user.times);
  
  // Simple scheduling - adjust as needed
  Object.entries(schedule).forEach(([time, tasks]) => {
    console.log(`Scheduling for ${user.phone} at ${time}`);
    // Actual scheduling implementation here
  });
}

async function sendReminder(phone, tasks, quote) {
  try {
    await client.messages.create({
      body: `${quote}\n\nYour tasks:\n${tasks.join('\n')}`,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: `whatsapp:${phone}`
    });
    console.log(`Sent to ${phone}`);
  } catch (error) {
    console.error(`Failed to send to ${phone}:`, error.message);
  }
}

module.exports = { scheduleReminders, sendReminder };