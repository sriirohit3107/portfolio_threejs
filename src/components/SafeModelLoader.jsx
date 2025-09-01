import { useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
import * as THREE from 'three';

const SafeModelLoader = ({ 
  modelPath, 
  fallbackGeometry = 'box', 
  fallbackSize = [1, 1, 1], 
  fallbackColor = '#3b82f6',
  children,
  ...props 
}) => {
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Try to load the model with error handling
  let modelData = null;
  try {
    if (!modelError) {
      modelData = useGLTF(modelPath);
    }
  } catch (error) {
    console.warn(`Failed to load model ${modelPath}:`, error);
    setModelError(true);
  }

  useEffect(() => {
    if (modelData) {
      setIsLoading(false);
    }
  }, [modelData]);

  // If model failed to load or is still loading, show fallback
  if (modelError || isLoading) {
    const getFallbackGeometry = () => {
      switch (fallbackGeometry) {
        case 'sphere':
          return <sphereGeometry args={fallbackSize} />;
        case 'cylinder':
          return <cylinderGeometry args={fallbackSize} />;
        case 'cone':
          return <coneGeometry args={fallbackSize} />;
        case 'torus':
          return <torusGeometry args={fallbackSize} />;
        default:
          return <boxGeometry args={fallbackSize} />;
      }
    };

    return (
      <mesh {...props}>
        {getFallbackGeometry()}
        <meshStandardMaterial 
          color={fallbackColor} 
          metalness={0.7} 
          roughness={0.3}
          emissive={fallbackColor}
          emissiveIntensity={0.1}
        />
      </mesh>
    );
  }

  // If model loaded successfully, render it
  if (modelData && children) {
    return children(modelData);
  }

  return null;
};

export default SafeModelLoader;
