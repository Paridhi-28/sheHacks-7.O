import React, { useEffect, useRef } from "react";
import { chakra } from "@chakra-ui/react";
import Chart from "chart.js/auto";

const ChakraCanvas = chakra("canvas");

const BarGraph = (props) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const years = props.Cdata.map((entry) => entry._id);
    const crimeCounts = props.Cdata.map((entry) => entry.crimeCount);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      title: "Major Crimes",
      data: {
        labels: years,
        datasets: [
          {
            label: "Crime Count",
            data: crimeCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: props.chartTitle,
            fontSize: 100,
          },
        },
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
              text: "Crime Count",
            },
          },
        },
      },
    });
  }, [props.Cdata, props.chartTitle]);

  return (
    <ChakraCanvas
      ref={chartRef}
      w="100%"
      h={{ base: "300px", lg: "100%" }}
    ></ChakraCanvas>
  );
};

export default BarGraph;
