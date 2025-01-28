import { v4 as uuidv4 } from 'uuid';
import { getNameInitials, genColorFn } from './GlobalFunctions';
import{ITask, Task, TaskManager} from './TaskManager.ts'

export type UserRole = 'Architect' | 'Engineer' | 'Developer';
export type Status = 'Pending' | 'Active' | 'Completed';
export interface IProject {
    name: string;
    description: string;
    status: Status;
    userRole: UserRole;
    finishDate: Date;
}
export class Project implements IProject {
    //To satisfy the IProject interface
    name: string;
    description: string;
    status: Status;
    userRole: UserRole;
    finishDate: Date;

    //class specific properties
    ui: HTMLDivElement;
    cost: number = 0;
    progress: number = 0;
    id: string
    color: string;
    taskList: Task [];
    taskManager: TaskManager


    constructor(data: IProject) {
        for(const key in data){
            this[key] = data[key];
        }
        const tasksContainer = document.getElementById("to-do-container") as HTMLDivElement
        // this.name = data.name;
        // this.description = data.description;
        // this.status = data.status;
        // this.userRole = data.userRole;
        // this.finishDate = data.finishDate;
        this.setUI();
        this.id = uuidv4();
        this.taskList = []
        this.taskManager = new TaskManager(tasksContainer)
    }
    setUI(){
        if(this.ui){return}
        this.color = genColorFn(); 
        this.ui = document.createElement('div');
        this.ui.className = 'project-card';
        this.setCardUI()
                  
            }

    setCardUI(){
        this.ui.innerHTML = `
                    <div class="card-header">
                        <p style = "background-color:${this.color}" class="project-icon">${getNameInitials(this.name)}</p>
                        <div>
                            <h5 class="card-header-name">${this.name}</h5>
                            <p class="card-header-desc">${this.description}</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div class="card-property">
                            <p style="color: #969696;">Status</p>
                            <p>${this.status}</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Role</p>
                            <p>${this.userRole}</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Cost</p>
                            <p>$${this.cost}</p>
                        </div>
                        <div class="card-property">
                            <p style="color: #969696;">Progress</p>
                            <p>${this.progress * 100}%</p>
                        </div>
                    </div>`;
    }

    
}
