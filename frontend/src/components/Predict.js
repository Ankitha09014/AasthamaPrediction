// Predict.js
import React, { useState } from "react";
import "./Predict.css";

function Predict() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    smoking_status: "",
    medvalue: "",
    intensity_cough: "",
  });

  const [result, setResult] = useState("");
  const [metrics, setMetrics] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.error) {
        setResult("Error: " + data.error);
      } else {
        setResult(data.prediction);
        setMetrics({
          accuracy: data.accuracy,
          precision: data.precision,
          recall: data.recall,
          f1: data.f1,
          sensitivity: data.sensitivity,
          specificity: data.specificity,
        });
      }
    } catch (error) {
      setResult("Error: Failed to fetch prediction.");
    }
  };

  return (
    <div className="App">
      <h2>Asthma Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} required />
        <select name="gender" value={form.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="smoking_status" value={form.smoking_status} onChange={handleChange} required>
          <option value="">Select Smoking Status</option>
          <option value="Non-Smoker">Non-Smoker</option>
          <option value="Ex-Smoker">Ex-Smoker</option>
          <option value="Current Smoker">Current Smoker</option>
        </select>
        <input type="number" name="medvalue" placeholder="Medvalue" value={form.medvalue} onChange={handleChange} required />
        <select name="intensity_cough" value={form.intensity_cough} onChange={handleChange} required>
          <option value="">Select Cough Intensity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit">Predict</button>
      </form>

      {result && <h3>Prediction: {result}</h3>}

      {metrics && (
        <ul>
          <li>Accuracy: {metrics.accuracy}</li>
          <li>Precision: {metrics.precision}</li>
          <li>Recall: {metrics.recall}</li>
          <li>F1 Score: {metrics.f1}</li>
          <li>Sensitivity: {metrics.sensitivity}</li>
          <li>Specificity: {metrics.specificity}</li>
        </ul>
      )}
    </div>
  );
}

export default Predict;
