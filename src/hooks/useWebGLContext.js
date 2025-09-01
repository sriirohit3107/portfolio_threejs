import { useEffect, useRef, useState } from 'react';

export const useWebGLContext = () => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const contextRef = useRef(null);

  useEffect(() => {
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl2') || 
                  canvas.getContext('webgl') || 
                  canvas.getContext('experimental-webgl');
        
        if (gl) {
          setIsWebGLSupported(true);
          contextRef.current = gl;
          
          // Handle context lost/restored events
          canvas.addEventListener('webglcontextlost', (event) => {
            console.warn('WebGL context lost');
            setContextLost(true);
            event.preventDefault();
          });
          
          canvas.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
            setContextLost(false);
            // Force a re-render
            window.location.reload();
          });
        } else {
          setIsWebGLSupported(false);
        }
      } catch (e) {
        console.error('WebGL not supported:', e);
        setIsWebGLSupported(false);
      }
    };

    checkWebGLSupport();
  }, []);

  return {
    isWebGLSupported,
    contextLost,
    context: contextRef.current,
  };
};
