import * as React from 'react';
import * as Router from 'react-router-dom';
import * as globalFunctions from '../classes/GlobalFunctions';
import { ProjectsManager } from '../classes/ProjectsManager';
import { Project,IProject ,UserRole } from '../classes/Project';
import { ProjectForm } from './ProjectForm';
import { DashboardCard } from './DashboardCard';
import { SearchBox } from './SearchBox';
import { TaskForm } from './TaskForm';
import { Task,ITask,TaskManager } from '../classes/TaskManager';
import { Status } from "../classes/Project"
import { TaskContainer } from './TaskContainer';
import { ShowPopUp } from '../classes/GlobalFunctions';
import { div } from 'three/examples/jsm/nodes/Nodes.js';
interface Props {
    projectsManager: ProjectsManager;
}

export function ProjectDetailsPage(props: Props) {
    const routeParams = Router.useParams<{ id: string }>();
    const project = props.projectsManager.getProject(routeParams.id ? routeParams.id : '0') 
    const [projectVersion, setProjectVersion] = React.useState(0);
    
    if (!project) {
        console.error('Project with id: ', routeParams.id, ' not found');
        return <> </>;
    }
    if (!props.projectsManager) {
        return <> </>;
    }
// const [currentProject, setCurrentProject] = React.useState<Project>(project);    
const taskManager = project.taskManager
//Handling new task creation----Start-----
const [showAddTaskForm, setShowAddTaskForm] = React.useState(false);
const onAddTaskClick = () => {
    setShowAddTaskForm(true);
}
const hideAddTaskForm = () => {
    setShowAddTaskForm(false);
};

const onAddTaskFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const addTaskForm = document.getElementById('add-task-form') as HTMLFormElement;
        e.preventDefault();
        const formData = new FormData(addTaskForm);
        const taskData: ITask = {
            taskDesc: formData.get('taskDescription') as string,
            taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(), // create a new date object from the form input as string
            taskStatus: (formData.get('taskStatus')==""? "Pending" : formData.get('taskStatus')) as Status,
        };
        const task = taskManager.newTask(taskData)
        console.log("New task created", task,"Updated task list:", taskManager.tasks);
        taskManager.onTaskCreate();
        hideAddTaskForm();
    }
//Handling new task creation----End-----
//Handling Edit project----Start-----
const onEditProjectClick = (project: Project) => {
    const editProjectModal = document.getElementById('edit-project-modal');
        if (!(editProjectModal&& editProjectModal instanceof HTMLDialogElement)) {return}
        else {
            console.warn('Updating Project',project);
            editProjectModal.showModal();
        }
}
const onEditProjectFormSubmit = (e: React.FormEvent) => {
    const editProjectForm = document.getElementById('edit-project-form') as HTMLFormElement;
    const editProjectModal = document.getElementById('edit-project-modal') as HTMLDialogElement;
    console.log("form submit");
    e.preventDefault();
            const formData = new FormData(editProjectForm);
            const projectData: Project = {
                name: formData.get('name') as string,
                description: formData.get('description') as string,
                finishDate: formData.get('finishDate') ? new Date(formData.get('finishDate') as string) : new Date(), // create a Edit date object from the form input as string
                userRole: formData.get('userRole') as UserRole,
                status: formData.get('status') as Status,
                icon: globalFunctions.getNameInitials(formData.get('name') as string),
                cost: 0,
                progress:0,
                id: project.id,
                color: project.color,
                taskManager: project.taskManager,
            };
            try {
                props.projectsManager.updateProject(project, projectData); 
                setProjectVersion(projectVersion + 1);
                editProjectForm.reset();
                editProjectModal.close()
                
            } catch (error) {
                ShowPopUp('error', error.message);}
    
}

//Handling Edit project----End-----


//Handling Edit task----Start-----

