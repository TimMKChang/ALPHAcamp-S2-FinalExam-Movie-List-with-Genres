const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const dataRaw = [];
const dataByGenres = {};
let displayGenresNumber = 1;

const genresContainerHTML = document.querySelector("#genres-container");
const movieListContainer = document.querySelector("#movie-list-container");
const movieGenres = {
  "1": "Action",
  "2": "Adventure",
  "3": "Animation",
  "4": "Comedy",
  "5": "Crime",
  "6": "Documentary",
  "7": "Drama",
  "8": "Family",
  "9": "Fantasy",
  "10": "History",
  "11": "Horror",
  "12": "Music",
  "13": "Mystery",
  "14": "Romance",
  "15": "Science Fiction",
  "16": "TV Movie",
  "17": "Thriller",
  "18": "War",
  "19": "Western",
}

axios.get(INDEX_URL).then((response) => {
  dataRaw.push(...response.data.results);
  displayMovieGenres();
  classifyDataByGenres();
  displayMoiveListByGenres(displayGenresNumber);
  genresContainerHTML.firstChild.classList.add("active");
}).catch((err) => console.log(err));

function displayMovieGenres() {
  const numberOfGenres = Object.keys(movieGenres).length;
  let htmlContent = "";
  for (let i = 1; i <= numberOfGenres; i++) {
    htmlContent += `<a href="#" class="list-group-item list-group-item-action" data-genres="${i}">${movieGenres[i]}</a>`;
  }
  genresContainerHTML.innerHTML = htmlContent;
}

function classifyDataByGenres() {
  const numberOfGenres = Object.keys(movieGenres).length;
  for (let i = 1; i <= numberOfGenres; i++) {
    dataByGenres[i] = [];
  }
  dataRaw.forEach(movieData => {
    movieData.genres.forEach(genresNumber => {
      dataByGenres[genresNumber].push(movieData);
    });
  });
}

function displayMoiveListByGenres(genresNumber) {
  const data = dataByGenres[genresNumber];
  let htmlContent = "";
  data.forEach(movieData => {
    htmlContent += `
      <div class="card mb-3">
        <img src="${POSTER_URL + movieData.image}" class="card-img-top"
        alt="...">
        <div class="card-body">
          <h5 class="card-title">${movieData.title}</h5>
    `;
    movieData.genres.forEach(genresNumber => {
      htmlContent += `<span class="badge badge-info font-weight-normal mx-1">${movieGenres[genresNumber]}</span>`;
    });
    htmlContent += `
        </div>
      </div>
    `;
  });

  if (data.length === 0) {
    htmlContent += `<h3 class="card-title">No results found</h3>`;
  } else if (data.length <= 4) {
    for (let i = 0; i < 4; i++) {
      htmlContent += `<div class="card mb-3 pseudo-card"></div>`;
    }
  }

  movieListContainer.innerHTML = htmlContent;
}

genresContainerHTML.addEventListener("click", e => {
  if (e.target.matches(".list-group-item")) {
    const newGenresNumber = e.target.dataset.genres;
    genresContainerHTML.children[+displayGenresNumber - 1].classList.remove("active");
    genresContainerHTML.children[+newGenresNumber - 1].classList.add("active");
    displayMoiveListByGenres(newGenresNumber);
    displayGenresNumber = newGenresNumber;
  }
});


