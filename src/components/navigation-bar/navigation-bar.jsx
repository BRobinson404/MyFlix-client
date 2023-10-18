import React, { useState } from 'react';
import { Navbar, Nav, Button, Dropdown, Offcanvas, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, onGenreFilter }) => {
  const handleLogout = () => {
    onLoggedOut();
    window.location.href = '/login';
  };

  const location = useLocation();
  const hideGenreDropdown = location.pathname.includes('profile');

  const [showGenreFilter, setShowGenreFilter] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleGenreFilter = (selectedGenre) => {
    onGenreFilter(selectedGenre);
    setShowGenreFilter(false);
    setShowOffCanvas(false);
  };

  const handleLinkClick = () => {
    setShowOffCanvas(false);
  };

  const handleToggle = () => {
    setShowOffCanvas((prev) => !prev);
  };

  return (
    <>
      <Navbar id="custom-navigation-bar" className="navigation-bar" sticky="top" data-bs-theme="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" id="custom-navbar-brand">
            MyFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleToggle} />
          <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" show={showOffCanvas} onHide={() => setShowOffCanvas(false)}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                {!user && (
                  <>
                    <Nav.Link as={Link} to="/login" onClick={handleLinkClick}>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" id="custom-nav-link-login" onClick={handleLinkClick}>
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup" id="custom-nav-link-signup" onClick={handleLinkClick}>
                      Sign Up
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to="/" className="navbar-link" id="custom-nav-link-home" onClick={handleLinkClick}>
                      Home
                    </Nav.Link>
                    <Nav.Link as={Link} to={`/users/${user.Username}`} onClick={handleLinkClick}>
                      Profile
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login" onClick={() => { handleLogout(); handleLinkClick(); }} id="custom-nav-link-logout">
                      Logout
                    </Nav.Link>
                  </>
                )}
              </Nav>
              {!hideGenreDropdown && user && (
                <Nav id="custom-dropdown-menu">
                  <Dropdown>
                    <Dropdown.Toggle as={Button} variant="secondary" id="dropdown-genre">
                      Filter Genres
                    </Dropdown.Toggle>
                    <Dropdown.Menu id="custom-dropdown-menu-items">
                      <Dropdown.Item onClick={() => { handleGenreFilter(''); handleLinkClick(); }}>All Genres</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Crime'); handleLinkClick(); }}>Crime</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Science Fiction'); handleLinkClick(); }}>Science Fiction</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Comedy-drama'); handleLinkClick(); }}>Comedy-drama</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Superhero'); handleLinkClick(); }}>Superhero</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Action'); handleLinkClick(); }}>Action</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Drama'); handleLinkClick(); }}>Drama</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Horror'); handleLinkClick(); }}>Horror</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Thriller'); handleLinkClick(); }}>Thriller</Dropdown.Item>
                      <Dropdown.Item onClick={() => { handleGenreFilter('Romance'); handleLinkClick(); }}>Romance</Dropdown.Item>
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
