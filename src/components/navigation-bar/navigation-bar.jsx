import React, { useState } from 'react';
import { Navbar, Nav, Button, Dropdown, Offcanvas, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import "./navigation-bar.scss"

export const NavigationBar = ({ user, onLoggedOut, onGenreFilter }) => {
  const handleLogout = () => {
    onLoggedOut();
    window.location.href = '/login';
  };

  const [showGenreFilter, setShowGenreFilter] = useState(false);


  const handleGenreFilter = (selectedGenre) => {
    onGenreFilter(selectedGenre);
    setShowGenreFilter(false);
  };

  return (
    <>
    <Navbar
        id="custom-navigation-bar"
        className="navigation-bar"
        sticky="top"
        data-bs-theme="dark"
        expand="xl"
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/" id="custom-navbar-brand">
            MyFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                {!user && (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" id="custom-nav-link-login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup" id="custom-nav-link-signup">
                      Sign Up
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to="/" className="navbar-link" id="custom-nav-link-home">
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={`/users/${user.Username}`}>
                      Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={handleLogout} id="custom-nav-link-logout">
                      Logout
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {user && (
                <Nav id="custom-dropdown-menu">
                  <Dropdown>
                    <Dropdown.Toggle as={Button} variant="secondary" id="dropdown-genre">
                      Filter Genres
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="custom-dropdown-menu-items">
                      <Dropdown.Item onClick={() => handleGenreFilter('')}>All Genres</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Crime')}>Crime</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Science Fiction')}>Science Fiction</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Comedy-drama')}>Comedy-drama</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Superhero')}>Superhero</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Action')}>Action</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Drama')}>Drama</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Horror')}>Horror</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Thriller')}>Thriller</Dropdown.Item>
                      <Dropdown.Item onClick={() => handleGenreFilter('Romance')}>Romance</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};