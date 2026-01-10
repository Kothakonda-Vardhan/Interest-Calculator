const { google } = require("googleapis");
const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1XGYTqfRDp6dQvOyjRuBpFfTNDbi34GAIVSygJyDmINg";


async function calculate(principal, tenure, rate, frequency) {
  console.log("Writing to sheets:", principal, tenure, rate, frequency);

  // Write to Input sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "input!B2:B5",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [principal],
        [tenure],
        [rate],
        [frequency]
      ]
    }
  });

  // Read from Output sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "output!B1:B2"
  });

  return {
    MaturityAmount: response.data.values[0][0],
    Interest: response.data.values[1][0]
  };
}

module.exports = { calculate };
