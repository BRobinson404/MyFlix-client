import{ useState } from 'react';
import React, { useState } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export const SignupView = () => {
  // Set up state variables for username, password, email, and birthday
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Create an object with username, password, email, and birthday data
    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    // Send a POST request to the users endpoint to create a new user
    fetch('https://myflix404.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        // If signup is successful, show an alert and reload the page
        alert('Signup successful');
        window.location.reload();
      } else {
        alert('Signup failed');
      }
    });
  };

  return (
    // Form component for user signup
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Form.Group controlId='formUsername'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='3'
          />
          </Form.Group>
        </Col>
     </Row>
      <Row>
        <Col>
          <Form.Group controlId='formPassword'>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
        </Col>
      </Row>

  <Row>
    <Col>
      <Form.Group controlId='formEmail'>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>
    </Col>
  </Row>

  <Row>
    <Col>
      <Form.Group controlId='formBirthday'>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type='date'
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>
    </Col>
  </Row>

  <Row>
    <Col>
      <Button type='submit'>Submit</Button>
    </Col>
  </Row>
</Form>
);
};