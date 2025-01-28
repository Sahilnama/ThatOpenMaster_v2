import { IProject, UserRole, Status } from './classes/Project';
import { ProjectsManager } from './classes/ProjectsManager';
import {toggleModal, ShowPopUp, HidePopUpWhenClosed, show, hide} from './classes/GlobalFunctions';
import { ITask, Task, TaskManager} from './classes/TaskManager';


const projectsList = document.getElementById('project-list') as HTMLElement;
const projectsManager = new ProjectsManager(projectsList);

const projectDetails = document.getElementById('project-details') as HTMLElement;
const projectsPage = document.getElementById('projects-page') as HTMLElement;
const membersPage = document.getElementById('members-page') as HTMLElement;

const taskList = document.getElementById("to-do-container") as HTMLDivElement
const taskManager = new TaskManager(taskList)
const editTaskForm = document.getElementById('edit-task-form')as HTMLElement

//Handling new project creation----start-----

const newProjectBtn = document.getElementById('new-project-btn');
if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
        toggleModal('new-project-modal', true);
    });
} else {
    console.warn('New Project Button not found');
}

const newProjectForm = document.getElementById('new-project-form');
if (newProjectForm && newProjectForm instanceof HTMLFormElement) {
    newProjectForm.addEventListener('submit', (e) => {
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
            projectsManager.newProject(projectData);
            newProjectForm.reset();
            toggleModal('new-project-modal', false);
        } catch (error) {
            ShowPopUp('error', error.message);
            HidePopUpWhenClosed();
        }
    });
    
    newProjectForm.addEventListener('reset', () => {
        newProjectForm.reset();
        toggleModal('new-project-modal', false);
    });
} else {
    console.warn('New Project Form not found');
}
//Handling new project creation----End-----

//Handling project import and export----Start-----
const importProjectBtn = document.getElementById('import-project-btn');
const exportProjectBtn = document.getElementById('export-projects-btn');

if(exportProjectBtn){
    exportProjectBtn.addEventListener('click', () => {
        projectsManager.exportToJSON();
    });
}


//Handling project import and export----End-----

//Handling project modification----Start-----
const editProjectForm = document.getElementById('edit-project-form');
if(editProjectForm && editProjectForm instanceof HTMLFormElement){
    editProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editProjectForm);
        const projectData: IProject = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            finishDate: formData.get('finishDate') ? new Date(formData.get('finishDate') as string) : new Date(), // create a new date object from the form input as string
            userRole: formData.get('userRole') as UserRole,
            status: formData.get('status') as Status,
        };
        try {
            toggleModal('edit-project-modal', false)
            projectsManager.updateProject(projectData)
        } catch (error) {
            ShowPopUp('error', error.message);
            HidePopUpWhenClosed();
        }
    });

    editProjectForm.addEventListener('reset', () => {
        editProjectForm.reset();
        toggleModal('edit-project-modal', false);
    });
}

const editProjectBtn = document.getElementById('edit-project-btn') as HTMLElement
editProjectBtn?.addEventListener('click', () => {
    const form = document.getElementById('edit-project-form') as HTMLFormElement;
    if(!form){
        console.warn('Edit Project Form not found');
        return;
    }
    toggleModal('edit-project-modal', true);
    projectsManager.setupEditForm();
})

//Handling project modification----End-----

//Side Bar buttons ----Start------

const projectsPageBtn = document.getElementById('projects-page-btn');
projectsPageBtn?.addEventListener('click', () => {
    projectDetails.classList.add('hidden');
    projectsPage.classList.remove('hidden');
    membersPage.classList.add('hidden')
})

const membersPageBtn = document.getElementById('members-page-btn');
membersPageBtn?.addEventListener('click', () => {
    projectDetails.classList.add('hidden');
    projectsPage.classList.add('hidden');
    membersPage.classList.remove('hidden');
})

//Side Bar buttons ----End------

//Handling ToDo's of a project----Start-----
const addProjectTaskBtn = document.getElementById('add-project-task-btn');
const addTaskForm = document.getElementById('add-task-form');

if (addTaskForm && addTaskForm instanceof HTMLFormElement) {
    addTaskForm.addEventListener('submit', (e) => {
        console.log("task form submit");
        e.preventDefault();
        const formData = new FormData(addTaskForm);
        const taskData: ITask = {
            taskStatus: formData.get('taskStatus') as Status,
            taskDesc: formData.get('taskDescription') as string,
            taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(),
        };
        try {
            console.log("new task");
            const task = taskManager.newTask(taskData)
            projectsManager.currentProject.taskList.push(task)
            console.log(task);
            addTaskForm.classList.add('hidden')
            addTaskForm.reset()
        } catch (error) {
            ShowPopUp('error', error.message);
            HidePopUpWhenClosed();
        }
    });

    addTaskForm.addEventListener('reset', () => {
        addTaskForm.classList.add('hidden');
    });
}

addProjectTaskBtn?.addEventListener('click', () => {
    hide(editTaskForm)
    console.log("button click");
    if (addTaskForm && addTaskForm instanceof HTMLFormElement) {
        addTaskForm.classList.remove("hidden");
        
    }
});

//Handling Task modification------Start-----
// const updateTaskBtn = ""

if (editTaskForm && editTaskForm instanceof HTMLFormElement){
    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editTaskForm);
        const taskData: ITask = {
            taskStatus: formData.get('taskStatus') as Status,
            taskDesc: formData.get('taskDescription') as string,
            taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(),
        };
        try {
            const currentTask = taskManager.currentTask;
            const zz = currentTask.setEditTaskForm(taskData)
            console.log(zz);
            
            currentTask.taskStatus = taskData.taskStatus;
            currentTask.taskDesc = taskData.taskDesc;
            currentTask.taskDueDate = taskData.taskDueDate;
            currentTask.color = taskData.taskStatus
            // console.log(currentTask);
            currentTask.updateTaskUI(taskData);
            hide(editTaskForm);
            
        } catch (error) {
            ShowPopUp('error', error.message);
            HidePopUpWhenClosed();
        }
    });
    
    editTaskForm.addEventListener('reset', () => {
        hide(editTaskForm)
    });

}

//Handling ToDo's of a project----End-----
    