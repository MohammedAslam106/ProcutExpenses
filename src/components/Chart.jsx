import 'chartjs-adapter-date-fns';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  scales:{
    x: {
        type: "time",
        time: {
          unit: "day",
        },
        ticks: {
          maxTicksLimit: 8,
        },
      },
    y:{
        beginAtZero:true,
        ticks:{
            maxTicksLimit: 8,
        }
    }
  },
  plugins: {
    legend:{
        display: false
    }
  },
};



export function Chart({data}) {
  return (
    <div className='m-2 m-auto' style={{width:'90%',height:'100%'}}>
        <Line options={options} data={data} />
    </div>
  );
}