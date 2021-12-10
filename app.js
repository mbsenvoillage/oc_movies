import { getBestMovies, getMovieById } from "./get.js";

// const bestMovie = await getBestMovies(
//   "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score,-votes",
//   1
// );

const bestRatedMovies = await getBestMovies(
  "http://localhost:8000/api/v1/titles/?page_size=7&sort_by=-imdb_score,-votes"
);

const bestMovieEver = await getMovieById("9008642");

// const bestComedies = await getBestMovies(
//   "http://localhost:8000/api/v1/titles/?genre=comedy&sort_by=-imdb_score,-votes",
//   7
// );

// const bestActionMovies = await getBestMovies(
//   "http://localhost:8000/api/v1/titles/?genre=action&sort_by=-imdb_score,-votes",
//   7
// );

// const bestAdventureMovies = await getBestMovies(
//   "http://localhost:8000/api/v1/titles/?genre=adventure&sort_by=-imdb_score,-votes",
//   7
// );
