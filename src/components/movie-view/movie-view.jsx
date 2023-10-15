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
      <Row>
        <Col md={4}>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </Col>

        <Col md={8}>
          <Row className="row-title">
            <Col>
              <h2>{movie.Title}</h2>
            </Col>
          </Row>

          <Row className="row-title">
            <Col>
              <span>Description: {movie.Descriptions}</span>
            </Col>
          </Row>

          <Row className="row-title">
            <Col>
              <span>Genre: {movie.Genre.Name}</span>
            </Col>
          </Row>

          <Row className="row-title">
            <Col>
              <span>Director: {movie.Director.Name}</span>
            </Col>
          </Row>

          <Row className="row-title">
            <Col>
              <span>Director Bio: {movie.Director.Bio}</span>
            </Col>
          </Row>

          <Row className="button-row">
            <Col>
              <Link to="/movies" className="btn btn-primary">
                Back
              </Link>
              {user && (
                <Button className="favorite-button" variant="primary" onClick={handleAddFavorite}>
                  Favorite &#x2665;
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
