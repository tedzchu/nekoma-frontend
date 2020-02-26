import React, { useEffect, useRef, useState } from 'react';
import Chartjs from 'chart.js';

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const chartConfig = {
  type: 'line',
  data: {
    labels: ['Some Day', 'Prior to', 'The Last', 'Recorded', 'Day', 'On here'],
    datasets: [
      {
        label: 'Nice',
        lineTension: 0,
        fill: false,
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  },
  options: {
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
  }
};

const Chart = () => {
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  // https://dev.to/vcanales/using-chart-js-in-a-function-component-with-react-hooks-246l
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt()
    ];
    updateDataset(0, data);
  };

  // eventually use this https://github.com/chartjs/chartjs-plugin-annotation

  return (
    <div>
      {/*<button onClick={onButtonClick}>Randomize!</button>*/}
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Chart;
