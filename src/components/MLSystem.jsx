import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGSAP } from '@gsap/react';
import { useVideoTexture } from '@react-three/drei';
import gsap from 'gsap';

const MLSystem = (props) => {
  const systemRef = useRef();
  const dataPipelineRef = useRef();
  const modelTrainingRef = useRef();
  const inferenceEngineRef = useRef();
  const dataStreamsRef = useRef([]);
  const processingUnitsRef = useRef([]);
  const modelNodesRef = useRef([]);

  // Handle video texture if provided
  const txt = useVideoTexture(props.texture ? props.texture : '/textures/project/project1.mp4');

  // Create ML system structure
  const mlSystemData = useMemo(() => {
    const components = [];
    const pipelines = [];
    const models = [];

    // Data Ingestion Layer
    const dataSources = [
      { x: -6, y: 3, z: 0, type: 'database', color: '#10b981' },
      { x: -6, y: 1.5, z: 0, type: 'api', color: '#3b82f6' },
      { x: -6, y: 0, z: 0, type: 'sensor', color: '#8b5cf6' },
      { x: -6, y: -1.5, z: 0, type: 'stream', color: '#f59e0b' },
      { x: -6, y: -3, z: 0, type: 'file', color: '#ef4444' }
    ];

    // Data Processing Layer
    const processors = [
      { x: -3, y: 2.5, z: 0, type: 'etl', color: '#06b6d4' },
      { x: -3, y: 1, z: 0, type: 'cleaning', color: '#ec4899' },
      { x: -3, y: -0.5, z: 0, type: 'transformation', color: '#84cc16' },
      { x: -3, y: -2, z: 0, type: 'validation', color: '#f97316' },
      { x: -3, y: -3.5, z: 0, type: 'enrichment', color: '#6366f1' }
    ];

    // Feature Engineering Layer
    const featureEngineers = [
      { x: 0, y: 3, z: 0, type: 'extraction', color: '#14b8a6' },
      { x: 0, y: 1.5, z: 0, type: 'selection', color: '#a855f7' },
      { x: 0, y: 0, z: 0, type: 'scaling', color: '#f43f5e' },
      { x: 0, y: -1.5, z: 0, type: 'encoding', color: '#22c55e' },
      { x: 0, y: -3, z: 0, type: 'augmentation', color: '#eab308' }
    ];

    // Model Training Layer
    const trainingModels = [
      { x: 3, y: 2.5, z: 0, type: 'neural-network', color: '#3b82f6' },
      { x: 3, y: 1, z: 0, type: 'random-forest', color: '#10b981' },
      { x: 3, y: -0.5, z: 0, type: 'svm', color: '#f59e0b' },
      { x: 3, y: -2, z: 0, type: 'gradient-boost', color: '#ef4444' },
      { x: 3, y: -3.5, z: 0, type: 'deep-learning', color: '#8b5cf6' }
    ];

    // Inference & Deployment Layer
    const inferenceEngines = [
      { x: 6, y: 2, z: 0, type: 'api-gateway', color: '#06b6d4' },
      { x: 6, y: 0, z: 0, type: 'model-serving', color: '#ec4899' },
      { x: 6, y: -2, z: 0, type: 'monitoring', color: '#84cc16' }
    ];

    // Add all components
    components.push(...dataSources, ...processors, ...featureEngineers, ...trainingModels, ...inferenceEngines);

    // Create data pipelines
    dataSources.forEach(source => {
      processors.forEach(processor => {
        pipelines.push({
          from: source,
          to: processor,
          type: 'data-ingestion'
        });
      });
    });

    processors.forEach(processor => {
      featureEngineers.forEach(engineer => {
        pipelines.push({
          from: processor,
          to: engineer,
          type: 'data-processing'
        });
      });
    });

    featureEngineers.forEach(engineer => {
      trainingModels.forEach(model => {
        pipelines.push({
          from: engineer,
          to: model,
          type: 'feature-training'
        });
      });
    });

    trainingModels.forEach(model => {
      inferenceEngines.forEach(engine => {
        pipelines.push({
          from: model,
          to: engine,
          type: 'model-deployment'
        });
      });
    });

    // Create ML model nodes
    const modelArchitectures = [
      { x: 0, y: 5, z: 0, type: 'transformer', color: '#3b82f6' },
      { x: -2, y: 5, z: 0, type: 'cnn', color: '#10b981' },
      { x: 2, y: 5, z: 0, type: 'rnn', color: '#f59e0b' },
      { x: -4, y: 5, z: 0, type: 'gan', color: '#ef4444' },
      { x: 4, y: 5, z: 0, type: 'bert', color: '#8b5cf6' }
    ];

    models.push(...modelArchitectures);

    return { components, pipelines, models };
  }, []);

  useGSAP(() => {
    // Animate the entire ML system
    if (systemRef.current) {
      gsap.to(systemRef.current.rotation, {
        y: Math.PI * 2,
        duration: 20,
        repeat: -1,
        ease: "none"
      });
    }

    // Animate data pipelines
    dataStreamsRef.current.forEach((stream, index) => {
      gsap.to(stream.material, {
        opacity: 0.8,
        duration: 2 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.1,
      });
    });

    // Animate processing units
    processingUnitsRef.current.forEach((unit, index) => {
      gsap.to(unit.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1.5 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.2,
      });
    });

    // Animate model nodes
    modelNodesRef.current.forEach((node, index) => {
      gsap.to(node.position, {
        y: node.position.y + 0.2,
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        delay: index * 0.3,
      });
    });
  }, []);

  useFrame((state) => {
    // Rotate individual components
    if (dataPipelineRef.current) {
      dataPipelineRef.current.rotation.y += 0.005;
    }
    if (modelTrainingRef.current) {
      modelTrainingRef.current.rotation.y += 0.003;
    }
    if (inferenceEngineRef.current) {
      inferenceEngineRef.current.rotation.y += 0.004;
    }
  });

  const getComponentGeometry = (type) => {
    switch (type) {
      case 'database':
        return <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />;
      case 'api':
        return <boxGeometry args={[0.6, 0.6, 0.6]} />;
      case 'sensor':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case 'stream':
        return <boxGeometry args={[0.5, 0.3, 0.5]} />;
      case 'file':
        return <boxGeometry args={[0.4, 0.5, 0.1]} />;
      case 'etl':
        return <octahedronGeometry args={[0.4]} />;
      case 'cleaning':
        return <dodecahedronGeometry args={[0.3]} />;
      case 'transformation':
        return <icosahedronGeometry args={[0.3]} />;
      case 'validation':
        return <tetrahedronGeometry args={[0.3]} />;
      case 'enrichment':
        return <octahedronGeometry args={[0.3]} />;
      case 'extraction':
        return <boxGeometry args={[0.5, 0.4, 0.4]} />;
      case 'selection':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case 'scaling':
        return <cylinderGeometry args={[0.3, 0.3, 0.6, 8]} />;
      case 'encoding':
        return <boxGeometry args={[0.4, 0.4, 0.4]} />;
      case 'augmentation':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      case 'neural-network':
        return <octahedronGeometry args={[0.4]} />;
      case 'random-forest':
        return <dodecahedronGeometry args={[0.3]} />;
      case 'svm':
        return <icosahedronGeometry args={[0.3]} />;
      case 'gradient-boost':
        return <tetrahedronGeometry args={[0.3]} />;
      case 'deep-learning':
        return <octahedronGeometry args={[0.4]} />;
      case 'api-gateway':
        return <boxGeometry args={[0.6, 0.5, 0.5]} />;
      case 'model-serving':
        return <cylinderGeometry args={[0.4, 0.4, 0.8, 8]} />;
      case 'monitoring':
        return <sphereGeometry args={[0.3, 16, 16]} />;
      default:
        return <boxGeometry args={[0.4, 0.4, 0.4]} />;
    }
  };

  return (
    <group ref={systemRef} {...props} dispose={null}>
      {/* Main ML System Platform */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[16, 8, 0.5]} />
        <meshStandardMaterial 
          color="#0f172a" 
          metalness={0.9} 
          roughness={0.1}
          emissive="#1e293b"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Data Ingestion Layer */}
      <group ref={dataPipelineRef} position={[-6, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1e293b" 
            emissive="#0f172a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Data Processing Layer */}
      <group ref={dataPipelineRef} position={[-3, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1e293b" 
            emissive="#0f172a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Feature Engineering Layer */}
      <group ref={dataPipelineRef} position={[0, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1e293b" 
            emissive="#0f172a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Model Training Layer */}
      <group ref={modelTrainingRef} position={[3, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1e293b" 
            emissive="#0f172a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* Inference & Deployment Layer */}
      <group ref={inferenceEngineRef} position={[6, 0, 0]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.3, 16]} />
          <meshStandardMaterial 
            color="#1e293b" 
            emissive="#0f172a"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>

      {/* ML System Components */}
      {mlSystemData.components.map((component, index) => (
        <mesh
          key={`component-${index}`}
          ref={(el) => (processingUnitsRef.current[index] = el)}
          position={[component.x, component.y, component.z]}
        >
          {getComponentGeometry(component.type)}
          <meshStandardMaterial 
            color={component.color}
            emissive={component.color}
            emissiveIntensity={0.4}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Data Pipelines */}
      {mlSystemData.pipelines.map((pipeline, index) => {
        const from = pipeline.from;
        const to = pipeline.to;
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
            key={`pipeline-${index}`}
            ref={(el) => (dataStreamsRef.current[index] = el)}
            position={midPoint}
          >
            <cylinderGeometry args={[0.03, 0.03, distance, 8]} />
            <meshStandardMaterial 
              color={pipeline.type === 'data-ingestion' ? '#10b981' : 
                     pipeline.type === 'data-processing' ? '#06b6d4' :
                     pipeline.type === 'feature-training' ? '#f59e0b' : '#ef4444'}
              emissive={pipeline.type === 'data-ingestion' ? '#059669' : 
                       pipeline.type === 'data-processing' ? '#0891b2' :
                       pipeline.type === 'feature-training' ? '#d97706' : '#dc2626'}
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
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

      {/* ML Model Architectures */}
      {mlSystemData.models.map((model, index) => (
        <mesh
          key={`model-${index}`}
          ref={(el) => (modelNodesRef.current[index] = el)}
          position={[model.x, model.y, model.z]}
        >
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial 
            color={model.color}
            emissive={model.color}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Data Visualization Screen */}
      <mesh position={[0, -4, 0]} rotation={[0, 0, 0]}>
        <planeGeometry args={[8, 2]} />
        <meshBasicMaterial map={txt} toneMapped={false} />
      </mesh>

      {/* System Status Indicators */}
      {Array.from({ length: 5 }, (_, index) => (
        <pointLight
          key={`status-${index}`}
          position={[-4 + index * 2, -3, 0]}
          color={index % 2 === 0 ? '#10b981' : '#3b82f6'}
          intensity={0.5}
          distance={2}
        />
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#fbbf24" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#3b82f6" />
    </group>
  );
};

export default MLSystem;
