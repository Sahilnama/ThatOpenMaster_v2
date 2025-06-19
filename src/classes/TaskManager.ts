import { v4 as uuidv4 } from 'uuid';
import { Status } from './Project';

const taskStatus = {
    Pending: 'red',
    Active: 'orange',
    Completed: 'green',
};

export interface ITask {
    taskStatus: Status;
    taskDesc: string;
    taskDueDate: Date;
}

export class Task implements ITask {
    taskStatus: Status;
    taskDesc: string;
    taskDueDate: Date;
    color: string;
    id: string;

    constructor(data: ITask, id: string = uuidv4()) {
        for (const key in data) {
            this[key] = data[key];
        }
        this.taskDueDate = new Date(data.taskDueDate);
        this.color = taskStatus[`${data.taskStatus}`];
        this.id = id
    }
}

export class TaskManager {
    tasks: Task[] = [];
    onTaskCreate = () => {};
    onTaskSearch = (searchTerm: string) => {};
    onTaskDelete = (id: string) => {};

    constructor() {}

    newTask(data: ITask, id?: string) {
        const task = new Task(data);
        task.id = id || uuidv4();
        this.tasks.push(task);
        return task;
    }

    deleteTask(id: string) {
        const taskIndex = this.tasks.findIndex((tsk) => tsk.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            console.warn('task deleted, ID:', id);
        } else {
            console.error('Task not found with ID:', id);
        }
    }

    updateTask(id: string, updatedFields: Partial<ITask>) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            Object.assign(task, updatedFields);
            task.color = taskStatus[`${task.taskStatus}`];
        }
    }
    filterTasks(value: string) {
        const filteredTasks = this.tasks.filter((Task) => {
            return Task.taskDesc.includes(value);
        });
        return filteredTasks;
    }
}
