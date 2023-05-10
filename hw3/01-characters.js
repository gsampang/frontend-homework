// url for the Thrones API
const url = 'https://thronesapi.com/api/v2/Characters';

// fetch(url);

let app = document.querySelector("#results");

const fetchData = (url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            //Once all data has been fetched, append to container and format
            //then append container to the DOM
            let container = document.createElement("div");
            container.className = "container";

            for (elem of data) {
                let figureElement = document.createElement("figure");
                figureElement.className = "figure";

                let imgElement = document.createElement("img");
                imgElement.src = elem.imageUrl;;
                imgElement.alt = elem.fullName;
                figureElement.appendChild(imgElement);

                let figcaptionElement = document.createElement("figcaption");
                figcaptionElement.textContent = elem.fullName;
                figureElement.appendChild(figcaptionElement);

                container.appendChild(figureElement);
                app.append(container);
            }
            
        })
        .catch((error) => console.error(error))
        .finally(() => console.log("Finally block, runs regardsless. Fill in"));
}

fetchData(url);