import React from 'react';
import { Link } from 'gatsby';
import { Container, Navbar, Nav } from 'react-bootstrap';
import NavStyle from './nav-style';
import SideDrawer from './side-drawer';

export default function NavBar() {
  return (
    <>
      <NavStyle>
        <nav className="nav-wrapper">
          <Navbar
            className="nav"
            collapseOnSelect
            expand="sm"
            bg="dark"
            variant="dark"
          >
            <Container>
              <Navbar.Brand as="li">
                <Link to="/">M</Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav as="ul" className="mr-auto">
                  <Nav.Item as="li">
                    <Link to="/schedule">Schedule / Scores</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/coaches">Coaches</Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Link to="/team">Team</Link>
                  </Nav.Item>
                </Nav>
                <Nav as="ul">
                  <Nav.Item as="li">
                    <SideDrawer />
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </nav>
      </NavStyle>
    </>
  );
}
