// ProfileView.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup, Row, Col } from 'react-bootstrap';
import './profile-view.scss'; // Import the SCSS file

export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    setBirthday(user.Birthday);
    setFavoriteMovies(user.FavoriteMovies);
  }, [user]);

  const handleUpdateUser = async () => {
    const updatedUser = {
      ...user,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday.split("T")[0],
    };

    try {
      const response = await fetch(
        `https://myflix404.herokuapp.com/users/${user.Username}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      const data = await response.json();

      onUpdateUser(data);
    } catch (error) {
      console.error(error);
    }
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
          setUser(null);
          console.log("User deregistered successfully");
        } else {
          console.error("Failed to deregister user");
        }
      } catch (error) {
        console.error(error);
      }
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

  const filteredMovies = movies && movies.filter(movie => favoriteMovies.includes(movie.id));
  const trashCanIconUrl = 'https://www.svgrepo.com/show/10777/trash-can-with-cover.svg';

  return (
    <div className="profile-container">
      <h1>Profile</h1>

      <Form className="profile-form">
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control type="date" value={birthday ? birthday.split("T")[0] : ''} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>
      </Form>

      <h2>Favorite Movies</h2>
      {filteredMovies && filteredMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ListGroup className="favorite-list">
          {filteredMovies.map((movie) => (
            <ListGroup.Item key={movie.id}>
              <img
              src={trashCanIconUrl}
              alt="Remove"
              className="trash-can-icon"
              onClick={() => handleRemoveFavorite(movie.id)}
            />
              <Link to={`/movies/${movie.id}`}>{movie.Title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      <Row className="button-row">
        <Col xl={6} className="update-btn-col">
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Col>

        <Col xl={6} className="deregister-btn-col">
          <Button variant="danger" onClick={handleDeregister}>
            Delete Account
          </Button>
        </Col>
      </Row>
    </div>
  );
};
