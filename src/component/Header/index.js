import DashboardButton from './DashboardButton';
import './style.css';
import {useState} from "react";
import {Link} from 'react-router-dom';
const Header = () =>{
    let btnText = ["Dashboard"];
    const [active,setActive] = useState("");
    const handleMobileMenu = () =>{
        (active === "active")? setActive(""):setActive("active");
    }
    return(
        <>
            <header>
                <div className="container">
                    <nav>
                        <div className="header-logo">
                            <h1>CryptoTracker</h1>
                        </div>
                        <ul className="navigation">
                                <li className="nav-items"><Link to="/">Home</Link></li>
                                <li className="nav-items"><Link  to="/search">Search</Link></li>
                                <li className="nav-items"><Link to="/about">About us</Link></li>
                            <DashboardButton text={btnText}/>
                        </ul>
                        <div className="bars" id={active} onClick={handleMobileMenu}>
                            <i className="fa-solid fa-bars"></i>
                            <ul className='mobile-nav'>
                                <li className="nav-items"><Link to="/">Home</Link></li>
                                <li className="nav-items"><Link  to="/search">Search</Link></li>
                                <li className="nav-items"><Link to="/about">About us</Link></li>
                                <DashboardButton text={btnText}/>
                            </ul>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Header;