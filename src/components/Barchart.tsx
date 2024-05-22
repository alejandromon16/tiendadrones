import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState<any>({});
  const [viewType, setViewType] = useState('daily');

  useEffect(() => {
    if (viewType === 'daily') {
      setChartData({
        labels: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
        datasets: [
          {
            label: 'Monto Vendido (dia) Bs',
            data: [80, 20, 10, 100, 20, 25, 75],
            borderColor: '#00FF85',
            backgroundColor: '#00FF85',
          },
        ]
      });
    } else {
      setChartData({
        labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
        datasets: [
          {
            label: 'Monto Vendido (Hora) Bs',
            data: Array.from({ length: 24 }, () => Math.floor(Math.random() * 100)),
            borderColor: '#00FF85',
            backgroundColor: '#00FF85',
          },
        ]
      });
    }
    setChartOptions({
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context: { dataset: { label: string; }; raw: any; }) {
              const label = context.dataset.label || '';
              const dataPoint = context.raw;
              return `Promedio de Precio Convenido Bs ${context.raw}`;
            }
          }
        },
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: `Monto Vendido por (${viewType === 'daily' ? 'Día' : 'Hora'})`
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    })
  }, [viewType])

  return (
    <>
      <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white shadow-md'>
        <Bar data={chartData} options={chartOptions} />
        <button
          onClick={() => setViewType(viewType === 'daily' ? 'hourly' : 'daily')}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-400 hover:text-gray-200 text-gray-500 font-bold py-2 px-4 rounded">
          {viewType === 'daily' ? 'Ver por Hora' : 'Ver por Día'}
        </button>
      </div>
    </>
  );
};

export default BarChart;
