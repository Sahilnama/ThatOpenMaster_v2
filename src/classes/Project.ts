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
    icon: string;
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
        this.icon = getNameInitials(this.name);
        this.id = uuidv4();
        this.taskList = []
        this.taskManager = new TaskManager(tasksContainer)
    }
    /*setUI(){
        if(this.ui){return}
        this.color = genColorFn(); 
        this.ui = document.createElement('div');
        this.ui.className = 'project-card';
        this.setCardUI() 
        
    } this code is converted to react 

    setCardUI(){
                    
    }*/

    
}
