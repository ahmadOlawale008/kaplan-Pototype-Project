import { Stack, Typography } from "@mui/material";
import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useRef } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Line, getElementAtEvent, Bar, Scatter } from "react-chartjs-2";
ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);
export default function Example() {
  const ref = useRef();
  let arr = [];
  for (let i = 0; i <= 5; i++) arr.push(Math.floor(Math.random() * 100));
  const data = {
    labels: [100, 95, 60, 105, 20, 125],
    datasets: [
      {
        label: "Weekdays",
        data: [30, 15, 60, 16, 20, 80],
        tension: 0.4,
        pointRadius: 5,
        showLine: true,
        borderColor: "red",
        link: [1, 2, 3, 4, 5, 6],
      },
      {
        label: "Weekdays",
        data: [10, 15, 20, 25, 30, 35],
        tension: 0.4,
        pointRadius: 5,
        showLine: true,
        borderColor:"#ef6c00",
        link: [1, 2, 3, 4, 5, 6],
      },
      {
        label: "Weekdays",
        data: arr,
        tension: 0.4,
        pointRadius: 5,
        borderColor:"#6c63ff",
        showLine: true,
        link: [1, 2, 3, 4, 5, 6],
      },
    ],
  };
  const clickedFunct = (e) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const clickDatasetIndex = getElementAtEvent(ref.current, e)[0]
        .datasetIndex;
      const datasetIndex = getElementAtEvent(ref.current, e)[0].index;
      console.log(clickDatasetIndex, datasetIndex);
      console.log(data.datasets[clickDatasetIndex].link[datasetIndex]);
    }
  };
  return (
    <React.StrictMode>
      <Scatter
        width={"100%"}
        height={300}
        options={{
          maintainAspectRatio: false,
          aspectRatio: 1,
          plugins: {
            legend: {
              labels: {
                font: { family: "Raleway" },
                boxWidth: 5,
                boxHeight: 5,
                useBorderRadius: true,
                borderRadius: "50%",
                boxPadding: 0,
                usePointStyle: true,
              },
            },
          },
          scales: {
            x: {
              grid: { display: true },
              ticks: {
                font: {
                  family: "Raleway",
                },
              },
            },
            y: {
              ticks: {
                font: {
                  family: "Raleway",
                },
              },
            },
          },
        }}
        data={data}
        ref={ref}
        onClick={clickedFunct}
      ></Scatter>
    </React.StrictMode>
  );
}
