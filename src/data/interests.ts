import type { InterestCategory } from '../types';

export const INTEREST_CATEGORIES: InterestCategory[] = [
  {
    id: 'Heritage',
    title: 'Heritage & Wonders',
    kannadaTitle: 'ಪರಂಪರೆ ಮತ್ತು ಇತಿಹಾಸ',
    description: 'Ancient empires, UNESCO stone wonders, and Chalukyan rock-cut masterpieces.',
    iconName: 'Landmark',
    accentColor: '#B45309', // Amber-700
    gradient: 'from-amber-600 to-amber-900',
    image: 'https://images.unsplash.com/photo-1590766940554-634a7ed41450?auto=format&fit=crop&w=600&q=80',
    count: 24
  },
  {
    id: 'Nature',
    title: 'Nature & Misty Hills',
    kannadaTitle: 'ಪ್ರಕೃತಿ ಮತ್ತು ಗಿರಿಧಾಮ',
    description: 'Lush Western Ghats, rolling tea & coffee estates, and gushing forest cascades.',
    iconName: 'Mountain',
    accentColor: '#047857', // Emerald-700
    gradient: 'from-emerald-600 to-emerald-950',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    count: 32
  },
  {
    id: 'Beaches',
    title: 'Karavali Beaches',
    kannadaTitle: 'ಕರಾವಳಿ ತೀರಗಳು',
    description: '320 km of golden Arabian sea shores, secluded coves, and cliff-top vistas.',
    iconName: 'Palmtree',
    accentColor: '#0284C7', // Sky-600
    gradient: 'from-sky-600 to-cyan-900',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    count: 18
  },
  {
    id: 'Wildlife',
    title: 'Wild Safaris',
    kannadaTitle: 'ವನ್ಯಜೀವಿ ಸಫಾರಿ',
    description: 'Home of royal Bengal tigers, Asiatic elephants, and rare black panthers.',
    iconName: 'TreePine',
    accentColor: '#15803D', // Green-700
    gradient: 'from-green-700 to-green-950',
    image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=600&q=80',
    count: 14
  },
  {
    id: 'Food',
    title: 'Culinary Trails',
    kannadaTitle: 'ಕರ್ನಾಟಕ ಪಾಕಪದ್ಧತಿ',
    description: 'From Udupi banana-leaf feasts to crispy Mylari dosas and Kodava spices.',
    iconName: 'Utensils',
    accentColor: '#D97706', // Amber-600
    gradient: 'from-orange-600 to-amber-900',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80',
    count: 45
  },
  {
    id: 'Adventure',
    title: 'Trek & Adventure',
    kannadaTitle: 'ಸಾಹಸ ಮತ್ತು ಚಾರಣ',
    description: 'Dandeli white-water rafting, Mullayanagiri peaks, and rocky canyon treks.',
    iconName: 'Compass',
    accentColor: '#EA580C', // Orange-600
    gradient: 'from-red-600 to-orange-900',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    count: 19
  },
  {
    id: 'Culture',
    title: 'Sacred & Cultural',
    kannadaTitle: 'ಸಂಸ್ಕೃತಿ ಮತ್ತು ಕಲೆ',
    description: 'Vibrant Yakshagana, grand Mysore Dasara, temple rituals, and handlooms.',
    iconName: 'Sparkles',
    accentColor: '#7C3AED', // Violet-600
    gradient: 'from-purple-700 to-indigo-950',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    count: 28
  }
];
