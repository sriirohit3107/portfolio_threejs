import { useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const ProtoplanetControls = ({ systemRef, onParameterChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [parameters, setParameters] = useState({
    gravityConstant: 100.0,
    density: 0.45,
    radius: 300,
    height: 8,
    exponent: 0.4,
    maxMass: 15.0,
    velocity: 70,
    velocityExponent: 0.2,
    randVelocity: 0.001
  });

  const [activeTab, setActiveTab] = useState('dynamic');

  useGSAP(() => {
    if (isVisible) {
      gsap.fromTo('.control-panel', 
        { x: 400, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    } else {
      gsap.to('.control-panel', {
        x: 400, opacity: 0, duration: 0.3, ease: "power2.in"
      });
    }
  }, [isVisible]);

  const handleParameterChange = (key, value) => {
    const newParams = { ...parameters, [key]: value };
    setParameters(newParams);
    
    // Update the system parameters in real-time
    if (systemRef?.current?.updateParameters) {
      systemRef.current.updateParameters(newParams);
    }
    
    if (onParameterChange) {
      onParameterChange(newParams);
    }
  };

  const restartSimulation = () => {
    if (systemRef?.current?.restartSimulation) {
      systemRef.current.restartSimulation();
    }
  };

  const resetToDefaults = () => {
    const defaults = {
      gravityConstant: 100.0,
      density: 0.45,
      radius: 300,
      height: 8,
      exponent: 0.4,
      maxMass: 15.0,
      velocity: 70,
      velocityExponent: 0.2,
      randVelocity: 0.001
    };
    setParameters(defaults);
    if (onParameterChange) {
      onParameterChange(defaults);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed top-4 right-4 z-50 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {isVisible ? 'Hide Controls' : 'Show Controls'}
      </button>

      {/* Control Panel */}
      {isVisible && (
        <div className="control-panel fixed top-4 right-4 z-40 bg-slate-900/95 backdrop-blur-sm text-white p-6 rounded-xl shadow-2xl border border-slate-700/50 w-80">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-100">Protoplanet Controls</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('dynamic')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'dynamic' 
                  ? 'bg-slate-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Dynamic
            </button>
            <button
              onClick={() => setActiveTab('static')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                activeTab === 'static' 
                  ? 'bg-slate-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Static
            </button>
          </div>

          {/* Dynamic Parameters Tab */}
          {activeTab === 'dynamic' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gravity Constant: {parameters.gravityConstant.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="0.05"
                  value={parameters.gravityConstant}
                  onChange={(e) => handleParameterChange('gravityConstant', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Density: {parameters.density.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.001"
                  value={parameters.density}
                  onChange={(e) => handleParameterChange('density', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={restartSimulation}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  Restart Simulation
                </button>
              </div>
            </div>
          )}

          {/* Static Parameters Tab */}
          {activeTab === 'static' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Radius: {parameters.radius}
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="1"
                  value={parameters.radius}
                  onChange={(e) => handleParameterChange('radius', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Height: {parameters.height.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.01"
                  value={parameters.height}
                  onChange={(e) => handleParameterChange('height', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Exponent: {parameters.exponent.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.001"
                  value={parameters.exponent}
                  onChange={(e) => handleParameterChange('exponent', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Max Mass: {parameters.maxMass.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="0.1"
                  value={parameters.maxMass}
                  onChange={(e) => handleParameterChange('maxMass', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Velocity: {parameters.velocity.toFixed(1)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="150"
                  step="0.1"
                  value={parameters.velocity}
                  onChange={(e) => handleParameterChange('velocity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Velocity Exponent: {parameters.velocityExponent.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={parameters.velocityExponent}
                  onChange={(e) => handleParameterChange('velocityExponent', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Random Velocity: {parameters.randVelocity.toFixed(3)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="0.1"
                  value={parameters.randVelocity}
                  onChange={(e) => handleParameterChange('randVelocity', parseFloat(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div className="pt-4 space-y-2">
                <button
                  onClick={restartSimulation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  Restart Simulation
                </button>
                <button
                  onClick={resetToDefaults}
                  className="w-full bg-slate-600 hover:bg-slate-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-6 pt-4 border-t border-slate-700/50">
            <div className="text-xs text-slate-400 space-y-1">
              <p>• Dynamic parameters update in real-time</p>
              <p>• Static parameters require simulation restart</p>
              <p>• Particles: {64 * 64} (4,096 total)</p>
              <p>• GPU-accelerated physics simulation</p>
            </div>
          </div>
        </div>
      )}

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e293b;
          transition: all 0.2s ease;
        }
        
        .slider::-webkit-slider-thumb:hover {
          background: #60a5fa;
          transform: scale(1.1);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #1e293b;
          transition: all 0.2s ease;
        }
        
        .slider::-moz-range-thumb:hover {
          background: #60a5fa;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
};

export default ProtoplanetControls;
