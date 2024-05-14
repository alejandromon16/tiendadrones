import React from 'react';
import { Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const ParkingLotBubbleChart = () => {
  const data = {
    datasets: [
      {
        label: 'Parqueo',
        data: [
          { x: 0.75, y: 5, r: 20 }, // 75% utilization, $5/day, 20 bookings
          { x: 0.50, y: 7, r: 15 }, // 50% utilization, $7/day, 15 bookings
          { x: 0.90, y: 8, r: 25 }, // 90% utilization, $8/day, 25 bookings
          { x: 0.30, y: 4, r: 10 }, // 30% utilization, $4/day, 10 bookings
        ],
        backgroundColor: '#FFA800',
        borderColor: '#ffaa00bf',
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: {
          display: true,
          text: 'Ratio de Utilizacion'
        }
      },
      y: {
        type: 'linear',
        title: {
          display: true,
          text: 'Promedio de Precio Diario (Bs)'
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const dataPoint = context.raw;
            return `${label} (Utilizacion: ${dataPoint.x * 100}%, Precio: Bs${dataPoint.y}, Reservas: ${dataPoint.r})`;
          }
        }
      },
      legend: {
        display: true,
        position: 'top' as const
      }
    }
  };

  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white shadow-md'>
      <h2 className='text-center'>Análisis de precios y utilización de estacionamientos</h2>
      <Bubble data={data} options={options as any} />
    </div>
  );
};

export default ParkingLotBubbleChart;
