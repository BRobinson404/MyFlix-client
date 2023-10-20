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
            <p className="info-text-bold">Description:</p>
            <p className="info-text">{movie.Descriptions}</p>
            <p className="info-text-bold">Genre:</p>
            <p className="info-text">{movie.Genre.Name}</p>
            <p className="info-text-bold">Director:</p>
            <p className="info-text">{movie.Director.Name}</p>
            <p className="info-text-bold">Director Bio:</p>
            <p className="info-text">{movie.Director.Bio}</p>
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