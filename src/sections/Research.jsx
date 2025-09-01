import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useState } from 'react';

import { Research_Exp } from '../constants/index.js';

const Count = Research_Exp.length;

const Research = () => {
  const [ProjectIndex, setProjectIndex] = useState(0);

  const handleNavigation = (direction) => {
    setProjectIndex((prevIndex) => {
      if (direction === 'previous') {
        return prevIndex === 0 ? Count - 1 : prevIndex - 1;
      } else {
        return prevIndex === Count - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  useGSAP(() => {
    gsap.fromTo(
      `.research-animatedText`, // Changed from .animatedText to .research-animatedText
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' }
    );
  }, [ProjectIndex]);

  const currentResearch = Research_Exp[ProjectIndex];

  return (
    <section className="c-space my-20"> {/* Fixed: my20 -> my-20 */}
      <p className="head-text">My Research Work</p>

      <div className="flex flex-col gap-5 text-white-600 my-5">       
        <p className="text-white text-2xl font-semibold research-animatedText">{currentResearch.name}</p>
        <p className="text-sm mb-2 research-animatedText">
          {currentResearch.pos} -- <span>{currentResearch.duration}</span>
        </p>
        <p className="research-animatedText">{currentResearch.title}</p>
      </div>

      <div className="flex justify-between items-center mt-7"> {/* Removed the "8" which was invalid */}
        <button 
          className="research-arrow-btn" 
          onClick={() => handleNavigation('previous')}
        >
          <img src="/assets/left-arrow.png" alt="left arrow" />
        </button>

        <button 
          className="research-arrow-btn" 
          onClick={() => handleNavigation('next')}
        >
          <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Research;