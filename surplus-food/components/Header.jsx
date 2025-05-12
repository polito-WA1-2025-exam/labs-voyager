import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header(props) {
    return <>
        <Navbar fixed="top"/>
            <Container>
                <Navbar.Brand>Surplus Food</Navbar.Brand>
            </Container>
    </>;
}

export default Header;