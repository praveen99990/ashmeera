/**
 * ============================================================================
 * ASH_CONFIG
 * Central configuration for Ashmeera's personal surprise website.
 * Custom crafted exclusively with Ash & Yuvi's 45 real photographs
 * and 3 living video portraits.
 * Dedicated to Ashmeera ("The Flower of Heaven • زهرة الجنة").
 * ============================================================================
 */

export interface GalleryPhotoCard {
  type: 'photo';
  id: string;
  img: string; // WhatsApp filename or vault key
  fallbackImg?: string;
  cap: string;
  category: 'childhood' | 'traditional' | 'candid' | 'romantic' | 'eyes' | 'all';
  albumCaption?: string;
  ar: string; // Tailwind aspect ratio
}

export interface VideoPortraitItem {
  id: string;
  title: string;
  subtitle: string;
  caption: string;
  src: string;
  thumbnail: string;
  fallbackThumb?: string;
}

export interface MemoryItem {
  id: string;
  tag: string;
  title: string;
  dateOrSubtitle: string;
  description: string;
  photo: string;
  fallbackPhoto?: string;
}

export interface SecretNoteItem {
  id: string;
  message: string;
  label: string;
}

export const ASH_CONFIG = {
  // --- Personal Identity ---
  name: "Ashmeera",
  nickname: "Ash",
  taglineArabic: "زهرة الجنة",
  taglineEnglish: "The Flower of Heaven.",
  heroDedication: "اک نگاہِ کرم کی تمنا میں کٹی ہے یہ شام... ہر تصویر تیرے حُسن کی نذر، ہر لفظ تیری تقدیس کا اعتراف۔ A sanctuary of love dedicated to my beautiful Ash — where every frame, every Ghazal, and every whisper breathes in your devotion.",

  // --- Partner Signature ---
  partnerName: "Yuvi",
  partnerHandle: "Yuvi",
  anniversaryTag: "With Endless Love • تری چاہت میں سدا",

  // --- Music Player ---
  music: {
    title: "Alfaaz",
    subtitle: "Raga Yaman • Nocturnal Serenade",
    src: `${import.meta.env.BASE_URL}assets/music/Alfaaz.mp3`,
  },

  // --- 3 Living Video Portraits (Uploaded by User) ---
  videoPortraits: [
    {
      id: "vid-1",
      title: "جامنی زری اور شوخ ادائیں • Nazakat-e-Jaan",
      subtitle: "The Wink & A Thousand Kisses • وہ شوخ ادا",
      caption: "زلفوں سے کھیلتی ہوئی انگلیاں، وہ شوخ نگاہ اور ہوا میں لہراتی ہوئی بوسہِ محبت — جیسے رات کے سناٹے میں اچانک کوئی ستارہ ٹوٹ کر دعا بن جائے۔",
      src: "WhatsApp Video 2026-09-27 at 00.29.18.mp4",
      thumbnail: "WhatsApp Image 2026-09-27 at 00.29.18.jpeg"
    },
    {
      id: "vid-2",
      title: "چشمِ پُرسکون اور دھیمی مسکان • Sukoon-e-Rooh",
      subtitle: "That Unforgettable Gaze • چشمِ سحر آفریں",
      caption: "کیمرے کی جانب وہ گہری نظر اور ہونٹوں پہ سجی خاموش ہنسی — وہ نگاہ جو بغیر کسی لفظ کے روح کے تار چھیڑ دے اور دل کو ہمیشہ کے لیے اپنا اسیر کر لے۔",
      src: "WhatsApp Video 2026-09-27 at 01.02.14.mp4",
      thumbnail: "WhatsApp Image 2026-09-27 at 00.29.20 (1).jpeg"
    },
    {
      id: "vid-3",
      title: "کھڑکی کی ہوا اور زلفوں کی سرگوشی • Waqar-e-Khamoshi",
      subtitle: "Timeless Vintage Grace • حسنِ بے پرواہ",
      caption: "کھڑکی کے شیشے سے چھنتی ہوئی سنہری روشنی، نرم بادِ صبا اور زلفوں کو سنوارتا ہوا نازک ہاتھ — جیسے گزری صدیوں کی کوئی شہزادی خاموش فضاؤں میں شاعری لکھ رہی ہو۔",
      src: "WhatsApp Video 2026-09-27 at 01.05.11.mp4",
      thumbnail: "WhatsApp Image 2026-09-27 at 00.29.19 (3).jpeg"
    }
  ] as VideoPortraitItem[],

  // --- The 45 Real Photographs of Ash ---
  realPhotos: [
    {
      id: "ash-01",
      img: "WhatsApp Image 2026-09-27 at 00.29.15.jpeg",
      cap: "زعفرانی چکن اور سورج کی کرن • Noor-e-Dhoop",
      category: "traditional",
      albumCaption: "زرد لکھنوی کُرتی پر شیشوں کی جھلملاہٹ، ہتھیلی پہ ٹکی نازک ٹھوڑی — جیسے تپتی دوپہر میں گلاب کی تازہ پنکھڑی پہ شبنم اتر آئی ہو۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-02",
      img: "WhatsApp Image 2026-09-27 at 00.29.16 (1).jpeg",
      cap: "نواری ساڑھی اور معصوم ملکہ • Chhoti Shehzadi",
      category: "childhood",
      albumCaption: "سبز و گلابی نواری میں سجی، گجرے اور نتھ کی نفاست کے ساتھ وہ ننھی گڑیا — جس کی قسمت میں ازل سے ہی دلوں کی ملکہ بننا لکھا تھا۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-03",
      img: "WhatsApp Image 2026-09-27 at 00.29.16 (2).jpeg",
      cap: "سرخ پیرہن اور روشن آنکھیں • Shaffaf Nigahein",
      category: "childhood",
      albumCaption: "سردیوں کی نرم دھوپ، سرخ فراک اور دھاری دار سویٹر میں وہ سچی، معصوم آنکھیں جن میں ساری دنیا کی پاکیزگی سمٹ آئی ہو۔",
      ar: "aspect-square"
    },
    {
      id: "ash-04",
      img: "WhatsApp Image 2026-09-27 at 00.29.16.jpeg",
      cap: "گلابی ٹوپی اور متجسس نگاہ • Nanhay Khwab",
      category: "childhood",
      albumCaption: "گلابی کیپ اور سیاہ پھولوں والی فراک میں دنیا کو حیرت سے دیکھتی ننھی سی اشمیرا — ہر خواب کی خوبصورت شروعات۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-05",
      img: "WhatsApp Image 2026-09-27 at 00.29.17 (1).jpeg",
      cap: "کانچ کی چوڑیاں اور گڑبڑ ادا • Chhanak-e-Kangan",
      category: "candid",
      albumCaption: "بالوں میں اڑستا گلابی پھول، کھنکتی ہوئی سرخ چوڑیاں اور وہ شرارتی سی مسکراہٹ — دل کو لمحوں میں لوٹ لینے والی ایک بےساختہ ادا۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-06",
      img: "WhatsApp Image 2026-09-27 at 00.29.17 (2).jpeg",
      cap: "شوخ لباس اور کھلکھلاتی شرارت • Rang-e-Shokhi",
      category: "candid",
      albumCaption: "شوخ فوشیا قمیض، بالوں کی سجاوٹ اور وہ شوخ کھلکھلاہٹ — جس نے ہمیشہ اس بات کا ثبوت دیا کہ زندگی تیرے ساتھ کتنی رنگین اور حسین ہے۔",
      ar: "aspect-square"
    },
    {
      id: "ash-07",
      img: "WhatsApp Image 2026-09-27 at 00.29.17 (3).jpeg",
      cap: "بےساختہ قہقہے اور گھنگھریالی زلفیں • Khush-mizaji",
      category: "candid",
      albumCaption: "گھنگھریالی زلفوں کا حصار اور دل کھول کر ہنسنے کا وہ انداز — جو ویران سے ویران دن کو بھی جشن بنا دینے کا ہنر جانتا ہے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-08",
      img: "WhatsApp Image 2026-09-27 at 00.29.17.jpeg",
      cap: "پہلا ٹیڈی اور معصوم آغوش • Phoolon ki Godi",
      category: "childhood",
      albumCaption: "لیس والی جھالر دار گلابی فراک اور سفید روئی جیسے نرم کھلونے کو سینے سے لگائے بیٹھی — بچپن کی سب سے میٹھی جھلک۔",
      ar: "aspect-[4/3]"
    },
    {
      id: "ash-09",
      img: "WhatsApp Image 2026-09-27 at 00.29.18 (1).jpeg",
      cap: "فیروزی جھمکے اور حنائی ہاتھ • Jhumka-e-Feroza",
      category: "traditional",
      albumCaption: "اجلی سفید چکن کاری، گالوں کو چھوتے فیروزی جھمکے، سرخ چوڑیاں اور ہتھیلیوں پر لگی مہندی — مشرق کا سارا حُسن ترے روپ میں جلوہ گر۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-10",
      img: "WhatsApp Image 2026-09-27 at 00.29.18 (2).jpeg",
      cap: "موتیا کا گجرا اور حیا کی جھپک • Haya ki Mehak",
      category: "traditional",
      albumCaption: "دھانی دوپٹہ، کلائی میں بندھا تازہ چنبیلی کا گجرا اور حیا سے جھکی ہوئی پلکیں — وہ لمحہ جو دل کی دعا بن کر ہمیشہ کے لیے ٹھہر گیا۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-11",
      img: "WhatsApp Image 2026-09-27 at 00.29.18.jpeg",
      cap: "شاہی مجنٹا اور زری کی جھلک • Shahi Nazakat",
      category: "traditional",
      albumCaption: "مجنٹا زری کے کام میں جگمگاتا روپ، روایتی گہنوں کا وقار — گویا مغل دربار کی کسی قدیم مصوری کا زندہ شاہکار ہو۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-12",
      img: "WhatsApp Image 2026-09-27 at 00.29.19 (1).jpeg",
      cap: "دل کے دائرے میں سجی مسکان • Dil-e-Muztar",
      category: "romantic",
      albumCaption: "سنہری قمیض اور سادگی کا وہ جادو جو کسی بھی فریم کو دل کی سب سے عزیز یادگار بنا دیتا ہے۔",
      ar: "aspect-square"
    },
    {
      id: "ash-13",
      img: "WhatsApp Image 2026-09-27 at 00.29.19 (2).jpeg",
      cap: "مانگ ٹیکا اور گلاب کا کنگن • Zeenat-e-Hoor",
      category: "traditional",
      albumCaption: "پھولوں سے سجا ماتھا، کلائی پہ لپٹا ہوا تازہ گلاب — سچ مچ جنت کی وہ کلی جس کی خوشبو سے زندگی مہک اٹھی۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-14",
      img: "WhatsApp Image 2026-09-27 at 00.29.19 (3).jpeg",
      cap: "نیلی ساڑھی اور چوکھٹ کا جلال • Wujood-e-Noor",
      category: "traditional",
      albumCaption: "قدیم لکڑی کے دروازے کی سیڑھیوں پر رائل بلیو ساڑھی میں جلوہ افروز — 'میں جو شاعر کبھی ہوتا تیرا سہرا کہتا'۔ وقار ایسا کہ دیکھنے والی نگاہ حیران رہ جائے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-15",
      img: "WhatsApp Image 2026-09-27 at 00.29.19.jpeg",
      cap: "سیاہ انارکلی اور کچھی آئینوں کی چمک • Shab-e-Siah",
      category: "traditional",
      albumCaption: "سیاہ کڑھائی پر چمکتے شیشے اور چھت پر ہوا میں اڑتی زلفیں — تاریک رات میں جگمگاتے ہزاروں ستاروں کا عکس۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-16",
      img: "WhatsApp Image 2026-09-27 at 00.29.20 (1).jpeg",
      cap: "مخملیں وائن کُرتی اور کاجل کی لکیر • Chashm-e-Siyah",
      category: "romantic",
      albumCaption: "گہرے جامنی رنگ کا مخملیں جادو، گلابی گال اور وہ پُراسرار بھوری آنکھیں جو دل کے سارے راز پلک جھپکتے پڑھ لیں۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-17",
      img: "WhatsApp Image 2026-09-27 at 00.29.20 (2).jpeg",
      cap: "سنہری بیئر اور خوابیدہ شام • Sukoon-e-Shaam",
      category: "candid",
      albumCaption: "اپنے پیارے بیئر کے ساتھ لپٹی ہوئی، نظروں میں ایک گہرا پیار اور دل میں اتر جانے والی نرمی۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-18",
      img: "WhatsApp Image 2026-09-27 at 00.29.20 (3).jpeg",
      cap: "مہندی کا خواب اور پرسکون نیند • Mehendi ka Khwab",
      category: "romantic",
      albumCaption: "ہتھیلی پر مہندی کے بیل بوٹے اور نیند میں مسکراتا چہرہ — وہ سکون جو دنیا کے کسی گوشے میں نہیں، صرف تیرے سائے میں ہے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-19",
      img: "WhatsApp Image 2026-09-27 at 00.29.20.jpeg",
      cap: "خاندانی محفل اور اپنائیت کا نور • Mehfil-e-Chah",
      category: "candid",
      albumCaption: "اپنوں کے درمیان کھلتا ہوا وہ چہرہ، جس کی ایک مسکان سے پوری محفل روشن ہو جاتی ہے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-20",
      img: "WhatsApp Image 2026-09-27 at 00.29.21 (1).jpeg",
      cap: "گلابی بو اور دلکش زاویہ • Zulf-e-Kham",
      category: "candid",
      albumCaption: "سر پیچھے جھکا کر ہنسنے کی وہ ادا، گھنے سیاہ بالوں میں گلابی بو کی نزاکت — سادگی جو دل کو تڑپا دے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-21",
      img: "WhatsApp Image 2026-09-27 at 00.29.21 (2).jpeg",
      cap: "بند پلکیں اور ٹیڈی کا گلے لگنا • Aaghosh-e-Sukoon",
      category: "candid",
      albumCaption: "بند آنکھوں سے مسکراتی ہوئی، سفید بیئر کو گلے سے لگائے — جیسے سارے غموں سے بے نیاز کوئی فرشتہ سو رہا ہو۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-22",
      img: "WhatsApp Image 2026-09-27 at 00.29.21 (3).jpeg",
      cap: "شرارتی تیور اور کھلنڈری ہنسی • Shokhi-e-Ada",
      category: "candid",
      albumCaption: "ہونٹ سکیڑ کر انگوٹھا دکھاتی ہوئی وہ شوخ مسکراہٹ — دل کے اداس ترین لمحوں کو ہنسی میں بدلنے والا نسخہ۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-23",
      img: "WhatsApp Image 2026-09-27 at 00.29.21.jpeg",
      cap: "عروسی حنا اور نازک انگلیاں • Henna-e-Nikah",
      category: "candid",
      albumCaption: "گہری رچی ہوئی مہندی کا شاہکار، شرماتی ہوئی مسکان اور خوشیوں کی گواہی دیتی وہ نازک ہتھیلی۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-24",
      img: "WhatsApp Image 2026-09-27 at 00.29.22 (1).jpeg",
      cap: "سفید ساڑھی اور سیمیں وقار • Safaid Chaand",
      category: "traditional",
      albumCaption: "دودھیا سفید ساڑھی میں ملبوس، موتیوں کے ہار کی چمک اور وقار ایسا کہ دیکھنے والی آنکھ دنگ رہ جائے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-25",
      img: "WhatsApp Image 2026-09-27 at 00.29.22 (2).jpeg",
      cap: "گلابی للی اور محوِ حیرت نگاہ • Gul-e-Nargis",
      category: "romantic",
      albumCaption: "پھولوں کے گلدستے کو جھک کر دیکھتی ہوئی اشمیرا — خود پھول ہو کر پھولوں کی نزاکت پہ رشک کرتی ہوئی۔",
      ar: "aspect-square"
    },
    {
      id: "ash-26",
      img: "WhatsApp Image 2026-09-27 at 00.29.22 (3).jpeg",
      cap: "سالگرہ کی رونق اور گلابوں کا تحفہ • Jashn-e-Bahaar",
      category: "romantic",
      albumCaption: "کیک، چاکلیٹ، خرگوش کا کھلونا اور للیز کے پھول — لیکن سب سے میٹھی چیز میز پر صرف تری مسکراہٹ تھی۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-27",
      img: "WhatsApp Image 2026-09-27 at 00.29.22.jpeg",
      cap: "چیک شرٹ اور نرم گال کا لمس • Gham-Gusaari",
      category: "candid",
      albumCaption: "چیکرڈ قمیض میں اپنے بیئر کے نرم رخسار سے گال ٹکائے — معصومیت اور اپنائیت کا گہرا احساس۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-28",
      img: "WhatsApp Image 2026-09-27 at 00.29.23.jpeg",
      cap: "بےاختیار قہقہہ اور چہرہ چھپانا • Hansi ki Barsaat",
      category: "candid",
      albumCaption: "فرش پر بیٹھی ہنسی سے لوٹ پوٹ ہوتی، دونوں ہاتھوں سے منہ چھپاتی — دنیا کی سب سے سچی اور دلکش تصویر۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-29",
      img: "WhatsApp Image 2026-09-27 at 01.02.38.jpeg",
      cap: "مجنٹا کارڈیگن اور جدید نزاکت • Rang-e-Maujooda",
      category: "candid",
      albumCaption: "مجنٹا اون اور ڈینم میں آئینے کے سامنے کھڑی — روایت اور جدیدیت کا ایک مکمل اور متوازن روپ۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-30",
      img: "WhatsApp Image 2026-09-27 at 01.03.13.jpeg",
      cap: "لیوینڈر صبح اور سنہری پنکھڑیاں • Subh-e-Sadiq",
      category: "candid",
      albumCaption: "ہلکے لیوینڈر رنگ کی سادگی اور بالوں پہ تیرتی سنہری تتلیاں — صبحِ بہار جیسی پاکیزہ اور تر و تازہ۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-31",
      img: "WhatsApp Image 2026-09-27 at 01.03.46.jpeg",
      cap: "کھلکھلاہٹ اور تفریح کے لمحے • Be-saakhta Khushi",
      category: "candid",
      albumCaption: "معصوم مذاق اور کھلکھلاہٹ — جس نے ہمیشہ دل کو یہ باور کرایا کہ تری موجودگی ہی اصل عید ہے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-32",
      img: "WhatsApp Image 2026-09-27 at 01.04.16.jpeg",
      cap: "گجرے کی اوٹ میں مسکراہٹ • Parda-e-Haya",
      category: "traditional",
      albumCaption: "تازہ گجرے اور سرخ گلاب کے پیچھے چھپتی ہوئی وہ شرمیلی ہنسی — پردہ بھی ایسا کہ دیدار کا اشتیاق اور بڑھا دے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-33",
      img: "WhatsApp Image 2026-09-27 at 01.04.17 (1).jpeg",
      cap: "سورج مکھی، تحفے اور محبت کا خط • Paigham-e-Mohabbat",
      category: "romantic",
      albumCaption: "زرد سورج مکھی، چاکلیٹس اور دل کی سیاہی سے لکھا وہ خط: 'یہ پھول صرف ایک چھوٹا سا بہانہ ہیں بتانے کا کہ تم میرے لیے کتنی خاص ہو... سدا مسکراتی رہو۔'",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-34",
      img: "WhatsApp Image 2026-09-27 at 01.04.17 (2).jpeg",
      cap: "دھوپ کی اوٹ اور رائل بلیو سوٹ • Dhoop Chhaon",
      category: "traditional",
      albumCaption: "سورج کی تیز شعاعوں سے آنکھیں بچاتی، سنہری چوکر اور شاہی نیلے لباس میں دمکتی ہوئی شہزادی۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-35",
      img: "WhatsApp Image 2026-09-27 at 01.04.17 (3).jpeg",
      cap: "ستاروں بھرا دوپٹہ اور سرخ گلاب • Sitara-o-Gulab",
      category: "romantic",
      albumCaption: "زرق برق باریک دوپٹہ اور بالوں میں سجا دہکتا ہوا سرخ گلاب — جیسے چودھویں کی رات کو چاند نے بادلوں کا گھونگھٹ اوڑھ رکھا ہو۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-36",
      img: "WhatsApp Image 2026-09-27 at 01.04.17.jpeg",
      cap: "سورج مکھیوں کی مہکتی ڈالی • Dast-e-Gul",
      category: "romantic",
      albumCaption: "سنہری سورج مکھیوں کا وہ گلدستہ جو محبت کی گواہی بن کر تیری دہلیز تک پہنچا تھا۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-37",
      img: "WhatsApp Image 2026-09-27 at 01.04.18 (1).jpeg",
      cap: "بھائی کا مان، بہن کی مسکان • Sibling Love",
      category: "candid",
      albumCaption: "مال میں اپنے پیارے بھائی کے ہمراہ لی گئی یہ یادگار سیلفی — چہرے پر کھلتی ہوئی شوخ مسکراہٹ اور بھائی کی محبت کے سائے میں دمکتا چہرہ، ایک سچا اور انمول خاندانی رشتہ۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-38",
      img: "WhatsApp Image 2026-09-27 at 01.04.18 (2).jpeg",
      cap: "گلابی رقص اور اڑتی ہوئی زلفیں • Raqs-e-Saba",
      category: "candid",
      albumCaption: "شنگرفی لباس میں سر جھٹک کر ہنسنے کا وہ طوفان — جس کے آگے بہاروں کے سارے موسم ہیچ لگتے ہیں۔",
      ar: "aspect-square"
    },
    {
      id: "ash-39",
      img: "WhatsApp Image 2026-09-27 at 01.04.18 (3).jpeg",
      cap: "چھت پر رات کی ٹھنڈی ہوا • Shab-e-Mehtab",
      category: "candid",
      albumCaption: "رات کی ٹھنڈی فضا میں پیچھے مڑ کر دیکھنے کا وہ طلسم — گلی کے دیے کی زرد روشنی میں نہائی ہوئی حور۔",
      ar: "aspect-square"
    },
    {
      id: "ash-40",
      img: "WhatsApp Image 2026-09-27 at 01.04.18.jpeg",
      cap: "سرخ لب، جھکی پلکیں اور گلاب • Zeenat-e-Jannat",
      category: "romantic",
      albumCaption: "جھکی ہوئی شرمیلی نظریں، سرخ گلاب کی سرخی اور چہرے کا نور — سچ مچ زهرة الجنة، جنت کا سب سے پاکیزہ پھول۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-41",
      img: "WhatsApp Image 2026-09-27 at 01.04.19 (1).jpeg",
      cap: "نیلی فراک میں ننھی پری • Feroza Gudiya",
      category: "childhood",
      albumCaption: "کرسی پر راجکماری بنی بیٹھی ننھی اشمیرا، نقرئی لیس والی نیلی فراک میں بچپن کی سلطنت سنبھالے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-42",
      img: "WhatsApp Image 2026-09-27 at 01.04.19 (2).jpeg",
      cap: "ننھے ہاتھ اور سفید ٹیڈی • Nannhi Aaghosh",
      category: "childhood",
      albumCaption: "گالوں پہ ابھرتی معصوم مسکراہٹ اور کھلونے سے لپٹنے کی وہ بچپنے کی سچی محبت۔",
      ar: "aspect-square"
    },
    {
      id: "ash-43",
      img: "WhatsApp Image 2026-09-27 at 01.04.19 (3).jpeg",
      cap: "بھائی کی آغوش اور مسکراتی بہن • Rishta-e-Dua",
      category: "childhood",
      albumCaption: "سچی خاندانی چاہت، بھائی کی مضبوط بانہوں میں مسکراتی لاڈلی بہن کی یادگار اور انمول تصویر۔",
      ar: "aspect-[3/4]"
    },
    {
      id: "ash-44",
      img: "WhatsApp Image 2026-09-27 at 01.04.19.jpeg",
      cap: "دھوپ میں چمکتا رخسار اور میٹھی ناراضگی • Naz-o-Niyaz",
      category: "candid",
      albumCaption: "دھوپ کے بوسے لیتی ہوئی جلد اور ہونٹوں پر ابھرتی وہ پیاری سی میٹھی ضد — جو دل کو اور زیادہ قریب کر دے۔",
      ar: "aspect-[9/16]"
    },
    {
      id: "ash-45",
      img: "WhatsApp Image 2026-09-27 at 01.05.48.jpeg",
      cap: "ہاتھوں میں ہاتھ اور ابدی محبت • Azal se Abad",
      category: "romantic",
      albumCaption: "سورج مکھیوں کے سائے میں دو ہاتھوں کا ملن اور وہ سچی دعا: 'اگر مجھے دوبارہ زندگی ملے، تو میں پھر بھی تجھے ہی چنوں گا۔ ہمیشہ۔'",
      ar: "aspect-[3/4]"
    }
  ] as GalleryPhotoCard[],

  // --- Special Frame 1: "Her Smile" (تبسمِ جاں — Noor-e-Tabassum) ---
  smileSection: {
    heading: "Her Smile",
    urduHeading: "تبسمِ جاں",
    romanTitle: "Noor-e-Tabassum",
    urduVerse: "کھلے جو لب ترے تو ہر سحر نکھرتی ہے\nتری ہنسی سے دلِ غمزدہ سنورتا ہے",
    romanVerse: "Khule jo lab tere to har sehar nikharti hai / Teri hansi se dil-e-ghamzada sanwarta hai",
    meaning: "When your lips part into a smile, the morning itself awakens with fresh splendor; in the music of your laughter, a weary soul finds its eternal healing.",
    photo: "WhatsApp Image 2026-09-27 at 00.29.15.jpeg",
    whisper: "خدا کرے تری مسکراہٹ پر کبھی وقت کا کوئی غبار نہ آئے — تو وہ دعا ہے جو بن مانگے قبول ہوئی۔"
  },

  // --- Special Frame 2: "Her Presence" (حضورِ یار / Royal Sehra Feature) ---
  sehraFeature: {
    heading: "Her Presence",
    urduHeading: "حضورِ یار",
    romanTitle: "Tera Sehra Kehta",
    hindiLine: "میں جو شاعر کبھی ہوتا تیرا سہرا کہتا",
    transliteration: "Main jo shayar kabhi hota, tera sehra kehta",
    urduVerse: "میں جو شاعر کبھی ہوتا تیرا سہرا کہتا\nپھر ہر اک پھول کو تیری ہی نگہبانی دیتا",
    romanVerse: "Main jo shayar kabhi hota, tera sehra kehta / Phir har ik phool ko teri hi nigehbani deta",
    meaning: "If ever I were granted the gift of verse, I would weave the royal bridal crown of your Sehra, and entrust the eternal guardianship of every living petal to your hands alone.",
    photo: "WhatsApp Image 2026-09-27 at 00.29.19 (3).jpeg"
  },

  // --- Special Frame 3: "Her Eyes" Interactive Section (چشمِ یار — Chashm-e-Hoor) ---
  eyesSection: {
    heading: "Her Eyes",
    urduHeading: "چشمِ یار",
    romanTitle: "Chashm-e-Hoor",
    subheading: "جہاں نگاہیں ملیں اور زباں خاموش ہو جائے • Where a single glance silences the universe.",
    urduVerse: "نہ کاجل کی حاجت، نہ شکوہ زمانے کا\nتری جھیل آنکھوں میں ہے عالم ٹھہر جانے کا",
    romanVerse: "Na kajal ki haajat, na shikwa zamane ka / Teri jheel aankhon mein hai aalam thehar jaane ka",
    meaning: "Needing no dark kohl to enchant, bearing no complaint against the fleeting world — within the tranquil lakes of your eyes, the entire cosmos learns to stand still.",
    hiddenMessage: "In those eyes, my wandering heart found its final home.",
    photo: "WhatsApp Image 2026-09-27 at 00.29.20 (3).jpeg",
    caption: "گہری، پُرسکون اور پُرنور آنکھیں — جن میں ڈوب کر روح کو وہ تسکین ملتی ہے جو دنیا کی کسی محفل میں نصیب نہیں ہوتی۔ Deep, luminous eyes cradling a serenity that no bustling gathering on earth could ever bestow."
  },

  // --- Special Frame 4: "Her Beauty" (حُسنِ کامل — Noor-e-Gajra & Ornate Mirror) ---
  beautySection: {
    heading: "Her Beauty",
    urduHeading: "حُسنِ کامل",
    romanTitle: "Noor-e-Gajra",
    subheading: "کلائی پر مہکتے گلاب اور حیا کی خاموش خوشبو۔",
    urduVerse: "مہک اٹھی کلائی ترے سرخ گلابوں سے\nحیا نے بھی سیکھا ہے سنورنا ترے انداز سے",
    romanVerse: "Mehak uthi kalai tere surkh gulabon se / Haya ne bhi seekha hai sanwarna tere andaaz se",
    meaning: "Your delicate wrist breathes the perfume of scarlet roses; even modesty itself has learned the art of elegance from your graceful demeanor.",
    photo: "WhatsApp Image 2026-09-27 at 00.29.17 (1).jpeg",
    caption: "کلائی پہ چمکتی سنہری چوڑیاں اور سرخ گلابوں کا لمس — حُسن وہ نہیں جو شور مچائے، حُسن تو وہ وقار ہے جو ترے وجود سے پھوٹتا ہے۔ Red roses resting upon warm gold bangles. A beauty that does not demand attention, but leaves the entire soul breathless."
  },

  // --- Special Frame 5: "A Memory" (داستانِ یاد — Vintage Manuscript & Parchment) ---
  vintageMemorySection: {
    heading: "A Memory",
    urduHeading: "داستانِ یاد",
    romanTitle: "Dastaan-e-Yaad",
    subheading: "وقت کے اوراق پر محفوظ، دل کی سب سے قیمتی تحریر۔",
    urduVerse: "وہ یادوں کی مہک جو دل کے اوراق میں ٹھہری\nنہ وقت نے مٹایا، نہ گردشِ دوراں نے چھینی",
    romanVerse: "Woh yaadon ki mehak jo dil ke auraaq mein thehri / Na waqt ne mitaya, na gardish-e-dauran ne cheeni",
    meaning: "The sacred fragrance of your remembrance inscribed upon the parchment of the heart — neither time could dim its luster, nor could the turning world take it away.",
    childhoodPhoto: "WhatsApp Image 2026-09-27 at 00.29.16 (1).jpeg",
    notePhoto: "WhatsApp Image 2026-09-27 at 01.04.17 (1).jpeg",
    caption: "بچپن کی نواری ساڑھی سے لے کر سورج مکھیوں کے ساتھ بھیجے گئے خط تک — تیری یاد کا ہر ورق تبرک کی طرح سینے سے لگا رکھا ہے۔"
  },

  // --- Memory Timeline with Ash & Yuvi's Real Moments ---
  memories: [
    {
      id: "mem-1",
      tag: "منزلِ اول • THE LITTLE BLOSSOM",
      title: "بچپن کی پاکیزگی • Before the World Knew You",
      dateOrSubtitle: "معصومیت کا زمانہ • Childhood Innocence",
      description: "جھالر دار گلابی فراک میں اپنے سفید ٹیڈی بیئر کو گلے لگائے بیٹھی ننھی پری، یا نواری ساڑھی میں سجی چھوٹی اشمیرا — تیرے معصوم نقوش میں ازل سے ہی یہ لکھا تھا کہ تو دلوں پر حکومت کرنے آئی ہے۔",
      photo: "WhatsApp Image 2026-09-27 at 00.29.16 (1).jpeg"
    },
    {
      id: "mem-2",
      tag: "منزلِ دوم • SUNFLOWERS & YUVI'S NOTE",
      title: "سورج مکھی اور دل کی تحریر • Sweet Treats & Endless Love",
      dateOrSubtitle: "محبت کی پہلی سوغات • A Special Delivery from Yuvi",
      description: "زرد سورج مکھیوں کی مہک، کٹ کیٹ، کیڈبری چاکلیٹس اور وہ سنہری کارڈ: 'یہ پھول صرف ایک چھوٹا سا بہانہ ہیں یہ بتانے کا کہ تم میرے لیے کتنی خاص ہو۔ تمہاری مسکراہٹ ہر دن کو روشن بناتی ہے، اور تمہاری موجودگی ہر چیز کو سکون بخشتی ہے۔ سدا ہنستی رہو۔ تری محبت، یووی۔'",
      photo: "WhatsApp Image 2026-09-27 at 01.04.17 (1).jpeg"
    },
    {
      id: "mem-3",
      tag: "منزلِ سوم • SIBLING SMILES & MALL DAY",
      title: "بھائی کا مان، بہن کی مسکان • A Brother's Loving Shield",
      dateOrSubtitle: "خون کا پاکیزہ رشتہ • Ashmeera & Her Brother",
      description: "مال کی راہداریوں میں اپنے پیارے بھائی کے شانہ بشانہ چہل قدمی، ہاتھوں میں گلابی بوتل اور چہرے پر وہ بےفکر و شاداب مسکراہٹ — بھائی کی محبت اور تحفظ کے سائے میں دمکتی یہ ہنسی دنیا کے سب سے سچے اور انمول خاندانی رشتوں کی گواہ ہے۔",
      photo: "WhatsApp Image 2026-09-27 at 01.04.18 (1).jpeg"
    },
    {
      id: "mem-4",
      tag: "منزلِ چہارم • FLOWERS & CELEBRATION",
      title: "گلاب، للیز اور سالگرہ کا جشن • Lilies for My Flower of Heaven",
      dateOrSubtitle: "مسکانوں کا تہوار • Birthday Joy & Sweet Treats",
      description: "سالگرہ کا کیک، ڈھیروں چاکلیٹس، نرم کھلونا اور سامنے سجا گلابی للیز کا بڑا سا گلدستہ — مگر اس پوری محفل میں سب سے زیادہ چمکتی اور میٹھی چیز ترے چہرے کی وہ معصوم خوشی تھی۔",
      photo: "WhatsApp Image 2026-09-27 at 00.29.22 (3).jpeg"
    },
    {
      id: "mem-5",
      tag: "منزلِ پنجم • TODAY & ALWAYS",
      title: "ازل سے ابد تک کا وعدہ • Hand in Hand Forever",
      dateOrSubtitle: "میرا دل، تری پناہ • I Love U",
      description: "سورج مکھیوں کی چھاؤں تلے ہاتھوں میں ہاتھ تھامے ہوئے — اک ایسا رشتہ جو زمان و مکاں کی قید سے آزاد ہے۔ 'اگر مجھے دوبارہ زندگی ملے، تو میں پھر بھی تجھے ہی چنوں گا۔ ہر جنم میں، ہمیشہ کے لیے۔'",
      photo: "WhatsApp Image 2026-09-27 at 01.05.48.jpeg"
    }
  ] as MemoryItem[],

  // --- 7 Secret Notes Hidden Around The Website ---
  secretNotes: [
    {
      id: "note-1",
      label: "سرخ گلاب • Delicate Petal",
      message: "کلائی پر بندھا وہ سرخ گجرا صرف پھول نہیں، تری نزاکت کا سجدہ ہے۔"
    },
    {
      id: "note-2",
      label: "روشن ستارہ • Star of Heaven",
      message: "جب تم تھک جاؤ تو یاد رکھنا، میری ہر دعا کی ابتدا اور انتہا تمہارا نام ہے۔"
    },
    {
      id: "note-3",
      label: "چشمِ غزال • Mughal Rosette",
      message: "تری آنکھوں میں جو گہرا سکون ہے، وہ دنیا کے کسی شہر، کسی ساحل پر نہیں۔"
    },
    {
      id: "note-4",
      label: "شاہی چوکھٹ • Golden Blossom",
      message: "اس نیلی ساڑھی میں تم کسی سلطنت کی وہ رانی لگ رہی تھیں جس کے آگے وقت بھی رک جائے۔"
    },
    {
      id: "note-5",
      label: "سرگوشی • Whispering Leaf",
      message: "اس کائنات میں اگر کوئی چیز میرے دل کو سب سے زیادہ عزیز ہے، تو وہ تری ہنسی ہے۔ ❤️"
    },
    {
      id: "note-6",
      label: "پاکیزہ دعا • Ivory Floret",
      message: "بےپرواہ ہو کر جب تم کھلکھلاتی ہو، تو دل شکر کے سجدے میں گر پڑتا ہے۔"
    },
    {
      id: "note-7",
      label: "عہدِ وفا • Sacred Ornament",
      message: "خدا سے مانگی ہوئی سب سے خوبصورت اور مکمل دعا کا نام اشمیرا ہے۔"
    }
  ] as SecretNoteItem[],

  letter: {
    recipient: "My Dear love Ashmeera,",
    paragraphs: [
      "Perhaps I don’t have the words that could completely describe the depth nd beauty of uhh existence. No language in this world has the power to explain how, when uhh came into my life, flowers of spring began to bloom along those once-deserted paths.",
      "From that little green sari of uhh childhood, to uhh mischievous selfies, nd to those moments when uhh see pink lilies nd toys nd become excited like an innocent little girl — I love every version of uhh, every little way uhh are, more than my own life.",
      "When uhh sat on the steps of that ancient doorway, dressed in a royal blue sari, it felt as if God Himself had given form to beauty nd grace. “Main jo shayar kabhi hota, tera sehra kehta” — but even though I am not a poet, my heart still places a crown of loyalty upon uhh head every single day.",
      "Those yellow sunflowers, the chocolates, nd all these little surprises are nothing more than an excuse to remind uhh of how precious uhh are to me. One smile from uhh can turn even my saddest day into Eid.",
      "Always keep smiling like this — because in every lifetime, every breath, nd every prayer, I have chosen uhh.",
      "And one more thing — I love uhh, baby. I love uhh from infinity and beyond. ❤️"
    ],
    signoff: "",
    sender: "Your Yuvi.."
  },

  // --- Final Surprise Climax ---
  finalSurprise: {
    prelude: "اس سے پہلے کہ تم رخصت ہو... دل کی اک آخری التجا",
    buttonText: "اشمیرا کے لیے اک آخری نذرانہ →",
    photo: "WhatsApp Image 2026-09-27 at 01.04.18.jpeg",
    title: "اشمیرا • ASHMEERA",
    subtitle: "زهرة الجنة — The Flower of Heaven",
    quoteLine1: "اگر مجھے ہزار بار بھی زندگی ملے،",
    quoteLine2: "تو میں ہر بار صرف تجھے ہی چنوں گا۔",
    climax: "ہمیشہ کے لیے۔ Always."
  },

  // --- Easter Egg ---
  easterEgg: {
    triggerWord: "ASH",
    requiredClicks: 3,
    message: "You found the hidden secret note: تم میری زندگی کی سب سے پاکیزہ اور انمول دعا ہو، اشمیرا۔ ❤️"
  }
};
