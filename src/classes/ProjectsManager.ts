import { IProject, Project } from './Project';

export class ProjectsManager{
    projectsList: Project[] = [];
    ui: HTMLElement;

    constructor(container: HTMLElement){
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
                </div>`
    }

    newProject(data: IProject){
        const project = new Project(data);
        this.ui.append(project.ui);
        this.projectsList.push(project);
        return project;
    }

    getProject(){}

    deleteProject(){}

    exportToJSON(){}

    importFromJSON(){}
}