import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true, 
  maintainAspectRatio: false,
  scales:{
    x:{
      grid:{
        drawOnChartArea:false,
      },
    },
    y:{
      ticks:{
        display:false,
      },
      grid:{
        drawTicks:false,
        drawOnChartArea:false,
      },
      display:false,
    },
  },
  plugins: {
    legend: {
      display:false,
      position: 'top',
    },
   
  },
};

const labels = ['Home', 'Product', 'One Drill', 'Chili', 'Precision', 'Spinach', 'Prods'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [50,70,40,80,60,70,30],
      borderColor: '#0047FF',
      backgroundColor: '#0047FF',
      borderRadius: 5,
      barPercentage: 0.6,
    },
  ]
};

const BarChart = ()=> {
  return(
    <Bar options={options} data={data} redraw={true} width={"90%"} 
    />)
   
}

export default BarChart;