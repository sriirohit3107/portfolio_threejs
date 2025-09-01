import { useState } from 'react';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {} }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => (
      <li key={item.id} className="nav-li">
        <a href={item.href} className="nav-li_a" onClick={onClick}>
          {item.name}
        </a>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Resume download function
  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/SriiRohit_Prakash_Intern_Resume.pdf';
    link.download = 'SriiRohit_Prakash_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center py-5 mx-auto c-space">
          <a href="/" className="text-neutral-400 font-bold text-xl hover:text-white transition-colors">
            Srii's Portfolio
          </a>

          <button
            onClick={toggleMenu}
            className="text-neutral-400 hover:text-white focus:outline-none sm:hidden flex"
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="w-6 h-6" />
          </button>

          <nav className="sm:flex hidden items-center gap-4">
            <NavItems />
            <button
              onClick={downloadResume}
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 
                       py-2 px-4 rounded-lg font-medium flex items-center gap-2 
                       hover:scale-105 transform"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 10v6m0 0l-3-3m3 3l3-3M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" 
                />
              </svg>
              Resume
            </button>
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} />
          <div className="mt-6 pt-4 border-t border-neutral-700">
            <button
              onClick={() => {
                downloadResume();
                closeMenu();
              }}
              className="bg-white text-black hover:bg-gray-200 transition-all duration-300 
                       py-3 px-4 rounded-lg font-medium flex items-center gap-2 
                       w-full justify-center"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 10v6m0 0l-3-3m3 3l3-3M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" 
                />
              </svg>
              Download Resume
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;