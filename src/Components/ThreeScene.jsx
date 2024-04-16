import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import './ThreeScene.css'; // Import CSS file

const ThreeScene = () => {
    const sceneRef = useRef(null);


    //let camera, scene, renderer, Chantrai, Chanphai, Bapchantrai, Bapchanphai;

    useEffect(() => {
        let camera, scene, renderer, Chantrai, Chanphai, Bapchantrai, Bapchanphai;
        const init = () => {


            // Khởi tạo scene, camera, renderer, và các biến cần thiết

            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.01, 10);
            camera.position.set(3, 3, 1);
            camera.lookAt(0, 0, 0);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x3A3B3C);

            const light = new THREE.HemisphereLight(0xffffff, 0x444422);
            light.position.set(0, 1, 0);
            scene.add(light);

            const mesh = new THREE.Mesh(
                new THREE.PlaneGeometry(6, 6),
                new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
            );

            mesh.rotation.x = - Math.PI / 2;
            mesh.receiveShadow = true;
            scene.add(mesh);

            const grid = new THREE.GridHelper(6, 20, 0x000000, 0x000000);
            grid.material.opacity = 0.1;
            grid.material.transparent = true;
            scene.add(grid);
            const maxContainerWidth = 1000;
            const maxContainerHeight = 1000;
            const scaleFactor = Math.min(maxContainerWidth / window.innerWidth, maxContainerHeight / window.innerHeight);
            // ... (thêm code khởi tạo)

            // Khởi tạo GLTFLoader và tải model
            const loader = new GLTFLoader();
            loader.load('https://raw.githubusercontent.com/AnhKiet259/Test3D/master/mohinh.glb', (gltf) => {
                // Xử lý mô hình 3D
                const model = gltf.scene;

                // ... (thêm code xử lý mô hình)
                console.log(model);

                model.traverse((o) => {
                    if (o.isMesh) {
                        o.material.metalness = false;
                        o.material.wireframe = false;
                        o.castShadow = true;
                        o.receiveShadow = true;
                    }
                });

                const SkinnedMesh = model.children[0].children[1];
                scene.add(model);

                // Thêm mô hình vào scene
                const Skeleton = SkinnedMesh.skeleton;
                const SkeletonHelper = new THREE.SkeletonHelper(Skeleton.bones[0]);
                SkeletonHelper.skeleton = Skeleton;
                SkeletonHelper.visible = true;
                scene.add(SkeletonHelper);

                const Bones = SkinnedMesh.skeleton.bones;
                Chantrai = Bones.find((bone) => bone.name === 'mixamorigLeftUpLeg');
                Chanphai = Bones.find((bone) => bone.name === 'mixamorigRightUpLeg');
                Bapchantrai = Bones.find((bone) => bone.name === 'mixamorigLeftLeg');
                Bapchanphai = Bones.find((bone) => bone.name === 'mixamorigRightLeg');

                // async function layDuLieu() {
                //     try {
                //         const response = await fetch('http://localhost:1880/bye2');
                //         const DUITRAI = parseFloat(data.DUITRAI);
                //         const DUIPHAI = parseFloat(data.DUIPHAI);
                //         const BAPCHANTRAI = parseFloat(data.BAPCHANTRAI);
                //         const BAPCHANPHAI = parseFloat(data.BAPCHANPHAI);
                //         Chantrai.rotation.x = DUITRAI;
                //         Chanphai.rotation.x = DUIPHAI;
                //         Bapchantrai.rotation.x = BAPCHANTRAI;
                //         Bapchanphai.rotation.x = BAPCHANPHAI;
                //     } catch (error) {
                //         console.error('Lỗi khi lấy dữ liệu:', error);
                //     }
                // }
                // setInterval(layDuLieu, 10);


                async function fetchData() {
                    fetch('https://asia-south1.gcp.data.mongodb-api.com/app/application-0-iatxy/endpoint/TEST_GET')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok');
                            }
                            return response.json();
                        })
                        .then(data => {
                            //const apiDataDiv = document.getElementById('apiData');


                            const DUITRAI = data[0].public.output.jsonData.Roll_dui_trai_moi;
                            const BAPCHANTRAI = data[0]?.public?.output?.jsonData?.Roll_bap_chan_trai_moi;
                            const DUIPHAI = data[0]?.public?.output?.jsonData?.Roll_dui_phai_moi;
                            const BAPCHANPHAI = data[0]?.public?.output?.jsonData?.Roll_bap_chan_phai_moi;
                            Chantrai.rotation.x = DUITRAI;
                            Chanphai.rotation.x = DUIPHAI;
                            Bapchantrai.rotation.x = BAPCHANTRAI;
                            Bapchanphai.rotation.x = BAPCHANPHAI;


                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error);
                        });
                }

                fetchData();
                setInterval(fetchData, 100);
                // Cập nhật scene khi model đã được tải
                sceneRef.current.add(scene);

                // Khởi tạo OrbitControls
                const controls = new OrbitControls(camera, sceneRef.current);
                controls.target.set(0, 1, 0);
                controls.update();
            });

            // Khởi tạo renderer và thêm vào DOM
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.outputEncoding = THREE.sRGBEncoding;
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            sceneRef.current.appendChild(renderer.domElement);
            const onWindowResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                // Thu nhỏ kích thước của renderer lại 1/2
                renderer.setSize(window.innerWidth, window.innerHeight);
            };

            // Xử lý sự kiện thay đổi kích thước cửa sổ
            window.addEventListener('resize', onWindowResize, false);

            const controls = new OrbitControls(camera, renderer.domElement);
            controls.target.set(0, 1, 0);
            controls.update();

            // Hàm xử lý thay đổi kích thước cửa sổ
            // function onWindowResize() {
            //     camera.aspect = window.innerWidth / window.innerHeight;
            //     camera.updateProjectionMatrix();
            //     renderer.setSize(window.innerWidth, window.innerHeight);
            // }
        };
        // Hàm animate để tạo vòng lặp render
        function animate() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        // Gọi hàm animate để bắt đầu vòng lặp render
        init();
        animate();

        // Cleanup
        return () => {
            //window.removeEventListener('resize', onWindowResize);
            if (renderer && renderer.domElement) {
                renderer.domElement.remove();
            }
        };
    }, []); // Chỉ chạy một lần khi component được mount

    return <div className="three-scene-wrapper" ref={sceneRef}></div>;
};

export default ThreeScene;
