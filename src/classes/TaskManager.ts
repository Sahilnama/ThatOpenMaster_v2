import { v4 as uuidv4 } from 'uuid';
import { Status } from "./Project"
import { show, hide } from "./GlobalFunctions"


const taskStatus = {
    Pending : "red",
    Active: "orange",
    Completed: "green"
}

const addTaskForm = document.getElementById('add-task-form') as HTMLElement
const editForm = document.getElementById('edit-task-form') as HTMLElement

export interface ITask {
        taskStatus: Status
        taskDesc: string
        taskDueDate: Date
    }

export class Task implements ITask{
        taskStatus: Status
        taskDesc: string
        taskDueDate: Date
        taskUi: HTMLDivElement
        color: string
        id: string
        
    constructor(data: ITask,){
        for(const key in data){
            this[key] = data[key];
        }
        this.color = taskStatus[`${data.taskStatus}`]
        this.id = uuidv4()
        this.setTaskUI(data)
        this.setEditTaskForm(data)
    }

    setTaskUI(data: ITask){
        this.taskUi = document.createElement('div');
        this.taskUi.setAttribute('id', this.id)
        this.taskUi.className = 'to-do-item';
        this.taskUi.innerHTML = `
                        <div class="to-do-desc">
                            
                            <div>${data.taskDesc}</div>
                        </div>
                        <div style = "display: flex; align-items: center">${data.taskDueDate.toDateString()}
                        <div class="hidden action-btn" id = "action-btn" style = "margin-left:5px">
                            <button class="void-btn edit-task"><span class="material-symbols-outlined">edit</span></button>
                            <button class="void-btn delete-task"><span class="material-symbols-outlined">delete</span></button>
                          </div>
                        </div>`           
        this.taskUi.style.borderColor = this.setTaskColor(`${data.taskStatus}`) as string
        console.log(this.id);
    }

    setEditTaskForm(data: ITask){
        
        const editBtn = this.taskUi.querySelector(".edit-task")
        let taskID: string | null = null;
        editBtn?.addEventListener('click', ()=>{
            const editDesc = editForm.querySelector(".to-do-desc") as HTMLInputElement;
            const editDate = editForm.querySelector(".task-due-date") as HTMLInputElement;
            const editStatus = editForm.querySelector(".task-status") as HTMLSelectElement;
            taskID = this.taskUi.getAttribute('id')
            



            hide(addTaskForm)
            if (editDesc) {
                editDesc.value = data.taskDesc;
            }
            if (editDate) {
                editDate.value = new Date(data.taskDueDate).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            }
            if(editStatus){

                editStatus.value = data.taskStatus;
            }
            console.log("editing task number: ",taskID);
            show(editForm)
            return taskID
        })
    }

    deleteTask(){
        const deleteBtn = this.taskUi.querySelector(".delete-task")
        deleteBtn?.addEventListener('click', ()=>{

            console.log("task deleted");
            this.taskUi.remove()
        })
        this.taskUi.remove()
    }

    setTaskColor(status: string){
        let color = ''
        switch(status){
            case 'Pending':
            color = 'red'
            console.log(color);
            return color

            case 'Active':
            color = 'orange'
            console.log(color);
            return color

            case 'Completed':
            color = 'green'
            console.log(color);
            return color
        }
        
    }

    updateTaskUI(data: ITask){
        const editDesc = editForm.querySelector(".to-do-desc") as HTMLInputElement;
        const editDate = editForm.querySelector(".task-due-date") as HTMLInputElement;
        const editStatus = editForm.querySelector(".task-status") as HTMLSelectElement;
        const taskDesc = this.taskUi.querySelector(".to-do-desc")
        const taskDate = this.taskUi.querySelector(".task-due-date")
        const taskStatus = this.taskUi.querySelector(".task-status")
        
        if (editDesc) {
            data.taskDesc = editDesc.value;
        }
        if (editDate) {
            data.taskDueDate = new Date(editDate.value);
        }
        if (editStatus) {
            data.taskStatus = editStatus.value as Status;
        }
        
        if(taskDesc)
            taskDesc.textContent = data.taskDesc;
        if(taskDate)
            taskDate.textContent = data.taskDueDate.toDateString()
        if(taskStatus)
        console.log(this.taskUi);
        this.taskUi.style.borderColor = this.setTaskColor(`${data.taskStatus}`) as string
    }
    }


export class TaskManager{
    taskContainerUi: HTMLDivElement
    currentTask: Task

    constructor(container: HTMLDivElement){

        this.taskContainerUi = container;
    }

    newTask(data: ITask){
        const task = new Task(data)
        this.taskContainerUi.append(task.taskUi)
        this.currentTask = task
        return task;
    }

    updateCurrentTask(){
    }

}