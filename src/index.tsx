import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Sidebar} from './react-components/Sidebar';
import * as THREE from 'three';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { IProject, UserRole, Status } from './classes/Project';
import { ProjectsManager } from './classes/ProjectsManager';
import {toggleModal, ShowPopUp, hide} from './classes/GlobalFunctions';
import { ITask} from './classes/TaskManager';
import { ProjectsPage } from './react-components/ProjectsPage';
import * as Router from 'react-router-dom';
import { ProjectDetailsPage } from './react-components/ProjectDetailsPage';

const projectsManager = new ProjectsManager();
const rootElement = document.getElementById('app') as HTMLElement;
const appRoot = ReactDOM.createRoot(rootElement)
appRoot.render(
    <>
        <Router.BrowserRouter>
            <Sidebar />
            <Router.Routes>
                <Router.Route path="/" element={<ProjectsPage projectsManager={projectsManager}/>}/>
                <Router.Route path="/project/:id" element={<ProjectDetailsPage projectsManager={projectsManager}/>}/>
            </Router.Routes>
        </Router.BrowserRouter>
    </>
);

const projectsList = document.getElementById('project-list') as HTMLElement;

const projectDetails = document.getElementById('project-details') as HTMLElement;
const projectsPage = document.getElementById('projects-page') as HTMLElement;
const membersPage = document.getElementById('members-page') as HTMLElement;

// const taskList = document.getElementById("to-do-container") as HTMLDivElement
// const taskManager = new TaskManager(taskList)
const editTaskForm = document.getElementById('edit-task-form')as HTMLElement


//Handling new project creation----End-----

    //this code is converted to react
    
//Handling new project creation----End-----

//Handling project import and export----Start-----

    //this code is converted to react

//Handling project import and export----End-----

//Handling project modification----Start-----
const editProjectForm = document.getElementById('edit-project-form');
const editProjectModal = document.getElementById('edit-project-modal') as HTMLDialogElement;
if(editProjectForm && editProjectForm instanceof HTMLFormElement){
    editProjectForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(editProjectForm);
        const projectData: IProject = {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            finishDate: formData.get('finishDate') ? new Date(formData.get('finishDate') as string) : new Date(), // create a new date object from the form input as string
            userRole: formData.get('userRole') as UserRole,
            status: formData.get('status') as Status,
        };
        try {
            toggleModal(editProjectModal, false)
            projectsManager.updateProject(projectData)
        } catch (error) {
            ShowPopUp('error', error.message);
        }
    });

    editProjectForm.addEventListener('reset', () => {
        editProjectForm.reset();
        toggleModal(editProjectModal, false);
    });
}

const editProjectBtn = document.getElementById('edit-project-btn') as HTMLElement
editProjectBtn?.addEventListener('click', () => {
    const form = document.getElementById('edit-project-form') as HTMLFormElement;
    if(!form){
        console.warn('Edit Project Form not found');
        return;
    }
    toggleModal(editProjectModal, true);
    projectsManager.setupEditForm();
})

//Handling project modification----End-----

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

//Handling Task modification------Start-----
// const updateTaskBtn = ""

// if (editTaskForm && editTaskForm instanceof HTMLFormElement){
//     editTaskForm.addEventListener('submit', (e) => {
//         e.preventDefault();
//         const formData = new FormData(editTaskForm);
//         const taskData: ITask = {
//             taskStatus: formData.get('taskStatus') as Status,
//             taskDesc: formData.get('taskDescription') as string,
//             taskDueDate: formData.get('taskDate') ? new Date(formData.get('taskDate') as string) : new Date(),
//         };
//         try {
//             const currentTask = projectsManager.currentProject.taskManager.currentTask;

//             currentTask.taskStatus = taskData.taskStatus;
//             currentTask.taskDesc = taskData.taskDesc;
//             currentTask.taskDueDate = taskData.taskDueDate;
//             currentTask.color = taskData.taskStatus
//             currentTask.updateTaskUI(taskData);
//             projectsManager.currentProject.taskList = projectsManager.currentProject.taskManager.tasks
//             hide(editTaskForm);
            
//         } catch (error) {
//             ShowPopUp('error', error.message);
//         }
//     });
    
//     editTaskForm.addEventListener('reset', () => {
//         hide(editTaskForm)
//     });

// }
//Handling ToDo's of a project----End-----

//ThreeJS viewer----Start-----
/*const scene = new THREE.Scene();

const viewerContainer = document.getElementById('viewer-container') as HTMLElement
const camera = new THREE.PerspectiveCamera(75)
camera.position.z = 5
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})

viewerContainer.append(renderer.domElement)

function resizeViewer() {
    const containerDimensions = viewerContainer.getBoundingClientRect()
    const aspectRatio = containerDimensions.width / containerDimensions.height
    renderer.setSize(containerDimensions.width, containerDimensions.height)
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix()
}
resizeViewer()
window.addEventListener('resize', resizeViewer)

const boxGeometry = new THREE.BoxGeometry()
const boxMaterial = new THREE.MeshStandardMaterial()

const cube = new THREE.Mesh(boxGeometry, boxMaterial)


const directionalLight = new THREE.DirectionalLight()
const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 0.5

scene.add(directionalLight, ambientLight)
const controls = new OrbitControls(camera, renderer.domElement)

function renderScene(){
    renderer.render(scene, camera)
    requestAnimationFrame(renderScene)
}

renderScene()

//ThreeJS Helpers----Start-----
(const axes = new THREE.AxesHelper()
const grid = new THREE.GridHelper(10, 10)
scene.add(axes, grid)

const gui = new GUI()

const cubeControls = gui.addFolder('Cube')

cubeControls.add(cube.position, 'x', -5, 5, 0.5)
cubeControls.add(cube.position, 'y', -5, 5, 0.5)
cubeControls.add(cube.position, 'z', -5, 5, 0.5)
cubeControls.add(cube, 'visible')
cubeControls.addColor(cube.material, 'color')

const lightControls = gui.addFolder('Light')
lightControls.add(directionalLight.position, 'x', -5, 5, 0.5)
lightControls.add(directionalLight.position, 'y', -5, 5, 0.5)
lightControls.add(directionalLight.position, 'z', -5, 5, 0.5)
lightControls.add(directionalLight, 'intensity', -5, 5, 0.5)
lightControls.add(directionalLight, 'visible')
lightControls.addColor(directionalLight, 'color')
gui.hide() //remove this line when controls are required
//ThreeJS Helpers----End-----

//ThreeJS Loaders----Start-----
const objLoader = new OBJLoader()
const mtlLoader = new MTLLoader()
const gltfLoader = new GLTFLoader()


mtlLoader.load("../assets/Gear/Gear1.mtl", (materials) =>{
    materials.preload()
    objLoader.setMaterials(materials)
    objLoader.load("../assets/Gear/Gear1.obj", (mesh) =>{
        // scene.add(mesh)
    })    
})

gltfLoader.load("../assets/Duck/Duck.gltf", (gltf) =>{
    scene.add(gltf.scene)})

//ThreeJS Loaders----End-----




//ThreeJS viewer----End-----

 */   