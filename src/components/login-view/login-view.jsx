import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  // Set up state variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create an object with username and password data
    const data = {
      Username: username,
      Password: password
    };

    // Send a POST request to the login endpoint
    fetch('https://myflix404.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          // If login is successful, store user and token in local storage
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          // Call the onLoggedIn callback with user and token
          onLoggedIn(data.user, data.token);
        } else {
          // If login fails, show an alert
          alert("No such user");
        }
      })
      .catch((e) => {
        // Catch any errors and show an alert
        alert('Something went wrong');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3" 
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};