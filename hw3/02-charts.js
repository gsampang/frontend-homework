const backgroundColors = [
  'rgba(54, 162, 235, 0.8)',
  'rgba(255, 206, 86, 0.8)',
  'rgba(255, 99, 132, 0.8)',
  'rgba(75, 192, 192, 0.8)',
  'rgba(153, 102, 255, 0.8)',
  'rgba(255, 159, 64, 0.8)',
  'rgba(199, 199, 199, 0.8)',
  'rgba(83, 102, 255, 0.8)',
  'rgba(40, 159, 64, 0.8)',
  'rgba(210, 199, 199, 0.8)',
  'rgba(78, 52, 199, 0.8)',
];

const borderColors = [
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(255, 99, 132, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
  'rgba(159, 159, 159, 1)',
  'rgba(83, 102, 255, 1)',
  'rgba(40, 159, 64, 1)',
  'rgba(210, 199, 199, 1)',
  'rgba(78, 52, 199, 1)',
];

// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    //Array for renderChart, holds a given house and number of people in it.
    const groups = [];
    let i = 0;

    //1. Get an array of all houses (get an array of all unique items from data by family)
    //From: https://plainenglish.io/blog/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    const unique = [...new Set(data.map((elem) => elem.family))];

    for (item of unique) {
      //2. Filter data by house for each house and get count. (filter data by each item in unique)
      let matches = data.filter(elem => elem.family === item);

      //Update array for renderChart
      groups[i] = {house: item, count: matches.length};
      i++;
    }

    return groups;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Finally block, runs regardsless. Fill in");
  }
}

const renderChart = async () => {
  const donutChart = document.querySelector('.donut-chart');

  const data = await fetchData(url);
  console.log(data);

  const houses = [];
  const counts = [];

  for (let i = 0; i < data.length; i++) {
    houses[i] = data[i].house;
    counts[i] = data[i].count;
  }

  new Chart(donutChart, {
    type: 'doughnut',
    data: {
      labels: houses,
      datasets: [
        {
          label: 'My First Dataset',
          data: counts,
          backgroundColor: backgroundColors,
          borderColor: borderColors,
          borderWidth: 1,
        },
      ],
    },
  });
};

renderChart();

