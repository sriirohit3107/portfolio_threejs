import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const AIComputer = (props) => {
  const group = useRef();
  const neuralNetworkRef = useRef();
  const dataStreamsRef = useRef([]);
  const processingUnitsRef = useRef([]);

  useGSAP(() => {
    // Animate neural network nodes
    if (neuralNetworkRef.current) {
      gsap.to(neuralNetworkRef.current.rotation, {
        y: Math.PI * 2,
        duration: 8,
        repeat: -1,
        ease: "none"
      });
    }

    // Animate data streams
    dataStreamsRef.current.forEach((stream, index) => {
      gsap.to(stream.position, {
        y: stream.position.y + 0.5,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      });
    });

    // Animate processing units
    processingUnitsRef.current.forEach((unit, index) => {
      gsap.to(unit.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });
  });

  useFrame((state) => {
    // Rotate the entire system slowly
    if (group.current) {
      group.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Main AI Computer Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 2, 1.5]} />
        <meshStandardMaterial 
          color="#1f2937" 
          metalness={0.8} 
          roughness={0.2}
          emissive="#0f172a"
          emissiveIntensity={0.1}
        />
        </mesh>

      {/* AI Processing Core */}
      <mesh position={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.8, 0.8, 0.3, 16]} />
        <meshStandardMaterial 
          color="#3b82f6" 
          emissive="#1d4ed8"
          emissiveIntensity={0.6}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Neural Network Visualization */}
      <group ref={neuralNetworkRef} position={[0, 0.5, 0.8]}>
        {/* Input Layer */}
        {Array.from({ length: 4 }, (_, index) => (
          <mesh
            key={`input-${index}`}
            position={[-1.5 + index * 1, 0, 0]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="#10b981" 
              emissive="#059669"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}

        {/* Hidden Layer 1 */}
        {Array.from({ length: 6 }, (_, index) => (
          <mesh
            key={`hidden1-${index}`}
            position={[-1.25 + index * 0.5, 0.5, 0]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#f59e0b" 
              emissive="#d97706"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}

        {/* Hidden Layer 2 */}
        {Array.from({ length: 6 }, (_, index) => (
          <mesh
            key={`hidden2-${index}`}
            position={[-1.25 + index * 0.5, 1, 0]}
          >
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial 
              color="#8b5cf6" 
              emissive="#7c3aed"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}

        {/* Output Layer */}
        {Array.from({ length: 3 }, (_, index) => (
          <mesh
            key={`output-${index}`}
            position={[-1 + index * 1, 1.5, 0]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial 
              color="#ef4444" 
              emissive="#dc2626"
              emissiveIntensity={0.4}
            />
          </mesh>
        ))}
        </group>

      {/* Data Processing Units */}
      {Array.from({ length: 5 }, (_, index) => (
          <mesh
          key={`processor-${index}`}
          ref={(el) => (processingUnitsRef.current[index] = el)}
          position={[-2 + index * 0.8, -0.5, 0.8]}
        >
          <boxGeometry args={[0.6, 0.4, 0.4]} />
          <meshStandardMaterial 
            color={index % 2 === 0 ? '#06b6d4' : '#ec4899'}
            emissive={index % 2 === 0 ? '#0891b2' : '#db2777'}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Data Streams */}
      {Array.from({ length: 8 }, (_, index) => (
          <mesh
          key={`stream-${index}`}
          ref={(el) => (dataStreamsRef.current[index] = el)}
          position={[-3 + index * 0.8, -1, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial 
            color="#64748b" 
            emissive="#475569"
            emissiveIntensity={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* AI Status Indicators */}
      <group position={[0, -0.8, 0.8]}>
        {/* Processing Status Light */}
        <pointLight position={[0, 0, 0]} color="#10b981" intensity={0.8} distance={2} />
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#10b981" 
            emissive="#059669"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Memory Banks */}
      {Array.from({ length: 4 }, (_, index) => (
          <mesh
          key={`memory-${index}`}
          position={[1.5, -0.3 + index * 0.4, 0]}
        >
          <boxGeometry args={[0.3, 0.2, 0.8]} />
          <meshStandardMaterial 
            color="#84cc16" 
            emissive="#65a30d"
            emissiveIntensity={0.2}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}

      {/* Cooling System */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 16]} />
        <meshStandardMaterial 
          color="#6b7280" 
          emissive="#4b5563"
          emissiveIntensity={0.1}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Network Interface */}
      <mesh position={[-1.5, -0.8, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.6]} />
        <meshStandardMaterial 
          color="#1f2937" 
          emissive="#111827"
          emissiveIntensity={0.1}
          metalness={0.7}
          roughness={0.3}
        />
        
        {/* Network Lights */}
        {Array.from({ length: 3 }, (_, index) => (
          <pointLight
            key={`network-light-${index}`}
            position={[-0.1, 0, -0.2 + index * 0.2]}
            color="#3b82f6"
            intensity={0.4}
            distance={0.5}
          />
        ))}
      </mesh>

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 3, 0]} intensity={0.8} color="#fbbf24" />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#3b82f6" />
    </group>
  );
};

export default AIComputer;
