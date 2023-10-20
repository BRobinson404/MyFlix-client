// ProfileView.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup, Row, Col, Container } from 'react-bootstrap';
import './profile-view.scss'; // Import the SCSS file

export const ProfileView = ({ user, movies, onUpdateUser, onDeregister}) => {
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
    <Container className="profile-container">
  
      <Row className="mt-4 justify-content-around">
      <Col xs={5} md={5} lg={5} className="mx-2">
          <Form className='profile-form'>
          <h1>Profile</h1>
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Group>
  
            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>
  
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </Form.Group>
  
            <Form.Group controlId="formDateOfBirth" className="mb-3">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                type="date"
                value={birthday ? birthday.split("T")[0] : ""}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Date of Birth"
              />
            </Form.Group>
  
            <Row className="button-row" >
              <Col className="update-btn-col">
                <Button variant="primary" onClick={handleUpdateUser}>
                  Save Changes
                </Button>
              </Col>
  
              <Col className="deregister-btn-col text-end">
                <Button variant="danger" onClick={onDeregister}>
                  Delete Account
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
  
        <Col xs={5} md={5} lg={5} className="mx-2 mt-2">
          <h1>Favorite Movies</h1>
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
        </Col>
      </Row>
    </Container>
  );
}  