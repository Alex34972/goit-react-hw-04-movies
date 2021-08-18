const BASE_URL = 'https://api.themoviedb.org';
const KEY_API = '37c24b28908b4a46c0a109ea73dbd155';
async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchMoviesTrending() {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/trending/movie/day?api_key=${KEY_API}`,
  );
}

export function fetchMovie(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${id}?api_key=${KEY_API}&language=en-US`,
  );
}

export function fetchReviews(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${id}/reviews?api_key=${KEY_API}&language=en-US&page=1`,
  );
}
export function fetchCast(id) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/movie/${id}/credits?api_key=${KEY_API}&language=en-US`,
  );
}
export function fetchSearchMovies(query) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/search/movie?api_key=${KEY_API}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
}
