import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const DataFlow = ({ position }) => {
  return (
    <group position={position}>
      {/* Simple test sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    </group>
  );
};

export default DataFlow;
