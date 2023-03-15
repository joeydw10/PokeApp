import { Container, Nav, Navbar } from "react-bootstrap";


export default function MainNav() {
  return (
    <>
      <Navbar
        className="fixed-top"
        variant="dark"
        bg="primary"
        expand="lg"
      >
        <Container>
          <Navbar.Brand>Pokedex</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">
                Home
              </Nav.Link>
              <Nav.Link href="/">
                PlaceHolder
              </Nav.Link>
            </Nav>
            &nbsp;
            &nbsp;
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
      <br />
    </>
  );
}
