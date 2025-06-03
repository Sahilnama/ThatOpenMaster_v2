import { v4 as uuidv4 } from 'uuid';
import { Status } from "./Project"


const taskStatus = {
    Pending : "red",
    Active: "orange",
    Completed: "green"
}

export interface ITask {
        taskStatus: Status
        taskDesc: string
        taskDueDate: Date
    }

export class Task implements ITask{
        taskStatus: Status
        taskDesc: string
        taskDueDate: Date
        color: string
        id: string
        
    constructor(data: ITask,){
        for(const key in data){
            this[key] = data[key];
        }
        this.taskDueDate = new Date(data.taskDueDate);
        this.color = taskStatus[`${data.taskStatus}`]
        this.id = uuidv4()
    }
}

export class TaskManager{
    tasks: Task[] = []
    onTaskCreate = () => {}
    onTaskDelete = (id:string) => {}

    constructor(){}

    newTask(data: ITask){
        const task = new Task(data)
        this.tasks.push(task)
        return task;
    }
    
    deleteTask(id: string){
        const taskIndex = this.tasks.findIndex(tsk => tsk.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            console.warn("task deleted, ID:", id);
        } else {
            console.error("Task not found with ID:", id);
        }

    }

    updateTask(id: string, updatedFields: Partial<ITask>) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
        Object.assign(task, updatedFields);
       task.color = taskStatus[`${task.taskStatus}`];
    }
}
}