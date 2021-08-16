import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import * as ReviewsAPI from '../../../services/movies-api';

export default function Reviews() {
  const [review, setReview] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    ReviewsAPI.fetchReviews(movieId).then(response =>
      setReview(response.results),
    );
  }, [movieId]);

  return (
    <ul>
      {review.length > 0 ? (
        review.map(({ author, content }) => (
          <li key={author}>
            <h3>Author: {author}</h3>
            <p>{content}</p>
          </li>
        ))
      ) : (
        <li>
          <p>We don't have any reviews for this movie.</p>
        </li>
      )}
    </ul>
  );
}
