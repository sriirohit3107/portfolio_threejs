import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const NeuralNetwork = (props) => {
  const brainRef = useRef();
  const nodesRef = useRef([]);
  const connectionsRef = useRef([]);
  const iconsRef = useRef([]);

  // Create neural network structure
  const networkData = useMemo(() => {
    const nodes = [];
    const connections = [];
    const icons = [];

    // Central brain nodes (core neural network)
    const brainNodes = [
      { x: 0, y: 0, z: 0, type: 'core', layer: 'brain' },
      { x: 0.5, y: 0.3, z: 0.2, type: 'core', layer: 'brain' },
      { x: -0.5, y: 0.3, z: 0.2, type: 'core', layer: 'brain' },
      { x: 0.3, y: -0.4, z: 0.1, type: 'core', layer: 'brain' },
      { x: -0.3, y: -0.4, z: 0.1, type: 'core', layer: 'brain' },
      { x: 0, y: 0.6, z: 0.3, type: 'core', layer: 'brain' },
      { x: 0, y: -0.6, z: 0.3, type: 'core', layer: 'brain' },
    ];

    // Input layer nodes
    const inputNodes = Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 2.5;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6,
        z: 0,
        type: 'input',
        layer: 'input',
        index: i
      };
    });

    // Processing layer nodes
    const processingNodes = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.8;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.5,
        z: 0.5,
        type: 'processing',
        layer: 'processing',
        index: i
      };
    });

    // Output layer nodes
    const outputNodes = Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 3.2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.4,
        z: 1,
        type: 'output',
        layer: 'output',
        index: i
      };
    });

    // Add all nodes
    nodes.push(...brainNodes, ...inputNodes, ...processingNodes, ...outputNodes);

    // Create connections between layers
    brainNodes.forEach(brainNode => {
      processingNodes.forEach(procNode => {
        connections.push({
          from: brainNode,
          to: procNode,
          type: 'brain-processing'
        });
      });
    });

    inputNodes.forEach(inputNode => {
      processingNodes.forEach(procNode => {
        connections.push({
          from: inputNode,
          to: procNode,
          type: 'input-processing'
        });
      });
    });

    processingNodes.forEach(procNode => {
      outputNodes.forEach(outputNode => {
        connections.push({
          from: procNode,
          to: outputNode,
          type: 'processing-output'
        });
      });
    });

    // Create AI/ML concept icons around the brain
    const iconPositions = [
      { x: -4, y: 3, z: 0, icon: 'ai-chip', color: '#3b82f6' },
      { x: -3.5, y: 2.5, z: 0, icon: 'health', color: '#10b981' },
      { x: -3, y: 2, z: 0, icon: 'data', color: '#f59e0b' },
      { x: -2.5, y: 1.5, z: 0, icon: 'communication', color: '#8b5cf6' },
      { x: 4, y: 3, z: 0, icon: 'robot', color: '#ef4444' },
      { x: 3.5, y: 2.5, z: 0, icon: 'security', color: '#84cc16' },
      { x: 3, y: 2, z: 0, icon: 'analytics', color: '#06b6d4' },
      { x: 2.5, y: 1.5, z: 0, icon: 'innovation', color: '#ec4899' },
      { x: 0, y: 4, z: 0, icon: 'global', color: '#f97316' },
      { x: 0, y: -4, z: 0, icon: 'development', color: '#6366f1' },
    ];

    icons.push(...iconPositions);

    return { nodes, connections, icons };
  }, []);

  useGSAP(() => {
    // Animate brain core with pulsing effect
    if (brainRef.current) {
      gsap.to(brainRef.current.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut"
      });
    }

    // Animate neural network nodes
    nodesRef.current.forEach((node, index) => {
      if (node) {
        gsap.to(node.scale, {
          x: 1.3,
          y: 1.3,
          z: 1.3,
          duration: 1.5 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        });
      }
    });

    // Animate icons with floating effect
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon.position, {
          y: icon.position.y + 0.3,
          duration: 3 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          delay: index * 0.2,
        });
      }
    });
  });

  useFrame((state) => {
    // Rotate the entire brain system slowly
    if (brainRef.current) {
      brainRef.current.rotation.y += 0.003;
    }

    // Animate connections with flowing effect
    connectionsRef.current.forEach((connection, index) => {
      if (connection && connection.material) {
        connection.material.opacity = 0.4 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.3;
      }
    });
  });

  const getNodeColor = (type, layer) => {
    switch (layer) {
      case 'brain':
        return '#3b82f6'; // Blue for brain core
      case 'input':
        return '#10b981'; // Green for input
      case 'processing':
        return '#f59e0b'; // Amber for processing
      case 'output':
        return '#ef4444'; // Red for output
      default:
        return '#6b7280'; // Gray fallback
    }
  };

  const getConnectionColor = (type) => {
    switch (type) {
      case 'brain-processing':
        return '#3b82f6';
      case 'input-processing':
        return '#10b981';
      case 'processing-output':
        return '#f59e0b';
      default:
        return '#64748b';
    }
  };

  return (
    <group {...props} ref={brainRef}>
      {/* Central Brain Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial 
          color="#1e40af"
          emissive="#1e3a8a"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Brain Surface Details */}
      {Array.from({ length: 20 }, (_, index) => {
        const angle = (index / 20) * Math.PI * 2;
        const radius = 1.2 + Math.random() * 0.3;
        return (
          <mesh
            key={`brain-detail-${index}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.6,
              0
            ]}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial 
              color="#60a5fa"
              emissive="#3b82f6"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}

      {/* Neural Network Nodes */}
      {networkData.nodes.map((node, index) => (
        <mesh
          key={`node-${index}`}
          ref={(el) => (nodesRef.current[index] = el)}
          position={[node.x, node.y, node.z]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color={getNodeColor(node.type, node.layer)}
            emissive={getNodeColor(node.type, node.layer)}
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* Neural Network Connections */}
      {networkData.connections.map((connection, index) => {
        const from = connection.from;
        const to = connection.to;
        const midPoint = [
          (from.x + to.x) / 2,
          (from.y + to.y) / 2,
          (from.z + to.z) / 2
        ];
        const distance = Math.sqrt(
          Math.pow(to.x - from.x, 2) +
          Math.pow(to.y - from.y, 2) +
          Math.pow(to.z - from.z, 2)
        );

        return (
          <mesh
            key={`connection-${index}`}
            ref={(el) => (connectionsRef.current[index] = el)}
            position={midPoint}
          >
            <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
            <meshStandardMaterial 
              color={getConnectionColor(connection.type)}
              emissive={getConnectionColor(connection.type)}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
            <mesh
              position={[0, distance / 2, 0]}
              rotation={[
                Math.atan2(to.y - from.y, to.x - from.x),
                0,
                Math.atan2(to.z - from.z, to.x - from.x)
              ]}
            />
          </mesh>
        );
      })}

      {/* AI/ML Concept Icons */}
      {networkData.icons.map((icon, index) => (
        <group
          key={`icon-${index}`}
          ref={(el) => (iconsRef.current[index] = el)}
          position={[icon.x, icon.y, icon.z]}
        >
          {/* Icon representation */}
          <mesh>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial 
              color={icon.color}
              emissive={icon.color}
              emissiveIntensity={0.5}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          
          {/* Glowing aura */}
          <pointLight
            position={[0, 0, 0]}
            color={icon.color}
            intensity={0.3}
            distance={1.5}
          />
        </group>
      ))}

      {/* Data Flow Particles */}
      {Array.from({ length: 15 }, (_, index) => {
        const angle = (index / 15) * Math.PI * 2;
        const radius = 4 + Math.random() * 2;
        return (
          <mesh
            key={`particle-${index}`}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius * 0.5,
              Math.random() * 2 - 1
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color="#06b6d4"
              emissive="#0891b2"
              emissiveIntensity={0.8}
            />
          </mesh>
        );
      })}

      {/* Ambient Brain Glow */}
      <pointLight position={[0, 0, 0]} color="#3b82f6" intensity={0.5} distance={8} />
    </group>
  );
};

export default NeuralNetwork;
