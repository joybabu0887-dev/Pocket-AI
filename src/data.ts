import { Category, AIHubLink, PromptToolItem, Language } from './types';

export const CATEGORIES: Category[] = [
  { id: 'business', nameEn: 'Business', nameBn: 'ব্যবসা', icon: 'Briefcase' },
  { id: 'marketing', nameEn: 'Marketing', nameBn: 'মার্কেটিং', icon: 'TrendingUp' },
  { id: 'coding', nameEn: 'Coding', nameBn: 'কোডিং/প্রোগ্রামিং', icon: 'Code' },
  { id: 'design', nameEn: 'Image / Design', nameBn: 'ডিজাইন ও ইমেজ', icon: 'Palette' },
  { id: 'social', nameEn: 'YouTube / Social', nameBn: 'ইউটিউব ও সোশ্যাল মিডিয়া', icon: 'Youtube' },
  { id: 'writing', nameEn: 'Writing', nameBn: 'কনটেন্ট রাইটিং', icon: 'PenTool' },
  { id: 'career', nameEn: 'Career', nameBn: 'ক্যারিয়ার', icon: 'Compass' },
  { id: 'finance', nameEn: 'Finance', nameBn: 'অর্থ ও অর্থসংস্থান', icon: 'DollarSign' },
  { id: 'health', nameEn: 'Health & Fitness', nameBn: 'স্বাস্থ্য ও ফিটনেস', icon: 'Activity' },
  { id: 'education', nameEn: 'Education', nameBn: 'শিক্ষা', icon: 'BookOpen' },
  { id: 'website', nameEn: 'Website Prompt', nameBn: 'ওয়েবসাইট প্রম্পট', icon: 'Globe' },
];

export const PROMPT_TOOLS: PromptToolItem[] = [
  {
    id: 'chatgpt-gen',
    nameEn: 'ChatGPT Prompt Generator',
    nameBn: 'চ্যাটজিপিটি প্রম্পট জেনারেটর',
    category: 'writing',
    defaultTopicEn: 'write a high-converting sales page for an AI productivity app',
    defaultTopicBn: 'একটি উন্নত এআই প্রোডাক্টিভিটি অ্যাপের জন্য দারুণ সেলস পেজ স্ক্রিপ্ট লিখুন',
  },
  {
    id: 'gemini-gen',
    nameEn: 'Gemini Prompt Generator',
    nameBn: 'জেমিনি প্রম্পট জেনারেটর',
    category: 'business',
    defaultTopicEn: 'strategic analysis of current AI marketing trends in retail',
    defaultTopicBn: 'রিটেইল ব্যবসায় বর্তমান এআই মার্কেটিং ট্রেন্ডের কৌশলগত বিশ্লেষণ করুন',
  },
  {
    id: 'logo-gen',
    nameEn: 'Logo Prompt Generator',
    nameBn: 'লোগো প্রম্পট জেনারেটর',
    category: 'design',
    defaultTopicEn: 'minimalist visual logo of a pocket shield inside a digital web network, vibrant blue neon glow gradient, black background, 3d rendering, high resolution',
    defaultTopicBn: 'ডিজিটাল ওয়েব নেটওয়ার্কের ভেতর একটি পকেট শিল্ড লোগো, উজ্জ্বল নীল নিয়ন গ্লো গ্রেডিয়েন্ট, কালো ব্যাকগ্রাউন্ড, মিনিমালিস্ট, থ্রিডি রেন্ডারিং, হাই রেজোলিউশন',
  },
  {
    id: 'website-gen',
    nameEn: 'Website Prompt',
    nameBn: 'ওয়েবসাইট প্রম্পট',
    category: 'website',
    defaultTopicEn: 'Single-page portfolio website with dark glassmorphic layout, smooth scroll animations, built with React and Tailwind CSS',
    defaultTopicBn: 'একটি এক পাতার পোর্টফোলিও ওয়েবসাইট ডিজাইন যাতে ডার্ক গ্লাসমরফিক লেআউট, দারুণ স্ক্রোল অ্যানিমেশন, রিঅ্যাক্ট এবং টেইলউইন্ড সিএসএস দিয়ে তৈরি',
  },
  {
    id: 'youtube-gen',
    nameEn: 'YouTube Prompt Generator',
    nameBn: 'ইউটিউব প্রম্পট জেনারেটর',
    category: 'social',
    defaultTopicEn: 'video title and script outline for "The Future of AI in 2026"',
    defaultTopicBn: '"২০২৬ সালে আর্টিফিশিয়াল ইন্টেলিজেন্স এর ভবিষ্যৎ" এই বিষয়ের উপর আকর্ষণীয় ইউটিউব শিরোনাম এবং স্ক্রিপ্ট আউটলাইন',
  },
  {
    id: 'coding-gen',
    nameEn: 'Coding Prompt Generator',
    nameBn: 'কোডিং প্রম্পট জেনারেটর',
    category: 'coding',
    defaultTopicEn: 'TypeScript debounced search input custom Hook with complete typing and error handling',
    defaultTopicBn: 'টাইপস্ক্রিপ্টে ডিবান্সড সার্চ ইনপুট কাস্টম হুক সম্পূর্ণ টাইপিং এবং এরর হ্যান্ডলিং সহ',
  },
];

