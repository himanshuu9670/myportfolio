"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SkillsOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 280;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. Procedural Studio Reflection Cube
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xf2efe9);

    const softLight = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 10),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    softLight.position.set(0, 6, 2);
    softLight.rotation.x = Math.PI / 2;
    envScene.add(softLight);

    const darkGround = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 12),
      new THREE.MeshBasicMaterial({ color: 0x151515 })
    );
    darkGround.position.set(0, -6, 0);
    darkGround.rotation.x = -Math.PI / 2;
    envScene.add(darkGround);

    cubeCamera.update(renderer, envScene);

    softLight.geometry.dispose();
    darkGround.geometry.dispose();

    // 3. Realistic 3D Central Core & Machined Titanium Orbital System
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // Centerpiece 1: Polished Mirror Obsidian Sphere
    const coreGeo = new THREE.SphereGeometry(0.85, 48, 48);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x080808,
      roughness: 0.04,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.5,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    systemGroup.add(coreMesh);

    // Centerpiece 2: Inner Floating Platinum Octahedron Core
    const innerGeo = new THREE.OctahedronGeometry(0.55, 0);
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.08,
      metalness: 0.98,
      clearcoat: 1.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 3.0,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    coreMesh.add(innerMesh);

    // 4. Three Precision-Engineered Concentric Gimbal Rings with real 3D tubular volume
    const ringMat = new THREE.MeshPhysicalMaterial({
      color: 0x181818,
      roughness: 0.12,
      metalness: 0.94,
      clearcoat: 0.8,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.2,
    });

    const ring1Geo = new THREE.TorusGeometry(2.15, 0.038, 16, 64);
    const ring2Geo = new THREE.TorusGeometry(1.85, 0.034, 16, 64);
    const ring3Geo = new THREE.TorusGeometry(1.52, 0.030, 16, 64);

    const ring1 = new THREE.Mesh(ring1Geo, ringMat);
    const ring2 = new THREE.Mesh(ring2Geo, ringMat);
    const ring3 = new THREE.Mesh(ring3Geo, ringMat);

    ring1.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 3.5;
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.z = Math.PI / 5;

    systemGroup.add(ring1);
    systemGroup.add(ring2);
    systemGroup.add(ring3);

    // 5. Orbiting Faceted Platinum Satellite Crystals (Realistic specular nodes)
    const satelliteCount = 8;
    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.98,
      clearcoat: 1.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 3.5,
    });

    const satellites: { mesh: THREE.Mesh; orbitRadius: number; speed: number; phase: number; tilt: number }[] = [];

    for (let i = 0; i < satelliteCount; i++) {
      const mesh = new THREE.Mesh(satGeo, satMat);
      systemGroup.add(mesh);

      satellites.push({
        mesh,
        orbitRadius: 1.7 + (i % 3) * 0.45,
        speed: 0.6 + (i * 0.15),
        phase: (i * Math.PI * 2) / satelliteCount,
        tilt: (i % 2 === 0 ? 1 : -1) * (0.3 + (i * 0.1)),
      });
    }

    // 6. Direct Studio Lights
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcccccc, 2.2);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    // 7. Interactive Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    let cachedLeft = 0;
    let cachedTop = 0;
    let cachedW = width;
    let cachedH = height;

    const updateBounds = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      cachedLeft = rect.left;
      cachedTop = rect.top;
      cachedW = rect.width || 360;
      cachedH = rect.height || 280;
    };
    updateBounds();

    const onPointerMove = (e: MouseEvent) => {
      const x = ((e.clientX - cachedLeft) / cachedW) * 2 - 1;
      const y = -(((e.clientY - cachedTop) / cachedH) * 2 - 1);
      targetRotY = x * 0.75;
      targetRotX = -y * 0.55;
    };

    container.addEventListener("mousemove", onPointerMove, { passive: true });
    container.addEventListener("mouseenter", () => setIsHovered(true));
    container.addEventListener("mouseleave", () => {
      setIsHovered(false);
      targetRotX = 0;
      targetRotY = 0;
    });

    // 8. Render Loop with Viewport Culling
    let isVisible = true;
    let isTabActive = true;
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime() * 0.65;

      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      systemGroup.rotation.x = currentRotX + Math.sin(t * 0.4) * 0.15;
      systemGroup.rotation.y = currentRotY + t * 0.4;

      // Inner platinum core counter-rotates
      innerMesh.rotation.x = -t * 1.2;
      innerMesh.rotation.y = t * 1.5;

      // Gimbal rings rotate on precision mechanical axes
      ring1.rotation.z = t * 0.5;
      ring2.rotation.z = -t * 0.45;
      ring3.rotation.y = t * 0.6;

      // Orbiting satellite diamond crystals
      satellites.forEach((sat) => {
        const angle = t * sat.speed + sat.phase;
        const x = Math.cos(angle) * sat.orbitRadius;
        const z = Math.sin(angle) * sat.orbitRadius;
        const y = Math.sin(angle * 1.5) * sat.tilt;

        sat.mesh.position.set(x, y, z);
        sat.mesh.rotation.x = angle * 2;
        sat.mesh.rotation.y = angle * 2.5;
      });

      systemGroup.position.y = Math.sin(t * 0.9) * 0.06;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
          if (isVisible) updateBounds();
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const handleResize = () => {
      if (!container) return;
      updateBounds();
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onPointerMove);

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      ringMat.dispose();
      satGeo.dispose();
      satMat.dispose();
      cubeRenderTarget.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[220px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      data-cursor-label={isHovered ? "ORBIT" : "SYSTEM"}
    />
  );
}
