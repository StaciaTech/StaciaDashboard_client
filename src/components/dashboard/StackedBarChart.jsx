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
  scales: {
    x: {
      stacked: true,
      grid:{
        // drawTicks:false,
        drawOnChartArea:false,
      },
    },
    y: {
      stacked: true,
      ticks:{
        // display:false,
        stepSize: 100
        
      },
      grid:{
        drawTicks:false,
        drawOnChartArea:true,
      },
      min: 0,
      max: 100,
      drawBorder:false,
      
     

    },
  },
  plugins: {
    legend: {
      display:false,
      position: 'top',
    },
   
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets : [
    {
      label: 'Direct Traffic',
      data: [15, 25, 20, 25, 15, 15, 25],
      borderColor: '#B7CBFF',
      backgroundColor: '#B7CBFF',
      barPercentage: 1
    },
    {
      label: 'Email Marketing',
      data: [25, 20, 25, 15, 15, 25, 20],
      borderColor: '#8AAAFF',
      backgroundColor: '#8AAAFF',
      barPercentage: 1
    },
    {
      label: 'Social Media',
      data: [20, 25, 15, 15, 25, 20, 25],
      borderColor: '#5C89FF',
      backgroundColor: '#5C89FF',
      barPercentage: 1
    },
    {
      label: 'Online Forum',
      data: [25, 15, 15, 25, 20, 25, 15],
      borderColor: '#2E68FF',
      backgroundColor: '#2E68FF',
      barPercentage: 1
    },
    {
      label: 'Search Engine',
      data: [15, 15, 25, 20, 25, 15, 15],
      borderColor: '#0048FF',
      backgroundColor: '#0048FF',
      barPercentage: 1
    }
  ]
};

const StackedBarChart = ()=> {
  return(
    <Bar options={options} data={data} redraw={true} 
    />)
   
}

export default StackedBarChart;