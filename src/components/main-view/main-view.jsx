import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

import './main-view.scss';

export const MainView = () => {
  // Retrieve stored user and token from local storage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  // Set up state variables
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch movies from the API when the token changes
    const fetchData = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      try {
        // Make API request to fetch movies
        const response = await fetch('https://myflix404.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLoading(false);

        // Transform the movie data and set the movies state
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
    // If there is no logged-in user, render login and signup forms
    return (
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }} />
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<LoginView onLoggedIn={(user, token) => {
                  setUser(user);
                  setToken(token);
                }} />} />
                <Route path="/signup" element={<SignupView />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }

  if (movies.length === 0) {
    // If there are no movies, render a "No movies found" message and logout button
    return (
      <BrowserRouter>
        <NavigationBar user={user} onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }} />
        <Container>
          <Row>
            <Col>
              <Button onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
              }}>
                Logout
              </Button>
            </Col>
            <Col>
              <div>No movies found</div>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }

  // Get the movie ID from the URL params
  const { id } = useParams();

  // Find the selected movie from the movies array
  const selectedMovieObj = movies.find(movie => movie.id === id);

  // Render the main view with logout button and movie cards
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }} />
      <Container>
        <Row className="justify-content-center">
          {loading ? (
            // If movies are loading, render a loading spinner
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : !movies || !movies.length ? (
            // If no movies found, render a message
            <p>No movies found</p>
          ) : (
            // Render movie cards
            movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={4}>
                <Link to={`/movie/${movie.id}`} className="movie-link">
                  <MovieCard movie={movie} />
                </Link>
              </Col>
            ))
          )}
        </Row>
        <Row>
          <Col>
            <Routes>
              <Route path="/movie/:id" element={<MovieView movies={movies} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
