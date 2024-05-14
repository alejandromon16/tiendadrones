import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const data = {
    labels: ["Clientes", "Ofertantes"], // Labels for segments
    datasets: [
      {
        label: "Declines",
        data: [1, 1], // Example data
        backgroundColor: [
          "rgba(35, 35, 35, 0.8)", // Color for clients
          "#FFA800", // Color for ofertantes
        ],
        borderColor: ["rgba(35, 35, 35, 0.8)", "#FFA800"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Position of legend
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="w-full align-middle justify-end md:col-span-1 relative lg:h-[70vh] h-[50vh] m-auto py-10 px-4 border rounded-lg bg-white shadow-md">
        <h2 className="text-center">Cantidades de Rechazos</h2>
        <Pie data={data} options={options as any} />
      </div>
    </>
  );
};

export default PieChart;
