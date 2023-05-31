import PropTypes from 'prop-types';

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            {/* Display the movie's image using the ImagePath */}
            <div>
                <img src={movie.ImagePath} />
            </div>

            {/* Display the movie's title */}
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>

            {/* Display the movie's description */}
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
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
      ImagePath: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Description: PropTypes.string.isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired
      }),
      Featured: PropTypes.bool.isRequired
    }).isRequired,
    onBackClick: PropTypes.func.isRequired
  };

  export default MovieView;