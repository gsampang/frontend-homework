const backgroundColors = [
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(199, 199, 199, 0.8)",
  "rgba(83, 102, 255, 0.8)",
  "rgba(40, 159, 64, 0.8)",
  "rgba(210, 199, 199, 0.8)",
  "rgba(78, 52, 199, 0.8)",
];

const borderColors = [
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(255, 99, 132, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
  "rgba(159, 159, 159, 1)",
  "rgba(83, 102, 255, 1)",
  "rgba(40, 159, 64, 1)",
  "rgba(210, 199, 199, 1)",
  "rgba(78, 52, 199, 1)",
];

// url for the Thrones API
const url = "https://thronesapi.com/api/v2/Characters";

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    //Array for renderChart, holds a given house and number of people in it.
    let groups = [];
    let i = 0;

    //Get an array of all houses (get an array of all unique items from data by family)
    //From: https://plainenglish.io/blog/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    const unique = [...new Set(data.map((elem) => elem.family))];

    for (item of unique) {
      //Filter data by house for each house and get count. (filter data by each item in unique)
      const matches = data.filter((elem) => elem.family === item);

      //Update array for renderChart
      groups[i] = { house: item, count: matches.length };
      i++;
    }

    //Clean Data - special case rules to assemble 6 of the houses
    //from: https://www.w3schools.com/js/js_array_methods.asp
    let toAppend = [];
    toAppend[0] = { house: "Stark", count: 0 };
    toAppend[1] = { house: "Baratheon", count: 0 };
    toAppend[2] = { house: "Lannister", count: 0 };
    toAppend[3] = { house: "Greyjoy", count: 0 };
    toAppend[4] = { house: "Unknown", count: 0 };
    toAppend[5] = { house: "Tyrell", count: 0 };
    toAppend[6] = { house: "Lorath", count: 0 };
    toAppend[7] = { house: "Targaryen", count: 0 };

    for (let j = 0; j < groups.length; j++) {
      //1. Stark
      //check for Stark subtring. From: https://sentry.io/answers/string-contains-substring-javascript/
      //add count to new entries
      if (groups[j].house.includes("Stark")) {
        console.log(groups[j].count);
        toAppend[0].count += groups[j].count;
        console.log(toAppend[0]);
        delete groups[j];
      }
      //2. Baratheon
      else if (groups[j].house.includes("Baratheon")) {
        console.log(groups[j].count);
        toAppend[1].count += groups[j].count;
        console.log(toAppend[1]);
        delete groups[j];
      }
      //3. Lannister
      else if (groups[j].house.includes("Lan")) {
        console.log(groups[j].count);
        toAppend[2].count += groups[j].count;
        console.log(toAppend[2]);
        delete groups[j];
      }
      //4. Greyjoy
      else if (groups[j].house.includes("Greyjoy")) {
        console.log(groups[j].count);
        toAppend[3].count += groups[j].count;
        console.log(toAppend[3]);
        delete groups[j];
      }
      //5. Unknown
      else if (
        groups[j].house.includes("Unknown") ||
        groups[j].house.includes("None") ||
        groups[j].house.includes("Unkown") ||
        groups[j].house === ""
      ) {
        console.log(groups[j].count);
        toAppend[4].count += groups[j].count;
        console.log(toAppend[4]);
        delete groups[j];
      }
      //6. Tyrell
      else if (groups[j].house.includes("Tyrell")) {
        console.log(groups[j].count);
        toAppend[5].count += groups[j].count;
        console.log(toAppend[5]);
        delete groups[j];
      }
      //7. Lorath
      else if (groups[j].house.includes("Lorath")) {
        console.log(groups[j].count);
        toAppend[6].count += groups[j].count;
        console.log(toAppend[6]);
        delete groups[j];
      }
      //8. Targaryen
      else if (groups[j].house.includes("Targar")) {
        console.log(groups[j].count);
        toAppend[7].count += groups[j].count;
        console.log(toAppend[7]);
        delete groups[j];
      }
    }

    groups = groups.filter((elem) => elem != undefined);
    groups = groups.concat(toAppend);

    console.log(groups);

    return groups;
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Finally block, runs regardsless. Fill in");
  }
};

const renderChart = async () => {
  const donutChart = document.querySelector(".donut-chart");

  const data = await fetchData(url);
  console.log(data);

  const houses = [];
  const counts = [];

  for (let i = 0; i < data.length; i++) {
    houses[i] = data[i].house;
    counts[i] = data[i].count;
  }

  new Chart(donutChart, {
    type: "doughnut",
    data: {
      labels: houses,
      datasets: [
        {
          label: "My First Dataset",
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
