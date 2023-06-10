import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import { ProfileView } from "../profile/profile-view/profile-view";

import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle adding a movie to favorites
  const handleAddFavorite = async (movie) => {
    // Implement your logic to add the movie to favorites
  };

  // Fetch movies from the API on component mount or when the token changes
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        return;
      }
      setLoading(true);
      try {
        // Fetch movies from the API using the token for authentication
        const response = await fetch("https://myflix404.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setLoading(false);

        // Map the response data to the format expected by the MovieCard component
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Descriptions: movie.Descriptions,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
            Featured: movie.Featured,
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

  // Function to handle updating the user
  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Function to handle deregistering the user
  const handleDeregister = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // Render different views based on user authentication and movie data

  // If user is not logged in, render the login and signup views
  if (!user) {
    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  }
                />
                <Route path="/signup" element={<SignupView />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }

  // If no movies are available, render a message
  if (movies.length === 0) {
    return (
      <BrowserRouter>
        <NavigationBar
          user={user}
          onLoggedOut={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
          }}
        />
        <Container>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  setUser(null);
                  setToken(null);
                  localStorage.clear();
                }}
              >
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

  // Render the main view with the movie cards and movie details

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        <a href={`/users/${user.Username}`}>Profile</a>
      </NavigationBar>
      <Container>
        <Row className="justify-content-center">
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : !movies || !movies.length ? (
            <p>No movies found</p>
          ) : (
            movies.map((movie) => (
              <Col className="mb-4" key={movie.id} md={4}>
                <Link to={`/movies/${movie.id}`} className="movie-link">
                  <MovieCard movie={movie} />
                </Link>
              </Col>
            ))
          )}
        </Row>
      </Container>
      <Routes>
        <Route
          path="/movies/:id"
          element={
            <>
              {storedUser && movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : storedUser ? (
                <Col xs={12}>
                  <MovieView
                    movies={movies}
                    user={user}
                    storedUser={storedUser}
                    storedToken={storedToken}
                    onAddFavorite={handleAddFavorite}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
              )}
            </>
          }
        />
        <Route
          path="/users/:username"
          element={
            <ProfileView
              user={user}
              movies={movies}
              onUpdateUser={handleUpdateUser}
              onDeregister={handleDeregister}
              onAddFavorite={handleAddFavorite}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};