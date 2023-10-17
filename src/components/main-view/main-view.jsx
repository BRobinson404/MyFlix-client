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
  const [filteredMovies, setFilteredMovies] = useState(movies); // New state to hold filtered movies
  const [selectedGenre, setSelectedGenre] = useState(""); // New state to hold the selected genre

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

  const handleRemoveFavorite = async (movieId) => {
    try {
      const response = await fetch(
        `https://myflix404.herokuapp.com/users/${user.Username}/movies/${movieId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.ok) {
        setFavoriteMovies((prevMovies) =>
          prevMovies.filter((movie) => movie !== movieId)
        );
      } else {
        console.error("Failed to remove movie from favorites");
      }
    } catch (error) {
      console.error(error);
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
              Bio: movie.Director.Bio
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

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleDeregister = async () => {
    const confirmed = window.confirm("Are you sure you want to deregister?");
  
    if (confirmed) {
      try {
        const response = await fetch(
          `https://myflix404.herokuapp.com/users/${user.Username}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        if (response.ok) {
          console.log("User deregistered successfully");
          setUser(null);
          setToken(null);
          localStorage.clear();
          window.location.href = '/signup';
        } else {
          console.error("Failed to deregister user");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleGenreFilter = (selectedGenre) => {
    setSelectedGenre(selectedGenre);
  };

  useEffect(() => {
    // Filter movies based on the selected genre
    if (selectedGenre === "") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter((movie) => movie.Genre.Name === selectedGenre);
      setFilteredMovies(filtered);
    }
  }, [movies, selectedGenre]);

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
          onGenreFilter={handleGenreFilter}
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
          onGenreFilter={handleGenreFilter}
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
        onGenreFilter={handleGenreFilter}
      >
        {user && (
          <Link to={`/users/${user.Username}`} className="profile-link">
            Profile
          </Link>
        )}
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
          <Container>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : !filteredMovies || filteredMovies.length === 0 ? (
              <p>No movies found</p>
            ) : (
              <Row xs={3} lg={1} className="g-4">
                {filteredMovies.map((movie) => (
                  <Col key={movie.id} style={{ marginBottom: "20px" }}>
                    <Link to={`/movies/${movie.id}`} className="movie-link">
                      <MovieCard movie={movie} />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
        }
      />
      <Route
        path="/"
        element={
          <Container>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : !filteredMovies || filteredMovies.length === 0 ? (
              <p>No movies found</p>
            ) : (
              <Row xs={3} lg={1} className="g-4">
                {filteredMovies.map((movie) => (
                  <Col key={movie.id} style={{ marginBottom: "20px" }}>
                    <Link to={`/movies/${movie.id}`} className="movie-link">
                      <MovieCard movie={movie} />
                    </Link>
                  </Col>
                ))}
              </Row>
            )}
          </Container>
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
              onRemoveFavorite={handleRemoveFavorite}
              setUser={setUser}
              setToken={setToken}
            />
          }
        />
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
    </BrowserRouter>
  );
};