import React, { useState, useEffect } from "react";
import "./Predict.css";

function App() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    smoking_status: "",
    medvalue: "",
    intensity_cough: "",
  });
  const [result, setResult] = useState("");
  const [metrics, setMetrics] = useState(null);

  // Reset form fields on component mount to ensure they are empty
  useEffect(() => {
    setForm({
      age: "",
      gender: "",
      smoking_status: "",
      medvalue: "",
      intensity_cough: "",
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setResult(data.prediction || "Error: " + data.error);
    setMetrics({
      accuracy: data.accuracy,
      precision: data.precision,
      recall: data.recall,
      f1: data.f1,
      sensitivity: data.sensitivity,
      specificity: data.specificity,
    });
  };

  return (
    <div className="App">
      <h2 className="title">Asthma Prediction</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <input
            name="age"
            placeholder="Age"
            type="number"
            onChange={handleChange}
            required
            className="input-field"
            value={form.age}  // Set value to the form state
          />
        </div>
        <div className="input-group">
          <select
            name="gender"
            onChange={handleChange}
            className="input-field"
            value={form.gender}  // Set value to the form state
          >
            <option value="">Select Gender</option>  {/* Default empty value */}
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="input-group">
          <select
            name="smoking_status"
            onChange={handleChange}
            className="input-field"
            value={form.smoking_status}  // Set value to the form state
          >
            <option value="">Select Smoking Status</option>  {/* Default empty value */}
            <option value="Non-Smoker">Non-Smoker</option>
            <option value="Ex-Smoker">Ex-Smoker</option>
            <option value="Current Smoker">Current Smoker</option>
          </select>
        </div>
        <div className="input-group">
          <input
            name="medvalue"
            placeholder="Medvalue"
            type="number"
            onChange={handleChange}
            required
            className="input-field"
            value={form.medvalue}  // Set value to the form state
          />
        </div>
        <div className="input-group">
          <select
            name="intensity_cough"
            onChange={handleChange}
            className="input-field"
            value={form.intensity_cough}  // Set value to the form state
          >
            <option value="">Select Cough Intensity</option>  {/* Default empty value */}
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <button type="submit" className="predict-button">
          Predict
        </button>
      </form>

      {result && <div className="result">Prediction: {result}</div>}

      {metrics && (
        <div className="metrics-container">
          <h3 className="metrics-title">Model Metrics</h3>
          <ul className="metrics-list">
            <li>Accuracy: {metrics.accuracy}</li>
            <li>Precision: {metrics.precision}</li>
            <li>Recall: {metrics.recall}</li>
            <li>F1 Score: {metrics.f1}</li>
            <li>Sensitivity: {metrics.sensitivity}</li>
            <li>Specificity: {metrics.specificity}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
