import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      const fetchMovieData = async () => {
        const fetchedData = await fetch('https://myflix404.herokuapp.com/movies');
        const data = await fetchedData.json();
        const moviesFromAPI = data.map((movie) => {
          return {
              id: movie._id,
              Title: movie.Title,
              ImagePath: movie.ImagePath,
              Description: movie.Description,
              Genre: {
                Name: movie.Genre.Name
              },
              Director: {
                Name: movie.Director.Name
              },
              Featured: movie.Featured
              
            };
          });
          setMovies(moviesFromAPI);
};
        fetchMovieData();
    }, []);

    // Render the MovieView component if a movie is selected
    if (selectedMovie) {
      return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      );
    }

    // Render a message if the movie list is empty
    if (movies.length === 0) {
      return <div>The list is empty!</div>;
    }

    // Render the MovieCard components for each movie in the list
    return (
      <div>
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  };