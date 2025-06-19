import * as React from 'react';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
export function ThreeViewer() {
    let scene: THREE.Scene | null
    let mesh: THREE.Object3D | null
    let renderer: THREE.WebGLRenderer | null
    let cameraControls: OrbitControls | null
    let camera: THREE.PerspectiveCamera | null
    let axes: THREE.AxesHelper | null
    let grid: THREE.GridHelper | null
    let directionalLight: THREE.DirectionalLight | null
    let ambientLight: THREE.AmbientLight | null
    let lightControls: GUI | null
    let mtlLoader: MTLLoader | null
    let objLoader: OBJLoader | null
    let gltfLoader: GLTFLoader | null
    const setViewer = () => {
       scene = new THREE.Scene();

        const viewerContainer = document.getElementById(
            'viewer-container'
        ) as HTMLElement;
        camera = new THREE.PerspectiveCamera(75);
        camera.position.z = 5;
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        viewerContainer.append(renderer.domElement);

        function resizeViewer() {
            if (!renderer || !camera || !viewerContainer) return;
            const containerDimensions = viewerContainer.getBoundingClientRect();
            const aspectRatio =
                containerDimensions.width / containerDimensions.height;
            renderer.setSize(
                containerDimensions.width,
                containerDimensions.height
            );
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
        }
        resizeViewer();
        window.addEventListener('resize', resizeViewer);

        directionalLight = new THREE.DirectionalLight();
        ambientLight = new THREE.AmbientLight();
        ambientLight.intensity = 0.5;

        scene.add(directionalLight, ambientLight);
        cameraControls = new OrbitControls(camera, renderer.domElement);

        function renderScene() {
            if (!renderer || !camera || !scene) return;
            renderer.render(scene, camera);
            requestAnimationFrame(renderScene);
        }

        renderScene();

        //ThreeJS Helpers----Start-----
        axes = new THREE.AxesHelper();
        grid = new THREE.GridHelper(10, 10);
        scene.add(axes, grid);

        const gui = new GUI();

        lightControls = gui.addFolder('Light');
        lightControls.add(directionalLight.position, 'x', -5, 5, 0.5);
        lightControls.add(directionalLight.position, 'y', -5, 5, 0.5);
        lightControls.add(directionalLight.position, 'z', -5, 5, 0.5);
        lightControls.add(directionalLight, 'intensity', -5, 5, 0.5);
        lightControls.add(directionalLight, 'visible');
        lightControls.addColor(directionalLight, 'color');
        gui.hide(); //remove this line when controls are required
        //ThreeJS Helpers----End-----

        //ThreeJS Loaders----Start-----
        objLoader = new OBJLoader();
        mtlLoader = new MTLLoader();
        gltfLoader = new GLTFLoader();

        mtlLoader.load('../assets/Gear/Gear1.mtl', (materials) => {
            materials.preload();
            if(!objLoader) return;
            objLoader.setMaterials(materials);
            objLoader.load('../assets/Gear/Gear1.obj', (object) => {
                scene?.add(object)
                mesh = object
            });
        });

        // gltfLoader.load('../assets/Duck/Duck.gltf', (gltf) => {
        //     scene?.add(gltf.scene);
        // });

        //ThreeJS Loaders----End-----

        //ThreeJS viewer----End-----
    };
    React.useEffect(() => {
        setViewer();
        return () =>{
            mesh?.removeFromParent();
            mesh?.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.geometry.dispose();
                    child.material.dispose();
                }
            })
            mesh = null;
        }
    }, []);

    return (
        <div
            id="viewer-container"
            className="dashboard-card"
            style={{ minWidth: 0 }}
        />
    );
}
