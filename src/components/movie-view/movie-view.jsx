import PropTypes from 'prop-types';
import { Row, Button } from 'react-bootstrap';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div className='MovieView'>
      <Row>
        {/* Display the movie's image using the imagePath */}
        <div>
          <img src={movie.ImagePath} className="img-fluid" alt="Movie Poster" />
        </div>
      </Row>

      <Row className="row-title">
        {/* Display the movie's title */}
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
      </Row>

      <Row className="row-title">
        {/* Display the movie's description */}
        <div>
          <span>Description: </span>
          <span>{movie.Descriptions}</span>
        </div>
      </Row>

      <Row className="row-title">
        {/* Display the movie's genre */}
        <div>
          <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
      </Row>

      <Row className="row-title">
        {/* Display the movie's director */}
        <div>
          <span>Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
      </Row>

      <Row>
          {/* Create a button for going back, calling the onBackClick function when clicked */}
          <Button onClick={onBackClick} variant="primary">Back</Button>
      </Row>
    </div>
  );
};


MovieView.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Descriptions: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Featured: PropTypes.bool
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

export default MovieView;