// Add your code here
const input = document.querySelector("input");

input.addEventListener("keydown", handleKeyDown);

function handleKeyDown(oninput) {
  let divElem = document.querySelector("#givenText");

  //Perform the highlighting after user hits enter
  if (oninput.key === "Enter") {
    if (input.value !== "") {
      //Referenced: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
      const replace = input.value;
      const highLighted = divElem.innerHTML.replaceAll(
        replace,
        `<span style="background-color: #FFFF00">${input.value}</span>`
      );
      divElem.innerHTML = highLighted;
    }
  }

  //Reset the highlighting
  if (input.value === "") {
    divElem.innerHTML = divElem.textContent;
  }
}
