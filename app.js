import { getBestMovies, getMovieById } from "./get.js";

const setImageUrls = (id, arrayOfImages) => {
  let imageContainer = document.getElementById(id);
  for (let i = 0; i < imageContainer.children.length; i++) {
    imageContainer.children[i].src = arrayOfImages[i].image_url;
  }
};

const carouselStates = {
  best_movies_of_all_time: false,
  best_comedies: false,
  best_action_movies: false,
  best_adventure_movies: false,
};

const switchCarouselState = (carouselId) => {
  carouselStates[carouselId] = !carouselStates[carouselId];
};

const main = async () => {
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

  setImageUrls("best_movies_of_all_time", bestRatedMovies.slice(1));
  setImageUrls("best_comedies", bestComedies);
  setImageUrls("best_action_movies", bestActionMovies);
  setImageUrls("best_adventure_movies", bestAdventureMovies);
};

window.onload = main;
