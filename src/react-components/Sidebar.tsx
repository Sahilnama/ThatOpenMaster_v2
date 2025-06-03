import * as React from 'react';
import * as Router from 'react-router-dom';
export function Sidebar(){
    return (
        <aside id="sidebar">
        <img id="company-logo" src="./assets/company-logo.svg" alt="logo"/>
        <ul id="nav-buttons">
            <Router.Link to="/">
            <li id="projects-page-btn" className="blue-btn"><span className="material-symbols-rounded">apartment</span>&nbsp; Projects</li>
            </Router.Link>    
            <Router.Link to="/members">
            <li id="members-page-btn" className="blue-btn"><span className="material-symbols-rounded">group</span>&nbsp; Members</li>
            </Router.Link>    
        </ul>
    </aside>
    )
}