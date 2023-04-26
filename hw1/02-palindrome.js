const elem = document.querySelector("input");

elem.addEventListener("input", handleInput);

//referenced this article: https://www.freecodecamp.org/news/js-basics-how-to-reverse-a-number-9aefc20afa8d/
function reverseNum(inputNum) {
  let inputArray = inputNum.split("");
  let inputReverse = inputArray.reverse();
  let inputNumReverse = inputReverse.join("");
  inputNum = inputNumReverse;

  return inputNum;
}

function handleInput(oninput) {
  let divElem = document.querySelector("div > div");

  let temp = elem.value;
  temp = reverseNum(temp);

  //Stand in for CSS
  divElem.style.color = "black";

  if (temp === elem.value) {
    divElem.textContent = "Yes. This is a palindrome!";

    //Stand in for CSS
    divElem.style.color = "orange";
  } else {
    divElem.textContent = "No. Try again.";
  }

  //error message
  if (parseFloat(elem.value) < 0) {
    divElem.textContent = "Error: please enter a positive number";
  }
}
