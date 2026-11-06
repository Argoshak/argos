const T = (en, ar, fr) => ({ en, ar, fr });
const ABOUT = {
 en: "I'm Zakaria Akheraaz, a software developer based in Agadir, Morocco, with a strong interest in full-stack development, backend engineering, and low-level system architecture.\n\nMy coding journey began at the age of nine. Since then, I've been exploring software development, turning curiosity into practical projects and continuously expanding my technical knowledge.\n\nMy interests go beyond web development. I'm particularly fascinated by Linux, FreeBSD, Unix-like systems, and the architecture behind modern operating systems.\n\nI believe in combining programming knowledge with AI capabilities to build meaningful, efficient, and scalable software solutions.\n\nI'm always interested in learning, experimenting with new technologies, and contributing to ambitious projects.",
 ar: "أنا زكريا أخراز، مطوّر برمجيات من أكادير بالمغرب، أهتم بتطوير الويب الشامل (Full-Stack) وهندسة الـBackend وبنية الأنظمة منخفضة المستوى.\n\nبدأت رحلتي مع البرمجة في سن التاسعة. ومنذ ذلك الحين وأنا أستكشف تطوير البرمجيات وأحوّل الفضول إلى مشاريع عملية، مع توسيع معرفتي التقنية باستمرار.\n\nتمتد اهتماماتي إلى ما هو أبعد من الويب؛ فأنا مفتون بأنظمة Linux وFreeBSD والأنظمة الشبيهة بـUnix، وبالبنية التي تقوم عليها أنظمة التشغيل الحديثة.\n\nأؤمن بدمج المعرفة البرمجية مع قدرات الذكاء الاصطناعي لبناء حلول برمجية مفيدة وفعّالة وقابلة للتوسّع.\n\nأحب التعلّم وتجربة التقنيات الجديدة والمساهمة في المشاريع الطموحة.",
 fr: "Je suis Zakaria Akheraaz, développeur logiciel basé à Agadir, au Maroc, avec un fort intérêt pour le développement full-stack, l'ingénierie backend et l'architecture système bas niveau.\n\nMon parcours en programmation a commencé à l'âge de neuf ans. Depuis, j'explore le développement logiciel, je transforme ma curiosité en projets concrets et j'élargis continuellement mes connaissances techniques.\n\nMes centres d'intérêt dépassent le développement web : je suis passionné par Linux, FreeBSD, les systèmes de type Unix et l'architecture des systèmes d'exploitation modernes.\n\nJe crois en l'association des connaissances en programmation et des capacités de l'IA pour créer des solutions logicielles utiles, efficaces et évolutives.\n\nJ'aime apprendre, expérimenter de nouvelles technologies et contribuer à des projets ambitieux." };
