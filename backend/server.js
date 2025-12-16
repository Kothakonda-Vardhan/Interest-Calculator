const express = require("express");
const cors = require("cors");
const { calculate } = require("./sheets");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/calculate", async (req, res) => {
  try {
    const { principal, interest, rate } = req.body;
    const result = await calculate(principal, interest, rate);
    res.json(result);
  } catch (err) {
    console.error("BACKEND ERROR 👉", err);
    res.status(500).json({
      error: err.message || "Internal Server Error"
    });
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
