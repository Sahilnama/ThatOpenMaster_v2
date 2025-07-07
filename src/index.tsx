import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Sidebar } from './react-components/Sidebar';
import { ProjectsManager } from './classes/ProjectsManager';
import { ProjectsPage } from './react-components/ProjectsPage';
import { ProjectDetailsPage } from './react-components/ProjectDetailsPage';
import * as Router from 'react-router-dom';
import * as Firestore from 'firebase/firestore';
import { getCollection } from './firebase';
import { IProject } from './classes/Project';

const projectsManager = new ProjectsManager();
const projectCollection = getCollection<IProject>('/projects');

function App() {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchProjects() {
            const firebaseProjects = await Firestore.getDocs(projectCollection);
            for (const doc of firebaseProjects.docs) {
                const data = doc.data();
                const project: IProject = {
                    ...data,
                    finishDate: (
                        data.finishDate as unknown as Firestore.Timestamp
                    ).toDate(),
                };
                try {
                    projectsManager.newProject(project, doc.id);
                } catch {
                    projectsManager.updateProject(doc.id, project);
                }
            }
            setLoading(false);
        }
        fetchProjects();
    }, []);

    if (loading) return <div>Loading...</div>;
    // React.useEffect(()=>{
        
    // })
    return (
        <Router.BrowserRouter>
            <Sidebar />
            <Router.Routes>
                <Router.Route path="/" element={<ProjectsPage projectsManager={projectsManager} />} />
                <Router.Route path="/project/:id" element={<ProjectDetailsPage projectsManager={projectsManager} />} />
            </Router.Routes>
        </Router.BrowserRouter>
    );
}

const rootElement = document.getElementById('app') as HTMLElement;
const appRoot = ReactDOM.createRoot(rootElement);
appRoot.render(<App />);

/*
const projectsList = document.getElementById('project-list') as HTMLElement;

const projectDetails = document.getElementById('project-details') as HTMLElement;
const projectsPage = document.getElementById('projects-page') as HTMLElement;
const membersPage = document.getElementById('members-page') as HTMLElement;

// const taskList = document.getElementById("to-do-container") as HTMLDivElement
// const taskManager = new TaskManager(taskList)
const editTaskForm = document.getElementById('edit-task-form')as HTMLElement



//Side Bar buttons ----Start------

const projectsPageBtn = document.getElementById('projects-page-btn');
projectsPageBtn?.addEventListener('click', () => {
    projectDetails.classList.add('hidden');
    projectsPage.classList.remove('hidden');
    membersPage.classList.add('hidden')
})

const membersPageBtn = document.getElementById('members-page-btn');
membersPageBtn?.addEventListener('click', () => {
    projectDetails.classList.add('hidden');
    projectsPage.classList.add('hidden');
    membersPage.classList.remove('hidden');
})

//Side Bar buttons ----End------

//Handling ToDo's of a project----Start-----
const addProjectTaskBtn = document.getElementById('add-project-task-btn');
const addTaskForm = document.getElementById('add-task-form');

if (addTaskForm && addTaskForm instanceof HTMLFormElement) {
    addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(addTaskForm);
        const taskData: ITask = {
            taskStatus: formData.get('taskStatus') == 'Status' ? 'Pending' : formData.get('taskStatus') as Status, // set default status to Pending if not selected
            taskDesc: formData.get('taskDescription') as string,
            taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(),
        };
        try {
            const task = projectsManager.currentProject.taskManager.newTask(taskData)
            console.log("New task added:",task);
            addTaskForm.classList.add('hidden')
            addTaskForm.reset()
            ShowPopUp('success', 'Task added successfully');
        } catch (error) {
            ShowPopUp('error', error.message);
        }
    });

    addTaskForm.addEventListener('reset', () => {
        addTaskForm.classList.add('hidden');
    });
}

addProjectTaskBtn?.addEventListener('click', () => {
    hide(editTaskForm)
    if (addTaskForm && addTaskForm instanceof HTMLFormElement) {
        addTaskForm.classList.remove("hidden");
        
    }
});

*/