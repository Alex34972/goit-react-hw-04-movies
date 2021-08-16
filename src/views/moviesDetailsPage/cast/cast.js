import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as CastAPI from '../../../services/movies-api';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    CastAPI.fetchCast(movieId).then(response => setCast(response.cast));
  }, [movieId]);

  return (
    <ul>
      {cast.map(({ profile_path, name, character }) => (
        <li key={name}>
          <img
            src={
              profile_path !== null
                ? 'https://image.tmdb.org/t/p/w200' + profile_path
                : '../image/logo192.png'
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
  );
}
