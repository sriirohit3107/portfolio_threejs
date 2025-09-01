import { useState } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';

const About = () => {
  const [hasCopied, setHasCopied] = useState(null);

  const handleCopy = (email) => {
    navigator.clipboard.writeText(email);
    setHasCopied(email);

    setTimeout(() => {
      setHasCopied(null);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I'm Srii Rohit Prakash</p>
              <p className="grid-subtext">
                I am a Master's student in Computer Science (AI track) at Binghamton University, specializing in AI/ML, data analytics, and full-stack development.
                I have experience building predictive models for healthcare and smart energy systems, along with AI-powered applications in finance and education.
                Passionate about developing scalable, interpretable AI solutions, I blend research rigor with practical engineering to drive real-world impact.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in Python, SQL, Java, C/C++, and JavaScript, along with frameworks like PyTorch, Scikit-learn, React.js, Node.js, and LangChain.
                I also work with MongoDB, MySQL, PostgreSQL, Power BI, and Tableau, building robust, data-driven, and scalable applications.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 42.0987, lng: -75.9180, text: 'Binghamton, NY', color: 'white', size: 15 }]}
              />
            </div>
            <div>
              <p className="grid-headtext">I'm looking for Internship opportunities and Full time roles</p>
              <p className="grid-subtext">I'm based in New York and open to remote opportunities.</p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for AI & Data</p>
              <p className="grid-subtext">
                I love solving complex problems and creating intelligent solutions 
                through AI and data-driven methods. For me, technology isn't just a 
                skill it's a way to build systems that make a real-world impact in healthcare, finance, and sustainability. 
                I enjoy exploring new frameworks, experimenting with models, and constantly advancing my knowledge.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-4">
              <p className="grid-subtext text-center">Contact me</p>
              
              <div className="copy-container-group space-y-3">
                {/* Personal Email */}
                <div 
                  className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-black-200 transition-colors cursor-pointer"
                  onClick={() => handleCopy('sriirohitp@gmail.com')}
                >
                  <img 
                    src={hasCopied === 'sriirohitp@gmail.com' ? 'assets/tick.svg' : 'assets/copy.svg'} 
                    alt="copy personal email" 
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col items-center">
                    <p className="md:text-lg text-base font-medium text-white">
                      sriirohitp@gmail.com
                    </p>
                    <span className="text-xs text-gray-400">Personal</span>
                  </div>
                </div>
                
                {/* University Email */}
                <div 
                  className="flex items-center justify-center gap-3 p-2 rounded-lg hover:bg-black-200 transition-colors cursor-pointer"
                  onClick={() => handleCopy('sprakash1@binghamton.edu')}
                >
                  <img 
                    src={hasCopied === 'sprakash1@binghamton.edu' ? 'assets/tick.svg' : 'assets/copy.svg'} 
                    alt="copy university email" 
                    className="w-4 h-4"
                  />
                  <div className="flex flex-col items-center">
                    <p className="md:text-lg text-base font-medium text-white">
                      sprakash1@binghamton.edu
                    </p>
                    <span className="text-xs text-gray-400">University</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;