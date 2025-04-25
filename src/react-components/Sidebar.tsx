import * as React from 'react';

export function Sidebar(){
    return (
        <aside id="sidebar">
        <img id="company-logo" src="./assets/company-logo.svg" alt="logo"/>
        <ul id="nav-buttons">
            <li id="projects-page-btn" className="blue-btn"><span className="material-symbols-rounded">apartment</span>&nbsp; Projects</li>
            <li id="members-page-btn" className="blue-btn"><span className="material-symbols-rounded">group</span>&nbsp; Members</li>
        </ul>
    </aside>
    )
}