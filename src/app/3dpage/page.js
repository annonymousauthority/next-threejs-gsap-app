"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Home() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };
        const canvas = canvasRef.current;
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            40,
            sizes.width / sizes.height,
            1,
            5000
        );
        camera.position.z = 40;

        scene.add(camera);

        const loader = new FBXLoader();
        const glt_loader = new GLTFLoader();

        glt_loader.load("models/cycle.glb", (gltf) => {
            const model = gltf.scene;

            // Add the model to the scene
            scene.add(model);

            // Position, rotate, or scale the model as needed
            model.position.set(0, 0, 0);
            model.rotation.set(0.2, 40, 0);
            model.position.y = -5;
            model.scale.set(0.5, 0.5, 0.5);
            const clock = new THREE.Clock();
            const animate = () => {
                const delta = clock.getDelta();
                if (mixer) mixer.update(delta);

                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            };
            animate();

            // Render the scene with the camera
            renderer.render(scene, camera);
        });

        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 50, 10);
        light.intensity = 1.25;
        scene.add(light);
        const light2 = new THREE.PointLight(0xc4c4c4, 1);
        light2.position.set(500, 100, 0);
        scene.add(light2);

        const light3 = new THREE.PointLight(0xc4c4c4, 4);
        light3.position.set(0, 100, -500);
        scene.add(light3);

        const light4 = new THREE.PointLight(0xc4c4c4, 4);
        light4.position.set(-500, 300, 500);
        scene.add(light4);

        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(2);
        renderer.render(scene, camera);

        const controls = new OrbitControls(camera, canvas);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.autoRotate = false;
        controls.autoRotateSpeed = 5;

        window.addEventListener("resize", () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
        });

        const loop = () => {
            controls.update();
            renderer.render(scene, camera);
            window.requestAnimationFrame(loop);
        };
        loop();
    }, []);

    return (
        <div className="flex flex-col items-start justify-start h-screen relative bg-black">
            <canvas
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                ref={canvasRef}
            />
            <div className="relative z-50 text-white w-full">
                <nav className="w-full p-3">
                    <div className="flex justify-between text-white max-w-6xl mx-auto">
                        <div>
                            <h1 className="font-bold text-3xl">World Wide Techies</h1>
                        </div>
                        <div className="space-x-6 flex items-center justify-start">
                            <p>Explore</p>
                            <p>Latest News</p>
                        </div>
                    </div>
                </nav>
                <div className="relative mt-24 max-w-5xl mx-auto flex flex-col justify-start items-start">
                    <div className="w-64 min-h-14 bg-yellow-200 text-black p-3">
                        <h2>Merlin Sorcerer</h2>
                        <p>Many have been called only few have been choosen</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
