import { Link } from 'react-router-dom';

import './navbar.css'

export function NavElement({linkto, text}){
    return(
        <div className="nav-element"><Link to={linkto}>{text}</Link></div>
    )
}