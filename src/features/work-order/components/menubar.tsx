import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

/**
 * 
 * @returns 
 */
export default function MenuBar() {
    return (
        <Nav as="ul">
            <Nav.Item as="li">
                <NavDropdown title="File">
                    <NavDropdown.Item href="#action3">New</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Open</NavDropdown.Item>
                    <NavDropdown.Divider/>
                    <NavDropdown.Item>Quit</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item as="li">
                <NavDropdown title="Edit">
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-1">Link</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
                <Nav.Link eventKey="link-2">Link</Nav.Link>
            </Nav.Item>
        </Nav>
    )
}