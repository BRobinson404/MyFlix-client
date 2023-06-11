import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';

export const MovieView = ({ movies, user, onAddFavorite }) => {
  const { id } = useParams();

  const movie = movies.length ? movies.find((movie) => movie.id === id) : null;

  const handleAddFavorite = () => {
    onAddFavorite(movie);
  };

  useEffect(() => {
    console.log("User prop changed:", user);
  }, [user]);

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
      <Col xs={3} >
        <Link to="/movies" className="btn btn-primary">
          Back
        </Link>
      </Col>
      <Col xs={3}>
        {user && (
          <Button className="favorite-button" variant="primary" onClick={handleAddFavorite}>
            Favorite &#x2665;
          </Button>
        )}
      </Col>
    </Row>
    </div>
  );
};