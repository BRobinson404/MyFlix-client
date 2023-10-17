import React from 'react';
import { Navbar, Nav, Button, Dropdown } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';

const NavigationBar = ({ user, onLoggedOut, onGenreFilter }) => {
  const history = useHistory();

  const handleLogout = () => {
    onLoggedOut();
    history.push('/login');
  };

  const renderLinks = () => {
    if (!user) {
      return (
        <>
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/" className="navbar-link">
            Home
          </NavLink>
          <NavLink to={`/users/${user.Username}`}>Profile</NavLink>
          <Nav.Link as={Link} to="/login" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </>
      );
    }
  };

  const renderDropdownItems = () => {
    const genres = [
      'All Genres',
      'Crime',
      'Science Fiction',
      'Comedy-drama',
      'Superhero',
      'Action',
      'Drama',
      'Horror',
      'Thriller',
      'Romance',
    ];

    return genres.map((genre, index) => (
      <Dropdown.Item key={index} onClick={() => handleGenreFilter(genre)}>
        {genre}
      </Dropdown.Item>
    ));
  };

  return (
    <Navbar className="navigation-bar" variant="dark" expand="xl">
      <Navbar.Brand as={Link} to="/">
        MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">{renderLinks()}</Nav>
        {user && (
          <Nav>
            <Dropdown onToggle={(isOpen) => setShowGenreFilter(isOpen)}>
              <Dropdown.Toggle as={Button} variant="secondary" id="dropdown-genre">
                Filter Genres
              </Dropdown.Toggle>
              <Dropdown.Menu>{renderDropdownItems()}</Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
