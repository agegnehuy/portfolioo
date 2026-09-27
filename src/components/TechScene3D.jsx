import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const SCENE_LABEL =
  "Interactive 3D full-stack development workspace with a laptop, servers, cloud infrastructure, and connected data nodes";

const TechScene3D = () => {
  const mountRef = useRef(null);
  const [hasWebGLError, setHasWebGLError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let renderer;
    let animationFrame;
    let isVisible = true;
    let reducedMotion = false;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0.7, 12.2);

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.domElement.setAttribute("role", "img");
      renderer.domElement.setAttribute("aria-label", SCENE_LABEL);
      Object.assign(renderer.domElement.style, {
        width: "100%",
        height: "100%",
        display: "block",
        cursor: "grab",
        touchAction: "pan-y",
      });
      mount.appendChild(renderer.domElement);

      const root = new THREE.Group();
      root.rotation.set(-0.08, -0.28, 0);
      root.scale.setScalar(0.92);
      scene.add(root);

      const darkMetal = new THREE.MeshStandardMaterial({
        color: 0x111936,
        metalness: 0.82,
        roughness: 0.24,
      });
      const panelMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x172554,
        metalness: 0.18,
        roughness: 0.12,
        transmission: 0.1,
        transparent: true,
        opacity: 0.88,
      });
      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x312e81,
        metalness: 0.08,
        roughness: 0.08,
        transmission: 0.42,
        transparent: true,
        opacity: 0.68,
      });
      const cyanGlow = new THREE.MeshStandardMaterial({
        color: 0x22d3ee,
        emissive: 0x0891b2,
        emissiveIntensity: 2.8,
        toneMapped: false,
      });
      const violetGlow = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x7e22ce,
        emissiveIntensity: 2.5,
        toneMapped: false,
      });
      const indigoGlow = new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4f46e5,
        emissiveIntensity: 2.2,
        toneMapped: false,
      });

      const addBox = (parent, size, position, material, edgeColor = 0x6366f1) => {
        const geometry = new THREE.BoxGeometry(...size);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(...position);
        parent.add(mesh);

        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry(geometry),
          new THREE.LineBasicMaterial({
            color: edgeColor,
            transparent: true,
            opacity: 0.52,
          }),
        );
        edges.position.copy(mesh.position);
        parent.add(edges);
        return mesh;
      };

      const laptop = new THREE.Group();
      root.add(laptop);
      addBox(laptop, [4.2, 2.55, 0.16], [0, 0.4, 0], darkMetal, 0x22d3ee);
      addBox(laptop, [3.84, 2.18, 0.055], [0, 0.4, 0.11], panelMaterial, 0x818cf8);

      [1.42, 1.08, 1.65, 0.78, 1.28, 1.52, 0.94].forEach((width, index) => {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(width, 0.055, 0.035),
          index % 3 === 0 ? cyanGlow : index % 2 === 0 ? violetGlow : indigoGlow,
        );
        line.position.set(-0.75 + width * 0.12, 1.12 - index * 0.27, 0.165);
        laptop.add(line);
      });

      for (let index = 0; index < 6; index += 1) {
        const line = new THREE.Mesh(
          new THREE.BoxGeometry(0.38 + (index % 3) * 0.11, 0.045, 0.03),
          index % 2 ? indigoGlow : cyanGlow,
        );
        line.position.set(-1.55, 1.12 - index * 0.29, 0.164);
        laptop.add(line);
      }

      const base = addBox(laptop, [4.5, 0.18, 2.65], [0, -1.05, 1.18], darkMetal, 0x818cf8);
      base.rotation.x = -0.04;
      const trackpad = addBox(laptop, [1.25, 0.025, 0.72], [0, -0.93, 1.82], panelMaterial, 0x22d3ee);
      trackpad.rotation.x = -0.04;

      const keyMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e2a52,
        emissive: 0x312e81,
        emissiveIntensity: 0.35,
        metalness: 0.5,
        roughness: 0.35,
      });
      for (let row = 0; row < 3; row += 1) {
        for (let column = 0; column < 9; column += 1) {
          const key = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.035, 0.25), keyMaterial);
          key.position.set(-1.35 + column * 0.34, -0.91, 0.62 + row * 0.31);
          key.rotation.x = -0.04;
          laptop.add(key);
        }
      }

      const servers = new THREE.Group();
      servers.position.set(-3.05, -0.35, -0.15);
      root.add(servers);
      for (let level = 0; level < 3; level += 1) {
        addBox(servers, [1.55, 0.68, 1.25], [0, level * 0.76, 0], darkMetal, 0x22d3ee);
        for (let vent = 0; vent < 3; vent += 1) {
          const line = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.035, 0.04), panelMaterial);
          line.position.set(-0.33, level * 0.76 + 0.08 - vent * 0.13, 0.645);
          servers.add(line);
        }
        const light = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), cyanGlow);
        light.position.set(0.53, level * 0.76, 0.66);
        servers.add(light);
      }

      const cloud = new THREE.Group();
      cloud.position.set(2.75, 2.08, -0.35);
      root.add(cloud);
      [
        [-0.56, 0, 0, 0.62],
        [0, 0.28, 0, 0.82],
        [0.72, 0.02, 0, 0.66],
        [0.08, -0.18, 0.08, 0.8],
      ].forEach(([x, y, z, radius]) => {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 28, 20), glassMaterial);
        puff.position.set(x, y, z);
        cloud.add(puff);
      });
      for (let level = 0; level < 3; level += 1) {
        addBox(cloud, [0.75, 0.27, 0.64], [0.15, -0.65 - level * 0.31, 0.35], darkMetal, 0x22d3ee);
      }

      const makeCodePanel = (position, rotationY) => {
        const group = new THREE.Group();
        group.position.set(...position);
        group.rotation.y = rotationY;
        root.add(group);
        addBox(group, [1.75, 1.2, 0.08], [0, 0, 0], glassMaterial, 0x22d3ee);
        [0.72, 1.05, 0.58, 0.9].forEach((width, index) => {
          const line = new THREE.Mesh(
            new THREE.BoxGeometry(width, 0.05, 0.025),
            index % 2 ? violetGlow : cyanGlow,
          );
          line.position.set(-0.22, 0.34 - index * 0.22, 0.07);
          group.add(line);
        });
        return group;
      };
      const leftPanel = makeCodePanel([-2.65, 1.72, 0.45], 0.22);

      const dataPanel = new THREE.Group();
      dataPanel.position.set(3.05, 0.35, 0.35);
      dataPanel.rotation.y = -0.32;
      root.add(dataPanel);
      addBox(dataPanel, [1.65, 1.52, 0.08], [0, 0, 0], glassMaterial, 0xa855f7);
      const panelNodes = [[-0.45, 0.3], [0.4, 0.42], [-0.1, -0.36], [0.48, -0.42]];
      panelNodes.forEach(([x, y], index) => {
        const node = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.28, 0.09),
          index % 2 ? violetGlow : cyanGlow,
        );
        node.position.set(x, y, 0.09);
        dataPanel.add(node);
      });
      [[0, 1], [0, 2], [1, 3], [2, 3]].forEach(([from, to]) => {
        const start = new THREE.Vector3(panelNodes[from][0], panelNodes[from][1], 0.075);
        const end = new THREE.Vector3(panelNodes[to][0], panelNodes[to][1], 0.075);
        const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
        dataPanel.add(
          new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.75 }),
          ),
        );
      });

      const floorNodes = [
        [-2.65, -2.15, 1.2],
        [0, -2.35, 1.2],
        [2.62, -2.05, 0.9],
      ];
      const coreNodes = [];
      floorNodes.forEach((position, index) => {
        addBox(root, [0.86, 0.28, 0.86], position, darkMetal, index === 1 ? 0xa855f7 : 0x22d3ee);
        const core = new THREE.Mesh(
          new THREE.OctahedronGeometry(0.22),
          index === 1 ? violetGlow : cyanGlow,
        );
        core.position.set(position[0], position[1] + 0.35, position[2]);
        root.add(core);
        coreNodes.push(core);
      });

      [
        [new THREE.Vector3(-2.65, -2.02, 1.2), new THREE.Vector3(-1.55, -1.78, 1.18), new THREE.Vector3(-1.05, -1.1, 1.05)],
        [new THREE.Vector3(0, -2.2, 1.2), new THREE.Vector3(0.9, -1.82, 1.2), new THREE.Vector3(1.25, -1.05, 1.02)],
        [new THREE.Vector3(2.62, -1.92, 0.9), new THREE.Vector3(2.1, -1.3, 0.7), new THREE.Vector3(2.55, -0.5, 0.3)],
      ].forEach((points, index) => {
        const curve = new THREE.CatmullRomCurve3(points);
        root.add(
          new THREE.Mesh(
            new THREE.TubeGeometry(curve, 32, 0.035, 8, false),
            index === 1 ? violetGlow : cyanGlow,
          ),
        );
      });

      const particleGeometry = new THREE.BufferGeometry();
      const particlePositions = [];
      for (let index = 0; index < 75; index += 1) {
        particlePositions.push(
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 6.5,
          (Math.random() - 0.5) * 4 - 1,
        );
      }
      particleGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(particlePositions, 3),
      );
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({
          color: 0x818cf8,
          size: 0.035,
          transparent: true,
          opacity: 0.55,
        }),
      );
      scene.add(particles);

      scene.add(new THREE.HemisphereLight(0x93c5fd, 0x09051d, 2.2));
      const cyanLight = new THREE.PointLight(0x22d3ee, 28, 12, 2);
      cyanLight.position.set(-3.5, 2.8, 4);
      scene.add(cyanLight);
      const violetLight = new THREE.PointLight(0xa855f7, 32, 12, 2);
      violetLight.position.set(3.5, 1.4, 3.5);
      scene.add(violetLight);

      const resize = () => {
        const width = Math.max(mount.clientWidth, 1);
        const height = Math.max(mount.clientHeight, 1);
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.position.z = camera.aspect < 1 ? 12.2 / camera.aspect : 12.2;
        camera.updateProjectionMatrix();
      };

      let targetX = root.rotation.x;
      let targetY = root.rotation.y;
      const onPointerMove = (event) => {
        const bounds = mount.getBoundingClientRect();
        const normalizedX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const normalizedY = ((event.clientY - bounds.top) / bounds.height) * 2 - 1;
        targetY = -0.28 + normalizedX * 0.2;
        targetX = -0.08 + normalizedY * 0.12;
      };
      const onPointerLeave = () => {
        targetX = -0.08;
        targetY = -0.28;
      };
      const onPointerDown = () => {
        renderer.domElement.style.cursor = "grabbing";
      };
      const onPointerUp = () => {
        renderer.domElement.style.cursor = "grab";
      };

      mount.addEventListener("pointermove", onPointerMove);
      mount.addEventListener("pointerleave", onPointerLeave);
      mount.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointerup", onPointerUp);

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const syncMotionPreference = (event) => {
        reducedMotion = event.matches;
      };
      reducedMotion = motionQuery.matches;
      motionQuery.addEventListener("change", syncMotionPreference);

      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 },
      );
      visibilityObserver.observe(mount);
      resize();

      const clock = new THREE.Clock();
      const animate = () => {
        animationFrame = window.requestAnimationFrame(animate);
        if (!isVisible) return;

        const elapsed = clock.getElapsedTime();
        root.rotation.x = THREE.MathUtils.lerp(root.rotation.x, targetX, 0.045);
        root.rotation.y = THREE.MathUtils.lerp(root.rotation.y, targetY, 0.045);
        if (!reducedMotion) {
          root.position.y = Math.sin(elapsed * 0.75) * 0.09;
          cloud.rotation.y = Math.sin(elapsed * 0.5) * 0.09;
          leftPanel.position.y = 1.72 + Math.sin(elapsed * 0.9) * 0.06;
          dataPanel.position.y = 0.35 + Math.cos(elapsed * 0.8) * 0.06;
          particles.rotation.y = elapsed * 0.018;
          coreNodes.forEach((core, index) => {
            core.rotation.y = elapsed * (0.5 + index * 0.08);
          });
        } else {
          root.position.y = 0;
        }
        renderer.render(scene, camera);
      };
      animate();

      return () => {
        window.cancelAnimationFrame(animationFrame);
        mount.removeEventListener("pointermove", onPointerMove);
        mount.removeEventListener("pointerleave", onPointerLeave);
        mount.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointerup", onPointerUp);
        motionQuery.removeEventListener("change", syncMotionPreference);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        scene.traverse((object) => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material?.dispose();
          }
        });
        renderer.dispose();
        renderer.domElement.remove();
      };
    } catch (error) {
      console.error("Unable to initialize the 3D hero scene:", error);
      setHasWebGLError(true);
      renderer?.dispose();
      return undefined;
    }
  }, []);

  return (
    <div className="relative h-full w-full" aria-live="polite">
      <div ref={mountRef} className="h-full w-full" />
      {hasWebGLError && (
        <div
          role="img"
          aria-label={SCENE_LABEL}
          className="absolute inset-0 flex items-center justify-center rounded-3xl border border-indigo-400/20 bg-indigo-500/5 text-center text-sm text-indigo-200"
        >
          Interactive 3D preview unavailable on this device.
        </div>
      )}
      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-400 backdrop-blur-md sm:bottom-5 sm:text-xs">
        Interactive WebGL
      </span>
    </div>
  );
};

export default TechScene3D;
