import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import { Button, Spinner, Container, Row, Col } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile/profile-view/profile-view";

import "./main-view.scss";

  export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
  
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
  
    const handleAddFavorite = async (movie) => {
      try {
        const isFavorite = user.FavoriteMovies.includes(movie.id);
    
        if (isFavorite) {
          // Movie is already in favorites, display a message or handle accordingly
          console.log("Movie is already in favorites.");
        } else {
          // Add the movie to favorites
          const response = await fetch(
            `https://myflix404.herokuapp.com/users/${user.Username}/movies/${movie.id}`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
            }
          );
    
          if (response.ok) {
            const updatedUser = { ...user, FavoriteMovies: [...user.FavoriteMovies, movie.id] };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            console.log("Movie added to favorites:", movie.Title);
          } else {
            // Handle the case where adding the movie to favorites failed
            console.log("Failed to add movie to favorites:", movie.Title);
          }
        }
      } catch (error) {
        console.error(error);
        // Handle the error case
      }
    };
    
  
    useEffect(() => {
      const fetchData = async () => {
        if (!token) {
          return;
        }
        setLoading(true);
        try {
          const response = await fetch("https://myflix404.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await response.json();
          setLoading(false);
  
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
    }, [token])

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleDeregister = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

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
        <Link to={`/users/${user.Username}`} className="profile-link">Profile</Link>
      </NavigationBar>

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
          path="/movies"
          element={
            <>
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
              <div>
                <Link to={`/movies/${movie.id}`} className="movie-link">
                  <MovieCard movie={movie} />
                </Link>
              </div>
                      </Col>
                    ))
                  )}
                </Row>
              </Container>
            </>
          }
        />

        <Route
          path="/"
          element={
            <>
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
              <div>
                <Link to={`/movies/${movie.id}`} className="movie-link">
                  <MovieCard movie={movie} />
                </Link>
              </div>
                      </Col>
                    ))
                  )}
                </Row>
              </Container>
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