import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setmovies] = useState([
    {
        "id": 1,
        "Title": "The Shawshank Redemption",
        "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        "Genre": "Drama",
        "Director": "Frank Darabont",
        "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/20f2GThu22hp5MgCA4dg3bZ3gTS.jpg",
        "Year": "1994"
    },
    {
        "id": 2,
        "Title": "Inception",
        "Description": "A skilled thief is recruited to enter the dreams of a CEO and plant an idea, but as the mission goes deeper, reality and dream begin to blur together.",
        "Genre": "Science Fiction",
        "Director": "Christopher Nolan",
        "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
        "Year": "2010"
    },
    {
        "id": 3,
        "Title": "Jurassic Park",
        "Description": "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
        "Genre": "Science Fiction",
        "Director": "Steven Spielberg",
        "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg",
        "Year": "1993"
    },
    {
        "id": 4,
        "Title": "The Grand Budapest Hotel",
        "Description": "In the 1930s, the concierge of a legendary hotel in the fictional European country of Zubrowka teams up with one of his employees to prove his innocence after he is framed for murder.",
        "Genre": "Comedy-drama",
        "Director": "Wes Anderson",
        "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg",
        "Year": "2014"
    },
    {
        "id": 5,
        "Title": "The Dark Knight",
        "Description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "Genre": "Superhero",
        "Director": "Christopher Nolan",
        "ImageURL": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        "Year": "2008"
    },
]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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