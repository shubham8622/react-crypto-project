import DashboardButton from './DashboardButton';
import './style.css';
import {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import Switch from '@mui/material/Switch';
import { useDispatch } from 'react-redux';
import {changeMode} from '../../store/lightMode';
const Header = () =>{
    
    const dispatch = useDispatch();
    const [state,setState] = useState(false);
    const handleMode = () =>{
        setState((state)?false:true);
        dispatch(changeMode((state)?"dark":"light"));
    }
    let btnText = [
        {
            title:"Dashboard",
            url:"/dashboard"
        }
    ];
    const [active,setActive] = useState("");
    const handleMobileMenu = () =>{
        (active === "active")? setActive(""):setActive("active");
    }
    useEffect(()=>{
        document.body.className = localStorage.getItem("theme");
    },[state]);
    return(
        <>
            <header>
                <div className="container">
                    <nav>
                        <div className="header-logo">
                            <Link to = "/">CryptoTracker</Link>
                        </div>
                        <ul className="navigation">
                                <Switch checked = {state} onClick={handleMode}/>
                                <li className="nav-items"><Link to="/">Home</Link></li>
                                <li className="nav-items"><Link  to="/search">Search</Link></li>
                                <li className="nav-items"><Link to="/about">About me</Link></li>
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