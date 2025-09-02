import * as React from 'react';
import * as Router from 'react-router-dom';
import { Logout } from '../react-components/Login';
import { getAuth } from 'firebase/auth';
export function Sidebar(){
    return (
        <aside id="sidebar">
        <img id="company-logo" src="./assets/TheBIMDesk_Logo.png" alt="logo"/>
        <ul id="nav-buttons">
            <Router.Link to="/">
            <li id="projects-page-btn" className="blue-btn"><span className="material-symbols-rounded">apartment</span>&nbsp; Projects</li>
            </Router.Link>    
            <Router.Link to="/users">
            <li id="members-page-btn" className="blue-btn"><span className="material-symbols-rounded">group</span>&nbsp; Members</li>
            </Router.Link>    
        </ul>
        <button style={{width: "10%"}} onClick={getAuth().signOut}><span className="material-symbols-outlined">logout</span></button>
    </aside>
    )
}