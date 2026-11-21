import type { PortfolioData } from '../types'

const PLAY = (id: string) => `https://play.google.com/store/apps/details?id=${id}`
const APP_STORE = (id: string) => `https://apps.apple.com/app/id${id}`

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Ngô Đức Phan Tiến Đạt',
    title: 'Applied AI, Full-Stack & Mobile Engineer',
    tagline:
      '2.5+ years building production Multi-Agent RAG systems, FastAPI & Next.js enterprise platforms, and 4 live Flutter apps on Google Play & App Store.',
    location: 'Đà Nẵng / Huế, Vietnam (Open to HCMC & Remote)',
    bio: 'Full-stack, Applied AI, and Mobile Engineer with 2.5 years of practical experience since starting at Rikkeisoft at the beginning of my 2nd year of university (Aug 2023). I take features from React, Next.js, TypeScript, and Flutter frontends through Python FastAPI / Django REST backends to PostgreSQL, pgvector, Redis, Docker, and Linux VPS deployments — with four live apps on Google Play and the App Store and production Multi-Agent RAG systems.',
    email: 'ngothiendat258@gmail.com',
    phone: '0768908472',
    github: 'TienDat11',
    githubUrl: 'https://github.com/TienDat11',
    cvs: {
      fullstack: '/portfolio/CV_Ngo_Duc_Phan_Tien_Dat_Fullstack_Developer.pdf',
      ai: '/portfolio/CV_Ngo_Duc_Phan_Tien_Dat_AI_Engineer.pdf',
      mobile: '/portfolio/CV_Ngo_Duc_Phan_Tien_Dat_Mobile_Developer.pdf',
    },
  },

  showcase: [
    {
      id: '01',
      label: 'Applied AI & Multi-Agent RAG',
      headline: 'Multi-agent RAG that cut hallucinations by 38%.',
      body: 'UniGuide AI v2 routes each question across LangGraph agents, retrieves through pgvector, and gates every release with an automated evaluation harness.',
      stats: ['-38% hallucination', 'LangGraph · pgvector', 'Claude · Gemini'],
    },
    {
      id: '02',
      label: 'Full-Stack CRM & Cloud',
      headline: 'Full-stack systems carried from pipeline to production.',
      body: 'An apartment CRM with Kanban, RBAC and two-way Google Sheets sync, a Next.js 15 real-estate RAG assistant, and self-hosted mail behind Docker, Nginx and TLS.',
      stats: ['2-way Sheets sync', 'Next.js 15 · FastAPI', 'Docker · Nginx · TLS'],
    },
    {
      id: '03',
      label: '4 Live App Store & Play Store Apps',
      headline: 'Four live mobile apps on Google Play & the App Store.',
      body: 'Family Health, Connect Car Booking, GPLX 600 and FamHub — built with Flutter, Clean Architecture, BLoC, Firebase and Socket.IO.',
      stats: ['Google Play', 'App Store', 'Flutter · BLoC'],
    },
  ],

  skills: [
    {
      category: 'Applied AI & Data',
      items: [
        'Python',
        'FastAPI',
        'LangGraph',
        'LangChain',
        'pgvector',
        'Redis Streams',
        'Claude',
        'Gemini',
        'YOLOv8',
        'PyTorch',
        'OpenCV',
        'Pandas',
      ],
    },
    {
      category: 'Web & Full-Stack',
      items: [
        'Next.js 15',
        'React',
        'TypeScript',
        'Flutter Web',
        'Django REST',
        'PostgreSQL',
        'Google Sheets API',
        'RBAC',
      ],
    },
    {
      category: 'Mobile',
      items: [
        'Flutter',
        'Dart',
        'BLoC',
        'Clean Architecture',
        'Firebase',
        'Socket.IO',
        'MapLibre GL',
      ],
    },
    {
      category: 'Infrastructure & Practice',
      items: [
        'Docker',
        'Nginx',
        'Linux VPS',
        'HTTPS / TLS',
        'GitHub Actions',
        'Linagora Twake Mail',
        'Git',
        'Agile / Scrum',
      ],
    },
  ],

  projects: [
    {
      id: 'uniguide-ai-v2',
      title: 'UniGuide AI v2 — Multi-Agent RAG Platform',
      track: 'ai',
      description:
        'Multi-agent RAG platform for university admissions questions. LangGraph routes each query across specialised agents, pgvector retrieves grounded context, and Redis Streams carry async work. An automated evaluation harness gates releases.',
      metric: '-38% hallucination vs v1',
      tech: ['Python', 'FastAPI', 'LangGraph', 'LangChain', 'Claude', 'Gemini', 'pgvector', 'Redis Streams', 'Docker'],
      highlights: [
        'Multi-agent routing plus an automated evaluation harness',
        'Hallucination rate cut by 38% against the v1 baseline',
        'Redis Streams for asynchronous pipeline stages',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/husc-admission-chat-enrollment', kind: 'github' }],
      preview: {
        kind: 'terminal',
        lines: [
          '$ eval --suite admissions --baseline v1',
          '→ hallucination rate  −38% vs v1',
          '→ agents: LangGraph · pgvector · Redis Streams',
          '✔ evaluation gate passed',
        ],
      },
    },
    {
      id: 'crosstechedu-crm',
      title: 'Crosstechedu Apartment CRM & Real-Estate RAG',
      track: 'fullstack',
      description:
        'Apartment-management CRM in Flutter Web and FastAPI with a Kanban pipeline, role-based access control, and automatic two-way Google Sheets API sync. The companion Next.js 15 real-estate chatbot uses source-cited FastAPI RAG.',
      metric: '2-way Google Sheets sync',
      tech: ['Next.js 15', 'Flutter Web', 'FastAPI', 'PostgreSQL', 'Google Sheets API', 'RBAC', 'Docker'],
      highlights: [
        'Kanban pipeline with role-based access control',
        'Automatic two-way Google Sheets API sync',
        'Source-cited RAG chat for real-estate consultations',
      ],
      links: [{ label: 'Company site', url: 'https://www.crosstechedu.com/', kind: 'live' }],
      preview: { kind: 'diagram', nodes: ['Flutter Web CRM', 'FastAPI + RBAC', 'PostgreSQL', 'Google Sheets API'] },
    },
    {
      id: 'tennis-analytics',
      title: 'Tennis Match Analytics — Computer Vision Pipeline',
      track: 'ai',
      description:
        'Computer-vision pipeline for tennis footage: YOLOv8 player detection, a custom-trained YOLOv5 ball detector, a PyTorch CNN for court keypoints, and a homography onto a mini-court with live speed statistics.',
      metric: 'YOLOv8 + YOLOv5 detectors',
      tech: ['Python', 'YOLOv8', 'YOLOv5', 'PyTorch', 'OpenCV', 'Pandas'],
      highlights: [
        'Court keypoint homography maps pixels to court coordinates',
        'Shot speed and trajectory analytics',
        'YOLOv8 player detection and a custom-trained YOLOv5 ball detector',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/tennis-analysis', kind: 'github' }],
      preview: {
        kind: 'terminal',
        lines: [
          '$ python track.py --video match.mp4',
          '[yolov8]     players detected',
          '[yolov5]     ball detected',
          '→ shot speed & trajectory exported',
        ],
      },
    },
    {
      id: 'facefind',
      title: 'FaceFind — Face Recognition & Photo Retrieval',
      track: 'ai',
      description:
        'High-precision face detection with YuNet and 512-D AuraFace embeddings, searched by cosine similarity across large event galleries through a FastAPI service.',
      metric: '512-D cosine search',
      tech: ['Python', 'YuNet', 'AuraFace', 'FastAPI', 'Docker'],
      highlights: [
        'YuNet face detection across event galleries',
        'AuraFace 512-D embeddings',
        'Cosine-similarity retrieval for matching photos',
      ],
      links: [],
      preview: {
        kind: 'terminal',
        lines: [
          '$ facefind index --gallery event/',
          '[yunet]   face detection pass ✔',
          '[auraface] 512-d embeddings stored',
          '→ cosine match above threshold',
        ],
      },
    },
    {
      id: 'family-health',
      title: 'Family Health — Home-Services Marketplace',
      track: 'mobile',
      description:
        'Home-services marketplace connecting customers with health and beauty technicians: booking and combo flow, sqflite cart, vouchers, QR bank payments and nearby technician search, on Firebase Auth, Realtime Database and FCM.',
      metric: 'Google Play & App Store live',
      tech: ['Flutter', 'BLoC', 'sqflite', 'Firebase', 'Geolocator'],
      highlights: [
        'Clean Architecture with BLoC across the Flutter app',
        'Booking flow with combos, vouchers and multi-method payment',
        'QR code bank payments and nearby technicians listed by distance',
      ],
      links: [
        { label: 'Google Play', url: PLAY('com.familyhealth.app'), kind: 'store-play' },
        { label: 'App Store', url: APP_STORE('6759483648'), kind: 'store-appstore' },
      ],
      preview: { kind: 'store', app: 'Family Health' },
    },
    {
      id: 'connect-car-booking',
      title: 'Connect Car Booking — Ride-Hailing (Driver & Passenger)',
      track: 'mobile',
      description:
        'Driver and passenger apps for ride-hailing: live route polylines on MapLibre GL, Socket.IO trip states and driver-passenger chat, and FCM notifications, built with Flutter and BLoC.',
      metric: 'Driver & passenger apps',
      tech: ['Flutter', 'BLoC', 'GetIt', 'Firebase', 'Socket.IO', 'MapLibre GL'],
      highlights: [
        'Live route polylines on MapLibre GL with GPS updates',
        'Socket.IO trip updates between driver and passenger',
        'BLoC state management with GetIt',
      ],
      links: [
        { label: 'Google Play', url: PLAY('com.bookcar.driver'), kind: 'store-play' },
        { label: 'App Store', url: APP_STORE('6752793259'), kind: 'store-appstore' },
      ],
      preview: { kind: 'store', app: 'Connect Car Booking' },
    },
    {
      id: 'gplx-600',
      title: 'GPLX 600 Câu Ôn Thi — Driving-Licence Exam Prep',
      track: 'mobile',
      description:
        'Driving-licence exam prep with 600 questions, localisation, dev, staging and production build flavors, AdMob monetisation and integration tests, live on Google Play and the App Store.',
      metric: '600 câu · live on 2 stores',
      tech: ['Flutter', 'Dart', 'AdMob'],
      highlights: [
        '600 questions with localisation',
        'Dev, staging and production build flavors',
        'Live on Google Play and the App Store',
      ],
      links: [
        { label: 'Google Play', url: PLAY('com.gplx600.app'), kind: 'store-play' },
        { label: 'App Store', url: APP_STORE('6760825641'), kind: 'store-appstore' },
      ],
      preview: { kind: 'store', app: 'GPLX 600' },
    },
    {
      id: 'famhub',
      title: 'FamHub: Safe Zone Alerts — Family Geolocation & Safety',
      track: 'mobile',
      description:
        'Family safety app with background location, geofenced safe zones and push notifications when family members enter or leave them.',
      metric: 'Geofenced safe zones',
      tech: ['Flutter', 'Background Location', 'Geofencing', 'Push Notifications'],
      highlights: [
        'Background location tracking',
        'Geofenced safe-zone alerts',
        'Push notifications on the App Store build',
      ],
      links: [{ label: 'App Store', url: APP_STORE('6757653151'), kind: 'store-appstore' }],
      preview: { kind: 'store', app: 'FamHub' },
    },
    {
      id: 'mail-infrastructure',
      title: 'Enterprise Self-Hosted Mail & Cloud Infrastructure',
      track: 'fullstack',
      description:
        'Self-hosted enterprise mail on Linagora Twake Mail, containerised with Docker, fronted by Nginx with HTTPS/TLS on a Linux VPS, and deployed through GitHub Actions CI/CD.',
      metric: 'HTTPS/TLS · CI/CD',
      tech: ['Linagora Twake Mail', 'Docker', 'Nginx', 'Linux VPS', 'GitHub Actions', 'HTTPS/TLS'],
      highlights: [
        'Production mail and container orchestration',
        'Nginx reverse proxy with HTTPS/TLS',
        'GitHub Actions CI/CD to the Linux VPS',
      ],
      links: [],
      preview: { kind: 'diagram', nodes: ['Client', 'Nginx · TLS', 'Twake Mail (Docker)', 'GitHub Actions'] },
    },
    {
      id: 'room-rental',
      title: 'Room Rental Management: Landlord, Tenant and Admin Platform',
      track: 'fullstack',
      description:
        'Rental management system with Admin, Landlord and Tenant roles and access control in the API. Django REST Framework backend, React frontend and PostgreSQL, with GitHub Actions and deployment on Render, Vercel and Neon.',
      metric: 'Render · Vercel · Neon',
      tech: ['Django', 'Django REST Framework', 'React', 'PostgreSQL', 'GitHub Actions', 'Render', 'Vercel', 'Neon'],
      highlights: [
        'Admin, Landlord and Tenant roles with access control in the API',
        'GitHub Actions workflow in the repository',
        'Deployed on Render, Vercel and Neon',
      ],
      links: [
        { label: 'GitHub', url: 'https://github.com/TienDat11/room-rental-management-system', kind: 'github' },
        { label: 'Live demo', url: 'https://room-rental-management-system-front.vercel.app', kind: 'live' },
      ],
      preview: {
        kind: 'diagram',
        nodes: ['React (Vercel)', 'Django REST API (Render)', 'PostgreSQL (Neon)', 'GitHub Actions'],
      },
    },
    {
      id: 'kintai',
      title: 'Kintai: Attendance, Leave and Payroll System',
      track: 'fullstack',
      description:
        'Full-stack HR system for attendance tracking, leave management and payroll processing, with role-based access control, audit logging and PDF reports. Spring Boot backend and Angular frontend.',
      metric: 'Spring Boot + Angular',
      tech: ['Java', 'Spring Boot', 'Angular', 'TypeScript', 'Google Sheets API', 'PDF export'],
      highlights: [
        'Attendance, leave and payroll workflows',
        'Role-based access control with audit logging',
        'PDF reports and Google Sheets integration',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/kintai', kind: 'github' }],
      preview: {
        kind: 'diagram',
        nodes: ['Angular (TypeScript)', 'Spring Boot API', 'Attendance · Leave · Payroll', 'Google Sheets'],
      },
    },
    {
      id: 'bstories',
      title: 'BStories: Flutter Mobile App',
      track: 'mobile',
      description:
        'Flutter mobile app built with BLoC, using Socket.IO and Firebase Cloud Messaging for push notifications. Built from July to September 2025.',
      metric: 'Flutter · BLoC · Socket.IO',
      tech: ['Flutter', 'Dart', 'BLoC', 'Socket.IO', 'FCM'],
      highlights: ['BLoC state management', 'Socket.IO integration', 'Firebase Cloud Messaging notifications'],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/b-stories', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Flutter app', 'BLoC', 'Socket.IO', 'Firebase FCM'] },
    },
    {
      id: 'atlas-hrm',
      title: 'Atlas HRM Dashboard: Vue 3 Admin',
      track: 'fullstack',
      description:
        'HR management dashboard built with Vue 3, the Composition API and strict TypeScript. Includes JWT authentication with route guards, a statistics dashboard with ApexCharts and Pinia state management.',
      metric: 'Vue 3 · strict TypeScript',
      tech: ['Vue 3', 'TypeScript', 'Vite', 'Pinia', 'Vue Router', 'Axios', 'ApexCharts'],
      highlights: [
        'JWT login, registration and route guards',
        'Statistics dashboard with ApexCharts',
        'Axios client with interceptors',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/atlas-hrm', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Vue 3 + Pinia', 'Axios · JWT', 'Router guards', 'ApexCharts'] },
    },
    {
      id: 'conjob-mvp',
      title: 'ConJob MVP Social: Next.js Web App',
      track: 'fullstack',
      description: 'MVP web app built with the Next.js App Router and TypeScript.',
      metric: 'Next.js App Router · TypeScript',
      tech: ['Next.js', 'TypeScript'],
      highlights: ['Next.js App Router with TypeScript', 'Repository on GitHub'],
      links: [
        { label: 'GitHub', url: 'https://github.com/TienDat11/ConJob_Mvp_Social', kind: 'github' },
      ],
      preview: { kind: 'diagram', nodes: ['Next.js app', 'TypeScript', 'App Router', 'GitHub repo'] },
    },
    {
      id: 'happyco',
      title: 'HappyCo: Flutter E-commerce App',
      track: 'mobile',
      description: 'E-commerce app built with Flutter following Clean Architecture principles.',
      metric: 'Flutter · Clean Architecture',
      tech: ['Flutter', 'Dart', 'Clean Architecture'],
      highlights: ['Clean Architecture layering', 'Testing and deployment sections in the repository README'],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/HappyCo', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Flutter UI', 'Domain layer', 'Data layer', 'Repositories'] },
    },
    {
      id: 'huec-it-chatbot',
      title: 'HueCIT Chatbot RAG: Software Support Assistant',
      track: 'ai',
      description:
        'RAG chatbot for software-operation support. It answers how-to questions from internal documents and analyzes error screenshots to suggest fixes. Built by a team of two over eight weeks.',
      metric: 'Team of 2 · 8 weeks',
      tech: ['Python', 'RAG', 'Image analysis'],
      highlights: [
        'Document Q&A over internal user guides (RAG pipeline)',
        'Error-screenshot recognition with fix guidance',
        'Two-person team, eight-week build',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/huecit-chatbot-rag', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Document RAG', 'Error-screenshot analysis', 'Fix guidance', 'Python'] },
    },
    {
      id: 'realestate-legal-rag',
      title: 'Real-Estate Legal Document Search: RAG for Brokers',
      track: 'ai',
      description:
        'RAG chatbot that helps real-estate brokers look up legal documents, planning records, project files and price policy before answering customers. The repository builds and typechecks; end-to-end runtime is not yet verified.',
      metric: 'Builds and typechecks · runtime not yet verified',
      tech: ['Python', 'Next.js', 'RAG', 'Eval harness'],
      highlights: [
        'Ingest, API and eval directories in one repository',
        'Next.js frontend that builds and typechecks',
        'Designed with citations, a 3-tier confidence level and an output guard',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/rag-real-estate', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Next.js frontend', 'Python API', 'Ingest pipeline', 'Eval harness'] },
    },
    {
      id: 'omp-harness',
      title: 'omp-harness-plugin: Guardrails and Memory for a Coding Agent',
      track: 'ai',
      description:
        'Versioned, evidence-driven harness plugin for the omp coding agent. It adds deterministic tool policy and guardrails, a read-budget guard, session telemetry and per-project Zero-Mem memory, and adds no agent runtime of its own.',
      metric: 'Tested on omp 18.12 to 18.17',
      tech: ['TypeScript', 'Node.js', 'Zero-Mem'],
      highlights: [
        'Deterministic tool policy and guardrails',
        'Read-budget guard and session telemetry',
        'Gated learning from structured task outcomes',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/omp-harness-plugin', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['omp agent', 'Tool policy', 'Telemetry', 'Zero-Mem memory'] },
    },
    {
      id: 'maestro',
      title: 'Maestro: Orchestration Harness for Claude Code',
      track: 'ai',
      description:
        'Reusable orchestration harness for Claude Code that wraps ECC skills into guides and sensors. An Opus commander stays in the main session and hands execution to Sonnet and Haiku subagents, using a zero-dependency Node CLI for routing, state and memory.',
      metric: 'Zero-dependency Node CLI',
      tech: ['Claude Code', 'Node.js', 'Subagents'],
      highlights: [
        'Opus commander with Sonnet and Haiku subagents',
        'Routing, sensors, state and memory in one CLI',
        'Built on the ECC skill set',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/maestro', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Opus commander', 'Sonnet subagents', 'Haiku subagents', 'Node CLI'] },
    },
    {
      id: 'consulting-site',
      title: 'Corporate Website for a Consulting Firm',
      track: 'fullstack',
      description:
        'Company website for a business consulting firm, built with the Next.js App Router and TypeScript. Service and process pages share one dynamic route, and the copy is kept in typed data files.',
      metric: 'Next.js App Router · TypeScript',
      tech: ['Next.js', 'TypeScript', 'App Router'],
      highlights: [
        'One dynamic route for six service pages and four process steps',
        'Typed content data files',
        'Copy taken from the client documents',
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/TienDat11/ngochoangbhxh', kind: 'github' }],
      preview: { kind: 'diagram', nodes: ['Next.js App Router', 'Typed content', 'Service pages', 'Process steps'] },
    },
  ],
  moreProjects: [
    {
      name: 'Jinjer HRM dashboards',
      description:
        'React dashboards with HR analytics charts, built with react-hook-form, Yup, Redux-Saga and Ant Design during Rikkeisoft client work. No public repository.',
      tech: ['React', 'Redux-Saga', 'Ant Design'],
    },
    {
      name: 'AKAS Bank client application',
      description:
        'Web and mobile client features for a Japanese bank client, built in Volt MX Iris during Rikkeisoft client work. No public repository.',
      tech: ['Volt MX Iris'],
    },
    {
      name: 'Bootcamp and practice repositories (2023 to 2024)',
      description:
        'Coursework exercises in HTML, CSS, JavaScript, PHP and Laravel, including CRUD and front-end practice projects.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Laravel'],
    },
  ],

  experience: [
    {
      company: 'Crosstechedu',
      role: 'Full-Stack & Mobile Developer',
      period: 'Jan 2026 – Present',
      highlights: [
        'Apartment management CRM (Flutter Web, FastAPI, PostgreSQL) with Kanban pipeline, RBAC and automatic two-way Google Sheets API sync',
        'Real-estate AI consultation platform (Next.js 15, FastAPI RAG) with cited source retrieval',
        'Shipped GPLX 600 (Google Play & App Store) and FamHub: Safe Zone Alerts (App Store)',
        'Self-hosted enterprise mail server (Linagora Twake Mail) behind Docker, Nginx and HTTPS/TLS on a Linux VPS',
      ],
    },
    {
      company: 'HiveFive',
      role: 'Mobile Developer',
      period: 'Sep 2024 – Feb 2026',
      highlights: [
        'Built and shipped Family Health to Google Play & the App Store',
        'Built and shipped Connect Car Booking (Driver & Passenger) to Google Play & the App Store',
        'Flutter, Clean Architecture, BLoC, Firebase, Socket.IO, MapLibre GL and REST APIs',
      ],
    },
    {
      company: 'Rikkeisoft',
      role: 'Fresher Front-End Developer',
      period: 'Aug 2023 – Apr 2024',
      highlights: [
        'Joined as a 2nd-year university student (Aug 2023)',
        'Built a React dashboard with HR analytics charts for Jinjer HRM, and delivered AKAS Bank features for a Japanese bank in Volt MX Iris',
        'Integrated REST APIs and delivered in Agile/Scrum sprints with code review and Git workflows',
      ],
    },
  ],

  education: [
    {
      school: 'Hue University of Sciences',
      degree: 'B.Sc. Information Technology (Software Engineering)',
      period: 'Jul 2022 — Jun 2026',
    },
    {
      school: 'CodeGym Huế',
      degree: 'PHP / Laravel Bootcamp, graduated with distinction',
      period: 'Jan 2023 — Jan 2024',
    },
  ],
}
