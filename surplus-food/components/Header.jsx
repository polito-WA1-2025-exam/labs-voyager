import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header(props) {
    return <>
        <Navbar bg="primary">
            <Container fluid>
                {/* <Navbar.Brand>Surplus Food</Navbar.Brand> */}
                <h1 style={{color:"white"}}>Surplus Food</h1>   
            </Container>
        </Navbar>
    </>;
}

export default Header;