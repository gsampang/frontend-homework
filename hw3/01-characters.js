// url for the Thrones API
const url = "https://thronesapi.com/api/v2/Characters";

let app = document.querySelector("#results");

const fetchData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      //Once all data has been fetched, append to container and format
      //then append container to the DOM
      for (elem of data) {
        let container = document.createElement("div");
        container.className = "container";

        let imgElement = document.createElement("img");
        imgElement.src = elem.imageUrl;
        imgElement.alt = elem.fullName;
        container.appendChild(imgElement);

        let nameElement = document.createElement("p");
        nameElement.className = "fullName";
        nameElement.textContent = elem.fullName;
        container.appendChild(nameElement);

        let titleElement = document.createElement("p");
        titleElement.className = "title";
        titleElement.textContent = elem.title;
        container.appendChild(titleElement);

        app.append(container);
      }
    })
    .catch((error) => console.error(error))
    .finally(() => console.log("Finally block, runs regardsless. Fill in"));
};

fetchData(url);
