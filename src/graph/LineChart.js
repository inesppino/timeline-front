import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";
import "date-fns";
import "chartjs-adapter-date-fns";

Chart.register(annotationPlugin);

const LineChart = ({ dataSet, range, unit }) => {
  const data = {
    datasets: [...dataSet],
  };
  const getAverage = () => {
    const average =
      dataSet
        .map((item) => {
          return item.data.reduce((a, b) => a + b.y, 0) / item.data.length;
        })
        .reduce((a, b) => a + b, 0) / dataSet.length;
    return average;
  };

  const annotation = {
    type: "line",
    borderColor: "black",
    borderDash: [6, 6],
    borderDashOffset: 0,
    borderWidth: 3,
    label: {
      display: true,
      content: () => "Average",
      position: "end",
    },
    scaleID: "y",
    value: (val) => getAverage(val),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        min: range.min,
        max: range.max,
        time: {
          tooltipFormat: "dd-MM-yy HH:mm",
          unit: unit.name,
          displayFormats: {
            [unit.name]: unit.format,
          },
        },
      },
      y: {
        min: 0,
        max: 10,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          annotation,
        },
      },
    },
  };

  return <Line data={data} options={options} width={100} height={50} />;
};

export default LineChart;
