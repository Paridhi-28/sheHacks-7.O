import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineGraph = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy(); 
    }

    const years = props.Cdata.map((entry) => entry._id);
    const crimeData = props.Cdata.map((entry) => entry.crimeData);

    
    const brightColors = [
      "#FF5733", "#33FF57", "#5733FF", "#FF33A1", "#A133FF",
      "#33FFF5", "#FFF533", "#FFA133", "#A1FF33", "#3357FF"
    ];

    const categories = crimeData[0]?.map((_, index) => {
      return {
        label: crimeData[0][index].crimeCategory,
        data: crimeData.map((yearData) => yearData[index].crimeCount),
        borderColor: brightColors[index % brightColors.length],
        fill: false,
      };
    });

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: years,
        datasets: categories,
      },
      options: {
        maintainAspectRatio: false, 
        scales: {
          x: {
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Number of Crimes",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: props.chartTitle,
            fontSize: 16,
          },
        },
      },
    });
  }, [props.Cdata, props.chartTitle]);

  return <canvas ref={chartRef} width="100%" height="190"></canvas>;
};

export default LineGraph;
