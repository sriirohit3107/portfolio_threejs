import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const AICamera = ({ isMobile, children }) => {
  const group = useRef();

  useFrame((state, delta) => {
    // Camera movement with AI-like precision
    easing.damp3(state.camera.position, [0, 0, 20], 0.25, delta);

    if (!isMobile) {
      // Add AI-like camera behavior
      easing.dampE(group.current.rotation, [-state.pointer.y / 3, state.pointer.x / 5, 0], 0.25, delta);
    }
  });

  return (
    <group ref={group}>
      {/* Simple test torus */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.3, 16, 32]} />
        <meshStandardMaterial color="purple" />
      </mesh>
      {children}
    </group>
  );
};

export default AICamera;