const [showEditTaskForm, setShowEditTaskForm] = React.useState(false);
const [editTask, setEditTask] = React.useState<Task | null>(null);
const onEditTaskClick = (task:Task) =>{
    setEditTask(task);
    setShowEditTaskForm(true);
}
const hideEditTaskForm = () => {
    setShowEditTaskForm(false);
    setEditTask(null);
};
const onEditTaskFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editTask) return;
    const editTaskForm = document.getElementById('edit-task-form') as HTMLFormElement;
    const formData = new FormData(editTaskForm);
    const updatedTaskData: Partial<ITask> = {
        taskDesc: formData.get('taskDescription') as string,
        taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(),
        taskStatus: (formData.get('taskStatus') === "" ? "Pending" : formData.get('taskStatus')) as Status,
    };
    taskManager.updateTask(editTask.id, updatedTaskData);
    console.log("Task updated", editTask);
    setEditTask(null);
    hideEditTaskForm();
};
//Handling Edit task----End-----

    return (
        <>
            <div
                className="page"
                id="project-details"
            >
                {/* <dialog id="edit-project-modal">
                    <form id="edit-project-form">
                        <h2>Edit Project</h2>
                        <div className="input-list">
                            <div className="form-field-container">
                                <label>
                                    <span className="material-symbols-rounded">
                                        apartment
                                    </span>{' '}
                                    &nbsp; Name
                                </label>
                                <input
                                    data-edit-project-info="name"
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
                                    data-edit-project-info="description"
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
                                <select
                                    data-edit-project-info="userRole"
                                    name="userRole"
                                >
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
                                <select
                                    data-edit-project-info="status"
                                    name="status"
                                >
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
                                    data-edit-project-info="finishDate"
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
                                Update
                            </button>
                        </div>
                    </form>
                </dialog> */}
                <ProjectForm project={project} formName='Update Task' modalId='edit-project-modal' formId='edit-project-form' onSubmit={onEditProjectFormSubmit}></ProjectForm>
                            
                <header>
                    <div>
                        <h2 data-project-info="name">{project.name}</h2>
                        <p data-project-info="description">
                            {project.description}
                        </p>
                    </div>
                </header>
                <div className="main-page-content">
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <DashboardCard
                            project={project}
                            headerContent={
                                <>
                                    <p
                                        data-project-info="project-icon"
                                        className="project-icon"
                                    >
                                        {project.icon}
                                    </p>
                                    <button
                                        id="edit-props.project-btn"
                                        className="blank-btn"
                                        onClick={()=>{onEditProjectClick(project)}}
                                    >
                                        Edit
                                    </button>
                                </>
                            }
                            mainContent={
                                <>
                                    <div style={{ margin: '5px 20px' }}>
                                        <h4 data-project-info="name">
                                            {project.name}
                                        </h4>
                                        <p data-project-info="description">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="dashboard-card-section">
                                        <div>
                                            <p>Status</p>{' '}
                                            <h5 data-project-info="status">
                                                {project.status}
                                            </h5>
                                        </div>
                                        <div>
                                            <p>Cost</p>{' '}
                                            <h5 data-project-info="cost">
                                                $44444
                                            </h5>
                                        </div>
                                        <div>
                                            <p>Role</p>{' '}
                                            <h5 data-project-info="role">
                                                {project.userRole}
                                            </h5>
                                        </div>
                                        <div>
                                            <p>Finish Date</p>{' '}
                                            <h5 data-project-info="finishDate">
                                                {project.finishDate.toDateString() as string}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-bar-fill">
                                            {' '}
                                            80%
                                        </div>
                                    </div>
                                </>
                            }
                        ></DashboardCard>
                        <DashboardCard
                            style={{ flexGrow: 1 }}
                            project={project}
                            headerContent={
                                <>
                                    <div id="to-do-header">
                                        <h4 style={{ width: '65px' }}>To-Do</h4>
                                        <SearchBox
                                            onChange={(value)=>{taskManager.onTaskSearch(value)}}
                                            placeholder="Search To-do"
                                        />
                                        <button onClick={onAddTaskClick}
                                            id="add-project-task-btn"
                                            className="void-btn"
                                            style={{ width: '35px' }}
                                        >
                                            <span className="material-symbols-outlined">
                                                add_task
                                            </span>
                                        </button>
                                    </div>
                                </>
                            }
                            mainContent={
                                <>
                                    {showAddTaskForm && (<TaskForm id={'add-task-form'} onClose={hideAddTaskForm} onSubmit={onAddTaskFormSubmit}/>)}
                                    {showEditTaskForm && (<TaskForm task={editTask} id={'edit-task-form'} onClose={hideEditTaskForm} onSubmit={onEditTaskFormSubmit}/>)}
                                    <div className="to-do-container" style={{flexGrow: 1}}>
                                    <TaskContainer key={0} taskManager={taskManager} onTaskEdit={onEditTaskClick}/>
                                    </div>
                                </>
                            }
                        ></DashboardCard>
                    </div>
                    <DashboardCard
                    project={project}
                    headerContent={<>3D Viewer</>}
                    mainContent={<div id="viewer-container" 
                    className="dashboard-card" 
                    style={{ minWidth: 0 }}>fff</div>}
                    >
                        
                    </DashboardCard>
                    
                </div>
            </div>
        </>
    );
}
