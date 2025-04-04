import "../css/Navbar.css";


function Navbar(){

    return <nav className="navbar">
        <div className="navbar-brand">
            <a href="/">Surplus Food</a>
        </div>
        <div className="navbar-links">
            <a href="/login">Login</a>
            <a href="/shopping-cart">Shopping Cart</a>
        </div>
    </nav>
}

export default Navbar;