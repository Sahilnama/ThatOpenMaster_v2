import * as React from 'react';
import{ toggleModal, ShowPopUp } from '../classes/GlobalFunctions'
import { IProject, Project, Status, UserRole } from '../classes/Project';
import { ProjectsManager } from '../classes/ProjectsManager';
import { ProjectCard } from './ProjectCard';
import { SearchBox } from './SearchBox';
import * as Router from 'react-router-dom';
import { div } from 'three/examples/jsm/nodes/Nodes.js';

interface Props{
    projectsManager: ProjectsManager
}

export function ProjectsPage(props: Props) {
    
    const [projects, setProjects] = React.useState<Project[]>(props.projectsManager.projectsList)  
    props.projectsManager.onProjectCreated = () => {setProjects([...props.projectsManager.projectsList])}
    props.projectsManager.onProjectDeleted = () => {setProjects([...props.projectsManager.projectsList])}

    const projectCards = projects.map((project) => {
        return  (
        <Router.Link to={`/project/${project.id}`} key = {project.id}>
                <ProjectCard project={project} />
        </Router.Link>) 
        })

    React.useEffect(() => {console.log("Project list updated:", projects);}, [projects])

  const onNewProjectClick = () => {
    //Handling new project creation----start-----
    const newProjectModal = document.getElementById('new-project-modal');
    if (!(newProjectModal&& newProjectModal instanceof HTMLDialogElement)) {return}
    else {
        console.warn('New Project creation');
        toggleModal(newProjectModal, true);
    }
  }

  const onNewProjectFormSubmit = (e: React.FormEvent) => {
    const newProjectForm = document.getElementById('new-project-form') as HTMLFormElement;
    const newProjectModal = document.getElementById('new-project-modal') as HTMLDialogElement;
    console.log("form submit");
    e.preventDefault();
            const formData = new FormData(newProjectForm);
            const projectData: IProject = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                finishDate: formData.get('finishDate') ? new Date(formData.get('finishDate') as string) : new Date(), // create a new date object from the form input as string
                userRole: formData.get('userRole') as UserRole,
                status: formData.get('status') as Status,
            };
            try {
                const project = props.projectsManager.newProject(projectData);
                console.log("Project created with :", project);    
                newProjectForm.reset();
                toggleModal(newProjectModal, false);
            } catch (error) {
                ShowPopUp('error', error.message);}
  }
   const onExportProjectsClick = () => {
    props.projectsManager.exportToJSON()
   }
   const onImportProjectsClick = () => {
    props.projectsManager.importFromJSON()
   }

   const onProjectSearch = (value: string) =>{
    
    setProjects(props.projectsManager.filterProjects(value));
   }

    return (
        <div
            className="page"
            id="projects-page"
        >
            <dialog id="new-project-modal">
                <form onSubmit={onNewProjectFormSubmit} id="new-project-form">
                    <h2>New Project</h2>
                    <div className="input-list">
                        <div className="form-field-container">
                            <label>
                                <span className="material-symbols-rounded">
                                    apartment
                                </span>{' '}
                                &nbsp; Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Project name"
                            />
                            <p>Tip: Give a short name</p>
                        </div>
                        <div className="form-field-container">
                            <label>
                                <span className="material-symbols-outlined">
                                    subject
                                </span>{' '}
                                &nbsp; Description
                            </label>
                            <textarea
                                name="description"
                                cols={30}
                                rows={5}
                                placeholder="Project description"
                                defaultValue={''}
                            />
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="">
                                <span className="material-symbols-outlined">
                                    account_circle
                                </span>
                                &nbsp; Role
                            </label>
                            <select name="userRole">
                                <option>Architect</option>
                                <option>Engineer</option>
                                <option>Developer</option>
                            </select>
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="">
                                <span className="material-symbols-outlined">
                                    work_history
                                </span>
                                &nbsp; Status
                            </label>
                            <select name="status">
                                <option>Active</option>
                                <option>Inactive</option>
                            </select>
                        </div>
                        <div className="form-field-container">
                            <label htmlFor="">
                                <span className="material-symbols-outlined">
                                    calendar_month
                                </span>
                                &nbsp; Finish Date
                            </label>
                            <input
                                name="finishDate"
                                type="date"
                            />
                        </div>
                    </div>
                    <div id="form-buttons">
                        <button
                            type="reset"
                            className="blank-btn"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="blank-btn"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </dialog>
            <header className="page-header">
                <h2>Projects</h2>
                <SearchBox onChange={(value) => onProjectSearch(value)} placeholder='Search project by name or description'/>
                <div style={{display: 'flex',alignItems: 'center',columnGap: 15,}}>
                    <span onClick={onExportProjectsClick} style={{ cursor: 'pointer' }} id="import-projects-btn" className="material-symbols-outlined">file_upload</span>
                    <span onClick={onImportProjectsClick} style={{ cursor: 'pointer' }}id="export-projects-btn" className="material-symbols-outlined">file_download</span>
                    <button onClick={onNewProjectClick} className="blue-btn"id="new-project-btn">
                        <span className="material-symbols-rounded">add</span>
                        &nbsp; New Project
                    </button>
                </div>
            </header>
            {projects.length>0 ? <div id="project-list">{projectCards}</div> : <div className="empty-list">No projects found</div>}
            
        </div>
    );
}
