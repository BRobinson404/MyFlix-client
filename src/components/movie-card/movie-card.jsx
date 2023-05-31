import PropTypes from 'prop-types';
/* This component can be used to render a list of movie cards and handle user interactions with them.*/
export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.Title}
      </div>
    );
  };

//PropTypes conditions for return MovieCard statement in main-view.jsx
MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired, // ID of the movie (string)
    Title: PropTypes.string.isRequired, // Title of the movie (string)
    ImagePath: PropTypes.string.isRequired, // Path to the movie image (string)
    Director: PropTypes.string.isRequired, // Director's name (string)
    Description: PropTypes.string.isRequired, // Description of the movie (string)
    Year: PropTypes.number.isRequired, // Year of release (number)
    Genres: PropTypes.arrayOf(PropTypes.string).isRequired, // Array of genres (array of strings)
    Featured: PropTypes.bool.isRequired, // Flag indicating if the movie is featured (boolean)
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired, // Event handler for when the movie is clicked (function)
};