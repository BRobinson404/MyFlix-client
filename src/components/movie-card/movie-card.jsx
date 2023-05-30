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
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};