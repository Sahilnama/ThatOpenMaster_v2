import { genColorFn, getNameInitials, show, toggleModal } from './GlobalFunctions';
import { IProject, Project } from './Project';
import { Task, TaskManager } from './TaskManager';

export class ProjectsManager {
    projectsList: Project[] = [];
    currentProject: Project;
    onProjectCreated = () => {}
    onProjectDeleted = () => {}
    onProjectUpdated = () => {}
    constructor() {
       
        const defaultProjectData: IProject = {
                    name: 'Sample Project',
                    description: 'The new project will replace this Sample project.',
                    finishDate: new Date(), // create a new date object from the form input as string
                    userRole: 'Engineer',
                    status: 'Active',
                };
        const sampleProject = this.newProject(defaultProjectData);

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
        
        this.projectsList.push(project);
        this.onProjectCreated()
        // project.ui.click()
        return project;
    }

    updateProject(project:Project,data: IProject) {
        const nameInUse = this.projectsList.some((p) => {
            return p.name === data.name && p !== project
        });
        
        if (nameInUse) {
            throw new Error(`Project with name ${data.name} already exists`);
        }
        
        if (data.name.length < 5) {
            throw new Error('Project name must be at least 5 characters long');
        }
        for (const key in data) {
            project[key] = data[key];
        }
        this.onProjectUpdated()
        return project;
    }

    filterProjects(value: string) {
        const filteredProjects = this.projectsList.filter((project) =>{
        return project.name.toLowerCase().includes(value) || project.description.toLowerCase().includes(value)
    })
        return filteredProjects;
    }
//private method to set the details page
    

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

        const remainingProjects = this.projectsList.filter((project) => {
            return project.id !== id;
        });
        this.projectsList = remainingProjects;
        this.onProjectDeleted()
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
            const projects: Project[] = JSON.parse(json as string)
            for(const project of projects){
                try{
                   const readProject= this.newProject(project)
                //    console.log(project.taskManager);
                   readProject.taskManager = new TaskManager()
                     readProject.taskManager.tasks = project.taskManager.tasks.map((task) => {
                          return new Task(task);
                     });
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
