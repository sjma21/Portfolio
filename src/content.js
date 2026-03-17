export const content = {
  meta: {
    title: 'Sajal Mishra | Portfolio',
    tagline: 'Building scalable systems & modern web products.',
  },
  person: {
    name: 'Sajal Mishra',
    avatar: '/profile/sajal.png',
    verified: true,
    role: 'Associate System Analyst @ Syvora',
    location: 'Indrapuri Sector A, Bhopal, India',
    availability: 'Open to full‑time SDE roles',
    summary:
      'Final-year B.Tech student and Associate System Analyst at Syvora. I build scalable backend systems (Go) and modern full-stack web apps (MERN/Next.js) with a strong foundation in DSA and system design.',
    headline:
      'React.js • MERN • Next.js • Go (Golang) • Blockchain • Java • C++ (DSA) • MySQL',
    about: [
      "Hello there! I'm Sajal Mishra — a passionate and driven final-year B.Tech student with a deep interest in solving real-world problems through innovative technology.",
      'Currently, I’m gaining valuable hands-on experience as a Software Engineer at Syvora, where I’m involved in building and optimizing scalable backend systems.',
      'My technical expertise spans multiple domains — from backend development with Go (Golang), blockchain and smart contracts, to full-stack web development using the MERN stack and Next.js. I have strong proficiency in React.js, enabling me to craft dynamic, performant, and user-friendly interfaces.',
      'I also have a solid foundation in Java, Data Structures & Algorithms (DSA), and system design, which helps me write clean, efficient, and maintainable code while understanding the bigger architectural picture.',
      'Having worked across both backend and frontend technologies, I enjoy bridging the gap between functionality and user experience — creating seamless systems that not only work efficiently but also deliver impact.',
      'I’m deeply fascinated by decentralized systems and emerging technologies, and I continuously strive to learn, build, and contribute to projects that push innovation forward.',
      'My goal is to keep growing as a full-stack and blockchain engineer — crafting solutions that blend creativity, scalability, and real-world value.',
    ],
    highlights: [
      'MERN + Next.js full-stack builds',
      'Backend systems in Go (Golang)',
      'Blockchain + smart contracts curiosity',
      'Java + C++ (DSA), system design mindset',
    ],
  },
  links: {
    email: 'sajalmishra361@gmail.com',
    phone: '+91 91310 33130',
    resume: '/resume/Sajal-Mishra-Resume.pdf',
    github: 'https://github.com/sjma21/',
    linkedin: 'https://www.linkedin.com/in/sajal-mishra20/',
    whatsapp: 'https://wa.me/919131033130',
    instagram: '#',
    twitter: '#',
  },
  stats: [
    {
      title: 'Final-Year Engineering',
      subtitle: 'B.Tech CSE',
    },
    {
      title: 'Full‑Stack Engineering',
      subtitle: 'Backend & APIs',
    },
    {
      title: 'Web3 Systems',
      subtitle: 'Smart Contracts',
    },
  ],
  skills: [
    {
      group: 'Frontend',
      items: ['React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'UX Thinking'],
    },
    {
      group: 'Backend',
      items: ['Go (Golang)', 'Node.js', 'Express', 'REST APIs', 'Scalable Architecture'],
    },
    {
      group: 'Blockchain',
      items: [
        'Smart Contracts (Solidity)',
        'Ethereum (EVM)',
        'EIPs',
        'Proxy Contracts',
        'Web3 Architecture',
      ],
    },
    {
      group: 'CS Core',
      items: [
        'Object-Oriented Programming (OOP)',
        'Database Management Systems (DBMS)',
        'Compiler Design',
        'Computer Networks',
      ],
    },
  ],
  experience: [
    {
      title: 'Associate System Analyst',
      company: 'Syvora',
      period: 'Present',
      points: [
        'Building and optimizing scalable backend systems.',
        'Hands-on engineering experience across backend architecture and implementation.',
        'Focused on maintainable code, performance, and reliability.',
      ],
    },
    {
      title: 'Final-year B.Tech Student',
      company: 'Pursuing B.Tech (4th year)',
      period: 'Current',
      points: [
        'Exploring full-stack engineering (MERN, Next.js) and Go backend development.',
        'Strengthening DSA (Java/C++) and system design fundamentals.',
        'Learning blockchain concepts and smart contracts to build decentralized solutions.',
      ],
    },
  ],
  projects: {
    personal: [
      {
        title: 'HostelMitra',
        description:
          'A hostel discovery platform that makes it easy to find and compare hostels with the right fit (location, budget, and amenities) through a clean, user-friendly interface.',
        tags: ['Next.js', 'React', 'Tailwind CSS', 'UI/UX', 'Search & Filters'],
        links: { live: null, code: 'https://github.com/sjma21/HostelMitra' },
        highlights: [
          'Built a smooth hostel discovery UX with search and filtering',
          'Focused on clean, responsive UI and fast navigation',
          'Structured the project for easy feature expansion (listings, details, and categories)',
        ],
      },
      {
        title: 'Gasless Vault — Upgradeable Meta-Tx (OP Sepolia)',
        description:
          'A UUPS-upgradeable ERC-20 token vault on Optimism Sepolia supporting gasless transactions via ERC-2771 meta-transactions — users sign off-chain, a trusted relayer submits and pays gas.',
        tags: ['Solidity', 'Foundry', 'UUPS', 'ERC-2771', 'EIP-712', 'OP Sepolia'],
        links: { live: null, code: 'https://github.com/sjma21/Upgradeable_gasless_transaction' },
        highlights: [
          'Implemented GaslessVault behind an ERC1967 proxy with UUPS upgrade support',
          'Built full ERC-2771 forwarder flow: off-chain EIP-712 signing → relayer submits → vault recovers original sender via _msgSender()',
          'Deployed forwarder, proxy, and implementation on OP Sepolia (verified on-chain)',
          'Wrote a Forge test suite (29 tests) with ~91% line coverage and replay protection via forwarder nonces',
        ],
      },
      {
        title: 'Merkle Airdrop',
        description:
          'A gas-efficient token airdrop system in Solidity where eligible recipients are stored off-chain as a Merkle tree — only the root lives on-chain, and users submit a Merkle proof to claim tokens.',
        tags: ['Solidity', 'Foundry', 'Merkle Tree', 'OpenZeppelin', 'keccak256', 'Node.js'],
        links: { live: null, code: 'https://github.com/sjma21/Merkle_Airdrop' },
        highlights: [
          'Built core MerkleAirdrop contract with immutable on-chain root and proof verification via keccak256 leaf encoding',
          'Prevented double-claiming with a claimed mapping and replay-safe claim() logic',
          'Wrote off-chain Merkle tree generator (Node.js + merkletreejs) to produce roots and per-address proofs',
          'Deployed with Foundry (Forge) — supports both local Anvil and testnet/mainnet with --verify',
        ],
      },
      {
        title: 'Sustainabite',
        description:
          'A full-stack MERN web app for managing food donation and distribution workflows, built with a React frontend and a Node.js/Express backend with MongoDB for data storage.',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MERN'],
        links: { live: null, code: 'https://github.com/sjma21/sustainabite_among' },
        highlights: [
          'Implemented end-to-end donation and distribution flows with role-based handling',
          'Built REST APIs with Express and persisted data in MongoDB',
          'Added authentication and secure credential handling',
          'Created dashboards/views to track activity and operational progress',
        ],
      },
      {
        title: 'Connectify — Video Call App',
        description:
          'A MERN-based video calling application with real-time signalling over WebSockets for fast session setup and smooth call coordination.',
        tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'WebRTC'],
        links: { live: null, code: 'https://github.com/sjma21/Connectify-videoCall-' },
        highlights: [
          'Built real-time signalling for call setup, join/leave handling, and session coordination',
          'Implemented reliable room/session flows with proper event handling and edge-case management',
          'Designed a responsive UI for call controls and user experience',
          'Structured backend APIs + database models to support users and call state',
        ],
      },
    ],
    organisation: [
      {
        title: 'DRB Protocol — Go Backend (Commit-Reveal)',
        description:
          'Built and hardened the Go backend powering a commit‑reveal workflow, including websocket-based event ingestion and chain reorg handling, with comprehensive geth-based testing.',
        tags: [
          'Go (Golang)',
          'Goroutines',
          'WebSockets',
          'Ethereum',
          'geth test suite',
          'Unit + Integration testing',
          'Reorg handling',
        ],
        links: { live: null, code: null },
        highlights: [
          'Tested the full workflow with unit + integration tests using the geth test suite',
          'Fixed multiple vulnerabilities across the codebase (security hardening + safer validations)',
          'Developed a websocket event fetcher with robust chain reorg detection and recovery',
          'Resolved issues raised during audit reviews by tightening invariants and improving failure handling',
          'Improved observability and reliability for event processing (retries, idempotency, and clearer error paths)',
        ],
      },
      {
        title: 'OpenClaw Automation — Training Workflow System',
        description:
          'Solely automated the organisation’s internal training process using OpenClaw for orchestration, with Discord-based module delivery, response validation, and follow-ups to reduce manual coordination.',
        tags: ['Node.js', 'Discord', 'Automation', 'OpenClaw', 'Workflows'],
        links: { live: null, code: null },
        highlights: [
          'Solely owned and delivered end-to-end training workflow automation for the organisation',
          'Automated module dispatch, progress tracking, and reviewer notifications via Discord',
          'Implemented robust handling logic for responses, retries, and incomplete submissions',
          'Triggered follow-ups and next-module progression automatically with strict validation gates',
          'Reduced manual operational effort and improved training cycle speed',
        ],
      },
    ],
  },
  certifications: [
    {
      title: 'Advanced Techniques in Go Programming',
      issuer: 'Educative',
      date: 'Feb 2026',
      image: '/certifications/go-advanced.png',
      note: 'Completion certificate',
    },
    {
      title: 'Introduction to Data Science',
      issuer: 'Cisco Networking Academy',
      date: 'Dec 2024',
      image: '/certifications/cisco-data-science.png',
      note: 'Course completion',
    },
    {
      title:
        'Publication — “A Digital Marketplace for Empowering Women and Home Gardeners through Organic Product Sales”',
      issuer: 'International Journal of Creative Research Thoughts (IJCRT)',
      date: 'Nov 2025',
      image: '/certifications/ijcrt-publication.png',
      note: 'Certificate of publication',
    },
    {
      title: 'MERN Stack Application Development',
      issuer: 'TechSaksham (Microsoft + SAP + Edunet Foundation)',
      date: '2024–25',
      image: '/certifications/mern-techsaksham.png',
      note: 'Certificate of achievement',
    },
    {
      title: 'AWS Academy Graduate — AWS Academy Cloud Architecting',
      issuer: 'AWS Academy',
      date: 'Aug 2024',
      image: '/certifications/aws-cloud-architecting.png',
      note: '60 hours',
    },
    {
      title: 'Computer Networks and Internet Protocol (NPTEL)',
      issuer: 'NPTEL (IIT Kharagpur)',
      date: 'Jan–Apr 2025',
      image: '/certifications/nptel-cn-ip.png',
      note: 'Elite',
    },
    {
      title: 'CyberOps Associate',
      issuer: 'Cisco Networking Academy',
      date: 'Jan 2025',
      image: '/certifications/cisco-cyberops.png',
      note: 'Course completion',
    },
    {
      title: 'Data Base Management System (NPTEL)',
      issuer: 'NPTEL (IIT Kharagpur)',
      date: 'Jul–Sep 2024',
      image: '/certifications/nptel-dbms.png',
      note: 'Certified',
    },
  ],
}

