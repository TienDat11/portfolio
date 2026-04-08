import type { PortfolioData } from '../types'

export const portfolioData: PortfolioData = {
  profile: {
    name: 'Ngô Đức Phan Tiến Đạt',
    title: 'Mobile Developer',
    subtitle: 'Flutter Specialist',
    description:
      'Mobile Developer specializing in Flutter with Clean Architecture, BLoC pattern, and scalable app development. Experienced in building production-ready applications with a focus on maintainability and performance.',
    location: 'Ho Chi Minh City, Vietnam',
    email: 'ngothiendat259@gmail.com',
    phone: '+84  xxx xxx xxx',
    github: 'TienDat11',
    githubUrl: 'https://github.com/TienDat11',
  },

  skills: [
    {
      category: 'Mobile Development',
      items: [
        'Flutter',
        'Dart',
        'Clean Architecture',
        'BLoC / Cubit',
        'GetIt / Injectable',
        'Freezed',
        'AutoRoute',
        'Retrofit',
        'Google Maps',
        'Firebase',
        'Push Notifications',
      ],
    },
    {
      category: 'Backend & Database',
      items: [
        'Supabase',
        'Firebase',
        'REST API',
        'PostgreSQL',
        'Realtime Database',
      ],
    },
    {
      category: 'Tools & Practices',
      items: [
        'Git',
        'GitLab CI/CD',
        'GitHub Actions',
        'Figma',
        'Agile / Scrum',
        'Code Review',
        'TDD',
      ],
    },
    {
      category: 'Other',
      items: [
        'TypeScript',
        'Python',
        'AI Integration',
        'FVM',
        'Fastlane',
      ],
    },
  ],

  projects: [
    {
      id: 'family-health',
      title: 'Family Health',
      problem:
        'Managing family health records, appointments, and medication schedules across multiple family members.',
      role: 'Mobile Developer — Lead Flutter development',
      solution:
        'Built a comprehensive family health management app using Clean Architecture, BLoC pattern, and Supabase backend. Implemented offline-first approach with sync capabilities.',
      tech: [
        'Flutter',
        'Clean Architecture',
        'BLoC',
        'Supabase',
        'Freezed',
        'Injectable',
        'AutoRoute',
      ],
      impact:
        'Production app serving family health management needs with real-time sync and offline support.',
      githubUrl: 'https://github.com/TienDat11/family-health-flutter',
      limitations:
        'Currently optimizing sync performance for large datasets. Planning to add AI-powered health insights.',
      featured: true,
    },
    {
      id: 'b-stories',
      title: 'B Stories',
      problem:
        'Creating an engaging social storytelling platform with rich media support and interactive content.',
      role: 'Mobile Developer — Full Flutter implementation',
      solution:
        'Developed a storytelling social platform with media-rich content, real-time interactions, and smooth animations using Flutter and Clean Architecture.',
      tech: [
        'Flutter',
        'Clean Architecture',
        'BLoC',
        'Firebase',
        'Google Maps',
        'Push Notifications',
        'REST API',
      ],
      impact:
        'Delivered a polished social platform with smooth UX and real-time features.',
      githubUrl: 'https://github.com/TienDat11/b-stories',
      limitations:
        'Exploring AI content moderation. Performance tuning for low-end devices in progress.',
      featured: true,
    },
    {
      id: 'car-booking',
      title: 'Car Booking App',
      problem:
        'Building a reliable car booking system with real-time tracking, payment integration, and driver management.',
      role: 'Mobile Developer — Core feature development',
      solution:
        'Implemented booking flow, real-time tracking with Google Maps, payment integration, and driver-passenger matching system using Clean Architecture.',
      tech: [
        'Flutter',
        'Clean Architecture',
        'BLoC',
        'Google Maps',
        'Firebase',
        'REST API',
        'Push Notifications',
      ],
      impact:
        'Functional booking system with real-time GPS tracking and seamless payment flow.',
      githubUrl: 'https://github.com/TienDat11/car-booking-app',
      limitations:
        'Payment gateway optimization ongoing. Adding multi-language support planned.',
      featured: true,
    },
    {
      id: 'happyco',
      title: 'HappyCo',
      problem:
        'Developing a business management platform with employee engagement, task tracking, and analytics.',
      role: 'Mobile Developer — Feature modules',
      solution:
        'Built feature modules for employee management, task tracking dashboards, and analytics with Clean Architecture and modular design.',
      tech: [
        'Flutter',
        'Clean Architecture',
        'BLoC',
        'Retrofit',
        'Freezed',
        'Injectable',
        'AutoRoute',
      ],
      impact:
        'Contributed to a business management platform with modular, testable architecture.',
      githubUrl: 'https://github.com/TienDat11/happyco',
      limitations:
        'Analytics module expansion planned. Performance optimization for dashboard charts in progress.',
      featured: true,
    },
  ],

  experience: [
    {
      company: 'Freelance / Contract',
      role: 'Mobile Developer (Flutter)',
      period: '2023 — Present',
      location: 'Ho Chi Minh City',
      description:
        'Building production Flutter applications with Clean Architecture for various clients.',
      highlights: [
        'Led Flutter development on 4+ production apps',
        'Implemented Clean Architecture with BLoC, GetIt, Freezed across all projects',
        'Integrated Supabase, Firebase, Google Maps, and payment gateways',
        'Established CI/CD pipelines with GitLab and GitHub Actions',
      ],
    },
  ],

  education: [
    {
      school: 'University of Information Technology (UIT)',
      degree: 'Bachelor of Computer Science',
      period: '2020 — 2024',
      description:
        'Focused on software engineering, mobile development, and system design.',
    },
  ],
}
