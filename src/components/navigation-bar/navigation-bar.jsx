import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const handleLogout = () => {
    // Call the onLoggedOut function passed from the parent component
    onLoggedOut();

    // Redirect the user to the login view
    window.location.href = "/login";
  };

  return (
    <Navbar className= "navigation-bar" variant="dark" expand="xl">
      <Navbar.Brand as={Link} to="/">
        MyFlix
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {!user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/login`}>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to={`/signup`}>
                Sign Up
              </Nav.Link>
            </>
          )}
          {user && (
            <>
              <Nav.Link as={Link} to={`/`} className="navbar-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={`/users/:Username`}>
                Profile
              </Nav.Link>
              <Nav.Link as={Link} to= {'/login'} onClick={handleLogout}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};