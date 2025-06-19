import { FormEvent } from "react";
import { Project } from '../classes/Project';
interface Props {
    formName: string
    modalId: string;
    formId: string;
    onSubmit: (e:FormEvent) => void;
    project?: Project
}
const onClose = (formId: string) =>{
    const modal = document.getElementById(formId) as HTMLDialogElement;
    if (modal) {
        modal.close();
    }
}
export function ProjectForm(props: Props) {
    return (
        <dialog id={props.modalId}>
            <form id={props.formId}>
                        <h2>{props.formName}</h2>
                        <div className="input-list">
                            <div className="form-field-container">
                                <label>
                                    <span className="material-symbols-rounded">
                                        apartment
                                    </span>{' '}
                                    &nbsp; Name
                                </label>
                                <input
                                    data-edit-project-info="name"
                                    name="name"
                                    type="text"
                                    placeholder="Project name"
                                    defaultValue={props.project ? props.project.name : ''}
                                />
                                <p>Tip: Give a short name</p>
                            </div>
                            <div className="form-field-container">
                                <label>
                                    <span className="material-symbols-outlined">
                                        subject
                                    </span>{' '}
                                    &nbsp; Description
                                </label>
                                <textarea
                                    data-edit-project-info="description"
                                    name="description"
                                    cols={30}
                                    rows={5}
                                    placeholder="Project description"
                                    defaultValue={props.project ? props.project.description : ''} // Assuming project.description is a string
                                />
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="">
                                    <span className="material-symbols-outlined">
                                        account_circle
                                    </span>
                                    &nbsp; Role
                                </label>
                                <select
                                    data-edit-project-info="userRole"
                                    name="userRole"
                                    defaultValue={props.project ? props.project.userRole : ''} // Assuming project.userRole is a string
                                >
                                    <option>Architect</option>
                                    <option>Engineer</option>
                                    <option>Developer</option>
                                </select>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="">
                                    <span className="material-symbols-outlined">
                                        work_history
                                    </span>
                                    &nbsp; Status
                                </label>
                                <select
                                    data-edit-project-info="status"
                                    name="status"
                                    defaultValue={props.project ? props.project.status : ''} // Assuming project.status is a string
                                >
                                    <option>Active</option>
                                    <option>Inactive</option>
                                </select>
                            </div>
                            <div className="form-field-container">
                                <label htmlFor="">
                                    <span className="material-symbols-outlined">
                                        calendar_month
                                    </span>
                                    &nbsp; Finish Date
                                </label>
                                <input
                                    data-edit-project-info="finishDate"
                                    name="finishDate"
                                    type="date"
                                    defaultValue={props.project ? new Date(props.project.finishDate).toISOString().split('T')[0] : ''}
                                />
                            </div>
                        </div>
                        <div id="form-buttons">
                            <button
                                type="reset"
                                className="blank-btn"
                                onClick={() => onClose(props.modalId || '')}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={(e)=>{props.onSubmit(e)}}
                                type="submit"
                                className="blank-btn"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
        </dialog>
    );
}
