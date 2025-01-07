import { IProject, UserRole, Status } from './classes/Project';
import { ProjectsManager} from './classes/ProjectsManager';
import { toggleModal, ShowPopUp, HidePopUpWhenClosed } from './classes/GlobalFunctions';


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
            ShowPopUp('error', error.message);
            HidePopUpWhenClosed();
        }

    });

    projectForm.addEventListener('reset', () => {
        projectForm.reset();
        toggleModal('new-project-modal', false);
    });
} else {
    console.warn('New Project Form not found');
}
