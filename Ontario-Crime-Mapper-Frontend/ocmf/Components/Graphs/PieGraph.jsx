import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const assaultData = props.Cdata.find(
      (entry) => entry._id === props.selectedYear
    );

    if (!assaultData) {
      console.error(`No data available for year ${props.selectedYear}`);
      return;
    }

    const assaultCategories = assaultData.crimeData.map(
      (entry) => entry.crimeCategory
    );
    const assaultCounts = assaultData.crimeData.map(
      (entry) => entry.crimeCount
    );

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: assaultCategories,
        datasets: [
          {
            data: assaultCounts,
            backgroundColor: getRandomColors(assaultCategories.length),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: `Crime Distribution for ${props.selectedYear}`,
            fontSize: 16,
          },
        },
      },
    });
  }, [props.Cdata, props.selectedYear]);

  const getRandomColors = (count) => {
    const brightColors = [
      "#FF5733",
      "#33FF57",
      "#5733FF",
      "#FF33A1",
      "#A133FF",
      "#33FFF5",
      "#FFF533",
      "#FFA133",
      "#A1FF33",
      "#3357FF",
    ];

    return Array.from(
      { length: count },
      (_, index) => brightColors[index % brightColors.length]
    );
  };

  return <canvas ref={chartRef} width="100%" height="20px"></canvas>;
};

export default PieChart;
