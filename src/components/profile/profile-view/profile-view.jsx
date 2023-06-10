import React, { useState, useEffect } from 'react'; // Importing necessary dependencies from React
import { Link } from 'react-router-dom'; // Importing Link component from react-router-dom
import { Button, Form, ListGroup } from 'react-bootstrap'; // Importing Button, Form, and ListGroup components from react-bootstrap

// State variables
export const ProfileView = ({ user, movies, onUpdateUser, onDeregister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    // useEffect hook to set initial values of input fields based on user's current information
    setUsername(user.Username);
    setPassword(user.Password);
    setEmail(user.Email);
    setBirthday(user.Birthday);
    setFavoriteMovies(user.FavoriteMovies);
  }, [user]);

  const handleUpdateUser = async () => {
    // Event handler for updating user information
    const updatedUser = {
      ...user,
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday.split("T")[0],
    };

    try {
      // Sending a PUT request to update the user information
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

      onUpdateUser(data); // Updating the user information using the onUpdateUser prop
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeregister = async () => {
    // Event handler for user deregistration
    try {
      // Sending a DELETE request to deregister the user
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
        onDeregister(); // Calling the onDeregister prop if the response is successful
      } else {
        console.error("Failed to deregister user");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async (movieId) => {
    // Event handler for removing a movie from favorites
    try {
      // Sending a DELETE request to remove the movie from favorites
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
        // Update the favoriteMovies state by filtering out the removed movie
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
      {filteredMovies.length === 0 ? (
        <p>No favorite movies found.</p>
      ) : (
        <ListGroup>
          {filteredMovies.map((movie) => (
            <ListGroup.Item key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.Title}</Link>
              <Button
                variant="danger"
                onClick={() => handleRemoveFavorite(movie.id)}
                className="ml-2"
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};