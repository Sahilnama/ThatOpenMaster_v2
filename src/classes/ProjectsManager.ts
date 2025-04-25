import { genColorFn, getNameInitials, show, toggleModal } from './GlobalFunctions';
import { IProject, Project } from './Project';

export class ProjectsManager {
    projectsList: Project[] = [];
    currentProject: Project;

    constructor() {
       
        const defaultProjectData: IProject = {
                    name: 'Sample Project',
                    description: 'The new project will replace this Sample project.',
                    finishDate: new Date(), // create a new date object from the form input as string
                    userRole: 'Engineer',
                    status: 'Active',
                };
        const sampleProject = this.newProject(defaultProjectData);
        sampleProject.ui.click();

    }

    newProject(data: IProject) {
        const projectNames = this.projectsList.map((project) => {
            return project.name;
        });

        const nameInUse = projectNames.includes(data.name);
        const nameIsShort = data.name.length < 5;

        if (nameInUse) {
            throw new Error(`Project with name ${data.name} already exists`);
        }

        if (nameIsShort) {
            throw new Error('Project name must be at least 5 characters long');
        }

        const project = new Project(data);
        project.ui.addEventListener('click', () => {
            const projectDetails = document.getElementById('project-details') as HTMLElement;
            const projectsPage = document.getElementById('projects-page') as HTMLElement;

            if(!projectDetails || !projectsPage){
                console.warn('Project Details or Projects Page not found');
                return;
            }
            projectDetails.classList.remove('hidden');
            projectsPage.classList.add('hidden');
            this.setDetailsPage(project);
            this.currentProject = project
            
        })
        
        this.projectsList.push(project);
        // project.ui.click()
        return project;
    }

    updateProject(data: IProject) {
        const project =  new Project(data)
        const projectNames = this.projectsList.map((project) => {
            return project.name;
        });

        const nameInUse = this.projectsList.some((project) => {
            return project.name === data.name && project !== this.currentProject;
        });
        
        if (nameInUse) {
            throw new Error(`Project with name ${data.name} already exists`);
        }
        
        if (data.name.length < 5) {
            throw new Error('Project name must be at least 5 characters long');
        }
        this.currentProject.name = data.name;
        this.currentProject.description = data.description;
        this.currentProject.status = data.status;
        this.currentProject.finishDate = data.finishDate;
        this.currentProject.userRole = data.userRole;
        this.currentProject.setCardUI();

        if(project){
            this.setDetailsPage(project)
        }
    }
//private method to set the details page
    private setDetailsPage(data: Project){
        const projectDetails = document.getElementById('project-details')
        if(!projectDetails){
            console.warn('Project Details not found');
            return;
        }
        const projectIcon = projectDetails.querySelector("[data-project-info='project-icon'") as HTMLElement;
        const name = projectDetails.querySelectorAll("[data-project-info='name'")
        const description = projectDetails.querySelectorAll("[data-project-info='description'")
        const status = projectDetails.querySelector("[data-project-info='status'")
        const role = projectDetails.querySelector("[data-project-info='role'")
        const cost = projectDetails.querySelector("[data-project-info='cost'")
        const finishDate = projectDetails.querySelector("[data-project-info='finishDate'")
        const taskContainer = document.getElementById("to-do-container") as HTMLElement
        if(projectIcon && name && description && status && role && cost && finishDate){
                projectIcon.textContent = getNameInitials(data.name);
                projectIcon.style.backgroundColor = data.color;
                name.forEach((element) => {
                    element.textContent = data.name;
                })
                description.forEach((element) => {
                    element.textContent = data.description;
                })  

                status.textContent = data.status;
                role.textContent = data.userRole;
                cost.textContent = `$${data.cost}`;
                // finishDate.textContent = data.finishDate.toDateString(); //this gives the date in the format "Wed Aug 25 2021"
                finishDate.textContent = data.finishDate.toISOString().split('T')[0]; //this gives the date in the format "2021-08-25"
                // Clear the task container
                taskContainer.innerHTML = '';

                // Append each task's UI to the task container
                data.taskList.forEach((task) => {
                taskContainer.appendChild(task.taskUi);
                this.currentProject.taskList = this.currentProject.taskManager.tasks;
        });
        }
    }

    setupEditForm(){ 
        const editModal = document.getElementById("edit-project-modal")
        if (!editModal) {return}
        const name = editModal.querySelector("[data-edit-project-info='name']") as HTMLInputElement
        if (name) { name.value =  this.currentProject.name }
        const description = editModal.querySelector("[data-edit-project-info='description']") as HTMLInputElement
        if (description) { description.value =  this.currentProject.description }

        const status = editModal.querySelector("[data-edit-project-info='status']") as HTMLInputElement
        if (status) { status.value = this.currentProject.status }

        const userRole = editModal.querySelector("[data-edit-project-info='userRole']") as HTMLInputElement
        if (userRole) { userRole.value = this.currentProject.userRole }

        const progress = editModal.querySelector("[data-edit-project-info='progress']") as HTMLInputElement
        if (progress) { progress.value = this.currentProject.progress*100 + '%' }

        const cost = editModal.querySelector("[data-edit-project-info='cost']") as HTMLInputElement
        if (cost) { cost.value = this.currentProject.cost.toString() }

       const finishDate = editModal.querySelector("[data-edit-project-info='finishDate']") as HTMLInputElement
        if (finishDate) { finishDate.value = (new Date(this.currentProject.finishDate)).toLocaleDateString('en-CA', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        }
    }

    getProject(id: string) {
        const project = this.projectsList.find((project) => {
            return project.id === id;
        });

        return project;
    }

    getProjectByName(name: string) {
        const project = this.projectsList.find((project) => {
            return project.name === name;
        });

        return project;
    }

    deleteProject(id: string) {
        const project = this.getProject(id);
        if (!project) {
            return;
        }

        project.ui.remove();
        const remainingProjects = this.projectsList.filter((project) => {
            return project.id !== id;
        });
        this.projectsList = remainingProjects;
    }

    exportToJSON(fileName: string = "projects") {
        const json = JSON.stringify(this.projectsList, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName
        a.click()
        URL.revokeObjectURL(url);
    }

    importFromJSON() {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'application/json'
        const reader = new FileReader()
        reader.addEventListener('load', ()=>{
            const json = reader.result
            if(!json){return}
            const projects: IProject[] = JSON.parse(json as string)
            for(const project of projects){
                try{
                    this.newProject(project)
                }catch(error){
                    console.error(error)
                }
            }
        })

        input.addEventListener('change', ()=>{
            const filesList = input.files
            if(!filesList){return}
            reader.readAsText(filesList[0])
        })
        input.click()
    }

    calcTotalCost() {
        return this.projectsList.reduce((acc, project) => {
            return acc + project.cost;
        }, 0);
    }



}
