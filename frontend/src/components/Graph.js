import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./graph.css";

function Graph({ metrics }) {
  if (!metrics) return null;

  const performanceData = [
    { name: "Accuracy", value: metrics.accuracy },
    { name: "Precision", value: metrics.precision },
    { name: "Recall", value: metrics.recall },
    { name: "F1", value: metrics.f1 },
    { name: "Sensitivity", value: metrics.sensitivity },
    { name: "Specificity", value: metrics.specificity },
  ];

  const errorData = [
    { name: "MAE", value: metrics.mae || 0 },
    { name: "MSE", value: metrics.mse || 0 },
    { name: "R²", value: metrics.r2 || 0 },
  ];

  const cm = metrics.confusion_matrix || [[0, 0], [0, 0]];

  return (
    <div className="graph-container">
      <h3 className="graph-heading">Performance Graph</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 1]} />
          <Tooltip formatter={(value) => value.toFixed(3)} />
          <Legend />
          <Bar dataKey="value" fill="#4A90E2" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="graph-heading">Error Metrics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={errorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#F5A623" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <h3 className="graph-heading">Confusion Matrix</h3>
      <table className="confusion-matrix">
        <thead>
          <tr>
            <th></th>
            <th>Predicted: No</th>
            <th>Predicted: Yes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Actual: No</th>
            <td>{cm[0][0]}</td>
            <td>{cm[0][1]}</td>
          </tr>
          <tr>
            <th>Actual: Yes</th>
            <td>{cm[1][0]}</td>
            <td>{cm[1][1]}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Graph;
