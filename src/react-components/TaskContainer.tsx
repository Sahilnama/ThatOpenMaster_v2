import React from 'react';
import { Task, TaskManager } from '../classes/TaskManager';

interface Props {
    taskManager: TaskManager;
    onTaskEdit: (task: Task) => void;
}

export function TaskContainer(props: Props) {
    const [tasks, setTasks] = React.useState<Task[]>(props.taskManager.tasks); // Initialize with the first task

    props.taskManager.onTaskCreate = () =>{
        setTasks([...props.taskManager.tasks]);
        console.log("Task list updated");
    }

    props.taskManager.onTaskDelete = (id: string) => {
        props.taskManager.deleteTask(id);
        setTasks([...props.taskManager.tasks]);
    };
    const taskCards = tasks.map((task) => {
        if (!task) return null;
        return (
            // console.log(task)
            <React.Fragment key={task.id}>
                <div
                    className="to-do-item"
                    style={{ borderColor: task.color }}
                >
                    <div className="to-do-desc">
                        <div>{task.taskDesc}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {new Date(task.taskDueDate).toDateString()}
                        <div
                            className="action-btn"
                            id="action-btn"
                            style={{ marginLeft: 5 }}
                        >
                            <button
                                onClick={()=>props.onTaskEdit(task)}
                                className="void-btn edit-task"
                            >
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                            <button
                                onClick={() =>
                                    props.taskManager.onTaskDelete(task.id)
                                }
                                className="void-btn delete-task"
                            >
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    });
    return taskCards;
}
