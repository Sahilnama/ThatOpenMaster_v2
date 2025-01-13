import { IProject, UserRole, Status } from './classes/Project';
import { ProjectsManager } from './classes/ProjectsManager';
import {toggleModal, ShowPopUp, HidePopUpWhenClosed} from './classes/GlobalFunctions';

const projectsList = document.getElementById('project-list') as HTMLElement;
const projectsManager = new ProjectsManager(projectsList);
const projectDetails = document.getElementById('project-details') as HTMLElement;
const projectsPage = document.getElementById('projects-page') as HTMLElement;

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

const projectsPageBtn = document.getElementById('projects-page-btn');
projectsPageBtn?.addEventListener('click', () => {
    projectDetails.classList.add('hidden');
    // projectDetails.classList.toggle();
    projectsPage.classList.remove('hidden');
})
    