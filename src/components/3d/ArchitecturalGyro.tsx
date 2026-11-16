"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ArchitecturalGyro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 0, 5.8);

    // 2. High-Performance PBR Renderer
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

    // 3. Studio Lighting Environment Map (Procedural High-Contrast Chrome Reflections)
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128);
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xf0ede6); // Matches editorial ivory tone

    // Studio softbox rim lights
    const lightMat1 = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lightMat2 = new THREE.MeshBasicMaterial({ color: 0x111111 });
    
    const topLight = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), lightMat1);
    topLight.position.set(0, 5, 2);
    topLight.rotation.x = Math.PI / 2;
    envScene.add(topLight);

    const backDark = new THREE.Mesh(new THREE.PlaneGeometry(12, 12), lightMat2);
    backDark.position.set(0, 0, -6);
    envScene.add(backDark);

    const leftRim = new THREE.Mesh(new THREE.PlaneGeometry(3, 8), lightMat1);
    leftRim.position.set(-5, 0, 0);
    leftRim.rotation.y = Math.PI / 2;
    envScene.add(leftRim);

    cubeCamera.update(renderer, envScene);

    // 4. Centerpiece Master Sculpture: Polished Liquid Chrome Möbius Torus Knot
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

    // Highly reflective chrome/platinum PBR material
    const chromeMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x222222,
      roughness: 0.05,
      metalness: 0.98,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      reflectivity: 1.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.8,
    });

    const torusKnotGeo = new THREE.TorusKnotGeometry(1.05, 0.32, 128, 24, 2, 3);
    const mainChromeSculpture = new THREE.Mesh(torusKnotGeo, chromeMaterial);
    sculptureGroup.add(mainChromeSculpture);

    // Outer Precision-Engineered Titanium Gimbal Ring with volumetric tubular thickness
    const ringMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.15,
      metalness: 0.92,
      clearcoat: 0.8,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.0,
    });

    const ringGeo1 = new THREE.TorusGeometry(1.85, 0.04, 16, 64);
    const ring1 = new THREE.Mesh(ringGeo1, ringMaterial);
    sculptureGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(1.55, 0.035, 16, 64);
    const ring2 = new THREE.Mesh(ringGeo2, ringMaterial);
    ring2.rotation.x = Math.PI / 2;
    sculptureGroup.add(ring2);

    // Outer Frosted Glass Protective Crystal Cage (Realistic transmission & refraction)
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.82,
      opacity: 1,
      transparent: true,
      roughness: 0.18,
      ior: 1.48,
      thickness: 1.2,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 1.5,
    });

    const glassBoxGeo = new THREE.OctahedronGeometry(1.4, 0);
    const glassCage = new THREE.Mesh(glassBoxGeo, glassMaterial);
    sculptureGroup.add(glassCage);

    // Fine chamfered wire accents along crystal facets
    const edgesGeo = new THREE.EdgesGeometry(glassBoxGeo);
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.25,
      linewidth: 1.5,
    });
    const cageEdges = new THREE.LineSegments(edgesGeo, edgeMat);
    glassCage.add(cageEdges);

    // 5. Studio Direct Lighting
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xf5ede2, 1.8);
    fillLight.position.set(-6, -3, -3);
    scene.add(fillLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambLight);

    // 6. Interactive Cursor Parallax Physics
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
      cachedH = rect.height || 360;
    };
    updateBounds();

    const onPointerMove = (e: MouseEvent) => {
      const x = ((e.clientX - cachedLeft) / cachedW) * 2 - 1;
      const y = -(((e.clientY - cachedTop) / cachedH) * 2 - 1);
      targetRotY = x * 0.85;
      targetRotX = -y * 0.65;
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => {
      setIsHovered(false);
      targetRotX = 0;
      targetRotY = 0;
    };

    container.addEventListener("mousemove", onPointerMove, { passive: true });
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // 7. Kinetic Cinematic Render Loop with Viewport Culling
    let isVisible = true;
    let isTabActive = true;
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animId = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime() * 0.75;

      // Smooth kinetic cursor follow
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      sculptureGroup.rotation.x = currentRotX + Math.sin(t * 0.4) * 0.12;
      sculptureGroup.rotation.y = currentRotY + t * 0.5;

      // Internal torus knot organic rotation
      mainChromeSculpture.rotation.x = t * 0.8;
      mainChromeSculpture.rotation.y = t * 0.6;
      mainChromeSculpture.rotation.z = Math.sin(t * 0.5) * 0.2;

      // Counter-rotating outer titanium rings
      ring1.rotation.z = -t * 0.4;
      ring1.rotation.x = Math.PI / 4 + Math.sin(t * 0.6) * 0.15;
      ring2.rotation.y = t * 0.5;

      // Gentle floating breathing for the glass cage
      glassCage.rotation.y = -t * 0.3;
      glassCage.rotation.x = Math.cos(t * 0.3) * 0.1;
      sculptureGroup.position.y = Math.sin(t * 1.1) * 0.08;

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
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);

      torusKnotGeo.dispose();
      chromeMaterial.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMaterial.dispose();
      glassBoxGeo.dispose();
      glassMaterial.dispose();
      edgesGeo.dispose();
      edgeMat.dispose();
      topLight.geometry.dispose();
      backDark.geometry.dispose();
      leftRim.geometry.dispose();
      lightMat1.dispose();
      lightMat2.dispose();
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
      className="relative w-full h-full min-h-[220px] sm:min-h-[260px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      data-cursor-label={isHovered ? "INSPECT" : "CORE"}
    />
  );
}