export const AI_TOOLS_LINKS: AIHubLink[] = [
  { name: 'ChatGPT', url: 'https://chatgpt.com', icon: 'MessageSquare' },
  { name: 'Gemini', url: 'https://gemini.google.com', icon: 'Sparkles' },
  { name: 'Claude', url: 'https://claude.ai', icon: 'Bot' },
  { name: 'Google AI Studio', url: 'https://aistudio.google.com', icon: 'Cpu' },
];

export const DEV_TOOLS_LINKS: AIHubLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: 'Github' },
  { name: 'Vercel', url: 'https://vercel.com', icon: 'Triangle' },
];

export const TONES = [
  { id: 'Professional', labelEn: '💼 Professional', labelBn: '💼 পেশাদারী' },
  { id: 'Creative', labelEn: '🎨 Creative', labelBn: '🎨 সৃজনশীল' },
  { id: 'Technical', labelEn: '💻 Technical', labelBn: '💻 প্রযুক্তিগত' },
  { id: 'Convincing', labelEn: '📈 Persuasive', labelBn: '📈 প্ররোচিতকারী' },
  { id: 'Simple', labelEn: '🌱 Simplified', labelBn: '🌱 সহজ সরল' },
];

export const SUGGESTIVE_TOPICS: Record<string, { en: string[]; bn: string[] }> = {
  business: {
    en: [
      'Write a comprehensive startup business pitch framework.',
      'Draft a professional partnership request email.',
      'Generate list of 10 high-margin side hustle ideas for 2026.'
    ],
    bn: [
      'একটি স্টার্টআপ ব্যবসার জন্য পিচ ডেক বা ফ্রেমওয়ার্ক তৈরি করুন।',
      'অফিসিয়াল পার্টনারশিপের জন্য প্রফেশনাল ইমেইল ড্রাফট করুন।',
      '২০২৬ সালের জন্য ১০টি লাভজনক সাইড হাস্টলের তালিকা দিন।'
    ]
  },
  marketing: {
    en: [
      'Create a 30-day content calendar for an AI tool launch.',
      'Write short ad copy with a Hook, Story, and Call to action.',
      'Optimize a blog post meta description to maximize CTR.'
    ],
    bn: [
      'নতুন একটি এআই টুল লঞ্চের ৩০ দিনের কনটেন্ট ক্যালেন্ডার।',
      'হুক, স্টোরি এবং কল-টু-অ্যাকশন সহ ফেসবুক বিজ্ঞাপনের অনুলিপি।',
      'ব্লগ পোস্টের মেটা ডেসক্রিপশন অপ্টিমাইজেশন।'
    ]
  },
  coding: {
    en: [
      'Write a Node.js middleware for JWT user authentication.',
      'Explain CSS Grid vs Flexbox with examples of when to use which.',
      'Optimize a deeply nested SQL query with join indexes.'
    ],
    bn: [
      'JWT ইউজার অথেনটিকেশন এর জন্য এক্সপ্রেস নোড জেএস মিডলওয়্যার।',
      'সিএসএস গ্রিড এবং ফ্লেক্সবক্সের পার্থক্য উদাহরণসহ বুঝান।',
      'একটি বড় বা জটিল SQL কুয়েরি অপ্টিমাইজ করার কৌশল।'
    ]
  },
  design: {
    en: [
      'Prompt for Midjourney: A glowing virtual cyber forest, isometric, neon holographic colors.',
      'A minimal 3D design of a sleek tech water bottle on black marble background.',
      'Visual description of a dark user-friendly dashboard for analytics.'
    ],
    bn: [
      'মিডজার্নি প্রম্পট: সাইবার ফরেস্ট, আইসোমেট্রিক, নিয়ন হলোগ্রাফিক কালার।',
      'একটি থ্রিডি স্লিক টেক ওয়াটার বোতল কাল মার্বেল টেবিলে রাখা।',
      'একটি আকর্ষণীয় এবং ব্যবহার-বান্ধব ডার্ক অ্যানালিটিক্স ড্যাশবোর্ডের নকশা।'
    ]
  },
  social: {
    en: [
      'Create 5 viral shorts headline hooks for coders.',
      'Write a YouTube video intro script explaining quantum computing simply.',
      'Draft a LinkedIn post sharing how learning prompt engineering saved 20 hours.'
    ],
    bn: [
      'প্রোগ্রামারদের জন্য ৫টি ভাইরাল শর্টস বা রিলস ভিডিওর হুক।',
      'কোয়ান্টাম কম্পিউটিং নিয়ে একটি আকর্ষণীয় ইউটিউব ভিডিও স্ক্রিপ্ট।',
      'প্রম্পট ইঞ্জিনিয়ারিং শিখে সপ্তাহে ২০ ঘণ্টা সাশ্রয় নিয়ে লিঙ্কডইন পোস্ট।'
    ]
  },
  writing: {
    en: [
      'Write a sci-fi short story beginning with a clock running backwards.',
      'Draft an outline for a ultimate guide to self-improvement book.',
      'Rewrite this bulleted list into a compelling professional paragraph.'
    ],
    bn: [
      'উলোটা ঘড়ির সময় নিয়ে একটি ছোট বৈজ্ঞানিক কল্পকাহিনী।',
      'নিজেকে উন্নত করার সেরা গাইড বইয়ের সম্পূর্ণ আউটলাইন।',
      'এই তথ্যগুলোকে একত্রিত করে প্রফেশনাল প্যারাগ্রাফ আকারে সাজান।'
    ]
  },
  career: {
    en: [
      'Generate response bullets for a Resume with strong action verbs.',
      'Write a stellar response to "What is your biggest weakness?"',
      'Draft a tactful negotiation letter for a software engineer salary.'
    ],
    bn: [
      'ক্লিয়ার অ্যাকশন ভার্ব ব্যবহার করে রিজিউমি ফ্রেমওয়ার্ক।',
      'চাকরির ইন্টারভিউতে "আপনার মূল দুর্বলতা কি?" এর জুতসই উত্তর।',
      'সফটওয়্যার ইঞ্জিনিয়ার হিসেবে যৌক্তিকভাবে বেতন আলোচনার আর্জি।'
    ]
  },
  finance: {
    en: [
      'Formulate a 50/30/20 budget framework based on a specific income.',
      'Explain index funds vs mutual funds easily for beginners.',
      'Create a checklist for evaluating a company\'s quarterly earning report.'
    ],
    bn: [
      'নির্দিষ্ট আয়ের উপর ভিত্তি করে ৫০/৩০/২০ বাজেট বা সঞ্চয় ফ্রেমওয়ার্ক।',
      'নতুনদের জন্য ইনডেক্স ফান্ড বনাম মিউচুয়াল ফান্ডের সহজ ব্যাখ্যা।',
      'শেয়ার ক্রয়ের উদ্দেশ্যে কোম্পানির ফাইন্যান্সিয়াল রিপোর্ট বিশ্লেষণের চেকলিস্ট।'
    ]
  },
  health: {
    en: [
      'Create a 3-day high-protein vegetarian meal plan.',
      'Outline a 15-minute home desk stretching workout.',
      'Explain active recovery and its key benefits for athletes.'
    ],
    bn: [
      '৩ দিনের হাই-প্রোটিন নিরামিষ ডায়েট বা মিল প্ল্যান।',
      'অফিস ডেস্কে করার মত ১৫ মিনিটের স্ট্রেচ আউট ব্যায়ামের তালিকা।',
      'সুস্থতা নিশ্চিত করতে নিয়মিত শরীরচর্চা ও রিকোভারি রুটিন।'
    ]
  },
  education: {
    en: [
      'Create an analogical explanation of how decentralized database works.',
      'Draft 5 multiple choice questions testing critical thinking on green economy.',
      'Synthesize a study guide outline for understanding Newtonian physics.'
    ],
    bn: [
      'ডিসেন্ট্রালাইজড ডাটাবেস কীভাবে কাজ করে তার বাস্তব উদাহরণসহ ব্যাখ্যা।',
      'গ্রিন ইকোনমি বা সবুজ অর্থনীতির উপর ৫টি কুইজ প্রশ্ন তৈরি করুন।',
      'নিউটনীয় মেকানিক্স বা পদার্থবিদ্যা প্রস্তুতির জন্য স্টাডি গাইড আউটলাইন।'
    ]
  },
  website: {
    en: [
      'Create a SaaS landing page layout featuring dynamic pricing calculators.',
      'Draft content copy for a cyber-security company services catalog.',
      'Write responsive navigation design specs with optimal spacing guidelines.'
    ],
    bn: [
      'ডাইনামিক প্রাইসিং প্যানেল সহ একটি প্রিমিয়াম স্টার্টআপ ল্যান্ডিং পেজ।',
      'সাইবার সিকিউরিটি কোম্পানির সার্ভিসসমূহের চমৎকার বর্ণনা।',
      'একটি আকর্ষণীয় রেসপন্সিভ নভিগেশন বারের লেআউট স্পেসিফিকেশন।'
    ]
  }
};

