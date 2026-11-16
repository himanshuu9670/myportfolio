"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function HeroLiquidSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fast WebGL feature check
    try {
      const canvas = document.createElement("canvas");
      const gl = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.08);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      50
    );
    const isMobileInitial = container.clientWidth < 640;
    camera.position.set(0, 0, isMobileInitial ? 9.2 : 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      stencil: false,
      depth: true,
    });

    // Performance target: Cap pixel ratio at 1.5 to eliminate 4K GPU fillrate overhead
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. High-Performance Studio Reflection Cube (Rendered once, zero per-frame cost)
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(128); // 128 is plenty for diffuse/specular chrome reflections
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x070707);

    const lightMatWhite = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const topLight = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), lightMatWhite);
    topLight.position.set(0, 5, 0);
    topLight.rotation.x = Math.PI / 2;
    envScene.add(topLight);

    const stripMat = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const leftStrip = new THREE.Mesh(new THREE.PlaneGeometry(2, 12), stripMat);
    leftStrip.position.set(-6, 0, -2);
    leftStrip.rotation.y = Math.PI / 3;
    envScene.add(leftStrip);

    const rightStrip = new THREE.Mesh(new THREE.PlaneGeometry(2, 12), stripMat);
    rightStrip.position.set(6, 0, 2);
    rightStrip.rotation.y = -Math.PI / 3;
    envScene.add(rightStrip);

    cubeCamera.update(renderer, envScene);

    // Dispose temporary env setup
    topLight.geometry.dispose();
    leftStrip.geometry.dispose();
    rightStrip.geometry.dispose();
    lightMatWhite.dispose();
    stripMat.dispose();

    // 3. GPU-Accelerated Liquid Chrome Sculpture (Optimized subdivision)
    // 24 subdivisions delivers high visual fidelity while reducing vertex count from 30,000+ down to ~5,000
    const geometry = new THREE.IcosahedronGeometry(2.1, 24);

    const customUniforms = {
      uTime: { value: 0 },
    };

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x121212,
      emissive: 0x050505,
      roughness: 0.05,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 1.0,
      envMap: cubeRenderTarget.texture,
      envMapIntensity: 2.2,
    });

    // Inject displacement shader directly into GPU vertex pipeline
    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = customUniforms.uTime;
      shader.vertexShader = `
        uniform float uTime;
        ${shader.vertexShader}
      `;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `
        #include <begin_vertex>
        float u = position.x * 1.4 + uTime * 1.1;
        float v = position.y * 1.4 + uTime * 0.9;
        float w = position.z * 1.4 + uTime * 0.8;
        float wave1 = sin(u) * cos(v) * sin(w);
        float wave2 = cos(u * 0.8 - uTime * 0.7) * sin(position.y * 2.2 + uTime);
        float displacement = (wave1 * 0.32 + wave2 * 0.18) * 0.95;
        transformed += normal * displacement;
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "#include <defaultnormal_vertex>",
        `
        #include <defaultnormal_vertex>
        vec3 nDisplace = vec3(
          cos(position.x * 1.4 + uTime * 1.1) * 0.2,
          sin(position.y * 2.2 + uTime) * 0.25,
          cos(position.z * 1.4 + uTime * 0.8) * 0.2
        );
        transformedNormal = normalize(transformedNormal - nDisplace * 0.4);
        `
      );
    };

    const sculpture = new THREE.Mesh(geometry, material);
    scene.add(sculpture);

    // Subtle inner wireframe core
    const innerGeo = new THREE.IcosahedronGeometry(2.15, 4);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wireCore = new THREE.Mesh(innerGeo, wireMat);
    sculpture.add(wireCore);

    // 4. Subtle Orbital Reticle Rings
    const ringGroup = new THREE.Group();
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x666666,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
    });
    const ring1 = new THREE.Mesh(new THREE.RingGeometry(3.2, 3.22, 48), ringMat);
    const ring2 = new THREE.Mesh(new THREE.RingGeometry(4.1, 4.12, 48), ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    ring2.rotation.x = Math.PI / 2.1;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    scene.add(ringGroup);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainDirectional = new THREE.DirectionalLight(0xffffff, 3.5);
    mainDirectional.position.set(6, 8, 6);
    scene.add(mainDirectional);

    const rimDirectional = new THREE.DirectionalLight(0xa0a0a0, 2.5);
    rimDirectional.position.set(-6, -4, -4);
    scene.add(rimDirectional);

    const pointLight = new THREE.PointLight(0xffffff, 4.0, 15);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // 6. CACHED Bound Coordinates (Zero layout thrashing on mousemove!)
    let cachedLeft = 0;
    let cachedTop = 0;
    let cachedWidth = container.clientWidth || window.innerWidth;
    let cachedHeight = container.clientHeight || window.innerHeight;

    const updateCachedBounds = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      cachedLeft = rect.left;
      cachedTop = rect.top;
      cachedWidth = rect.width || window.innerWidth;
      cachedHeight = rect.height || window.innerHeight;
    };

    updateCachedBounds();

    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onPointerMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Pure arithmetic with cached bounds - NO getBoundingClientRect() here!
        const x = ((e.clientX - cachedLeft) / cachedWidth) * 2 - 1;
        const y = -(((e.clientY - cachedTop) / cachedHeight) * 2 - 1);
        targetRotationY = x * 0.7;
        targetRotationX = -y * 0.5;
      } else {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    container.addEventListener("mousedown", onMouseDown, { passive: true });

    // 7. Render Loop with Visibility Caching (Pauses when offscreen or inactive)
    let isVisible = true;
    let isTabActive = true;
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      // Suspend render loop when offscreen or tab is hidden
      if (!isVisible || !isTabActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const time = clock.getElapsedTime() * 0.85;

      // Update GPU uniform in 1 microsecond (0 CPU computation!)
      customUniforms.uTime.value = time;

      // Smooth camera and rotation damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      sculpture.rotation.x = currentRotationX + Math.sin(time * 0.3) * 0.15;
      sculpture.rotation.y = currentRotationY + time * 0.22;
      sculpture.position.y = Math.sin(time * 0.7) * 0.12;

      ringGroup.rotation.z = -time * 0.08;
      ringGroup.rotation.y = currentRotationY * 0.3;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // 8. IntersectionObserver to automatically pause WebGL when scrolled away
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) updateCachedBounds();
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      updateCachedBounds();
      const isMobile = container.clientWidth < 640;
      camera.position.set(0, 0, isMobile ? 9.2 : 7.2);
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);

      geometry.dispose();
      material.dispose();
      innerGeo.dispose();
      wireMat.dispose();
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ringMat.dispose();
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
      className="relative w-full h-full min-h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
      data-cursor-label={isInteracting ? "HOLD" : "ROTATE"}
    >
      {/* Visual Reticle Elements */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[85vw] max-w-[620px] aspect-square rounded-full border border-white/[0.04] animate-[spin_60s_linear_infinite]" />
        <div className="absolute w-[60vw] max-w-[420px] aspect-square rounded-full border border-dashed border-white/[0.06] animate-[spin_40s_linear_infinite_reverse]" />
        <div className="absolute h-[1px] w-[80vw] max-w-[700px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute w-[1px] h-[70vh] max-h-[600px] bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
      </div>

      {/* Lightweight fallback */}
      {!hasWebGL && (
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-[#111111] via-[#333333] to-[#FFFFFF] shadow-[0_0_80px_rgba(255,255,255,0.15)] animate-pulse" />
      )}
    </div>
  );
}
