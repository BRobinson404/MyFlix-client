import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      try {
        const response = await fetch('https://myflix404.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLoading(false);
        console.log('data', data);
        const moviesFromApi = data.map((movie) => {
          return {
              id: movie._id,
              Title: movie.Title,
              ImagePath: movie.ImagePath,
              Descriptions: movie.Descriptions,
              Genre: {
                Name: movie.Genre.Name
              },
              Director: {
                Name: movie.Director.Name
              },
              Featured: movie.Featured
              
            };
          });
          setMovies(moviesFromApi);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };
  
      fetchData();
    }, [token]);
  
    if (!user) {
      return (
        <>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </>
      );
    }
  
    if (selectedMovie) {
      return (
        <>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        </>
      );
    }
  
    if (movies.length === 0) {
      return (
        <>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
          <div>The list is empty!</div>
        </>
      );
    }
  
    return (
      loading ? (
        <p>Loading...</p>
      ) : !movies || !movies.length ? (
        <p>No movies found</p>
      ) : (
        <div>
          <button
            onClick={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
  
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
      )
    );
  };