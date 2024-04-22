import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);



const options = {
  responsive: true, 
  // maintainAspectRatio: false,
 
  plugins: {
    legend: {
      display:false,
      position: 'top',
    },
   
  },
};


export const data = {
  labels: ['Machine Design', 'Project Documentation', 'Cad Modeling', 'Ansys', '3D Modeling'],
  datasets: [
    {
     
      data: [20, 10, 8, 9, 15],
      backgroundColor: [
        '#0048FF',
        '#B7CBFF',
        '#8AAAFF',
        '#5C89FF',
        '#2E68FF',
      ],
     
      borderWidth: 1.5,
      margin:1
    },
  ],
};

const DoughnutChart = ()=> {
  return(
    <Doughnut options={options} data={data} redraw={true}   
    />)
   
}

export default DoughnutChart;