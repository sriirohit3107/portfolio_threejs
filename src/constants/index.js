export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'Contact',
    href: '#contact',
  },
];


export const myProjects = [
  {
    title: 'Budget Brain – AI Ad Budget Optimizer',
    desc: 'An AI-powered system to optimize monthly ad spend across Google, Meta, TikTok, and LinkedIn using benchmarks, industry modifiers, and goal-based optimization.',
    subdesc:
      'Built with FastAPI, React, Gemini API, and Monte Carlo simulations, it delivers transparent, source-cited recommendations and interactive scenario testing.',
    href: 'https://github.com/sriirohit3107', // replace with actual repo/demo
    texture: '/textures/project/project1.mp4',
    logo: '/assets/project-logo1.png',
    logoStyle: {
      backgroundColor: '#1A1A2E',
      border: '0.2px solid #2E2E40',
      boxShadow: '0px 0px 60px 0px #3C67E94D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'FastAPI', path: '/assets/fastapi.png' },
      { id: 2, name: 'React.js', path: '/assets/react.svg' },
      { id: 3, name: 'Gemini API', path: '/assets/api.png' },
    ],
  },
  {
    title: 'Graph-Augmented Course Recommender',
    desc: 'A recommender system using heterogeneous academic graphs of students and courses, enhanced with explainable AI to provide interpretable course suggestions.',
    subdesc:
      'Developed with PyTorch Geometric, NetworkX, and MongoDB, integrating graph attribution and node similarity for explainable recommendations.',
    href: 'https://github.com/sriirohit3107',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/project-logo2.png',
    logoStyle: {
      backgroundColor: '#13202F',
      border: '0.2px solid #17293E',
      boxShadow: '0px 0px 60px 0px #2F6DB54D',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'PyTorch Geometric', path: '/assets/pytorch.png' },
      { id: 2, name: 'NetworkX', path: '/assets/networkx.png' },
      { id: 3, name: 'MongoDB', path: '/assets/mongodb.png' },
      { id: 4, name: 'Streamlit', path: '/assets/streamlit.png' },
    ],
  },
  {
    title: 'SmartFinancial AI – Stock Advisor',
    desc: 'An AI-powered stock advisor that forecasts short-term prices using LSTM and explains predictions with GPT-4 and LangChain.',
    subdesc:
      'Full-stack system with Python, React, Node.js, and MongoDB. Integrates real-time stock quotes, financial news, and a conversational dashboard for “Buy/Sell/Hold” advice.',
    href: 'https://github.com/sriirohit3107',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#0E1F38',
      border: '0.2px solid #0E2D58',
      boxShadow: '0px 0px 60px 0px #2F67B64D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'LSTM', path: '/assets/pytorch.png' },
      { id: 2, name: 'LangChain', path: '/assets/langchain.png' },
      { id: 3, name: 'React.js', path: '/assets/react.svg' },
      { id: 4, name: 'MongoDB', path: '/assets/mongodb.png' },
    ],
  },
  {
    title: 'Real-Time DoS Attack Detection',
    desc: 'A security system for IEEE 802.11 networks detecting DoS attacks like SYN floods using change point detection and big data mining.',
    subdesc:
      'Published in Futuristic Trends in Information Technology. Validated on 100+ scenarios, reducing false positives by 15%.',
    href: 'https://iipseries.org/assets/docupload/rsl202448E5CD41BF90EB8.pdf',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/project-logo4.png',
    logoStyle: {
      backgroundColor: '#1C1A43',
      border: '0.2px solid #252262',
      boxShadow: '0px 0px 60px 0px #635BFF4D',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'Python', path: '/assets/python.png' },
      { id: 2, name: 'GNS-3', path: '/assets/gns3.png' },
      { id: 3, name: 'Big Data', path: '/assets/bigdata.png' },
    ],
  },
];


export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 1,
    name: 'Bridge Green Upcycle',
    pos: 'AI/ML Intern - Graduate Assistant',
    duration: 'Juy 2025 - Present',
    title: "At BGU, I work as a Graduate Assistant (AI/ML Intern) developing  predictive models for battery State-of-Health (SoH) and Remaining Useful Life (RUL) using real-time telemetry from Powin Centipede BMS. I design smart SoC prediction algorithms and build data pipelines that integrate AI-driven decision support into Smart BMS systems, improving battery efficiency and cycle life.",
    icon: '/assets/bridge_green_upcycle_logo.jpeg',
    animation: 'victory',
  },
  {
    id: 2,
    name: 'Prompt Infotech',
    pos: 'Data Analyst Intern',
    duration: 'July 2023 - December 2023',
    title: "  At Prompt Infotech, I worked as a Data Analyst Intern, where I performed end-to-end data cleaning, transformation, and exploratory analysis using SQL, Excel, and Python. I developed 5+ interactive Power BI dashboards for sales and marketing, enabling trend, cohort, and KPI analysis that directly supported multiple strategic business decisions. ",
    icon: '/assets/prompt.avif',
    animation: 'clapping',
  },
];
