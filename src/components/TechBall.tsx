import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

interface BallProps {
  imgUrl: string;
  color: string;
}

const Ball: React.FC<BallProps> = ({ imgUrl, color }) => {
  const [decal] = useTexture([imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[0, 0, 0.05]} intensity={0.5} />

      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        {/* MeshStandardMaterial keeps the 3D shading on the ball */}
        <meshStandardMaterial
          color={color}
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
          roughness={0.4}
          metalness={0.0}
        />

        {/*
          MeshBasicMaterial as a child overrides the Decal's default material.
          - transparent + alphaTest: only icon pixels are rendered, background is discarded
          - toneMapped=false: icon renders at full brightness regardless of scene exposure
          - No lighting means no shading mismatch between decal and mesh at the icon border
        */}
        <Decal position={[0, 0, 1]} rotation={[2 * Math.PI, 0, 6.25]}>
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
  );
};

const BallCanvas = ({ icon, color }: { icon: string; color: string }) => {
  return (
    <div style={{ width: "100px", height: "100px", cursor: "grab" }}>
      <Canvas
        frameloop="always"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
      >
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} />
          <Ball imgUrl={icon} color={color} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default BallCanvas;
