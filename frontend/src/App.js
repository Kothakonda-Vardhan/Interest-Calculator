import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState("");
  const [interest, setInterest] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const calculate = async () => {
    try {
      setLoading(true);
      const res = await axios.post("https://interest-calculator-4rem.onrender.com/calculate", {
        principal,
        rate,
        interest,
      });
      setResult(res.data);
    } catch (err) {
      alert("Calculation failed. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Interest Calculator</h2>

        <div className="input-group">
          <label>Principal</label>
          <input
            type="number"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Time (Years)</label>
          <input
            type="number"
            placeholder="Enter time"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Rate (%)</label>
          <input
            type="number"
            placeholder="Enter rate of interest"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <button onClick={calculate} disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>

        {result && (
          <div className="result">
            <h3>Results</h3>
            <div className="result-box">
              <span>Simple Interest</span>
              <strong>{result.simpleInterest}</strong>
            </div>
            <div className="result-box">
              <span>Compound Interest</span>
              <strong>{result.compoundInterest}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
