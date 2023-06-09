import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, } from 'react-bootstrap';

export const MovieView = ({ movies }) => {
  const { id } = useParams();

  const movie = movies.length ? movies.find((movie) => movie.id === id) : null;

  return (
    <div className="MovieView">

      <Row>
        {/* Display the movie's image using the imagePath */}
        <Col>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </Col>
      </Row>

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
    </div>
  );
};

