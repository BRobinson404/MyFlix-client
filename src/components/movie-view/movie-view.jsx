import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movies, user, onAddFavorite }) => {
  const { id } = useParams();
  const movie = movies.length ? movies.find((movie) => movie.id === id) : null;

  const handleAddFavorite = () => {
    onAddFavorite(movie, user);
    alert('Movie added to favorites!');
  };

  useEffect(() => {
    console.log('User prop changed:', user);
  }, [user]);

  return (
    <div className="MovieView">
    <div className="movie-container">
      <Row className="movie-row">
        <Col>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </Col>

        <Col>
          <div>
            <h2>{movie.Title}</h2>
            <p>Description: {movie.Descriptions}</p>
            <p>Genre: {movie.Genre.Name}</p>
            <p>Director: {movie.Director.Name}</p>
            <p>Director Bio: {movie.Director.Bio}</p>
            <div>
              <Link to="/movies" className="btn btn-primary">
                Back
              </Link>
              {user && (
                <Button className="favorite-button" variant="primary" onClick={handleAddFavorite}>
                  Favorite &#x2665;
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </div>
);
};