import { useRef, useEffect, useMemo, forwardRef, useImperativeHandle } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer.js';
import gsap from 'gsap';

const ProtoplanetSystem = forwardRef((props, ref) => {
  const groupRef = useRef();
  const particlesRef = useRef();
  const gpuComputeRef = useRef();
  const velocityVariableRef = useRef();
  const positionVariableRef = useRef();
  const velocityUniformsRef = useRef();
  const particleUniformsRef = useRef();
  
  const { gl, camera, scene } = useThree();
  
  // Simulation parameters
  const WIDTH = 64;
  const PARTICLES = WIDTH * WIDTH;
  
  // Effect controller for dynamic parameters
  const effectController = useMemo(() => ({
    gravityConstant: 100.0,
    density: 0.45,
    radius: 300,
    height: 8,
    exponent: 0.4,
    maxMass: 15.0,
    velocity: 70,
    velocityExponent: 0.2,
    randVelocity: 0.001
  }), []);

  // Shader code
  const computeShaderPosition = `
    #define delta ( 1.0 / 60.0 )

    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      
      vec4 tmpPos = texture2D( texturePosition, uv );
      vec3 pos = tmpPos.xyz;
      
      vec4 tmpVel = texture2D( textureVelocity, uv );
      vec3 vel = tmpVel.xyz;
      float mass = tmpVel.w;
      
      if ( mass == 0.0 ) {
        vel = vec3( 0.0 );
      }
      
      // Dynamics
      pos += vel * delta;
      
      gl_FragColor = vec4( pos, 1.0 );
    }
  `;

  const computeShaderVelocity = `
    #define delta ( 1.0 / 60.0 )
    #define PI 3.14159265359
    
    uniform float gravityConstant;
    uniform float density;
    
    const float width = resolution.x;
    const float height = resolution.y;
    
    float radiusFromMass( float mass ) {
      return pow( ( 3.0 / ( 4.0 * PI ) ) * mass / density, 1.0 / 3.0 );
    }
    
    void main() {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      float idParticle = uv.y * resolution.x + uv.x;
      
      vec4 tmpPos = texture2D( texturePosition, uv );
      vec3 pos = tmpPos.xyz;
      
      vec4 tmpVel = texture2D( textureVelocity, uv );
      vec3 vel = tmpVel.xyz;
      float mass = tmpVel.w;
      
      if ( mass > 0.0 ) {
        float radius = radiusFromMass( mass );
        vec3 acceleration = vec3( 0.0 );
        
        // Gravity interaction
        for ( float y = 0.0; y < height; y++ ) {
          for ( float x = 0.0; x < width; x++ ) {
            vec2 secondParticleCoords = vec2( x + 0.5, y + 0.5 ) / resolution.xy;
            vec3 pos2 = texture2D( texturePosition, secondParticleCoords ).xyz;
            vec4 velTemp2 = texture2D( textureVelocity, secondParticleCoords );
            vec3 vel2 = velTemp2.xyz;
            float mass2 = velTemp2.w;
            
            float idParticle2 = secondParticleCoords.y * resolution.x + secondParticleCoords.x;
            
            if ( idParticle == idParticle2 ) continue;
            if ( mass2 == 0.0 ) continue;
            
            vec3 dPos = pos2 - pos;
            float distance = length( dPos );
            float radius2 = radiusFromMass( mass2 );
            
            if ( distance == 0.0 ) continue;
            
            // Check collision
            if ( distance < radius + radius2 ) {
              if ( idParticle < idParticle2 ) {
                vel = ( vel * mass + vel2 * mass2 ) / ( mass + mass2 );
                mass += mass2;
                radius = radiusFromMass( mass );
              } else {
                mass = 0.0;
                radius = 0.0;
                vel = vec3( 0.0 );
                break;
              }
            }
            
            float distanceSq = distance * distance;
            float gravityField = gravityConstant * mass2 / distanceSq;
            gravityField = min( gravityField, 1000.0 );
            acceleration += gravityField * normalize( dPos );
          }
          
          if ( mass == 0.0 ) break;
        }
        
        // Dynamics
        vel += delta * acceleration;
      }
      
      gl_FragColor = vec4( vel, mass );
    }
  `;

  const particleVertexShader = `
    #define PI 3.14159265359
    
    uniform sampler2D texturePosition;
    uniform sampler2D textureVelocity;
    uniform float cameraConstant;
    uniform float density;
    
    varying vec4 vColor;
    
    float radiusFromMass( float mass ) {
      return pow( ( 3.0 / ( 4.0 * PI ) ) * mass / density, 1.0 / 3.0 );
    }
    
    void main() {
      vec4 posTemp = texture2D( texturePosition, uv );
      vec3 pos = posTemp.xyz;
      
      vec4 velTemp = texture2D( textureVelocity, uv );
      vec3 vel = velTemp.xyz;
      float mass = velTemp.w;
      
      vColor = vec4( 1.0, mass / 250.0, 0.0, 1.0 );
      
      vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );
      
      float radius = radiusFromMass( mass );
      
      if ( mass == 0.0 ) {
        gl_PointSize = 0.0;
      } else {
        gl_PointSize = radius * cameraConstant / ( - mvPosition.z );
      }
      
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const particleFragmentShader = `
    varying vec4 vColor;
    
    void main() {
      if ( vColor.y == 0.0 ) discard;
      
      float f = length( gl_PointCoord - vec2( 0.5, 0.5 ) );
      if ( f > 0.5 ) {
        discard;
      }
      gl_FragColor = vColor;
    }
  `;

  // Initialize GPU computation renderer
  const initComputeRenderer = () => {
    if (!gl || !camera) return;

    const gpuCompute = new GPUComputationRenderer(WIDTH, WIDTH, gl);
    gpuComputeRef.current = gpuCompute;

    const dtPosition = gpuCompute.createTexture();
    const dtVelocity = gpuCompute.createTexture();

    fillTextures(dtPosition, dtVelocity);

    const velocityVariable = gpuCompute.addVariable('textureVelocity', computeShaderVelocity, dtVelocity);
    const positionVariable = gpuCompute.addVariable('texturePosition', computeShaderPosition, dtPosition);

    gpuCompute.setVariableDependencies(velocityVariable, [positionVariable, velocityVariable]);
    gpuCompute.setVariableDependencies(positionVariable, [positionVariable, velocityVariable]);

    velocityVariableRef.current = velocityVariable;
    positionVariableRef.current = positionVariable;
    velocityUniformsRef.current = velocityVariable.material.uniforms;

    velocityUniformsRef.current['gravityConstant'] = { value: effectController.gravityConstant };
    velocityUniformsRef.current['density'] = { value: effectController.density };

    const error = gpuCompute.init();
    if (error !== null) {
      console.error('GPU Compute Error:', error);
    }
  };

  // Fill textures with initial particle data
  const fillTextures = (texturePosition, textureVelocity) => {
    const posArray = texturePosition.image.data;
    const velArray = textureVelocity.image.data;

    const radius = effectController.radius;
    const height = effectController.height;
    const exponent = effectController.exponent;
    const maxMass = effectController.maxMass * 1024 / PARTICLES;
    const maxVel = effectController.velocity;
    const velExponent = effectController.velocityExponent;
    const randVel = effectController.randVelocity;

    for (let k = 0, kl = posArray.length; k < kl; k += 4) {
      // Position
      let x, z, rr;
      do {
        x = (Math.random() * 2 - 1);
        z = (Math.random() * 2 - 1);
        rr = x * x + z * z;
      } while (rr > 1);

      rr = Math.sqrt(rr);
      const rExp = radius * Math.pow(rr, exponent);

      // Velocity
      const vel = maxVel * Math.pow(rr, velExponent);
      const vx = vel * z + (Math.random() * 2 - 1) * randVel;
      const vy = (Math.random() * 2 - 1) * randVel * 0.05;
      const vz = -vel * x + (Math.random() * 2 - 1) * randVel;

      x *= rExp;
      z *= rExp;
      const y = (Math.random() * 2 - 1) * height;
      const mass = Math.random() * maxMass + 1;

      // Fill texture values
      posArray[k + 0] = x;
      posArray[k + 1] = y;
      posArray[k + 2] = z;
      posArray[k + 3] = 1;

      velArray[k + 0] = vx;
      velArray[k + 1] = vy;
      velArray[k + 2] = vz;
      velArray[k + 3] = mass;
    }
  };

  // Initialize particles
  const initParticles = () => {
    if (!camera) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLES * 3);
    let p = 0;

    for (let i = 0; i < PARTICLES; i++) {
      positions[p++] = (Math.random() * 2 - 1) * effectController.radius;
      positions[p++] = 0;
      positions[p++] = (Math.random() * 2 - 1) * effectController.radius;
    }

    const uvs = new Float32Array(PARTICLES * 2);
    p = 0;

    for (let j = 0; j < WIDTH; j++) {
      for (let i = 0; i < WIDTH; i++) {
        uvs[p++] = i / (WIDTH - 1);
        uvs[p++] = j / (WIDTH - 1);
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

    particleUniformsRef.current = {
      'texturePosition': { value: null },
      'textureVelocity': { value: null },
      'cameraConstant': { value: getCameraConstant() },
      'density': { value: effectController.density }
    };

    const material = new THREE.ShaderMaterial({
      uniforms: particleUniformsRef.current,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    particles.matrixAutoUpdate = false;
    particles.updateMatrix();
    
    console.log('Particles created:', particles);
    return particles;
  };

  const getCameraConstant = () => {
    return window.innerHeight / (Math.tan(THREE.MathUtils.DEG2RAD * 0.5 * camera.fov) / camera.zoom);
  };

  // Restart simulation
  const restartSimulation = () => {
    if (!gpuComputeRef.current || !positionVariableRef.current || !velocityVariableRef.current) return;

    const dtPosition = gpuComputeRef.current.createTexture();
    const dtVelocity = gpuComputeRef.current.createTexture();

    fillTextures(dtPosition, dtVelocity);

    gpuComputeRef.current.renderTexture(dtPosition, positionVariableRef.current.renderTargets[0]);
    gpuComputeRef.current.renderTexture(dtPosition, positionVariableRef.current.renderTargets[1]);
    gpuComputeRef.current.renderTexture(dtVelocity, velocityVariableRef.current.renderTargets[0]);
    gpuComputeRef.current.renderTexture(dtVelocity, velocityVariableRef.current.renderTargets[1]);
  };

  // Update dynamic values
  const updateDynamicValues = () => {
    if (velocityUniformsRef.current && particleUniformsRef.current) {
      velocityUniformsRef.current['gravityConstant'].value = effectController.gravityConstant;
      velocityUniformsRef.current['density'].value = effectController.density;
      particleUniformsRef.current['density'].value = effectController.density;
    }
  };

  useEffect(() => {
    if (gl && camera) {
      initComputeRenderer();
      const particles = initParticles();
      if (particles && groupRef.current) {
        groupRef.current.add(particles);
        particlesRef.current = particles;
      }
    }
  }, [gl, camera]);

  useGSAP(() => {
    // Animate the entire system
    if (groupRef.current) {
      gsap.to(groupRef.current.rotation, {
        y: Math.PI * 2,
        duration: 30,
        repeat: -1,
        ease: "none"
      });
    }

    // Periodically restart simulation for variety
    const interval = setInterval(() => {
      restartSimulation();
    }, 15000); // Restart every 15 seconds

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    // Update GPU computation
    if (gpuComputeRef.current && particleUniformsRef.current) {
      gpuComputeRef.current.compute();

      particleUniformsRef.current['texturePosition'].value = 
        gpuComputeRef.current.getCurrentRenderTarget(positionVariableRef.current).texture;
      particleUniformsRef.current['textureVelocity'].value = 
        gpuComputeRef.current.getCurrentRenderTarget(velocityVariableRef.current).texture;
    }

    // Update camera constant for responsive particle sizing
    if (particleUniformsRef.current) {
      particleUniformsRef.current['cameraConstant'].value = getCameraConstant();
    }
  });

  // Expose functions via useImperativeHandle
  useImperativeHandle(ref, () => ({
    restartSimulation,
    updateDynamicValues,
    effectController,
    updateParameters: (newParams) => {
      Object.assign(effectController, newParams);
      updateDynamicValues();
    }
  }), [effectController]);

  // Expose restart function for external control
  useEffect(() => {
    if (props.onReady) {
      props.onReady({
        restartSimulation,
        updateDynamicValues,
        effectController
      });
    }
  }, [props.onReady]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      {/* Ambient lighting for the particle system */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 100, 0]} intensity={0.8} color="#fbbf24" />
      <pointLight position={[0, 0, 100]} intensity={0.6} color="#3b82f6" />
      
      {/* Fallback simple particles if GPU compute fails */}
      {!gpuComputeRef.current && (
        <group>
          {Array.from({ length: 100 }, (_, i) => (
            <mesh
              key={`fallback-${i}`}
              position={[
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
              ]}
            >
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshBasicMaterial 
                color={`hsl(${Math.random() * 360}, 70%, 60%)`}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))}
        </group>
      )}
      
      {/* Optional: Add some decorative elements around the particle system */}
      <mesh position={[0, 0, -50]}>
        <ringGeometry args={[400, 450, 64]} />
        <meshBasicMaterial color="#1e293b" transparent opacity={0.1} />
      </mesh>
      
      <mesh position={[0, 0, -100]}>
        <ringGeometry args={[500, 550, 64]} />
        <meshBasicMaterial color="#0f172a" transparent opacity={0.05} />
      </mesh>
    </group>
  );
});

export default ProtoplanetSystem;
