import React from "react";
import { Project } from "../classes/Project";


interface Props{
  project: Project
}

export function ProjectCard(props: Props){
    return (
        
            <div className="project-card">
                <div className="card-header">
                    <p
                        style={{ backgroundColor: '${this.color}' }}
                        className="project-icon"
                    >
                        {props.project.icon}
                    </p>
                    <div>
                        <h5 className="card-header-name">
                            {props.project.name}
                        </h5>
                        <p className="card-header-desc">
                            {props.project.description}
                        </p>
                    </div>
                </div>
                <div className="card-content">
                    <div className="card-property">
                        <p style={{ color: '#969696' }}>Status</p>
                        <p>{props.project.status}</p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: '#969696' }}>Role</p>
                        <p>{props.project.userRole}</p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: '#969696' }}>Cost</p>
                        <p>$1 Mn</p>
                    </div>
                    <div className="card-property">
                        <p style={{ color: '#969696' }}>Progress</p>
                        <p>60%</p>
                    </div>
                </div>
            </div>
        
    );
}
