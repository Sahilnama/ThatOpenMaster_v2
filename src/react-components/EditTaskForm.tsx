
<form
                                id="edit-task-form"
                                className="hidden task-form"
                            >
                                <div>
                                    <textarea
                                        className="to-do-desc"
                                        name="taskDescription"
                                        id=""
                                        cols={25}
                                        rows={3}
                                        placeholder="Task description"
                                        defaultValue={''}
                                    />
                                    <input
                                        name="taskDate"
                                        type="date"
                                        className="task-due-date"
                                    />
                                    <select
                                        name="task-status"
                                        className="task-status"
                                    >
                                        <option className="hidden">
                                            Status
                                        </option>
                                        <option>Pending</option>
                                        <option>Active</option>
                                        <option>Completed</option>
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
                                            <span className="material-symbols-outlined">
                                                check
                                            </span>
                                        </button>
                                        <button
                                            id="cancel-task-btn"
                                            className="void-btn"
                                            type="reset"
                                        >
                                            <span className="material-symbols-outlined">
                                                close
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </form>