import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router';


function Header(props) {
    return <>
        <Navbar bg="primary">
            <Container fluid>
                <Link to="/">
                    {/* <Navbar.Brand>Surplus Food</Navbar.Brand> */}
                    <h1 style={{ color: "white" }}>Surplus Food</h1>
                </Link>
            </Container>
        </Navbar>

        <Outlet />
    </>;
}

export default Header;