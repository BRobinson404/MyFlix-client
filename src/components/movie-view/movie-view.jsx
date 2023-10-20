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
        <Col className='image-col'>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </Col>

        <Col className='info-col'>
              <div>
                <h2>{movie.Title}</h2>
                <p>
                  <span className="info-text-bold">Description:</span>{" "}
                  <span className="info-text">{movie.Descriptions}</span>
                </p>
                <p>
                  <span className="info-text-bold">Genre:</span>{" "}
                  <span className="info-text">{movie.Genre.Name}</span>
                </p>
                <p>
                  <span className="info-text-bold">Director:</span>{" "}
                  <span className="info-text">{movie.Director.Name}</span>
                </p>
                <p>
                  <span className="info-text-bold">Director Bio:</span>{" "}
                  <span className="info-text">{movie.Director.Bio}</span>
                </p>
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