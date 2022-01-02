export async function getBestMovies(url) {
  let bestMovies;
  let res;
  try {
    if (typeof url !== "string") {
      throw new TypeError("Url must be a string");
    }
    res = await fetch(url);
    if (res.ok) {
      let movies = await res.json();
      bestMovies = Object.values(movies.results);
    }
  } catch (e) {
    console.log(e);
  }
  return bestMovies;
}

export async function getMovieById(id) {
  let movie;
  let res;
  try {
    if (typeof id !== "string") {
      throw new TypeError("Id must be a string");
    }
    res = await fetch("http://localhost:8000/api/v1/titles/" + id);
    if (res.ok) {
      movie = await res.json();
    }
  } catch (e) {
    console.log(e);
  }
  return movie;
}
