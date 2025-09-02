import { useGLTF } from '@react-three/drei';
import { useState, useEffect } from 'react';
import ModelFallback from './ModelFallback';

const VercelSafeModelLoader = ({ 
  modelPath, 
  fallbackGeometry = 'box', 
  fallbackSize = [1, 1, 1], 
  fallbackColor = '#3b82f6',
  children,
  ...props 
}) => {
  const [modelError, setModelError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // Try to load the model with error handling and retry logic
  let modelData = null;
  try {
    if (!modelError && retryCount < 3) {
      modelData = useGLTF(modelPath);
    }
  } catch (error) {
    console.warn(`Failed to load model ${modelPath} (attempt ${retryCount + 1}):`, error);
    
    // Retry with different path formats
    if (retryCount === 0) {
      // Try without leading slash
      const altPath = modelPath.startsWith('/') ? modelPath.slice(1) : modelPath;
      try {
        modelData = useGLTF(altPath);
        console.log(`Successfully loaded model with alternative path: ${altPath}`);
      } catch (altError) {
        console.warn(`Alternative path also failed: ${altError}`);
        setRetryCount(1);
      }
    } else if (retryCount === 1) {
      // Try with relative path from public
      const relativePath = modelPath.startsWith('/') ? `.${modelPath}` : `./${modelPath}`;
      try {
        modelData = useGLTF(relativePath);
        console.log(`Successfully loaded model with relative path: ${relativePath}`);
      } catch (relError) {
        console.warn(`Relative path also failed: ${relError}`);
        setRetryCount(2);
      }
    } else {
      setModelError(true);
    }
  }

  useEffect(() => {
    if (modelData) {
      setIsLoading(false);
      setModelError(false);
    }
  }, [modelData]);

  // If model failed to load after all retries, show fallback
  if (modelError || (isLoading && retryCount >= 2)) {
    return (
      <ModelFallback 
        geometry={fallbackGeometry}
        size={fallbackSize}
        color={fallbackColor}
        {...props}
      />
    );
  }

  // If model loaded successfully, render it
  if (modelData && children) {
    return children(modelData);
  }

  // Show loading state
  return (
    <ModelFallback 
      geometry={fallbackGeometry}
      size={fallbackSize}
      color={fallbackColor}
      {...props}
    />
  );
};

export default VercelSafeModelLoader;
