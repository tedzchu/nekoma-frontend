import React from 'react';
import { Line } from 'react-chartjs-2';
import TrendsTable from '../../components/tables/TrendsTable';

const options = {
  legend: {
    display: false
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};

const generateData = activity => {
  const labels = [];
  const data = [];

  activity.forEach(element => {
    labels.push(element.date);
    data.push(element.count);
  });

  // https://www.educative.io/edpresso/how-to-use-chartjs-to-create-charts-in-react
  return {
    labels: labels,
    datasets: [
      {
        label: 'Nice',
        lineTension: 0,
        fill: false,
        data: data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };
};

const ProductActivity = props => {
  return (
    <div className="full-container">
      <Line data={generateData(props.restocks)} options={options} />
      <button onClick={props.toggle}>Add new restock</button>
      <TrendsTable restocks={props.restocks} />
    </div>
  );
};

export default ProductActivity;
