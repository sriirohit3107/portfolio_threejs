import { Float } from '@react-three/drei';

const ModelFallback = ({ 
  geometry = 'box', 
  size = [1, 1, 1], 
  color = '#3b82f6',
  position = [0, 0, 0],
  scale = 1,
  ...props 
}) => {
  const getGeometry = () => {
    switch (geometry) {
      case 'sphere':
        return <sphereGeometry args={size} />;
      case 'cylinder':
        return <cylinderGeometry args={size} />;
      case 'cone':
        return <coneGeometry args={size} />;
      case 'torus':
        return <torusGeometry args={size} />;
      default:
        return <boxGeometry args={size} />;
    }
  };

  return (
    <Float floatIntensity={1}>
      <mesh position={position} scale={scale} {...props}>
        {getGeometry()}
        <meshStandardMaterial 
          color={color} 
          metalness={0.7} 
          roughness={0.3}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

export default ModelFallback;
