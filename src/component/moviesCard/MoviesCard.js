import s from './MoviesCard.module.css';

export default function MoviesCad({ movie }) {
  return (
    <div className={s.movie__container}>
      <div className={s.movie_image__container}>
        <img
          src={
            movie.img !== null
              ? 'https://image.tmdb.org/t/p/w400' + movie.img
              : '../image/logo512.png'
          }
          alt={movie.name}
        />
      </div>
      <div>
        <h2 className={s.movie__name}>{movie.name}</h2>
        <p>User Score: {movie.score}</p>
        <h3>Overview:</h3>
        <p>{movie.overview}</p>
        <h3>Genres:</h3>
        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
      </div>
    </div>
  );
}
