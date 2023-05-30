import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
      fetch('https://myflix404.herokuapp.com/movies')
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const moviesFromApi = data.map((movie) => {
            return {
              _id: movie.id,
              Title: movie.Title,
              ImagePath: movie.ImageURL,
              Description: movie.Description,
              Genre: {
                Name: movie.Genre.Name
              },
              Director: {
                Name: movie.Director.Name
              },
              Featured: movie.Featured.toString()
            };
          });
          setMovies(moviesFromApi);
        });
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
            key={movie.id}
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </div>
    );
  };