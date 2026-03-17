import React, { Suspense, useRef, useEffect } from "react";
import { useTheme } from "../hooks/useTheme";
import { Canvas, useFrame } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface ToolItem {
  name: string;
  /** Icon used in dark mode (default). */
  icon: string;
  /** Icon used in light mode. Falls back to `icon` if omitted. */
  lightIcon?: string;
  /** Ball color in light mode. In dark mode the ball is always white. */
  color: string;
}

// ─── Single ball (no position prop needed – centred in its own Canvas) ────────
const Ball: React.FC<{ imgUrl: string; color: string; isDark: boolean }> = ({ imgUrl, color, isDark }) => {
  const [decal] = useTexture([imgUrl]);
  const groupRef = useRef<THREE.Group>(null);
  const drag = useRef({ active: false, lastX: 0, lastY: 0, rotX: 0, rotY: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current.active) return;
      drag.current.rotY += (e.clientX - drag.current.lastX) * 0.01;
      drag.current.rotX += (e.clientY - drag.current.lastY) * 0.01;
      drag.current.lastX = e.clientX;
      drag.current.lastY = e.clientY;
    };
    const onUp = () => {
      drag.current.active = false;
      document.body.style.cursor = "default";
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = drag.current.rotX;
      groupRef.current.rotation.y = drag.current.rotY;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
        <mesh
          castShadow
          receiveShadow
          scale={2.3}
          onPointerDown={(e) => {
            e.stopPropagation();
            drag.current.active = true;
            drag.current.lastX = e.clientX;
            drag.current.lastY = e.clientY;
            document.body.style.cursor = "grabbing";
          }}
          onPointerOver={() => { document.body.style.cursor = "grab"; }}
          onPointerOut={() => { if (!drag.current.active) document.body.style.cursor = "default"; }}
        >
          <icosahedronGeometry args={[1, 1]} />
          {isDark ? (
            // meshBasicMaterial ignores all lighting → guaranteed pure white
            <meshBasicMaterial color={color} polygonOffset polygonOffsetFactor={-5} />
          ) : (
            <meshStandardMaterial
              color={color}
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
              roughness={0.4}
              metalness={0.0}
            />
          )}
          <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.5}>
            <meshBasicMaterial
              map={decal}
              transparent
              alphaTest={0.1}
              polygonOffset
              polygonOffsetFactor={-10}
              toneMapped={false}
            />
          </Decal>
        </mesh>
      </Float>
    </group>
  );
};

// ─── One card: mini Canvas + name label ───────────────────────────────────────
const BallCard: React.FC<{ tool: ToolItem }> = ({ tool }) => {
  const theme = useTheme();
  const isDark = theme === "dark";

  // Dark mode: white ball + dark-mode icon; Light mode: tool color + light icon
  const ballColor = isDark ? "#ffffff" : tool.color;
  const imgUrl    = isDark ? tool.icon : (tool.lightIcon ?? tool.icon);

  return (
    <div className="tool-card">
      <div className="ball-container">
        <Canvas
          frameloop="always"
          dpr={[1, 2]}
          gl={{ preserveDrawingBuffer: true }}
          camera={{ position: [0, 0, 7], fov: 45 }}
        >
          <ambientLight intensity={isDark ? 1.0 : 0.6} />
          <directionalLight position={[0, 0, 0.05]} intensity={isDark ? 0 : 0.5} />
          <Suspense fallback={null}>
            <Ball imgUrl={imgUrl} color={ballColor} isDark={isDark} />
          </Suspense>
          <Preload all />
        </Canvas>
      </div>
      <span className="tool-name">
        {tool.name}
      </span>
    </div>
  );
};

// ─── Grid of cards ────────────────────────────────────────────────────────────
const BallCanvasGrid: React.FC<{ tools: ToolItem[] }> = ({ tools }) => (
  <div className="tech-grid">
    {tools.map((tool) => (
      <BallCard key={tool.name} tool={tool} />
    ))}
  </div>
);

export default BallCanvasGrid;
