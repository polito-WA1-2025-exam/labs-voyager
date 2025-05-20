import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { Link, Outlet } from 'react-router';


function Header(props) {
    return <>
        <Navbar bg="primary" className="justify-content-between">
            <Container fluid>
                <Link to="/">
                    {/* <Navbar.Brand>Surplus Food</Navbar.Brand> */}
                    <h1 style={{ color: "white"}}>Surplus Food</h1>
                </Link>
                <Navbar.Collapse className="justify-content-end">
                    <h3 style={{ color: "white" }}>
                    Go to <Link to="/shopping-cart" style={{color: "white"}}>Shopping Cart</Link>
                    </h3>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Outlet />
    </>;
}

export default Header;