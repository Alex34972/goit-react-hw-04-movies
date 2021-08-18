import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import LoaderComponent from '../../../component/loader';
import * as CastAPI from '../../../services/movies-api';
import noImageFound from '../../../image/no-image-icon-4.png';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    CastAPI.fetchCast(movieId)
      .then(response => setCast(response.cast))
      .finally(() => setIsLoading(false));
  }, [movieId]);

  return (
    <>
      {isLoading && <LoaderComponent />}
      <ul>
        {cast.map(({ profile_path, name, character }) => (
          <li key={name}>
            <img
              src={
                profile_path !== null
                  ? 'https://image.tmdb.org/t/p/w200' + profile_path
                  : `${noImageFound}`
              }
              alt={name}
            />
            <p>{name}</p>
            <p>
              <span>Character:</span>
              {character}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
