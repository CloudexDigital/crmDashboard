import "../styles/performanceCard.css";
import { useEffect } from "react";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const PerformanceCard = () => {
  useEffect(() => {
    const ctx = document.getElementById("performanceChart").getContext("2d");

    let chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Performance",
            data: [65, 59, 80, 81, 56, 75],
            borderColor: "rgba(99, 102, 241, 1)",
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    // 🧹 Clean up chart instance when component unmounts or reruns
    return () => {
      chartInstance.destroy();
    };
  }, []);

  return (
    <div className="right-column">
      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Client Performance</h3>
          <select className="metrics-select">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
          </select>
        </div>
        <div className="chart-container">
          <canvas id="performanceChart"></canvas> {/* ✅ This now matches */}
        </div>
        <div className="metrics-grid">
          {[
            {
              label: "Engagement Rate",
              value: "72%",
              change: "↑ 8%",
              color: "green",
            },
            {
              label: "Revenue Growth",
              value: "24%",
              change: "↑ 5%",
              color: "green",
            },
            {
              label: "Project Completion",
              value: "88%",
              change: "↓ 2%",
              color: "red",
            },
            {
              label: "Satisfaction",
              value: "4.6",
              change: "↑ 0.3",
              color: "green",
            },
          ].map((metric, index) => (
            <div key={index} className="metric-card">
              <p className="metric-label">{metric.label}</p>
              <p className="metric-value">
                {metric.value}{" "}
                <span className={`change ${metric.color}`}>
                  {metric.change}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
