import React, { useState, useEffect } from 'react'; // Importing necessary dependencies from React
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import { Button, Form, ListGroup } from 'react-bootstrap'; // Importing Button, Form, and ListGroup components from react-bootstrap

// State variables
export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // Set the initial values of the input fields to the user's current information
    // useEffect hook to set initial values of input fields based on user's current information
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    setBirthday(user.Birthday);
    setFavoriteMovies(user.FavoriteMovies);
  }, [user]);

  const handleUpdateUser = () => {
    // Create a new user object with the updated information
    // Event handler for updating user information
    const updatedUser = {
      ...user,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    // Call the onUpdateUser function passed from the parent component
    onUpdateUser(updatedUser);
      // Sending a PUT request to update the user information
      onUpdateUser(data); // Updating the user information using the onUpdateUser prop
    // Event handler for user deregistration
      // Sending a DELETE request to deregister the user
        onDeregister(); // Calling the onDeregister prop if the response is successful
  };

  const handleDeregister = () => {
    // Call the onDeregister function passed from the parent component
    onDeregister(user);
    // Event handler for removing a movie from favorites
      // Sending a DELETE request to remove the movie from favorites
        // Update the favoriteMovies state by filtering out the removed movie
  };

  // Filter the movies array to get the user's favorite movies
  const favoriteMovies = movies.filter(movie => user.FavoriteMovies.includes(movie.id));
  const filteredMovies = movies.filter(movie => favoriteMovies.includes(movie.id)); // Filtering the movies array based on favoriteMovies

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
          <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
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
            <ListGroup.Item key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.Title}</Link>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};