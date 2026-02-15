import React, { Suspense, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Decal, Float, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

export interface ToolItem {
  name: string;
  icon: string;
  color: string;
}

interface BallProps {
  imgUrl: string;
  color: string;
  position: [number, number, number];
}

const SPACING = 6.5; // > ball diameter (5.5) to guarantee a gap between balls
const FOV = 50;
const ROW_HEIGHT_PX = 150;
const FLOAT_MARGIN = 1; // floatIntensity={2} displaces ~0.2 units max (floatIntensity/10)

// ─── Camera adapts to the actual canvas size so all balls always fit ──────────
const CameraSetup: React.FC<{ tools: ToolItem[]; cols: number }> = ({ tools, cols }) => {
  const { camera, size } = useThree();

  useEffect(() => {
    const totalRows = Math.ceil(tools.length / cols);
    // Add FLOAT_MARGIN so balls animated by <Float> don't get clipped at the edges
    const gridHeight = (totalRows - 1) * SPACING + 5.5 + FLOAT_MARGIN;
    const gridWidth  = (Math.min(tools.length, cols) - 1) * SPACING + 5.5 + FLOAT_MARGIN;

    const aspect   = size.width / size.height;
    const fovYRad  = FOV * (Math.PI / 180);
    const fovXRad  = 2 * Math.atan(Math.tan(fovYRad / 2) * aspect);

    const zForHeight = (gridHeight / 2) / Math.tan(fovYRad / 2);
    const zForWidth  = (gridWidth  / 2) / Math.tan(fovXRad / 2);

    (camera as THREE.PerspectiveCamera).position.z = Math.max(zForHeight, zForWidth);
    (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
  }, [camera, size, tools, cols]);

  return null;
};

// ─── Single ball with independent drag rotation ───────────────────────────────
const Ball: React.FC<BallProps> = ({ imgUrl, color, position }) => {
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
    <group position={position}>
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
            <meshStandardMaterial
              color={color}
              polygonOffset
              polygonOffsetFactor={-5}
              flatShading
              roughness={0.4}
              metalness={0.0}
            />
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
    </group>
  );
};

// ─── Scene: lights + all balls ────────────────────────────────────────────────
const BallScene: React.FC<{ tools: ToolItem[]; cols: number }> = ({ tools, cols }) => {
  const positions = useMemo<[number, number, number][]>(() => {
    const totalRows = Math.ceil(tools.length / cols);
    return tools.map((_, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = (col - (cols - 1) / 2) * SPACING;
      const y = ((totalRows - 1) / 2 - row) * SPACING;
      return [x, y, 0];
    });
  }, [tools, cols]);

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />
      <CameraSetup tools={tools} cols={cols} />
      {tools.map((tool, i) => (
        <Ball
          key={tool.name}
          imgUrl={tool.icon}
          color={tool.color}
          position={positions[i]}
        />
      ))}
    </>
  );
};

// ─── Single shared Canvas ─────────────────────────────────────────────────────
const BallCanvasGrid: React.FC<{ tools: ToolItem[]; cols?: number }> = ({
  tools,
  cols = 5,
}) => {
  const totalRows = Math.ceil(tools.length / cols);
  const canvasHeight = totalRows * ROW_HEIGHT_PX;

  return (
    <div style={{ width: "100%", height: `${canvasHeight}px`, touchAction: "none" }}>
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 30], fov: FOV }}
      >
        <Suspense fallback={null}>
          <BallScene tools={tools} cols={cols} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvasGrid;