export const TRANSLATIONS = {
  en: {
    title: 'Pocket AI',
    tagline: 'Premium Prompt Generator & AI Hub',
    languageSelectorTitle: 'Welcome to Pocket AI',
    languageSelectorSubtitle: 'Please select your preferred language to begin',
    getStarted: 'Get Started',
    sidebarAITools: 'AI Tools',
    sidebarDevTools: 'Developer Tools',
    sidebarPromptTools: 'Prompt Tools',
    categoryTitle: 'Select Category',
    inputLabel: 'Enter Topic or Description',
    inputPlaceholder: 'e.g., build a custom React carousel hooks with drag-and-drop support...',
    toneLabel: 'Select Tone',
    generateBtn: 'Generate Prompt',
    generating: 'Generating Blueprint...',
    outputTitle: 'Generated Master Prompt',
    copyBtn: 'Copy Prompt',
    copied: 'Copied!',
    favoritePrompt: 'Save to Favorites',
    favorited: 'Favorited!',
    favoritesTab: 'Favorites',
    historyTab: 'History',
    emptyFavorites: 'No favorites saved yet. Generate prompt, click star to save!',
    emptyHistory: 'Your search history is empty. Try generating a few prompts!',
    savedPromptTitle: 'Title for favorite',
    saveBtn: 'Save',
    cancelBtn: 'Cancel',
    regenerate: 'Regenerate',
    quickSuggestions: 'Quick Suggestions',
    viewPrompt: 'View Prompt',
    deletePrompt: 'Delete',
    language: 'Language / ভাষা',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    allCategories: 'All Categories',
    placeholderExplain: 'Choose a suggestion below to instantly populate or type your project details above.',
    historyBtn: 'History',
    favoritesBtn: 'Favorites',
    generatorBtn: 'Generator',
    credits: 'Pocket AI Hub © 2026 • Powered by Gemini AI',
    toggleSidebar: 'Toggle Menu',
  },
  bn: {
    title: 'পকেট এআই',
    tagline: 'প্রিমিয়াম প্রম্পট জেনারেটর এবং এআই হাব',
    languageSelectorTitle: 'পকেট এআই-তে স্বাগতম',
    languageSelectorSubtitle: 'অগ্রসর হতে অনুগ্রহ করে আপনার পছন্দসই ভাষা নির্বাচন করুন',
    getStarted: 'শুরু করুন',
    sidebarAITools: 'এআই টুলস',
    sidebarDevTools: 'ডেভেলপার টুলস',
    sidebarPromptTools: 'প্রম্পট টুলস',
    categoryTitle: 'ক্যাটাগরি নির্বাচন করুন',
    inputLabel: 'টপিক বা বিবরণ লিখুন',
    inputPlaceholder: 'যেমন: একটি রেসপন্সিভ ড্র্যাগ-অ্যান্ড-ড্রপ রিঅ্যাক্ট ক্যারোসেল তৈরি করার কোড...',
    toneLabel: 'টোন বা ধরণ নির্বাচন করুন',
    generateBtn: 'প্রম্পট তৈরি করুন',
    generating: 'প্রম্পট তৈরি হচ্ছে...',
    outputTitle: 'তৈরিকৃত মাস্টার প্রম্পট',
    copyBtn: 'প্রম্পট কপি করুন',
    copied: 'কপি হয়েছে!',
    favoritePrompt: 'ফেভারিট করুন',
    favorited: 'ফেভারিট করা হয়েছে!',
    favoritesTab: 'ফেভারিটসমূহ',
    historyTab: 'ইতিহাস',
    emptyFavorites: 'কোনো ফেভারিট প্রম্পট এখনো সংরক্ষিত মেলেনি। তৈরি করার পর স্টার বাটনে ক্লিক করে রাখুন!',
    emptyHistory: 'আপনার ইতিহাস খালি রয়েছে। কিছু প্রম্পট জেনারেট করে শুরু করুন!',
    savedPromptTitle: 'ফেভারিটের জন্য শিরোনাম দিন',
    saveBtn: 'সংরক্ষণ',
    cancelBtn: 'বাতিল',
    regenerate: 'পুনরায় তৈরি করুন',
    quickSuggestions: 'দ্রুত পরামর্শসমূহ',
    viewPrompt: 'প্রম্পট দেখুন',
    deletePrompt: 'মুছে ফেলুন',
    language: 'Language / ভাষা',
    darkMode: 'ডার্ক মোড',
    lightMode: 'লাইট মোড',
    allCategories: 'সব ক্যাটাগরি',
    placeholderExplain: 'ইনপুট বক্সটি পূরণ করতে নিচ থেকে একটি বিষয় নির্বাচন করুন অথবা আপনার নিজস্ব টপিক লিখুন।',
    historyBtn: 'ইতিহাস',
    favoritesBtn: 'ফেভারিট',
    generatorBtn: 'জেনারেটর',
    credits: 'পকেট এআই হাব © ২০২৬ • জেমিনি এআই চালিত',
    toggleSidebar: 'মিনু টগল',
  }
};
