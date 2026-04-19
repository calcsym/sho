// @ts-ignore
import profileImg from '../assets/profile.jpg';
// @ts-ignore
import heroBg from '../assets/hero-bg.jpg';
// @ts-ignore
import logo from '../assets/logo.svg';

export const profileData = {
  brand: {
    name: 'Catherine Yang',
    title: 'Simulation Engine (Solver) Developer · FEA Application Engineer',

    intro:
      'I design and build high-performance simulation engines and applied FEA solutions, bridging numerical methods, software architecture, and real-world engineering problems.',

    affiliations: [
      {
        label: 'CalcSim',
        type: 'company',
        icon: '🏢',
      },
      {
        label: 'Freelancer',
        type: 'freelance',
        icon: '🧩',
      },
    ],
    /* -------- LINE 1: Engagement type -------- */
    engagement: {
      label: 'Agency or Freelancer',
      icon: '🧭',
    },

    /* -------- LINE 2: WorksFor + roles -------- */
    worksFor: {
      company: 'CalcSim',
      icon: '🏢',
      roles: ['Simulation Engineer', 'FEA Developer', 'Solver Developer'],
    },

    knowsAbout: [
      'Finite Element Analysis (FEA)',
      'Simulation Engines',
      'Numerical Methods',
      'Structural Mechanics',
      'CAD/CAE',
      'Fashion Design',
      'Runway Modeling',
    ],
    brandName: 'CalcSim',

    location: {
      label: 'Newport Beach, California, United States',
      icon: '📍',
    },

    roles: [
      { label: 'Designer', icon: '🎨' },
      { label: 'Runway Model', icon: '👠' },
    ],
    profiles: [
      { label: 'Portfolio', url: 'https://yourdomain.com' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/yourhandle' },
      { label: 'Instagram', url: 'https://www.instagram.com/beflaming22' },
    ],
    logo,
    logoAlt: 'Catherine Yang Logo',
  },

  hero: {
    backgroundImage: heroBg,
  },

  profileCard: {
    image: profileImg,
    displayName: 'Catherine Yang',
  },

  stats: [
    { value: '172', label: 'posts' },
    { value: '257', label: 'followers' },
    { value: '321', label: 'following' },
  ],

  measurements: {
    height: `5'8"`,
    weight: `115 lbs`,
    bust: '32D',
    waist: `24.8"`,
    hips: `35.5"`,
    shoes: '6.5 US',
  },

  contact: {
    email: 'cathylib22@gmail.com',
    phone: '(949) 343-0822',
  },
};

export const mediaItems = [
  { id: '001', src: '/photos/001.jpg', alt: 'Photo 001' },
  { id: '002', src: '/photos/002.jpg', alt: 'Photo 002' },
  { id: '003', src: '/photos/003.jpg', alt: 'Photo 003' },
];
/*
    'sleeve measurements': `19"`,
    Bust / Chest: `31" / 35"`,

*/
