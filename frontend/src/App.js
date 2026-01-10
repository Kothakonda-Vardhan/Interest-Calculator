import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState("");
  const [months, setMonths] = useState("");
  const [days, setDays] = useState("");
  const [frequency, setFrequency] = useState(1);
  const calculate = async () => {
    const tenure=Number(years)+Number(months)/12+Number(days)/365;
    if(principal==""){
      alert("Enter valid principal amount");
      return;
    }
    if(tenure<=0){
      alert("Enter valid tenure");
      return;
    }
    if(rate==""){
      alert("Enter valid Interest rate");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/calculate", {
        principal,
        tenure,
        rate,
        frequency
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
        <h2>Fixed Deposit Calculator</h2>

        <div className="input-group">
          <label>Principal</label>
          <input
            type="number"
            min="0"
            placeholder="Enter principal amount"
            value={principal}
            onChange={(e) => {
              const value=e.target.value;
              if(value=="")setPrincipal("");
              else if(Number(value)>0)setPrincipal(Number(value));
            }}
          />
        </div>
        <div className="frequency-container">
            <label>Compound Freaquency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
            >
              <option value="1">Yearly</option>
              <option value="2">Half-Yearly</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
            </select>
        </div>
        <div className="tenure-container">
          <label>Tenure</label>

          <div className="tenure-row">
            <div className="tenure-box">
              <span>Years</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={years}
                onChange={(e) => {
                  const value=e.target.value;
                  if(value=="")setYears("");
                  else if(Number(value)>=0)setYears(Number(value));
                }}
              />
            </div>

            <div className="tenure-box">
              <span>Months</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={months}
                onChange={(e) => {
                  const value=e.target.value;
                  if(value=="")setMonths("");
                  else if(Number(value)>=0)setMonths(Number(value));
                }}
              />
            </div>

            <div className="tenure-box">
              <span>Days</span>
              <input
                type="number"
                min="0"
                placeholder="0"
                value={days}
                onChange={(e) => {
                  const value=e.target.value;
                  if(value=="")setDays("");
                  else if(Number(value)>=0)setDays(Number(value));
                }}
              />
            </div>
          </div>
        </div>


        <div className="input-group">
          <label>Rate (%)</label>
          <input
            type="number"
            min="0"
            placeholder="Enter rate of interest"
            value={rate}
            onChange={(e) => {
              const value=e.target.value;
              if(value=="")setRate("");
              else if(Number(value)>0)setRate(Number(value));
            }}
          />
        </div>

        <button onClick={calculate} disabled={loading}>
          {loading ? "Calculating..." : "Calculate"}
        </button>

        {result && (
          <div className="result">
            <h3>Results</h3>
            <div className="result-box">
              <span>Maturity Amount</span>
              <strong>{result.MaturityAmount}</strong>
            </div>
            <div className="result-box">
              <span>Interest Earned</span>
              <strong>{result.Interest}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
