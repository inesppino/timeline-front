import Chart from "chart.js/auto";
import { LinearScale } from "chart.js";
import { Scatter } from "react-chartjs-2";
import { useState } from "react";

Chart.register(LinearScale);

const ScatterChart = () => {
  const [unit, setUnit] = useState("min");
  const data = {
    datasets: [
      {
        label: "Satisfación",
        data: [
          { x: 1, y: 2 },
          { x: 3, y: 4 },
          { x: 5, y: 6 },
          { x: 7, y: 8 },
          { x: 9, y: 10 },
        ],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Quemazón",
        data: [
          { x: 7, y: 2 },
          { x: 9, y: 4 },
          { x: 3, y: 6 },
          { x: 1, y: 8 },
          { x: 5, y: 10 },
        ],
        backgroundColor: "rgba(250,242,244)",
        borderColor: "rgba(250,242,244)",
        borderWidth: 1,
      },
    ],
  };

  const convertUnits = (value) => {
    if (unit === "min") {
      return value;
    } else if (unit === "hour") {
      return value / 60;
    } else if (unit === "day") {
      return value / (60 * 24);
    }
  };

  const getData = () => {
    if (!data.datasets[0].data) return;
    return data.datasets[0].data.map((point) => {
      return {
        x: convertUnits(point.x),
        y: convertUnits(point.y),
      };
    });
  };

  return (
    <>
      <Scatter data={data} options={{ responsive: true }} />
      <select value={unit} onChange={(e) => setUnit(e.target.value)}>
        <option value="min">Minutes</option>
        <option value="hour">Hours</option>
        <option value="day">Days</option>
      </select>
    </>
  );
};

export default ScatterChart;
