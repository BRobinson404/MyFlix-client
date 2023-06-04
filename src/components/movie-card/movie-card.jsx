import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

/* This component can be used to render a list of movie cards and handle user interactions with them.*/
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card className="movie-card" onClick={() => onMovieClick(movie)}>
      <Card.Img
        variant="top"
        src={movie.ImagePath}
      />
      <Card.Body>
        <Card.Title className='card-title'>{movie.Title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Director: PropTypes.string.isRequired,
    Descriptions: PropTypes.string.isRequired,
    Genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    Featured: PropTypes.bool.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};