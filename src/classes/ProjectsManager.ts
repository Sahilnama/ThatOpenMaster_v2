import { genColorFn, getNameInitials } from './GlobalFunctions';
import { IProject, Project } from './Project';

export class ProjectsManager {
    projectsList: Project[] = [];
    ui: HTMLElement;

    constructor(container: HTMLElement) {
        this.ui = container;
        const defaultProjectData: IProject = {
                    name: 'Sample Project',
                    description: 'The new project will replace this Sample project.',
                    finishDate: new Date(), // create a new date object from the form input as string
                    userRole: 'Engineer',
                    status: 'Active',
                };
        this.newProject(defaultProjectData);
    }

    newProject(data: IProject) {
        const projectNames = this.projectsList.map((project) => {
            return project.name;
        });

        const nameInUse = projectNames.includes(data.name);

        if (nameInUse) {
            throw new Error(`Project with name ${data.name} already exists`);
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
        })
        this.ui.append(project.ui);
        this.projectsList.push(project);
        return project;
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

    exportToJSON() {}

    importFromJSON() {}

    calcTotalCost() {
        return this.projectsList.reduce((acc, project) => {
            return acc + project.cost;
        }, 0);
    }


}