const rows = {
 name: T('Zakaria Akheraaz', 'زكريا أخراز', 'Zakaria Akheraaz'),
 role: T('Backend & Full-Stack Developer | JavaScript • React • C++ • Tailwind CSS | Building Scalable Web Apps & High-Performance Systems',
  'مطوّر Backend وFull-Stack | JavaScript • React • C++ • Tailwind CSS | أبني تطبيقات ويب قابلة للتوسّع وأنظمة عالية الأداء',
  'Développeur Backend & Full-Stack | JavaScript • React • C++ • Tailwind CSS | Applications web évolutives et systèmes haute performance'),
 tagline: T('Programmer + AI > AI Alone.', 'مبرمج + ذكاء اصطناعي > ذكاء اصطناعي وحده.', 'Programmeur + IA > IA seule.'),
 location: T('Agadir, Morocco', 'أكادير، المغرب', 'Agadir, Maroc'),
 education: T('', '', ''),
 photo_alt: T("Zakaria Akheraaz's profile avatar: a blue and gold armored dragon character", 'الصورة الرمزية لزكريا أخراز: شخصية تنين مدرّع باللونين الأزرق والذهبي', "Avatar de Zakaria Akheraaz : un dragon en armure bleue et dorée"),
 cta_projects: T('View projects', 'استعرض المشاريع', 'Voir les projets'),
 cta_contact: T('Get in touch', 'تواصل معي', 'Me contacter'),
 nav_about: T('About', 'نبذة عني', 'À propos'), nav_skills: T('Skills', 'المهارات', 'Compétences'),
 nav_projects: T('Projects', 'المشاريع', 'Projets'), nav_journey: T('Journey', 'رحلتي', 'Parcours'),
 nav_systems: T('Systems & Technology', 'الأنظمة والتقنية', 'Systèmes & technologie'),
 nav_philosophy: T('Philosophy', 'فلسفة التطوير', 'Philosophie'), nav_contact: T('Contact', 'تواصل', 'Contact'),
 about: ABOUT,
 systems: T("I'm fascinated by Linux, FreeBSD and other Unix-like systems, and by the architecture behind modern operating systems. LumaOS is my concept project for exploring these ideas.",
  'أهتم كثيراً بأنظمة Linux وFreeBSD والأنظمة الشبيهة بـUnix، وبالبنية التي تقوم عليها أنظمة التشغيل الحديثة. وLumaOS هو مشروعي التجريبي لاستكشاف هذه الأفكار.',
  "Je suis fasciné par Linux, FreeBSD et les systèmes de type Unix, ainsi que par l'architecture des systèmes d'exploitation modernes. LumaOS est mon projet conceptuel pour explorer ces idées."),
 philosophy: T("Programmer + AI > AI Alone.\nAI is a powerful tool, but it works best alongside a developer who understands the code and the architecture. I aim to build software that is meaningful, efficient and scalable.",
  'مبرمج + ذكاء اصطناعي > ذكاء اصطناعي وحده.\nالذكاء الاصطناعي أداة قوية، لكنه يعطي أفضل نتائجه مع مطوّر يفهم الشيفرة والبنية. أسعى إلى بناء برمجيات مفيدة وفعّالة وقابلة للتوسّع.',
  "Programmeur + IA > IA seule.\nL'IA est un outil puissant, mais elle donne le meilleur d'elle-même avec un développeur qui comprend le code et l'architecture. Je vise des logiciels utiles, efficaces et évolutifs."),
 contact_text: T('Interested in working together or just want to say hello? Reach out through any of the links below.', 'هل ترغب في التعاون أو تود فقط إلقاء التحية؟ تواصل معي عبر أحد الروابط أدناه.', 'Envie de collaborer ou simplement de dire bonjour ? Contactez-moi via l\'un des liens ci-dessous.'),
 footer: T('Zakaria Akheraaz. All rights reserved.', 'زكريا أخراز. جميع الحقوق محفوظة.', 'Zakaria Akheraaz. Tous droits réservés.'),
 st_completed: T('Completed', 'مكتمل', 'Terminé'), st_ongoing: T('In progress', 'قيد التطوير', 'En cours'), st_concept: T('Concept', 'فكرة تجريبية', 'Concept'),
 view_live: T('Live site', 'الموقع', 'Voir le site'), view_code: T('Source code', 'الشيفرة المصدرية', 'Code source'), case: T('Case study', 'دراسة الحالة', 'Étude de cas'),
 no_projects: T('Projects will appear here soon.', 'ستظهر المشاريع هنا قريباً.', 'Les projets seront bientôt affichés ici.'),
};
const copy = { en: {}, ar: {}, fr: {} };
for (const k in rows) for (const l of ['en', 'ar', 'fr']) copy[l][k] = rows[k][l];
const seo = (title, description, keywords) => ({ title, description, keywords, og_title: '', og_description: '', og_image: '/profile.jpg', canonical: '', favicon: '', index: true });
export const DEFAULTS = {
 copy,
 identity: { photo: '/profile.jpg' },
 theme: { navy: '#0B1953', royal: '#1F4FD8', gold: '#FFC800', bg: '#FFFFFF', radius: '6px' },
 sections: ['about', 'skills', 'projects', 'journey', 'systems', 'philosophy', 'contact'].map((id) => ({ id, enabled: true })),
 skills: [
  { cat: T('Languages', 'لغات البرمجة', 'Langages'), items: [{ name: 'JavaScript' }, { name: 'C++' }] },
  { cat: T('Frameworks & Libraries', 'أطر ومكتبات', 'Frameworks et bibliothèques'), items: [{ name: 'React' }, { name: 'Next.js' }, { name: 'Tailwind CSS' }] },
  { cat: T('Backend & Data', 'الخلفية وقواعد البيانات', 'Backend et données'), items: [{ name: 'Supabase' }, { name: 'PostgreSQL' }] },
  { cat: T('Platforms', 'المنصات', 'Plateformes'), items: [{ name: 'Vercel' }, { name: 'GitHub' }] }],
 socials: [{ id: 'github', label: 'GitHub', url: 'https://github.com/Argoshak', enabled: true }, { id: 'linkedin', label: 'LinkedIn', url: '', enabled: false },
  { id: 'email', label: 'Email', url: '', enabled: false }, { id: 'whatsapp', label: 'WhatsApp', url: '', enabled: false }],
 timeline: [{ label: T('Age 9', 'في التاسعة', 'À 9 ans'), text: T('Started programming.', 'بدأت رحلتي مع البرمجة.', 'Début de la programmation.') },
  { label: T('Since then', 'منذ ذلك الحين', 'Depuis'), text: T('Building web projects including Green School, OGM and United Encyclopedia, and exploring operating system concepts with LumaOS.',
   'أبني مشاريع ويب منها Green School وOGM والموسوعة المتحدة، وأستكشف مفاهيم أنظمة التشغيل عبر LumaOS.', 'Je crée des projets web, dont Green School, OGM et United Encyclopedia, et j\'explore les systèmes d\'exploitation avec LumaOS.') }],
 seo: { en: seo('Zakaria Akheraaz | Backend & Full-Stack Developer', 'Portfolio of Zakaria Akheraaz, a Backend & Full-Stack developer in Agadir, Morocco, working with JavaScript, React, C++ and Tailwind CSS.', 'Zakaria Akheraaz, full-stack developer, backend developer, Morocco'),
  ar: seo('زكريا أخراز | مطوّر Backend وFull-Stack', 'الملف المهني لزكريا أخراز، مطوّر Backend وFull-Stack من أكادير بالمغرب، يعمل بـJavaScript وReact وC++ وTailwind CSS.', 'زكريا أخراز، مطور ويب، المغرب'),
  fr: seo('Zakaria Akheraaz | Développeur Backend & Full-Stack', 'Portfolio de Zakaria Akheraaz, développeur Backend & Full-Stack à Agadir, Maroc : JavaScript, React, C++ et Tailwind CSS.', 'Zakaria Akheraaz, développeur full-stack, Maroc') },
};
const P = (slug, sort, status, title, en, tech, repo = '', live = '') => ({ slug, sort, published: false, featured: false, status, data: { title: { en: title }, summary: { en }, case: {}, tech, repo, live, image: '' } });
export const PROJECTS = [
 P('green-school', 0, 'ongoing', 'Green School', 'A digital platform for a tutoring and academic support center, with separate roles for the director, teachers and students.', ['Next.js', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel'], 'https://github.com/Argoshak/green-school', 'https://green-school-eosin.vercel.app'),
 P('ogm', 1, 'ongoing', 'Organisation Génération Maroc (OGM)', 'Website and admin panel for a Moroccan youth organization focused on education, technology, innovation, volunteering and community development.', ['Supabase', 'Vercel'], '', 'https://ogm-maroc.vercel.app'),
 P('united-encyclopedia', 2, 'ongoing', 'United Encyclopedia', 'An Arabic digital encyclopedia built on the Wikipedia API.', ['Wikipedia API', 'Vercel'], '', 'https://unitedencyclopedia.vercel.app'),
 P('argos-monitor', 3, 'ongoing', 'Argos Monitor', 'A project focused on website monitoring and security.', []),
 P('security-updates-center', 4, 'ongoing', 'Security & Updates Center', 'A project focused on monitoring dependencies, updates and security-related information.', []),
 P('lumaos', 5, 'concept', 'LumaOS', 'An operating system concept exploring system architecture and Unix-like technologies.', []),
];
