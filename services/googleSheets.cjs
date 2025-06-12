const { google } = require('googleapis');
const path = require('path'); 
const { generateTasks, distributeTasks } = require('../utils/helpers.cjs');

// Google Sheets connection setup
async function connectToSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, 'credentials.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  return google.sheets({ version: 'v4', auth: client });
}

async function checkNewSubmissions() {
  const sheets = await connectToSheets();
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: 'A2:H', // Adjust based on your sheet columns
  });
  
  const rows = response.data.values;
  
  return rows.map(row => ({
    firstName: row[0],
    lastName: row[1],
    email: row[2],
    phone: row[3],
    goals: [row[4]], // Single goal field in new form
    taskSource: row[5] === 'Yes' ? 'AI' : 'Manual',
    manualTasks: row[6] || '',
    times: [row[7], row[8], row[9]].filter(Boolean) // Times from columns H,J,K
  }));
}

module.exports = { checkNewSubmissions };