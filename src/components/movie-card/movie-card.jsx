import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie }) => {
  return (
    <Col className="mb-4">
    <Card className="movie-card border-0">
    <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Link to={`/movies/${movie.id}`} className="movie-link">
          <Card.Img variant="top" src={movie.ImagePath} />
        </Link>
        <div className="card-title my-auto text-center">{movie.Title}</div>
      </Card.Body>
    </Card>
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Descriptions: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
};