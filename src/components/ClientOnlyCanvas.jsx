import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import WebGLErrorBoundary from './WebGLErrorBoundary';

const ClientOnlyCanvas = ({ children, className, ...props }) => {
  const [isClient, setIsClient] = useState(false);
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    setIsClient(true);
    
    // Check WebGL support
    const checkWebGLSupport = () => {
      try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!gl;
      } catch (e) {
        return false;
      }
    };

    setWebglSupported(checkWebGLSupport());
  }, []);

  // Don't render on server side
  if (!isClient) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full w-full bg-gray-900">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
            <p>Loading 3D Graphics...</p>
          </div>
        </div>
      </div>
    );
  }

  // If WebGL is not supported, show fallback
  if (!webglSupported) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center h-full w-full bg-gray-900 text-white">
          <div className="text-center p-8">
            <h3 className="text-xl font-bold mb-4">WebGL Not Supported</h3>
            <p className="text-gray-300">
              Your browser doesn't support WebGL, which is required for 3D graphics.
              Please update your browser or enable hardware acceleration.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <WebGLErrorBoundary>
      <Canvas
        className={className}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          failIfMajorPerformanceCaveat: false,
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]} // Limit device pixel ratio for better performance
        performance={{ min: 0.5 }} // Reduce quality if performance is poor
                 onCreated={({ gl }) => {
           // Configure WebGL context
           gl.setClearColor('#0a0a0a', 1.0);
           gl.shadowMap.enabled = true;
           gl.shadowMap.type = 2; // THREE.PCFSoftShadowMap
           
           // Handle context lost/restored
           const canvas = gl.domElement;
           
           if (canvas) {
             canvas.addEventListener('webglcontextlost', (event) => {
               console.warn('WebGL context lost');
               event.preventDefault();
             });
             
             canvas.addEventListener('webglcontextrestored', () => {
               console.log('WebGL context restored');
               // Force re-render
               window.location.reload();
             });
           }
         }}
        {...props}
      >
        {children}
      </Canvas>
    </WebGLErrorBoundary>
  );
};

export default ClientOnlyCanvas;
