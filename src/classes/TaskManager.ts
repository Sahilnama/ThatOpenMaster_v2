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
        // this.setEditTaskForm(data)
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

    setTaskColor(status: string){
        let color = ''
        switch(status){
            case 'Pending':
            color = 'red'
            return color

            case 'Active':
            color = 'orange'
            return color

            case 'Completed':
            color = 'green'
            return color
        }
        
    }
    }


export class TaskManager{
    taskContainerUi: HTMLDivElement
    currentTask: Task
    tasks: Task[] = []

    constructor(container: HTMLDivElement){

        this.taskContainerUi = container;
        
    }

    newTask(data: ITask){
        const task = new Task(data)
        this.taskContainerUi.append(task.taskUi)
        this.tasks.push(task)
        this.currentTask = task
        this.setEditTaskForm()
        this.deleteTaskHandler()
        return task;
    }
    
    setEditTaskForm(){
        const editBtn = this.currentTask.taskUi.querySelector(".edit-task")
        editBtn?.addEventListener('click', ()=>{
            const editDesc = editForm.querySelector(".to-do-desc") as HTMLInputElement;
            const editDate = editForm.querySelector(".task-due-date") as HTMLInputElement;
            const editStatus = editForm.querySelector(".task-status") as HTMLSelectElement;
            
            //setting the current task from here
            if(editBtn)
            this.setCurrentTaskUsingButton(editBtn);
            //setting the current task till here
            
            hide(addTaskForm)
            if (editDesc) {
                editDesc.value = this.currentTask.taskDesc;
            }
            if (editDate) {
                editDate.value = new Date(this.currentTask.taskDueDate).toLocaleDateString('en-CA', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                });
            }
            if(editStatus){
                editStatus.value = this.currentTask.taskStatus;
            }
            console.log("editing task number: ",this.currentTask.id);
            show(editForm)
        })
    }

    deleteTaskHandler(){
        const deleteBtn = this.currentTask.taskUi.querySelector(".delete-task")
        deleteBtn?.addEventListener('click', ()=>{
            this.setCurrentTaskUsingButton(deleteBtn)
            this.currentTask.taskUi.remove()
            this.tasks = this.tasks.filter(task => task.id !== this.currentTask.id)
            console.warn("task deleted, ID:", this.currentTask.id);
        })
        
    }

    setCurrentTask(taskId: string) {
        const task = this.tasks.find(tsk => tsk.id === taskId);
        if (task) {
            this.currentTask = task;
        }
    }
    setCurrentTaskUsingButton(Btn:Element) {
        const currentTaskUI = Btn.closest('.to-do-item');
        const taskID = currentTaskUI?.getAttribute('id') as string
        this.setCurrentTask(taskID)}
    

}