"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VisualProps {
  type: "neural" | "finpdf" | "architecture" | "forecasting" | "mindcare";
}

export default function ProjectVisual({ type }: VisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

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
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const disposables: { dispose: () => void }[] = [];

    // Distinct 3D procedural visualizations with optimized particle/mesh counts
    if (type === "neural") {
      const nodeCount = 28; // Optimized from 38
      const nodes: THREE.Vector3[] = [];
      const nodeGeo = new THREE.SphereGeometry(0.06, 12, 12);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.9,
        roughness: 0.1,
        emissive: 0x444444,
      });
      disposables.push(nodeGeo, nodeMat);

      for (let i = 0; i < nodeCount; i++) {
        const pos = new THREE.Vector3(
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 3.2,
          (Math.random() - 0.5) * 2.0
        );
        nodes.push(pos);
        const mesh = new THREE.Mesh(nodeGeo, nodeMat);
        mesh.position.copy(pos);
        rootGroup.add(mesh);
      }

      const linePositions: number[] = [];
      for (let i = 0; i < nodeCount; i++) {
        for (let j = i + 1; j < nodeCount; j++) {
          if (nodes[i].distanceTo(nodes[j]) < 1.35) {
            linePositions.push(
              nodes[i].x, nodes[i].y, nodes[i].z,
              nodes[j].x, nodes[j].y, nodes[j].z
            );
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x888888,
        transparent: true,
        opacity: 0.35,
      });
      disposables.push(lineGeo, lineMat);
      const lines = new THREE.LineSegments(lineGeo, lineMat);
      rootGroup.add(lines);

      const coreGeo = new THREE.IcosahedronGeometry(0.5, 2);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0x111111,
        roughness: 0.1,
        metalness: 0.95,
        clearcoat: 1.0,
      });
      disposables.push(coreGeo, coreMat);
      const core = new THREE.Mesh(coreGeo, coreMat);
      rootGroup.add(core);

    } else if (type === "finpdf") {
      const docCount = 3;
      const planeGeo = new THREE.PlaneGeometry(2.4, 3.2);
      const planeMat = new THREE.MeshStandardMaterial({
        color: 0x181818,
        roughness: 0.3,
        metalness: 0.8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88,
      });
      const edges = new THREE.EdgesGeometry(planeGeo);
      disposables.push(planeGeo, planeMat, edges);

      for (let i = 0; i < docCount; i++) {
        const docGroup = new THREE.Group();
        const plane = new THREE.Mesh(planeGeo, planeMat);
        docGroup.add(plane);

        const edgeMat = new THREE.LineBasicMaterial({
          color: i === 0 ? 0xffffff : 0x777777,
          linewidth: 1.5,
        });
        disposables.push(edgeMat);
        const edgeMesh = new THREE.LineSegments(edges, edgeMat);
        docGroup.add(edgeMesh);

        for (let l = 0; l < 4; l++) {
          const lineY = 1.0 - l * 0.55;
          const lGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(-0.9, lineY, 0.02),
            new THREE.Vector3(0.9, lineY, 0.02),
          ]);
          const lMat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.5 });
          disposables.push(lGeo, lMat);
          const lMesh = new THREE.Line(lGeo, lMat);
          docGroup.add(lMesh);
        }

        docGroup.position.set(i * 0.4 - 0.4, -i * 0.25 + 0.25, -i * 0.55);
        docGroup.rotation.y = -0.3 + i * 0.1;
        docGroup.rotation.x = 0.2;
        rootGroup.add(docGroup);
      }

    } else if (type === "architecture") {
      const boxGeo = new THREE.BoxGeometry(0.75, 0.75, 0.75);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x141414,
        roughness: 0.2,
        metalness: 0.9,
      });
      const edges = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
      disposables.push(boxGeo, boxMat, edges, edgeMat);

      const positions = [
        [-1.1, 0, 0],
        [0, 1.1, 0],
        [0, -1.1, 0],
        [1.1, 0, 0],
        [0, 0, 0],
      ];

      positions.forEach(([x, y, z]) => {
        const cube = new THREE.Mesh(boxGeo, boxMat);
        cube.position.set(x, y, z);
        const edgeMesh = new THREE.LineSegments(edges, edgeMat);
        cube.add(edgeMesh);
        rootGroup.add(cube);
      });

      const busGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.1, 0, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1.1, 0, 0),
        new THREE.Vector3(0, 1.1, 0),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, -1.1, 0),
      ]);
      const busMat = new THREE.LineBasicMaterial({ color: 0xaaaaaa, linewidth: 1.5 });
      disposables.push(busGeo, busMat);
      const bus = new THREE.LineSegments(busGeo, busMat);
      rootGroup.add(bus);

    } else if (type === "forecasting") {
      const pCount = 120; // Optimized from 200
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      for (let i = 0; i < pCount; i++) {
        pPos[i * 3] = (Math.random() - 0.5) * 4;
        pPos[i * 3 + 1] = (Math.random() - 0.5) * 2;
        pPos[i * 3 + 2] = (Math.random() - 0.5) * 3;
      }
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      const pMat = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.04,
        transparent: true,
        opacity: 0.7,
      });
      disposables.push(pGeo, pMat);
      const points = new THREE.Points(pGeo, pMat);
      rootGroup.add(points);

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-2.2, -1.0, 0),
        new THREE.Vector3(-1.1, -0.4, 0.4),
        new THREE.Vector3(0, 0.2, -0.2),
        new THREE.Vector3(1.1, 0.8, 0.3),
        new THREE.Vector3(2.2, 1.4, 0),
      ]);
      const curveGeo = new THREE.TubeGeometry(curve, 32, 0.04, 6, false);
      const curveMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.8,
        roughness: 0.2,
      });
      disposables.push(curveGeo, curveMat);
      const curveMesh = new THREE.Mesh(curveGeo, curveMat);
      rootGroup.add(curveMesh);

    } else if (type === "mindcare") {
      // 5. MINDCARE: Luminous Frosted Glass & Liquid Platinum Breathing Resonance Core
      const mindGroup = new THREE.Group();
      rootGroup.add(mindGroup);

      // Outer Frosted Glass Wellness Sphere (Luminous transmission & refraction)
      const outerGlassGeo = new THREE.SphereGeometry(1.25, 32, 32);
      const outerGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.88,
        roughness: 0.14,
        ior: 1.5,
        thickness: 1.4,
        transparent: true,
        opacity: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
      });
      disposables.push(outerGlassGeo, outerGlassMat);
      const glassSphere = new THREE.Mesh(outerGlassGeo, outerGlassMat);
      mindGroup.add(glassSphere);

      // Inner Liquid Platinum Meditative Core (High-gloss reflective chrome)
      const coreGeo = new THREE.IcosahedronGeometry(0.65, 3);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.98,
        roughness: 0.05,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
      });
      disposables.push(coreGeo, coreMat);
      const innerPlatinumCore = new THREE.Mesh(coreGeo, coreMat);
      innerPlatinumCore.name = "mindcareCore";
      mindGroup.add(innerPlatinumCore);

      // Calming Sinusoidal Brainwave / Harmonic Ripple Rings
      const ringMat = new THREE.MeshPhysicalMaterial({
        color: 0xcccccc,
        metalness: 0.95,
        roughness: 0.1,
        clearcoat: 0.8,
      });
      const ring1Geo = new THREE.TorusGeometry(1.65, 0.024, 16, 64);
      const ring2Geo = new THREE.TorusGeometry(1.95, 0.02, 16, 64);
      disposables.push(ringMat, ring1Geo, ring2Geo);

      const waveRing1 = new THREE.Mesh(ring1Geo, ringMat);
      waveRing1.name = "waveRing1";
      waveRing1.rotation.x = Math.PI / 3;
      mindGroup.add(waveRing1);

      const waveRing2 = new THREE.Mesh(ring2Geo, ringMat);
      waveRing2.name = "waveRing2";
      waveRing2.rotation.y = Math.PI / 4;
      mindGroup.add(waveRing2);

      // Floating biofeedback particle halo
      const haloPCount = 24;
      const haloGeo = new THREE.SphereGeometry(0.035, 8, 8);
      const haloMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 });
      disposables.push(haloGeo, haloMat);

      for (let i = 0; i < haloPCount; i++) {
        const theta = (i * Math.PI * 2) / haloPCount;
        const radius = 2.1 + (i % 2) * 0.25;
        const p = new THREE.Mesh(haloGeo, haloMat);
        p.position.set(Math.cos(theta) * radius, Math.sin(theta * 2) * 0.3, Math.sin(theta) * radius);
        mindGroup.add(p);
      }
    }

    let isVisible = true;
    let isTabActive = true;
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible || !isTabActive) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      const t = clock.getElapsedTime();
      rootGroup.rotation.y = t * 0.25;

      if (type === "neural") {
        rootGroup.rotation.x = Math.sin(t * 0.4) * 0.2;
      } else if (type === "mindcare") {
        rootGroup.rotation.x = Math.sin(t * 0.3) * 0.12;
        const core = rootGroup.getObjectByName("mindcareCore");
        if (core) {
          const breath = 1.0 + Math.sin(t * 1.6) * 0.08;
          core.scale.setScalar(breath);
          core.rotation.y = t * 0.7;
          core.rotation.x = t * 0.5;
        }
        const r1 = rootGroup.getObjectByName("waveRing1");
        if (r1) r1.rotation.z = t * 0.45;
        const r2 = rootGroup.getObjectByName("waveRing2");
        if (r2) r2.rotation.z = -t * 0.4;
      } else if (type === "architecture") {
        rootGroup.rotation.x = 0.5;
        rootGroup.rotation.y = t * 0.3;
      } else if (type === "finpdf") {
        rootGroup.position.y = Math.sin(t * 0.6) * 0.1;
      }

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

      disposables.forEach((d) => d.dispose());
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [type]);

  return <div ref={containerRef} className="w-full h-full min-h-[340px] flex items-center justify-center select-none" />;
}
