import View from "./View.js";
import Client from "./Client.js";

// All of your javascript should go here
const saveBtn = document.querySelector(".btn-save");
const resetBtn = document.querySelector(".btn-reset");

let movieArray = [];

const input = document.querySelector("input");
const newClient = new Client();
const newView = new View();

input.addEventListener("change", async () => {
  if (input.value) {
    const data = await newClient.getMovieData(input.value);
    console.log(data);
    movieArray.push(data);
    newView.displayMovieOnPage(data);
    // console.log(movieArray);
    input.value = "";
  }
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("movies123", JSON.stringify(movieArray));
});

loadMovies();

function loadMovies() {
  const localStorageItem = localStorage.getItem("movies123");
  const parsed = JSON.parse(localStorageItem);

  if (localStorageItem) {
    movieArray.push(...parsed);

    movieArray.forEach((item) => {
      newView.displayMovieOnPage(item);
    });
  }
}

resetBtn.addEventListener("click", () => {
  newView.removeDisplay();
  localStorage.removeItem("movies123");
  movieArray.splice(0);
  //  or movieArray = [];
  console.log("Empty Array", movieArray);
});
