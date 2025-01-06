import { IProject, UserRole, Status } from './classes/Project';
import { ProjectsManager } from './classes/ProjectsManager';

const toggleModal = (id: string, state: true|false) => {
    const modal = document.getElementById(id);
    if (modal && modal instanceof HTMLDialogElement) {
        // check if modal is a dialog element as all html elements do not have toggleModal method
        if (state == false) {
            modal.close();
        } else if (state == true) {
            modal.showModal();
        }else{
            console.warn('Invalid state value');
        }
    } else {
        console.warn(`Modal named ${id} not found`);
    }
};

const projectsList = document.getElementById('project-list') as HTMLElement;
const projectsManager = new ProjectsManager(projectsList);

const newProjectBtn = document.getElementById('new-project-btn');
if (newProjectBtn) {
    newProjectBtn.addEventListener('click', () => {
        toggleModal('new-project-modal', true);
    });
} else {
    console.warn('New Project Button not found');
}

const projectForm = document.getElementById('new-project-form');
if (projectForm && projectForm instanceof HTMLFormElement) {
    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(projectForm);
        const projectData: IProject = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            finishDate: new Date(formData.get('finishDate') as string), // create a new date object from the form input as string
            userRole: formData.get('userRole') as UserRole,
            status: formData.get('status') as Status,
        };
        try{

            const project = projectsManager.newProject(projectData);
            projectForm.reset();
            toggleModal('new-project-modal', false);
        }
        catch(error){
            alert(error.message);
        }

    });

    projectForm.addEventListener('reset', () => {
        projectForm.reset();
        console.log("its running")
        toggleModal('new-project-modal', false);
    });
} else {
    console.warn('New Project Form not found');
}
