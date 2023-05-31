import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      {/* Display the movie's image using the imagePath */}
      <div>
        <img src={movie.imagePath} />
      </div>

      {/* Display the movie's title */}
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>

      {/* Display the movie's description */}
      <div>
        <span>Description: </span>
        <span>{movie.Descriptions}</span>
      </div>

      {/* Display the movie's genre */}
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>

      {/* Display the movie's director */}
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>

      {/* Create a button for going back, calling the onBackClick function when clicked */}
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
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