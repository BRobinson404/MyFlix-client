import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

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
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
          // Redirect to the main view after successful login
          navigate('/movies');
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
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
      <Row>
        <Col xs={{ offset: 4 }} className="mt-2">
          <Button variant="primary" type="submit" className="align-self-center">
            Submit
          </Button>
        </Col>
        <Col xs={3}>
          <Link to="/signup">I don't have an account.</Link>
        </Col>
        <Col xs={{ offset: 2 }}></Col>
      </Row>
    </Form>
  );
};