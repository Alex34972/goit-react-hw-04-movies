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
    `${BASE_URL}/3/trending/all/day?api_key=${KEY_API}`,
  );
}

//export function fetchBooks() {
//  return fetchWithErrorHandling(`${BASE_URL}/books`);
//}

//export function fetchBookById(bookId) {
//  return fetchWithErrorHandling(`${BASE_URL}/books/${bookId}?_expand=author`);
//}
