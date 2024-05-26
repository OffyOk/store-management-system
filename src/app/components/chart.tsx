"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }: any) => {
  const chartRef = useRef(null);
  // console.log(data);
  useEffect(() => {
    if (chartRef && chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                font: {
                  size: 14,
                },
              },
            },
            tooltip: {
              bodyFont: {
                size: 14,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
            y: {
              ticks: {
                font: {
                  size: 14,
                },
              },
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
