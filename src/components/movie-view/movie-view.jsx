import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

export const MovieView = ({ storedUser, storedToken, movies, similarMovies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);

  return (
    <div className="MovieView">

      <Row className="row-title">
        {/* Display the movie's title */}
        <Col>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </Col>
      </Row>

      <Row className="row-title">
        {/* Display the movie's description */}
        <Col>
          <span>Description: </span>
          <span>{movie.Descriptions}</span>
        </Col>
      </Row>

      <Row className="row-title">
        {/* Display the movie's genre */}
        <Col>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </Col>
      </Row>

      <Row className="row-title">
        {/* Display the movie's director */}
        <Col>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </Col>
      </Row>

      <Row>
        {/* Create a button for going back, using the Link component */}
        <Col>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </Col>
      </Row>

      <Row>
        {/* Display the movie's image using the imagePath */}
        <Col>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </Col>
      </Row>

      <Row>
        {/* Display the list of similar movies */}
        <Col>
          <h4>Similar Movies:</h4>
          {similarMovies.map((similarMovie) => (
            <Link key={similarMovie._id} to={`/movie/${similarMovie._id}`} className="similar-movie-link">
              {similarMovie.Title}
            </Link>
          ))}
        </Col>
      </Row>
    </div>
  );
};