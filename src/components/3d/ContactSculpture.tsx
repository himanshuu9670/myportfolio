"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ContactSculpture() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 50);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geom = new THREE.OctahedronGeometry(2.0, 1); // Optimized detail
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      roughness: 0.05,
      metalness: 0.96,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0,
      flatShading: true,
    });

    const mesh = new THREE.Mesh(geom, mat);
    group.add(mesh);

    const wireGeo = new THREE.OctahedronGeometry(2.05, 1);
    const edges = new THREE.EdgesGeometry(wireGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });
    const wire = new THREE.LineSegments(edges, wireMat);
    group.add(wire);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 3.5);
    dirLight1.position.set(6, 6, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x888888, 2.0);
    dirLight2.position.set(-6, -6, -4);
    scene.add(dirLight2);

    let isVisible = true;
    let isTabActive = true;
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime() * 0.45;
      group.rotation.x = t * 0.5;
      group.rotation.y = t * 0.7;
      group.position.y = Math.sin(t * 1.2) * 0.15;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          isVisible = e.isIntersecting;
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
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", handleResize);

      geom.dispose();
      mat.dispose();
      wireGeo.dispose();
      edges.dispose();
      wireMat.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[400px] flex items-center justify-center select-none" />;
}
