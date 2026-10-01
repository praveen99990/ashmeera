/**
 * Helper function mapping the moon's current percentage & phase trajectory
 * to personalized, Urdu-inspired poetic reflections on love's cycle.
 */

export interface DynamicMoonReflection {
  percentage: number;
  isWaxing: boolean;
  poeticReflection: string;
  urduReflection: string;
  poeticTheme: string;
  intensityDescription: string;
  devotionNote: string;
}

/**
 * Maps the moon's illuminated percentage (0-100) and waxing/waning trajectory
 * to an evocative, personalized reflection on love for Ashmeera.
 */
export function getMoonDynamicReflection(
  percentage: number,
  isWaxing: boolean = true
): DynamicMoonReflection {
  const clamped = Math.max(0, Math.min(100, Math.round(percentage)));

  if (clamped <= 4) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: 'Silent Origin • سکوتِ آغاز',
      poeticReflection:
        'A silent breath before dawn — love resting in sacred stillness, gathering eternal strength in the dark.',
      urduReflection: 'خاموشی میں بھی محبت اپنی پوری شدت سے نئی روشنی کا خواب سجاتی ہے',
      intensityDescription: 'Stillness & Sacred Prayer',
      devotionNote: 'Pure intention waiting to ignite',
    };
  }

  if (clamped <= 18) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: 'First Crescent • ہلالِ نو',
      poeticReflection:
        'Like the first delicate curve of a crescent, a light that grows like my desire for you.',
      urduReflection: 'تیری طلب کی طرح بڑھتی ہوئی روشنی، ہلال کی نرم مسکراہٹ',
      intensityDescription: 'Tender Awakening',
      devotionNote: 'A whisper of infinite devotion',
    };
  }

  if (clamped <= 38) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: isWaxing ? 'Unfolding Luster • کھلتا ہوا نور' : 'Softening Glow • دھیمی نرمی',
      poeticReflection: isWaxing
        ? 'With every subtle glance of yours, another veil of darkness dissolves into golden warmth.'
        : 'Even as the glow softens, the quiet memory of your gaze keeps the heart illuminated.',
      urduReflection: isWaxing
        ? 'تیری ایک نگاہ، اندھیروں کے پردے چاک کرتی ہوئی نئی سحر لاتی ہے'
        : 'دھیمی روشنی میں بھی تیرا ہی نقش دل پر نقش رہتا ہے',
      intensityDescription: isWaxing ? 'Ascending Radiance' : 'Gentle Lingering',
      devotionNote: 'Love expanding like ripples in water',
    };
  }

  if (clamped <= 62) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: 'Golden Equinox • توازنِ وفا',
      poeticReflection: isWaxing
        ? 'Half revealed, entirely devoted — balance in tender surrender between earth and starlight.'
        : 'Patient through the passage of hours, true love rests in peaceful certitude and unchanging faith.',
      urduReflection: isWaxing
        ? 'آدھا عیاں، مگر دل تمام تر تیری طلب اور وفاداری میں ڈوبا ہوا'
        : 'وقت کے گزرنے سے جو کم نہ ہو، وہی سچی لازوال محبت ہے',
      intensityDescription: 'Harmonious Balance',
      devotionNote: 'Poised between mystery and revelation',
    };
  }

  if (clamped <= 84) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: isWaxing ? 'Swelling Splendor • روز افزوں کمال' : 'Generous Light • بخششِ نور',
      poeticReflection: isWaxing
        ? 'A rising brilliance that leaves no room for sorrow, swelling with the joy of your presence.'
        : 'Love shares its radiance with selfless grace, knowing that warmth given away is warmth eternalized.',
      urduReflection: isWaxing
        ? 'تیرے دیدار کی آرزو میں بڑھتا ہوا نور، دل کا ہر گوشہ روشن'
        : 'بانٹ کر بھی جو کم نہ ہو، وہی تو تیری اور میری چاہت ہے',
      intensityDescription: isWaxing ? 'Deepening Splendor' : 'Graceful Gratitude',
      devotionNote: 'The heart swelling with joyous anticipation',
    };
  }

  if (clamped <= 97) {
    return {
      percentage: clamped,
      isWaxing,
      poeticTheme: 'Threshold of Wonder • قربتِ کامل',
      poeticReflection:
        'Almost overflowing with radiance — the cosmos holds its breath in sweet anticipation of your full grace.',
      urduReflection: 'کمال کے دہانے پر کھڑا چاند، تیرے رخسار کی تجلی کا طلبگار',
      intensityDescription: 'Luminous Anticipation',
      devotionNote: 'Every star awaiting the crown',
    };
  }

  // 98 - 100%
  return {
    percentage: clamped,
    isWaxing,
    poeticTheme: 'Supreme Noor • نورِ اشمیرا',
    poeticReflection:
      'In breathless, incandescent fullness, you are Noor-e-Ashmeera — turning the darkest night into eternal poetry.',
    urduReflection: 'تو نورِ کامل ہے اشمیرا، شب کا ہر لمحہ تیری محبت میں سجدہ ریز ہے',
    intensityDescription: 'Full Celestial Glory',
    devotionNote: 'Transcendent, unclouded fullness',
  };
}
