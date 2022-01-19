import { getBestMovies, getMovieById } from "./get.js";
import { moveSlidesLeft, moveSlidesRight } from "./carousel.js";

const setImageDataAttribute = (element, attribute) => {
  element.setAttribute("data-movie-id", attribute);
};

export const handleMovieClick = (element) => {
  element.onclick = async () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
    let movieId = element.getAttribute("data-movie-id");
    let movie = await getMovieById(movieId);
    console.log(movie);
    document.getElementById("modal-image").src = movie.image_url;
    document.getElementById("modal-movie-title").textContent = movie.title;
    document.getElementById("modal-movie-genres").textContent =
      movie.genres.join(", ") + ".";
    document.getElementById("modal-movie-date").textContent =
      movie.date_published;
    document.getElementById("modal-movie-rating").textContent = movie.avg_vote;
    document.getElementById("modal-movie-imdb-rating").textContent =
      movie.imdb_score;
    document.getElementById("modal-movie-directors").textContent =
      movie.directors.join(", ") + ".";
    document.getElementById("modal-movie-actors").textContent =
      movie.actors.join(", ") + ".";
    document.getElementById("modal-movie-length").textContent =
      movie.duration + " mins";
    document.getElementById("modal-movie-countries").textContent =
      movie.countries.join(", ") + ".";
    document.getElementById("modal-movie-income").textContent =
      movie.worldwide_gross_income
        ? movie.worldwide_gross_income + " " + movie.budget_currency
        : "inconnues";
    document.getElementById("modal-movie-description").textContent =
      movie.long_description;
  };
};

const setImageUrls = (id, movies) => {
  let imageContainer = document.getElementById(id);
  for (let i = 0; i < imageContainer.children.length; i++) {
    imageContainer.children[i].src = movies[i].image_url;
    setImageDataAttribute(imageContainer.children[i], movies[i].id);
  }
};

const setImagesClickEvents = (id) => {
  let imageContainer = document.getElementById(id);
  for (let i = 0; i < imageContainer.children.length; i++) {
    handleMovieClick(imageContainer.children[i]);
  }
};

const main = async () => {
  const bestMoviesAllTimeLeftButton = document.getElementById(
      "best_movies_of_all_time_left_button"
    ),
    bestMoviesAllTimeRightButton = document.getElementById(
      "best_movies_of_all_time_right_button"
    ),
    bestComediesLeftButton = document.getElementById(
      "best_comedies_left_button"
    ),
    bestComediesRightButton = document.getElementById(
      "best_comedies_right_button"
    ),
    bestActionMoviesLeftButton = document.getElementById(
      "best_action_movies_left_button"
    ),
    bestActionMoviesRightButton = document.getElementById(
      "best_action_movies_right_button"
    ),
    bestAdventureMoviesLeftButton = document.getElementById(
      "best_adventure_movies_left_button"
    ),
    bestAdventureMoviesRightButton = document.getElementById(
      "best_adventure_movies_right_button"
    ),
    modal = document.getElementById("myModal"),
    closeModal = document.getElementsByClassName("close")[0];

  closeModal.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  const moveBestMoviesAllTimeLeft = moveSlidesLeft("best_movies_of_all_time"),
    moveBestMoviesAllTimeRight = moveSlidesRight("best_movies_of_all_time"),
    moveBestComediesLeft = moveSlidesLeft("best_comedies"),
    moveBestComediesRight = moveSlidesRight("best_comedies"),
    moveBestActionLeft = moveSlidesLeft("best_action_movies"),
    moveBestActionRight = moveSlidesRight("best_action_movies"),
    moveBestAdventureLeft = moveSlidesLeft("best_adventure_movies"),
    moveBestAdventureRight = moveSlidesRight("best_adventure_movies");

  bestMoviesAllTimeLeftButton.onclick = moveBestMoviesAllTimeLeft;
  bestMoviesAllTimeRightButton.onclick = moveBestMoviesAllTimeRight;
  bestComediesLeftButton.onclick = moveBestComediesLeft;
  bestComediesRightButton.onclick = moveBestComediesRight;
  bestActionMoviesLeftButton.onclick = moveBestActionLeft;
  bestActionMoviesRightButton.onclick = moveBestActionRight;
  bestAdventureMoviesLeftButton.onclick = moveBestAdventureLeft;
  bestAdventureMoviesRightButton.onclick = moveBestAdventureRight;

  const bestRatedMovies = await getBestMovies(
    "http://localhost:8000/api/v1/titles/?page_size=8&sort_by=-imdb_score,-votes"
  );

  const bestComedies = await getBestMovies(
    "http://localhost:8000/api/v1/titles/?page_size=7&genre=comedy&sort_by=-imdb_score,-votes"
  );

  const bestActionMovies = await getBestMovies(
    "http://localhost:8000/api/v1/titles/?page_size=7&genre=action&sort_by=-imdb_score,-votes"
  );

  const bestAdventureMovies = await getBestMovies(
    "http://localhost:8000/api/v1/titles/?page_size=7&genre=adventure&sort_by=-imdb_score,-votes"
  );

  const bestMovieEver = await getMovieById("9008642");

  let bestMovieImg = document.getElementById("best_movie_img");
  bestMovieImg.src = bestMovieEver.image_url;
  let bestMovieTitle = document.getElementById("jumbotron-title");
  bestMovieTitle.textContent = bestMovieEver.title;

  setImageDataAttribute(bestMovieImg, bestMovieEver.id);
  handleMovieClick(bestMovieImg);

  setImageUrls("best_movies_of_all_time", bestRatedMovies.slice(1));
  setImagesClickEvents("best_movies_of_all_time", bestRatedMovies.slice(1));
  setImageUrls("best_comedies", bestComedies);
  setImagesClickEvents("best_comedies", bestComedies);
  setImageUrls("best_action_movies", bestActionMovies);
  setImagesClickEvents("best_action_movies", bestActionMovies);
  setImageUrls("best_adventure_movies", bestAdventureMovies);
  setImagesClickEvents("best_adventure_movies", bestAdventureMovies);
};

window.onload = main;
