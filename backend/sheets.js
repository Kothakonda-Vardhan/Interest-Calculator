const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});
const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = process.env.SHEET_ID;


async function calculate(principal, interest, rate) {

  // Write to Input sheet
  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: "input!B2:B4",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [principal],
        [interest],
        [rate]
      ]
    }
  });

  // Read from Output sheet
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "output!B1:B2"
  });

  return {
    simpleInterest: response.data.values[0][0],
    compoundInterest: response.data.values[1][0]
  };
}

module.exports = { calculate };
