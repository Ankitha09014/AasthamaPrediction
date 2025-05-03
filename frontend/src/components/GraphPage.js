import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph";

const GraphPage = () => {
  const [metrics, setMetrics] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("asthmaMetrics");
    if (stored) {
      setMetrics(JSON.parse(stored));
    } else {
      localStorage.setItem("fromGraphRedirect", "true");
      setTimeout(() => {
        navigate("/predict");
      }, 100);
    }
  }, [navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Model Performance Graph</h2>
      {!metrics ? (
        <p>Redirecting to Predict page...</p>
      ) : (
        <Graph metrics={metrics} />
      )}
    </div>
  );
};

export default GraphPage;
