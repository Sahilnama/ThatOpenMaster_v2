import { Task } from '../classes/TaskManager';
interface Props {
    id: string;
    task?: Task | null;
    onClose?: () => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function TaskForm(props: Props) {
    return (
        <form
            id={props.id}
            className="task-form"
            onSubmit={props.onSubmit}
        >
            <div>
                <textarea
                    className="to-do-desc"
                    name="taskDescription"
                    id=""
                    cols={35}
                    rows={3}
                    placeholder="Task description"
                    defaultValue={
                        props.task ? props.task.taskDesc : ('' as string)
                    }
                />
                <input
                    name="taskDate"
                    type="date"
                    className="task-due-date"
                    defaultValue={
                        props.task
                            ? new Date(
                                  props.task.taskDueDate
                              ).toLocaleDateString('en-CA', {
                                  year: 'numeric',
                                  month: '2-digit',
                                  day: '2-digit',
                              })
                            : ''
                    }
                />
                <select
                    name="taskStatus"
                    className="task-status"
                    defaultValue={props.task ? props.task.taskStatus : ''}
                >
                    <option
                        value=""
                        className="hidden"
                    >
                        Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>

                <div
                    className="action-btn"
                    style={{
                        display: 'flex',
                        columnGap: 10,
                        marginTop: 10,
                    }}
                >
                    <button
                        id="add-task-btn"
                        className="void-btn"
                        type="submit"
                    >
                        <span className="material-symbols-outlined">check</span>
                    </button>
                    <button
                        onClick={props.onClose}
                        id="cancel-task-btn"
                        className="void-btn"
                        type="reset"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
            </div>
        </form>
    );
}
