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
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  tension:0.4,
  maintainAspectRatio: false,

    plugins: {
    legend: {
        display:false
    },
    title: {
      display: false
    },
  },
  scales: {
    
    y: {
      min: 0,
      max: 100,
      ticks: {
        // forces step size to be 50 units
        stepSize: 50
      }
    }
  
},
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [50,70,40,80,60,70,30],
      borderColor: '#0047FF',
      backgroundColor: '#0047FF',
    },
  ]
};

const LineChart = ()=> {
  return(
    <Line options={options} data={data} redraw={true}   />
  )
   
}

export default LineChart;