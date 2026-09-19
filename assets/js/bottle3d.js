// Motor 3D Interactivo para el Frasco de Perfume (Three.js WebGL)
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

export function init3DBottleCanvas(containerId = 'bottle-3d-canvas') {
  const container = document.getElementById(containerId);
  if (!container || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.1,
    transmission: 0.9,
    thickness: 1.2,
    color: new THREE.Color('#D4C5A9'),
    ior: 1.5,
    reflectivity: 0.9
  });

  const geometry = new THREE.CylinderGeometry(0.8, 0.8, 2.2, 32);
  const bottleMesh = new THREE.Mesh(geometry, glassMaterial);
  scene.add(bottleMesh);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xd4c5a9, 2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  let targetRotationX = 0;
  let targetRotationY = 0;

  window.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = mouseX * 0.4;
    targetRotationX = mouseY * 0.2;
  });

  function animate() {
    requestAnimationFrame(animate);
    bottleMesh.rotation.y += (targetRotationY - bottleMesh.rotation.y) * 0.05;
    bottleMesh.rotation.x += (targetRotationX - bottleMesh.rotation.x) * 0.05;
    renderer.render(scene, camera);
  }

  animate();
}
