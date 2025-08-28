import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function TechWorkspace(props) {
  return (
    <group {...props}>
      {/* Simple test cylinder */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1, 2, 16]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </group>
  );
}

export default TechWorkspace;
