import { IProject, Project } from './Project';

export class ProjectsManager {
    projectsList: Project[] = [];
    ui: HTMLElement;

    constructor(container: HTMLElement) {
        this.ui = container;
        this.ui.innerHTML = `
        <div class="project-card">
                    <div class="card-header">
                        <p class="project-icon">DP</p>
                        <div>
                            <h5 class="card-header-name">Sample Project</h5>
                            <p class="card-header-desc">The new project will replace this Sample project.</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-property">
                            <p style="color: #969696;">Status</p>
                            <p>active</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Role</p>
                            <p>Eng</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Cost</p>
                            <p>$999</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Progress</p>
                            <p>100%</p>
                        </div>
                </div>`;
    }

    newProject(data: IProject) {
        const projectNames = this.projectsList.map((project) => {
            return project.name;
        });

        const nameInUse = projectNames.includes(data.name);

        if (nameInUse) {
            throw new Error(`Project with name ${data.name} already exists`);
            return;
        }

        const project = new Project(data);
        this.ui.append(project.ui);
        this.projectsList.push(project);
        return project;
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
