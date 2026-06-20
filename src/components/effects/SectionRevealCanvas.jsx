import { useEffect, useRef } from "react";
import * as THREE from "three";
import { onSectionReveal } from "../../lib/sectionRevealBridge";

const REVEAL_DURATION = 950;

function easeOutQuart(t) {
  return 1 - (1 - t) ** 4;
}

export default function SectionRevealCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let renderer;
    let scene;
    let camera;
    let frameId = 0;
    let running = true;
    let loopActive = false;
    const activePages = [];

    const pageMaterial = new THREE.MeshBasicMaterial({
      color: 0x13023d,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const edgeMaterial = new THREE.MeshBasicMaterial({
      color: 0x0036bc,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });

    const syncSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();
    };

    const tick = (now) => {
      if (!running) return;

      if (activePages.length === 0) {
        loopActive = false;
        return;
      }

      for (let i = activePages.length - 1; i >= 0; i -= 1) {
        const entry = activePages[i];
        const progress = Math.min((now - entry.start) / REVEAL_DURATION, 1);
        const eased = easeOutQuart(progress);

        entry.group.rotation.y = THREE.MathUtils.lerp(-1.28, 0, eased);
        entry.group.position.z = THREE.MathUtils.lerp(-100, 0, eased);

        const fadeOut = progress > 0.78 ? 1 - (progress - 0.78) / 0.22 : 1;
        pageMaterial.opacity = 0.18 * fadeOut;
        edgeMaterial.opacity = 0.5 * fadeOut;

        if (progress >= 1) {
          scene.remove(entry.group);
          entry.page.geometry.dispose();
          entry.edge.geometry.dispose();
          entry.spine.geometry.dispose();
          activePages.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (loopActive) return;
      loopActive = true;
      frameId = requestAnimationFrame(tick);
    };

    const spawnPage = (element) => {
      requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 40 || rect.height < 40) return;

        const group = new THREE.Group();
        const pageWidth = rect.width;
        const pageHeight = rect.height;
        const centerX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const centerY = window.innerHeight / 2 - (rect.top + rect.height / 2);

        const page = new THREE.Mesh(
          new THREE.PlaneGeometry(pageWidth, pageHeight),
          pageMaterial
        );
        page.position.x = pageWidth * 0.5;

        const edge = new THREE.Mesh(
          new THREE.PlaneGeometry(6, pageHeight),
          edgeMaterial
        );

        const spine = new THREE.Mesh(
          new THREE.PlaneGeometry(2, pageHeight),
          edgeMaterial
        );
        spine.position.x = -1;

        group.add(page);
        group.add(edge);
        group.add(spine);
        group.position.set(centerX - pageWidth / 2, centerY, 0);
        group.rotation.y = -1.28;

        scene.add(group);
        activePages.push({
          group,
          start: performance.now(),
          page,
          edge,
          spine,
        });

        startLoop();
      });
    };

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.className =
        "pointer-events-none fixed inset-0 z-[5] block h-full w-full";
      container.appendChild(renderer.domElement);

      scene = new THREE.Scene();
      camera = new THREE.OrthographicCamera(0, 0, 0, 0, -500, 500);
      camera.position.z = 10;

      syncSize();
      window.addEventListener("resize", syncSize);

      const unsubscribe = onSectionReveal(({ element }) => {
        spawnPage(element);
      });

      return () => {
        running = false;
        unsubscribe();
        cancelAnimationFrame(frameId);
        window.removeEventListener("resize", syncSize);
        activePages.forEach((entry) => {
          scene.remove(entry.group);
          entry.page.geometry.dispose();
          entry.edge.geometry.dispose();
          entry.spine.geometry.dispose();
        });
        pageMaterial.dispose();
        edgeMaterial.dispose();
        renderer?.dispose();
        if (renderer?.domElement?.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      return () => {};
    }
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
