import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, ListGroup } from 'react-bootstrap';

export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  useEffect(() => {
    // Set the initial values of the input fields to the user's current information
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    setDateOfBirth(user.DateOfBirth);
  }, [user]);

  const handleUpdateUser = () => {
    // Create a new user object with the updated information
    const updatedUser = {
      ...user,
      Username: username,
      Password: password,
      Email: email,
      DateOfBirth: dateOfBirth,
    };

    // Call the onUpdateUser function passed from the parent component
    onUpdateUser(updatedUser);
  };

  const handleDeregister = () => {
    // Call the onDeregister function passed from the parent component
    onDeregister(user);
  };

  // Filter the movies array to get the user's favorite movies
  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie._id));

  return (
    <div>
      <h2>Profile</h2>

      <Form>
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
          <Form.Control type="date" value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdateUser}>
          Update
        </Button>
      </Form>

      <Button variant="danger" onClick={handleDeregister}>
        Deregister
      </Button>

      <h3>Favorite Movies</h3>
      {favoriteMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ListGroup>
          {favoriteMovies.map(movie => (
            <ListGroup.Item key={movie._id}>
              <Link to={`/movies/${movie._id}`}>{movie.Title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};