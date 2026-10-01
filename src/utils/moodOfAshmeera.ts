export type MoodKey = 'dreamy' | 'romantic' | 'serene' | 'nostalgic' | 'celebration';

export interface MoodTheme {
  key: MoodKey;
  nameEnglish: string;
  nameUrdu: string;
  poeticNote: string;
  symbol: string;
  // Ambient radial lighting gradients
  radialPrimary: string;
  radialSecondary: string;
  subtleTint: string;
  accentBorder: string;
  accentText: string;
  pillBg: string;
  pillBorder: string;
  pillText: string;
  // Particle styling for this mood
  particleColors: string[];
  particleType: 'petal' | 'sparkle' | 'mote';
  particleSpeedMultiplier: number;
  glowAura: string;
}

export const MOODS: Record<MoodKey, MoodTheme> = {
  dreamy: {
    key: 'dreamy',
    nameEnglish: 'Dreamy',
    nameUrdu: 'خوابیدہ',
    poeticNote: 'Soft starlit reverie and ethereal whispers',
    symbol: '✨',
    radialPrimary:
      'radial-gradient(ellipse 95% 70% at 50% -5%, rgba(224, 206, 238, 0.22) 0%, rgba(206, 186, 222, 0.12) 35%, rgba(185, 172, 208, 0.05) 65%, transparent 85%)',
    radialSecondary:
      'radial-gradient(circle 800px at 85% 85%, rgba(228, 212, 240, 0.16) 0%, rgba(201, 169, 110, 0.05) 50%, transparent 80%)',
    subtleTint: 'rgba(218, 202, 232, 0.02)',
    accentBorder: '#BFA4C8',
    accentText: '#6D5477',
    pillBg: 'bg-[#F4EFF7]',
    pillBorder: 'border-[#BFA4C8]/60',
    pillText: 'text-[#6D5477]',
    particleColors: ['#EADDF0', '#DFCEEB', '#E9C9CB', '#F8EAE8', '#D6BEDF'],
    particleType: 'sparkle',
    particleSpeedMultiplier: 1.15,
    glowAura: 'rgba(210, 190, 230, 0.35)',
  },
  romantic: {
    key: 'romantic',
    nameEnglish: 'Romantic',
    nameUrdu: 'عاشقانہ',
    poeticNote: 'Tender rose-tinted candlelit devotion',
    symbol: '🌹',
    radialPrimary:
      'radial-gradient(ellipse 95% 70% at 50% -5%, rgba(235, 195, 200, 0.25) 0%, rgba(220, 170, 180, 0.14) 35%, rgba(197, 138, 147, 0.06) 65%, transparent 85%)',
    radialSecondary:
      'radial-gradient(circle 850px at 85% 85%, rgba(235, 195, 200, 0.18) 0%, rgba(201, 169, 110, 0.06) 50%, transparent 80%)',
    subtleTint: 'rgba(233, 195, 200, 0.025)',
    accentBorder: '#C58A93',
    accentText: '#874D57',
    pillBg: 'bg-[#F9ECEE]',
    pillBorder: 'border-[#C58A93]/60',
    pillText: 'text-[#874D57]',
    particleColors: ['#E9C9CB', '#F2D7D9', '#C58A93', '#F8EAE8', '#E6B8BF'],
    particleType: 'petal',
    particleSpeedMultiplier: 1.0,
    glowAura: 'rgba(229, 178, 185, 0.35)',
  },
  serene: {
    key: 'serene',
    nameEnglish: 'Serene',
    nameUrdu: 'سکون',
    poeticNote: 'Tranquil ivory peace and sacred stillness',
    symbol: '🕊️',
    radialPrimary:
      'radial-gradient(ellipse 95% 70% at 50% -5%, rgba(246, 241, 233, 0.35) 0%, rgba(236, 228, 216, 0.18) 35%, rgba(202, 192, 176, 0.06) 65%, transparent 85%)',
    radialSecondary:
      'radial-gradient(circle 800px at 85% 85%, rgba(242, 236, 226, 0.2) 0%, rgba(192, 182, 166, 0.05) 50%, transparent 80%)',
    subtleTint: 'rgba(236, 232, 222, 0.02)',
    accentBorder: '#C2B49D',
    accentText: '#5E5445',
    pillBg: 'bg-[#F8F5F0]',
    pillBorder: 'border-[#C2B49D]/60',
    pillText: 'text-[#5E5445]',
    particleColors: ['#FAF6F0', '#EFE9DF', '#E8DFD3', '#F5EFEB', '#DCD2C3'],
    particleType: 'mote',
    particleSpeedMultiplier: 1.3,
    glowAura: 'rgba(230, 220, 205, 0.35)',
  },
  nostalgic: {
    key: 'nostalgic',
    nameEnglish: 'Nostalgic',
    nameUrdu: 'یادیں',
    poeticNote: 'Golden sepia warmth and treasured yesterdays',
    symbol: '📜',
    radialPrimary:
      'radial-gradient(ellipse 95% 70% at 50% -5%, rgba(235, 205, 155, 0.24) 0%, rgba(215, 180, 130, 0.14) 35%, rgba(185, 145, 95, 0.06) 65%, transparent 85%)',
    radialSecondary:
      'radial-gradient(circle 850px at 85% 85%, rgba(235, 205, 155, 0.16) 0%, rgba(201, 169, 110, 0.06) 50%, transparent 80%)',
    subtleTint: 'rgba(225, 185, 125, 0.025)',
    accentBorder: '#C9A96E',
    accentText: '#7A5B27',
    pillBg: 'bg-[#FAF4E6]',
    pillBorder: 'border-[#C9A96E]/60',
    pillText: 'text-[#7A5B27]',
    particleColors: ['#EEDDBE', '#E4C99A', '#C9A96E', '#F4E7CE', '#DFBC80'],
    particleType: 'mote',
    particleSpeedMultiplier: 1.05,
    glowAura: 'rgba(215, 175, 110, 0.35)',
  },
  celebration: {
    key: 'celebration',
    nameEnglish: 'Celebration',
    nameUrdu: 'جشن',
    poeticNote: 'Radiant golden sparkles of unmeasured joy',
    symbol: '🎉',
    radialPrimary:
      'radial-gradient(ellipse 95% 70% at 50% -5%, rgba(245, 215, 130, 0.28) 0%, rgba(235, 195, 105, 0.16) 35%, rgba(212, 175, 55, 0.07) 65%, transparent 85%)',
    radialSecondary:
      'radial-gradient(circle 900px at 85% 85%, rgba(250, 225, 145, 0.2) 0%, rgba(233, 201, 203, 0.08) 50%, transparent 80%)',
    subtleTint: 'rgba(240, 200, 100, 0.025)',
    accentBorder: '#D4AF37',
    accentText: '#785A0D',
    pillBg: 'bg-[#FCF6E0]',
    pillBorder: 'border-[#D4AF37]/60',
    pillText: 'text-[#785A0D]',
    particleColors: ['#F9E498', '#F2D372', '#E9C9CB', '#D4AF37', '#FCEEC4'],
    particleType: 'sparkle',
    particleSpeedMultiplier: 0.88,
    glowAura: 'rgba(240, 210, 115, 0.4)',
  },
};

export const MOOD_ORDER: MoodKey[] = ['dreamy', 'romantic', 'serene', 'nostalgic', 'celebration'];
