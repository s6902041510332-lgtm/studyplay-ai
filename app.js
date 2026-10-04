// ============================================
// StudyPlay AI — Complete Application Logic
// ============================================

// ============ STATE ============
const state = {
    lang: 'th',
    currentScreen: 'onboarding',
    currentSubject: 0,
    user: { name: 'น้องเก่ง', xp: 450, streak: 4, level: 3, lessonsReviewed: 12, totalAnswers: 156, accuracy: 78 },
    quiz: { current: 0, score: 0, streak: 0, maxStreak: 0, answers: [], questions: [], mode: 'quick', startTime: null, answered: false },
    matching: { selectedLeft: null, selectedRight: null, matched: [], combo: 0, maxCombo: 0, timer: 45, timerInterval: null, score: 0 },
    timeChallenge: { score: 0, timer: 30, timerInterval: null, currentQuestion: 0, answered: false },
    teacher: { questionCount: 10, difficulty: 'easy', activityType: 'quiz', mode: 'student' },
    weakTopic: { difficulty: 'easy', current: 0, score: 0, questions: [], answered: false },
    mysteryBoxOpened: false,
    reviewReminderShown: false
};

// ============ SUBJECTS — วิชาหลายวิชา ============
const subjects = [
    {
        id: 'computer', name: 'คอมพิวเตอร์', icon: '💻', color: '#4D8DFF',
        lessons: [
            { title: 'Cache Memory', progress: 72, summary: 'Cache คือหน่วยความจำเล็กที่เร็วที่สุด อยู่ใกล้ CPU เก็บข้อมูลที่ใช้บ่อย', keyPoints: ['Cache Hit','Cache Miss','Locality','3 ระดับ Cache'], terms: ['Cache Hit','Cache Miss','Locality of Reference'] },
            { title: 'CPU Architecture', progress: 45, summary: 'CPU มี 3 ส่วนหลัก: ALU คำนวณ, Control Unit ควบคุม, Registers เก็บข้อมูลชั่วคราว', keyPoints: ['ALU','Control Unit','Registers','Pipeline'], terms: ['ALU','Registers','Clock Speed','Pipeline'] },
            { title: 'Operating Systems', progress: 30, summary: 'ระบบปฏิบัติการจัดการ Process, Memory, Files และ Scheduling', keyPoints: ['Process','Memory Management','File Systems','Scheduling'], terms: ['Process','Thread','Kernel','Deadlock'] },
            { title: 'Networks', progress: 15, summary: 'เครือข่ายคอมพิวเตอร์ใช้โปรโตคอล TCP/IP แบ่งเป็น 7 ชั้น OSI', keyPoints: ['OSI Model','TCP/IP','DNS','HTTP/HTTPS'], terms: ['IP Address','Router','Switch','Firewall'] },
            { title: 'Data Structures', progress: 55, summary: 'โครงสร้างข้อมูล: Array, Stack, Queue, Tree, Graph และ Big-O', keyPoints: ['Array','Stack & Queue','Tree','Graph'], terms: ['Array','Linked List','Binary Tree','Hash Table'] },
            { title: 'Database Systems', progress: 40, summary: 'ฐานข้อมูล SQL และ NoSQL ใช้ Query จัดการข้อมูล', keyPoints: ['SQL','NoSQL','Normalization','Index'], terms: ['Primary Key','Foreign Key','JOIN','Transaction'] }
        ]
    },
    {
        id: 'math', name: 'คณิตศาสตร์', icon: '📐', color: '#7668FF',
        lessons: [
            { title: 'Calculus', progress: 60, summary: 'เรียนรู้เกี่ยวกับ Limits, Derivatives และ Integrals', keyPoints: ['Limits','Derivatives','Integrals','Series'], terms: ['Limit','Derivative','Integral','Chain Rule'] },
            { title: 'Linear Algebra', progress: 40, summary: 'เวกเตอร์ เมทริกซ์ และการแปลงเชิงเส้น', keyPoints: ['Matrices','Vectors','Eigenvalues','Transformations'], terms: ['Matrix','Vector','Eigenvalue','Determinant'] },
            { title: 'Statistics', progress: 55, summary: 'ค่าเฉลี่ย ความแปรปรวน การแจกแจง และการทดสอบสมมติฐาน', keyPoints: ['Mean','Variance','Distribution','Hypothesis'], terms: ['Mean','Median','Standard Deviation','P-value'] },
            { title: 'Geometry', progress: 25, summary: 'รูปทรงเรขาคณิต ทรีโกณมิติ และพิกัด', keyPoints: ['Triangles','Circles','Trigonometry','Coordinates'], terms: ['Sine','Cosine','Pythagorean','Area'] },
            { title: 'Number Theory', progress: 35, summary: 'จำนวนเฉพาะ การหาร และ Modular Arithmetic', keyPoints: ['Prime Numbers','GCD','Modular','Fermat'], terms: ['Prime','GCD','LCM','Modulo'] },
            { title: 'Probability', progress: 50, summary: 'ความน่าจะเป็น การแจกแจง และ Bayes Theorem', keyPoints: ['Probability','Bayes','Combinatorics','Expected Value'], terms: ['Permutation','Combination','Bayes','Variance'] }
        ]
    },
    {
        id: 'science', name: 'วิทยาศาสตร์', icon: '🧪', color: '#48D7B2',
        lessons: [
            { title: 'Physics', progress: 50, summary: 'กฎการเคลื่อนที่ของนิวตัน พลังงาน และโมเมนตัม', keyPoints: ["Newton's Laws","Energy","Momentum","Gravity"], terms: ['Force','Acceleration','Kinetic Energy','Friction'] },
            { title: 'Chemistry', progress: 35, summary: 'ตารางธาตุ พันธะเคมี และปฏิกิริยา', keyPoints: ['Periodic Table','Bonds','Acids','Reactions'], terms: ['Atom','Molecule','Ion','pH'] },
            { title: 'Biology', progress: 65, summary: 'เซลล์ DNA วิวัฒนาการ และระบบนิเวศ', keyPoints: ['Cells','DNA','Evolution','Ecosystems'], terms: ['Mitosis','Photosynthesis','Protein','Gene'] },
            { title: 'Astronomy', progress: 20, summary: 'ระบบสุริยา ดาวฤกษ์ และกาแล็กซี', keyPoints: ['Solar System','Stars','Galaxies','Black Holes'], terms: ['Planet','Light Year','Supernova','Nebula'] },
            { title: 'Earth Science', progress: 45, summary: 'โครงสร้างโลก ธรณีวิทยา และภูมิอากาศ', keyPoints: ['Plate Tectonics','Rocks','Climate','Ocean'], terms: ['Mantle','Core','Fossil','Erosion'] },
            { title: 'Genetics', progress: 30, summary: 'DNA, RNA, Protein Synthesis และการถ่ายทอดทางพันธุกรรม', keyPoints: ['DNA','RNA','Protein','Heredity'], terms: ['Allele','Genotype','Phenotype','Chromosome'] }
        ]
    },
    {
        id: 'english', name: 'ภาษาอังกฤษ', icon: '📘', color: '#FFD166',
        lessons: [
            { title: 'Grammar', progress: 80, summary: 'การใช้ Tenses, Conditionals และ Passive Voice', keyPoints: ['Tenses','Conditionals','Passive Voice','Reported Speech'], terms: ['Present Perfect','Past Continuous','Gerund','Infinitive'] },
            { title: 'Vocabulary', progress: 55, summary: 'คำศัพท์ Synonyms, Idioms และ Phrasal Verbs', keyPoints: ['Synonyms','Idioms','Phrasal Verbs','Collocations'], terms: ['Synonym','Antonym','Idiom','Prefix'] },
            { title: 'Reading', progress: 40, summary: 'ทักษะการอ่าน Skimming, Scanning และ Inference', keyPoints: ['Skimming','Scanning','Inference','Main Idea'], terms: ['Context Clue','Tone','Theme','Summarize'] },
            { title: 'Writing', progress: 30, summary: 'การเขียนเรียงความ Paragraph และ Essay Structure', keyPoints: ['Essays','Paragraphs','Transitions','Conclusions'], terms: ['Thesis','Topic Sentence','Coherence','Transition'] },
            { title: 'Listening', progress: 60, summary: 'ฟังบทสนทนา จับใจความสำคัญ และ Note-taking', keyPoints: ['Dialogue','Note-taking','Accent','Context'], terms: ['Intonation','Stress','Connected Speech','Elision'] },
            { title: 'Speaking', progress: 35, summary: 'การพูด Presentation, Discussion และ Pronunciation', keyPoints: ['Presentation','Discussion','Pronunciation','Fluency'], terms: ['Stress','Intonation','Linking','Assimilation'] }
        ]
    },
    {
        id: 'social', name: 'สังคม', icon: '🌍', color: '#FF7A7A',
        lessons: [
            { title: 'History', progress: 45, summary: 'อารยธรรมโลก สงครามโลก และการปฏิวัติ', keyPoints: ['Ancient Civilizations','World Wars','Revolutions','Independence'], terms: ['Civilization','Empire','Republic','Treaty'] },
            { title: 'Geography', progress: 60, summary: 'ภูมิประเทศ ภูมิอากาศ และประชากรศาสตร์', keyPoints: ['Climate','Population','Urbanization','Resources'], terms: ['Latitude','Longitude','Biome','Demography'] },
            { title: 'Civics', progress: 35, summary: 'รัฐธรรมนูญ สิทธิ และระบบการปกครอง', keyPoints: ['Constitution','Rights','Government','Elections'], terms: ['Democracy','Monarchy','Parliament','Suffrage'] },
            { title: 'Economics', progress: 25, summary: 'อุปสงค์และอุปทาน ตลาด และ GDP', keyPoints: ['Supply & Demand','Market','GDP','Inflation'], terms: ['Scarcity','Opportunity Cost','Monopoly','Elasticity'] },
            { title: 'Thai History', progress: 70, summary: 'ประวัติศาสตร์ไทย สุโขทัย อยุธยา และรัตนโกสินทร์', keyPoints: ['สุโขทัย','อยุธยา','รัตนโกสินทร์','จักรี'], terms: ['พระราชาธิปไตย','สมบูรณาญาสิทธิราชย์','ราชวงศ์จักรี','บรมราชชนก'] },
            { title: 'World Geography', progress: 40, summary: 'ภูมิศาสตร์โลก ทวีป ประเทศ และเมืองสำคัญ', keyPoints: ['Continents','Oceans','Mountains','Rivers'], terms: ['Equator','Tropic','Peninsula','Archipelago'] }
        ]
    }
];

// ============ QUESTION BANK PER SUBJECT ============
const questionBank = {
    computer: [
        { question:'ข้อใดอธิบาย Cache Hit ได้ถูกต้อง?', answers:['CPU พบข้อมูลใน Cache','CPU ไม่พบข้อมูลใน Cache','Cache เต็ม','CPU อ่านจาก RAM เสมอ'], correct:0, explanation:'Cache Hit คือ CPU พบข้อมูลใน Cache ไม่ต้องไปอ่าน RAM', topic:'Cache Hit' },
        { question:'Cache Miss หมายถึงข้อใด?', answers:['พบข้อมูลใน Cache','ไม่พบข้อมูลใน Cache ต้องไปหน่วยความจำถัดไป','Cache ทำงานช้า','ข้อมูลถูกลบ'], correct:1, explanation:'Cache Miss คือไม่พบข้อมูลใน Cache', topic:'Cache Miss' },
        { question:'Cache มีกี่ระดับ?', answers:['1','2','3','4'], correct:2, explanation:'Cache มี 3 ระดับ L1 L2 L3', topic:'Memory Hierarchy' },
        { question:'ALU ทำหน้าที่อะไร?', answers:['ควบคุม CPU','คำนวณและตรรกะ','เก็บข้อมูล','เชื่อมต่ออุปกรณ์'], correct:1, explanation:'ALU (Arithmetic Logic Unit) ทำหน้าที่คำนวณและตรรกะ', topic:'CPU Architecture' },
        { question:'OSI Model มีกี่ชั้น?', answers:['5','6','7','8'], correct:2, explanation:'OSI Model มี 7 ชั้น', topic:'Networks' },
        { question:'TCP/IP ใช้ในอะไร?', answers:['เครื่องพิมพ์','เครือข่ายอินเทอร์เน็ต','วิดีโอ','เสียง'], correct:1, explanation:'TCP/IP เป็นโปรโตคอลสำหรับเครือข่ายอินเทอร์เน็ต', topic:'Networks' },
        { question:'Stack ใช้หลักการอะไร?', answers:['FIFO','LIFO','Round Robin','Priority'], correct:1, explanation:'Stack ใช้หลักการ LIFO (Last In First Out)', topic:'Data Structures' },
        { question:'Binary Search มีความซับซ้อน O เท่าใด?', answers:['O(n)','O(log n)','O(n²)','O(1)'], correct:1, explanation:'Binary Search มีความซับซ้อน O(log n)', topic:'Data Structures' },
        { question:'SQL ย่อมาจากอะไร?', answers:['Structured Query Language','Simple Query Language','System Query Language','Standard Query Logic'], correct:0, explanation:'SQL = Structured Query Language', topic:'Database' },
        { question:'Transaction มีคุณสมบัติ ACID ข้อใดไม่ใช่?', answers:['Atomicity','Consistency','Isolation','Dependency'], correct:3, explanation:'ACID = Atomicity, Consistency, Isolation, Durability', topic:'Database' }
    ],
    math: [
        { question:'อนุพันธ์ของ x² คือ?', answers:['x','2x','x²','2'], correct:1, explanation:'อนุพันธ์ของ x² = 2x', topic:'Derivatives' },
        { question:'∫2x dx = ?', answers:['x²+C','2x²+C','x+C','2x+C'], correct:0, explanation:'อินทิกรัลของ 2x = x²+C', topic:'Integrals' },
        { question:'ค่าเฉลี่ยของ 2,4,6,8 = ?', answers:['4','5','6','7'], correct:1, explanation:'(2+4+6+8)/4 = 5', topic:'Mean' },
        { question:'sin²θ + cos²θ = ?', answers:['0','1','2','θ'], correct:1, explanation:'เอกลักษณ์ตรีโกณมิติ = 1', topic:'Trigonometry' },
        { question:'เมทริกซ์ 3x3 มีกี่ element?', answers:['3','6','9','12'], correct:2, explanation:'3x3 = 9 elements', topic:'Matrices' },
        { question:'Eigenvalue ใช้ในอะไร?', answers:['การหาเมทริกซ์ผกผัน','การหาค่าเฉลี่ย','การวัดความแปรปรวน','การนับจำนวน'], correct:0, explanation:'Eigenvalue ใช้วิเคราะห์เมทริกซ์', topic:'Linear Algebra' },
        { question:'จำนวนเฉพาะน้อยที่สุด?', answers:['0','1','2','3'], correct:2, explanation:'2 เป็นจำนวนเฉพาะน้อยที่สุด', topic:'Prime Numbers' },
        { question:'GCD(12,18) = ?', answers:['3','6','9','12'], correct:1, explanation:'GCD(12,18) = 6', topic:'GCD' },
        { question:'P(เหรียญหัว) = ?', answers:['1/4','1/3','1/2','1'], correct:2, explanation:'P = 1/2', topic:'Probability' },
        { question:'Bayes Theorem ใช้หาอะไร?', answers:['ความน่าจะเป็น','ค่าเฉลี่ย','ความแปรปรวน','สหสัมพันธ์'], correct:0, explanation:'Bayes ใช้หาความน่าจะเป็นแบบมีเงื่อนไข', topic:'Bayes' }
    ],
    science: [
        { question:'F=ma เป็นกฎข้อใดของนิวตัน?', answers:['ข้อที่ 1','ข้อที่ 2','ข้อที่ 3','ข้อที่ 0'], correct:1, explanation:'F=ma เป็นกฎข้อที่ 2', topic:"Newton's Laws" },
        { question:'H₂O คือ?', answers:['เกลือ','น้ำ','คาร์บอนไดออกไซด์','ออกซิเจน'], correct:1, explanation:'H₂O คือน้ำ', topic:'Chemistry' },
        { question:'หน่วยย่อยของชีวภาพ?', answers:['อะตอม','เซลล์','โมเลกุล','อวัยวะ'], correct:1, explanation:'เซลล์เป็นหน่วยพื้นฐานของสิ่งมีชีวิต', topic:'Biology' },
        { question:'ดาวเคราะห์ใกล้อาทิตย์ที่สุด?', answers:['ดาวศุกร์','โลก','ดาวพุธ','ดาวอังคาร'], correct:2, explanation:'ดาวพุธใกล้อาทิตย์ที่สุด', topic:'Solar System' },
        { question:'pH ของน้ำบริสุทธิ์?', answers:['0','5','7','14'], correct:2, explanation:'pH = 7 (กลาง)', topic:'Chemistry' },
        { question:'DNA ย่อมาจากอะไร?', answers:['Deoxyribonucleic Acid','Dynamic Nuclear Acid','Deoxyribose Nucleic Atom','Dual Nucleic Acid'], correct:0, explanation:'DNA = Deoxyribonucleic Acid', topic:'Genetics' },
        { question:'แสงจากดวงอาทิตย์ใช้เวลาเดินทางถึงโลก?', answers:['8 วินาที','8 นาที','8 ชั่วโมง','8 วัน'], correct:1, explanation:'แสงอาทิตย์ใช้เวลาประมาณ 8 นาที', topic:'Astronomy' },
        { question:'การสังเคราะห์ด้วยแสง (Photosynthesis) เกิดขึ้นที่?', answers:['ไมโทคอนเดรีย','คลอโรพลาสต์','ไรโบโซม','นิวเคลียส'], correct:1, explanation:'Photosynthesis เกิดที่คลอโรพลาสต์', topic:'Biology' },
        { question:'เปลือกโลกมีชั้นใดเป็นของเหลว?', answers:['เปลือกนอก','เปลือกใน','แมนเทิล','ครัสต์'], correct:1, explanation:'เปลือกในเป็นเหล็กเหลว', topic:'Earth Science' },
        { question:'Black Hole มีคุณสมบัติอะไร?', answers:['แสงสว่างมาก','แรงโน้มถ่วงแรงมากแม้แต่แสงก็หนีไม่พ้น','เย็นมาก','หมุนเร็ว'], correct:1, explanation:'แรงโน้มถ่วงแรงมากจนแสงหนีไม่ออก', topic:'Black Holes' }
    ],
    english: [
        { question:'Past Simple ของ "go"?', answers:['goed','went','gone','going'], correct:1, explanation:'went = Past Simple ของ go', topic:'Tenses' },
        { question:'"beautiful" เป็นคำชนิดใด?', answers:['กริยา','คุณศัพท์','กรรม','สรรพนาม'], correct:1, explanation:'beautiful เป็น adjective', topic:'Grammar' },
        { question:'"If I were you" เป็นคอนดิชั่นอะไร?', answers:['First','Second','Third','Zero'], correct:1, explanation:'Second Conditional ใช้กับสถานการณ์ที่ไม่จริง', topic:'Conditionals' },
        { question:'คำตรงข้ามของ "happy"?', answers:['sad','angry','tired','hungry'], correct:0, explanation:'sad = คำตรงข้ามของ happy', topic:'Vocabulary' },
        { question:'Present Perfect ใช้เวลาอะไร?', answers:['for/since','yesterday','last week','ago'], correct:0, explanation:'Present Perfect ใช้ for/since', topic:'Tenses' },
        { question:'"big" → คำเปรียบเทียบ?', answers:['bigger','more big','biggest','most big'], correct:0, explanation:'bigger = คำเปรียบเทียบ', topic:'Grammar' },
        { question:'Phrasal Verb "give up" หมายถึง?', answers:['ยืนขึ้น','ยอมแพ้','ให้ของ','เริ่มต้น'], correct:1, explanation:'give up = ยอมแพ้', topic:'Phrasal Verbs' },
        { question:'"a" vs "an" ใช้กับคำที่ขึ้นต้นด้วยเสียง?', answers:['สระ','พยัญชนะ','คำย่อ','คำสมาส'], correct:0, explanation:'an + คำที่ขึ้นต้นด้วยเสียงสระ', topic:'Grammar' },
        { question:'"although" ใช้แทนคำกลุ่มใด?', answers:['and','but','because','so'], correct:1, explanation:'although ใช้ในกลุ่มคำขัดแย้ง (but)', topic:'Conjunctions' },
        { question:'Idiom "break the ice" หมายถึง?', answers:['ทำน้ำแตก','เริ่มบทสนทนา','ทำพัง','ยุบสลาย'], correct:1, explanation:'break the ice = เริ่มบทสนทนา', topic:'Idioms' }
    ],
    social: [
        { question:'อารยธรรมจีนเริ่มต้นที่แม่น้ำใด?', answers:['ไข่','ยังซี','กงหนาน','หน่าน'], correct:0, explanation:'แม่น้ำเหลือง (ไข่)', topic:'History' },
        { question:'ประเทศใดมีประชากรมากที่สุด?', answers:['อเมริกา','อินเดีย','จีน','อินโดนีเซีย'], correct:1, explanation:'อินเดีย (ปี 2023)', topic:'Population' },
        { question:'GDP ย่อมาจาก?', answers:['Gross Domestic Product','General Development Plan','Global Data Program','Government Policy'], correct:0, explanation:'GDP = Gross Domestic Product', topic:'Economics' },
        { question:'ระบบปกครองที่มีพระมหากษัตริย์?', answers:['สาธารณรัฐ','ราชาธิปไตย','ทหาร','สังคมนิยม'], correct:1, explanation:'ราชาธิปไตย', topic:'Government' },
        { question:'สุโขทัยเป็นราชอาณาจักรของชาติใด?', answers:['เขมร','ล้านนา','ไทย','พม่า'], correct:2, explanation:'สุโขทัยเป็นอาณาจักรไทยแห่งแรก', topic:'Thai History' },
        { question:'ราชวงศ์จักรีเริ่มสมัยใด?', answers:['พ.ศ. 2325','พ.ศ. 2400','พ.ศ. 2300','พ.ศ. 2500'], correct:0, explanation:'ราชวงศ์จักรีเริ่ม พ.ศ. 2325', topic:'Thai History' },
        { question:'เส้นศูนย์สูตร (Equator) ผ่านประเทศใดในเอเชีย?', answers:['ไทย','อินโดนีเซีย','ญี่ปุ่น','เกาหลีใต้'], correct:1, explanation:'Equator ผ่านอินโดนีเซีย', topic:'Geography' },
        { question:'ทวีปใดมีพื้นที่มากที่สุด?', answers:['แอฟริกา','เอเชีย','ยุโรป','อเมริกาเหนือ'], correct:1, explanation:'เอเชียใหญ่ที่สุด', topic:'Geography' },
        { question:'"Scarcity" ในเศรษฐศาสตร์หมายถึง?', answers:['ความขาดแคลน','ความอุดมสมบูรณ์','ความเท่าเทียม','ความผูกขาด'], correct:0, explanation:'Scarcity = ความขาดแคลนของทรัพยากร', topic:'Economics' },
        { question:'ประชาธิปไตยมีผู้นำมาจาก?', answers:['การสืบทอด','การเลือกตั้ง','การยึดอำนาจ','การแต่งตั้ง'], correct:1, explanation:'ประชาธิปไตยมีผู้นำจากการเลือกตั้ง', topic:'Civics' },
        { question:'สันนิบาต (Treaty) คือ?', answers:['สนธิสัญญา','กฎหมาย','รัฐธรรมนูญ','คำสั่ง'], correct:0, explanation:'Treaty = สนธิสัญญาระหว่างประเทศ', topic:'History' }
    ]
};

// ============ DOM ELEMENTS ============
const screens = document.querySelectorAll('.screen');
const bottomNav = document.getElementById('bottom-nav');
const confettiContainer = document.getElementById('confetti-container');

// ============ UTILITY FUNCTIONS ============
function t(key) { return translations[state.lang][key] || key; }
function shuffleArray(arr) { const s=[...arr]; for(let i=s.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[s[i],s[j]]=[s[j],s[i]];} return s; }
function formatTime(sec) { const m=Math.floor(sec/60),s=sec%60; return `${m}:${s.toString().padStart(2,'0')}`; }
function getSubjectQuestions(subjectId) { return questionBank[subjectId] || questionBank.computer; }
function getAIFeedback(acc) {
    if(acc>=90) return {emoji:'😊',text:'วันนี้คุณทำได้ดีขึ้นมาก 🎉 เก่งมาก!'};
    if(acc>=70) return {emoji:'😊',text:'เยี่ยม! คุณกำลังพัฒนาได้ดีมาก 💪'};
    if(acc>=50) return {emoji:'😐',text:'ดี! ลองฝึกอีกนิดจะเก่งขึ้นมาก'};
    return {emoji:'😴',text:'ลองฝึกอีกนิดนะ คุณทำได้แน่ ๆ!'};
}

// ============ NAVIGATION ============
function showScreen(screenId) {
    clearAllTimers();
    state.currentScreen = screenId;
    // Hide all screens
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.style.display = 'none';
    });
    // Show target screen
    const target = document.getElementById('screen-' + screenId);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
        target.offsetHeight;
        target.style.opacity = '1';
        target.style.transform = 'translateY(0)';
    }
    // Update bottom nav highlight
    updateBottomNav(screenId);
    // Scroll to top
    if (target) target.scrollTop = 0;
}

function updateBottomNav(screenId) {
    const navMap = {
        home:'home', summary:'learn', upload:'home', processing:'home',
        learn:'learn', modes:'play', play:'play', quiz:'play', matching:'play',
        timechallenge:'play', result:'play', weaktopic:'play',
        progress:'progress', analytics:'progress', rewards:'profile', profile:'profile',
        teacher:'learn', 'teacher-results':'learn'
    };
    const activeNav = navMap[screenId] || 'home';
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.toggle('active', item.dataset.nav === activeNav);
    });
}

function clearAllTimers() {
    if (state.matching.timerInterval) { clearInterval(state.matching.timerInterval); state.matching.timerInterval = null; }
    if (state.timeChallenge.timerInterval) { clearInterval(state.timeChallenge.timerInterval); state.timeChallenge.timerInterval = null; }
}

// ============ LANGUAGE ============
function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang;
    updateAllText();
    document.getElementById('lang-toggle-text').textContent = lang === 'th' ? 'English' : 'ไทย';
}
function updateAllText() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        const text = t(key);
        if (text) el.innerHTML = text;
    });
}

// ============ CONFETTI ============
function showConfetti(count = 30) {
    const colors = ['#4D8DFF','#78CCFF','#7668FF','#48D7B2','#FFD166','#FF7A7A'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (6 + Math.random() * 8) + 'px';
        confettiContainer.appendChild(piece);
        setTimeout(() => piece.remove(), 4000);
    }
}

// ============ ONBOARDING ============
function initOnboarding() {
    const slides = document.querySelectorAll('.onboarding-slide');
    const dots = document.querySelectorAll('.dot');
    const startBtn = document.getElementById('btn-start-app');
    if (!startBtn) return;
    function showSlide(idx) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        slides[idx].classList.add('active');
        dots[idx].classList.add('active');
        state.onboardingSlide = idx;
    }
    startBtn.addEventListener('click', () => {
        if (state.onboardingSlide < 2) showSlide(state.onboardingSlide + 1);
        else showScreen('home');
    });
}

// ============ SUBJECT SELECTOR ============
function initSubjectSelector() {
    ['subject-selector','learn-subject-selector'].forEach(selId => {
        const selector = document.getElementById(selId);
        if (!selector) return;
        selector.innerHTML = '';
        subjects.forEach((subject, idx) => {
            const tab = document.createElement('button');
            tab.className = 'subject-tab' + (idx === state.currentSubject ? ' active' : '');
            tab.style.setProperty('--subject-color', subject.color);
            tab.dataset.subjectIndex = idx;
            tab.innerHTML = `<span class="subject-icon">${subject.icon}</span><span>${subject.name}</span>`;
            tab.addEventListener('click', () => selectSubject(idx));
            selector.appendChild(tab);
        });
    });
}

function selectSubject(idx) {
    state.currentSubject = idx;
    const subject = subjects[idx];
    // Update all tabs (there are two selector bars, so use the index stored
    // on each tab instead of relying on the NodeList position)
    document.querySelectorAll('.subject-tab').forEach(tab => {
        const i = parseInt(tab.dataset.subjectIndex, 10);
        tab.classList.toggle('active', i === idx);
        if (subjects[i]) tab.style.setProperty('--subject-color', subjects[i].color);
    });
    // Update hero card color
    const heroCard = document.getElementById('hero-card');
    if (heroCard) heroCard.style.background = `linear-gradient(135deg,${subject.color},${subject.color}dd)`;
    // Update continue card
    const lesson = subject.lessons[0];
    const cs = document.getElementById('continue-subject');
    const ct = document.getElementById('continue-topic');
    if (cs) cs.textContent = `วิชา: ${subject.name}`;
    if (ct) ct.textContent = lesson.title;
    // Re-render lessons
    renderLessons();
    showConfetti(10);
}

// ============ LESSONS ============
function renderLessons() {
    const grid = document.getElementById('lessons-grid');
    if (!grid) return;
    const subject = subjects[state.currentSubject];
    grid.innerHTML = '';
    subject.lessons.forEach((lesson, idx) => {
        const card = document.createElement('div');
        card.className = 'lesson-card';
        card.style.animationDelay = (idx * 0.05) + 's';
        card.innerHTML = `
            <div class="lesson-icon">${subject.icon}</div>
            <div class="lesson-title">${lesson.title}</div>
            <div class="lesson-progress">
                <div class="progress-bar"><div class="progress-fill" style="width:${lesson.progress}%"></div></div>
                <span class="lesson-progress-text">${lesson.progress}%</span>
            </div>
            <button class="btn btn-primary btn-sm">${t('continue')}</button>
        `;
        card.addEventListener('click', () => openLesson(subject, lesson));
        grid.appendChild(card);
    });
    // Also update home continue card
    const cs = document.getElementById('continue-subject');
    const ct = document.getElementById('continue-topic');
    if (cs) cs.textContent = `วิชา: ${subject.name}`;
    if (ct) ct.textContent = subject.lessons[0].title;
}

function openLesson(subject, lesson) {
    document.getElementById('summary-title').textContent = lesson.title;
    document.getElementById('summary-subject').textContent = `วิชา: ${subject.name}`;
    document.getElementById('summary-text').textContent = lesson.summary;
    renderKeyPoints(lesson);
    renderTerms(lesson);
    showScreen('summary');
}

function renderKeyPoints(lesson) {
    const grid = document.getElementById('key-points-grid');
    if (!grid) return;
    const colors = ['kp-blue','kp-purple','kp-mint','kp-yellow'];
    const icons = ['⚡','📍','🏗️','🎯'];
    grid.innerHTML = '';
    lesson.keyPoints.slice(0, 4).forEach((topic, i) => {
        const card = document.createElement('div');
        card.className = `key-point-card ${colors[i % 4]}`;
        card.innerHTML = `<span class="kp-icon">${icons[i % 4]}</span><span>${topic}</span>`;
        grid.appendChild(card);
    });
}

function renderTerms(lesson) {
    const list = document.getElementById('terms-list');
    if (!list) return;
    list.innerHTML = '';
    lesson.terms.slice(0, 3).forEach(topic => {
        const card = document.createElement('div');
        card.className = 'term-card';
        card.innerHTML = `<span class="term-name">${topic}</span><span class="term-toggle">+</span><div class="term-explanation">${topic} เป็นแนวคิดสำคัญใน${lesson.title} ที่คุณควรทำความเข้าใจ</div>`;
        card.addEventListener('click', () => card.classList.toggle('expanded'));
        list.appendChild(card);
    });
}

// ============ HOME ============
function initHome() {
    document.getElementById('btn-upload-pdf').addEventListener('click', () => showScreen('upload'));
    document.getElementById('btn-take-photo').addEventListener('click', () => showScreen('upload'));
    document.getElementById('btn-paste-text').addEventListener('click', () => showScreen('upload'));
    document.getElementById('btn-continue').addEventListener('click', () => {
        const subject = subjects[state.currentSubject];
        openLesson(subject, subject.lessons[0]);
    });
    document.getElementById('btn-practice-now').addEventListener('click', () => showScreen('weaktopic'));
    // Update continue card with current subject
    const subject = subjects[state.currentSubject];
    const lesson = subject.lessons[0];
    const cs = document.getElementById('continue-subject');
    const ct = document.getElementById('continue-topic');
    if (cs) cs.textContent = `วิชา: ${subject.name}`;
    if (ct) ct.textContent = lesson.title;
}

// ============ UPLOAD ============
function initUpload() {
    const backBtn = document.getElementById('btn-back-home');
    if (backBtn) backBtn.addEventListener('click', () => showScreen('home'));
    document.querySelectorAll('.upload-card').forEach(card => {
        card.addEventListener('click', () => { showScreen('processing'); runProcessing(); });
    });
}

// ============ AI PROCESSING ============
function runProcessing() {
    const steps = document.querySelectorAll('.processing-step');
    const fill = document.getElementById('processing-progress-fill');
    if (!fill) return;
    let cur = 0;
    steps.forEach(s => s.classList.remove('active','completed'));
    fill.style.width = '0%';
    const iv = setInterval(() => {
        if (cur > 0) { steps[cur-1].classList.remove('active'); steps[cur-1].classList.add('completed'); }
        if (cur < steps.length) { steps[cur].classList.add('active'); fill.style.width = ((cur+1)/steps.length*100)+'%'; cur++; }
        else { clearInterval(iv); setTimeout(() => showScreen('summary'), 800); }
    }, 1200);
}

// ============ SUMMARY ============
function initSummary() {
    const backBtn = document.getElementById('btn-back-summary');
    const practiceBtn = document.getElementById('btn-start-practice');
    if (backBtn) backBtn.addEventListener('click', () => showScreen('home'));
    if (practiceBtn) practiceBtn.addEventListener('click', () => showScreen('play'));
}

// ============ PLAY ============
function initPlay() {
    document.querySelectorAll('#screen-play .mode-card').forEach(card => {
        card.addEventListener('click', () => startGame(card.dataset.mode));
    });
}

// ============ QUIZ ============
function initQuiz() {
    const nextBtn = document.getElementById('btn-next-question');
    const hintBtn = document.getElementById('btn-hint');
    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (state.quiz.current >= state.quiz.questions.length - 1) showResults();
        else { state.quiz.current++; renderQuizQuestion(); }
    });
    if (hintBtn) hintBtn.addEventListener('click', () => {
        const q = state.quiz.questions[state.quiz.current];
        if (q) alert(`💡 คำใบ้: ${q.explanation.substring(0, 50)}...`);
    });
}

// ============ GAME MODES ============
function startGame(mode) {
    clearAllTimers();
    state.quiz.mode = mode;
    state.quiz.current = 0;
    state.quiz.score = 0;
    state.quiz.streak = 0;
    state.quiz.maxStreak = 0;
    state.quiz.answers = [];
    state.quiz.startTime = Date.now();
    state.quiz.answered = false;
    const qs = getSubjectQuestions(subjects[state.currentSubject].id);
    if (mode === 'quick') { state.quiz.questions = shuffleArray(qs).slice(0,5); showScreen('quiz'); renderQuizQuestion(); }
    else if (mode === 'test') { state.quiz.questions = shuffleArray(qs).slice(0,10); showScreen('quiz'); renderQuizQuestion(); }
    else if (mode === 'matching') { initMatchingGame(); showScreen('matching'); }
    else if (mode === 'time') { initTimeChallenge(); showScreen('timechallenge'); }
    else if (mode === 'weak') { initWeakTopic(); showScreen('weaktopic'); }
    else if (mode === 'fill') { state.quiz.questions = shuffleArray(qs).slice(0,5); showScreen('quiz'); renderQuizQuestion(); }
    else if (mode === 'random') { startGame(['quick','test','matching','time'][Math.floor(Math.random()*4)]); }
}

// ============ MATCHING GAME ============
function initMatchingGame() {
    clearAllTimers();
    state.matching = { selectedLeft:null, selectedRight:null, matched:[], combo:0, maxCombo:0, timer:45, timerInterval:null, score:0 };
    const subject = subjects[state.currentSubject];
    const leftEl = document.getElementById('matching-left');
    const rightEl = document.getElementById('matching-right');
    if (!leftEl || !rightEl) return;
    leftEl.innerHTML = ''; rightEl.innerHTML = '';
    const pairs = [];
    subject.lessons.forEach(l => l.keyPoints.slice(0,2).forEach(kp => pairs.push({left:kp, right:l.title})));
    const gamePairs = pairs.slice(0,4);
    gamePairs.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.textContent = item.left;
        card.dataset.idx = idx;
        card.addEventListener('click', () => handleMatchingClick(card, 'left'));
        leftEl.appendChild(card);
    });
    shuffleArray(gamePairs).forEach(item => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.textContent = item.right;
        card.dataset.idx = gamePairs.findIndex(m => m.right === item.right);
        card.addEventListener('click', () => handleMatchingClick(card, 'right'));
        rightEl.appendChild(card);
    });
    state.matching.timerInterval = setInterval(() => {
        state.matching.timer--;
        const timerEl = document.getElementById('matching-timer');
        if (timerEl) timerEl.textContent = `⏱️ ${formatTime(state.matching.timer)}`;
        if (state.matching.timer <= 0) { clearAllTimers(); showResults(); }
    }, 1000);
}

function handleMatchingClick(card, side) {
    if (card.classList.contains('matched')) return;
    if (side === 'left') { document.querySelectorAll('#matching-left .matching-card').forEach(c=>c.classList.remove('selected')); card.classList.add('selected'); state.matching.selectedLeft = card; }
    else { document.querySelectorAll('#matching-right .matching-card').forEach(c=>c.classList.remove('selected')); card.classList.add('selected'); state.matching.selectedRight = card; }
    if (state.matching.selectedLeft && state.matching.selectedRight) {
        const li = state.matching.selectedLeft.dataset.idx;
        const ri = state.matching.selectedRight.dataset.idx;
        if (li === ri) {
            state.matching.selectedLeft.classList.add('matched');
            state.matching.selectedRight.classList.add('matched');
            state.matching.selectedLeft.classList.remove('selected');
            state.matching.selectedRight.classList.remove('selected');
            state.matching.matched.push(li);
            state.matching.combo++;
            state.matching.score += 100;
            if (state.matching.combo > state.matching.maxCombo) state.matching.maxCombo = state.matching.combo;
            const comboEl = document.getElementById('matching-combo');
            if (comboEl && state.matching.combo >= 2) comboEl.textContent = `Combo x${state.matching.combo} 🔥`;
            showConfetti(5);
            if (state.matching.matched.length === 4) { clearAllTimers(); setTimeout(()=>showResults(),500); }
        } else {
            state.matching.combo = 0;
            const comboEl = document.getElementById('matching-combo');
            if (comboEl) comboEl.textContent = '';
            state.matching.selectedLeft.classList.add('wrong');
            state.matching.selectedRight.classList.add('wrong');
            setTimeout(() => { state.matching.selectedLeft.classList.remove('wrong','selected'); state.matching.selectedRight.classList.remove('wrong','selected'); }, 400);
        }
        state.matching.selectedLeft = null;
        state.matching.selectedRight = null;
    }
}

// ============ TIME CHALLENGE ============
function initTimeChallenge() {
    clearAllTimers();
    state.timeChallenge = { score:0, timer:30, timerInterval:null, currentQuestion:0, answered:false };
    const scoreEl = document.getElementById('time-score');
    const timerEl = document.getElementById('time-timer');
    if (scoreEl) scoreEl.textContent = 'คะแนน: 0';
    if (timerEl) { timerEl.textContent = '00:30'; timerEl.classList.remove('urgent'); }
    state.timeChallenge.timerInterval = setInterval(() => {
        state.timeChallenge.timer--;
        if (timerEl) { timerEl.textContent = formatTime(state.timeChallenge.timer); if (state.timeChallenge.timer <= 10) timerEl.classList.add('urgent'); }
        if (state.timeChallenge.timer <= 0) { clearAllTimers(); showResults(); }
    }, 1000);
    renderTimeQuestion();
}

function renderTimeQuestion() {
    const qs = getSubjectQuestions(subjects[state.currentSubject].id);
    const q = qs[state.timeChallenge.currentQuestion % qs.length];
    const qEl = document.getElementById('time-question');
    if (qEl) qEl.textContent = q.question;
    const container = document.getElementById('time-answers');
    if (!container) return;
    container.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'time-answer';
        btn.textContent = `${letters[idx]}. ${ans}`;
        btn.addEventListener('click', () => handleTimeAnswer(idx, btn));
        container.appendChild(btn);
    });
    const bonusEl = document.getElementById('time-bonus');
    if (bonusEl) bonusEl.textContent = '';
    state.timeChallenge.answered = false;
}

function handleTimeAnswer(idx, btn) {
    if (state.timeChallenge.answered) return;
    state.timeChallenge.answered = true;
    const qs = getSubjectQuestions(subjects[state.currentSubject].id);
    const q = qs[state.timeChallenge.currentQuestion % qs.length];
    const isCorrect = idx === q.correct;
    document.querySelectorAll('.time-answer').forEach(a => a.style.pointerEvents = 'none');
    if (isCorrect) {
        btn.classList.add('correct');
        const bonus = state.timeChallenge.timer > 20 ? 30 : state.timeChallenge.timer > 10 ? 20 : 10;
        state.timeChallenge.score += 100 + bonus;
        const bonusEl = document.getElementById('time-bonus');
        if (bonusEl) bonusEl.textContent = `ตอบเร็ว +${bonus}`;
        showConfetti(5);
    } else { btn.classList.add('wrong'); }
    const scoreEl = document.getElementById('time-score');
    if (scoreEl) scoreEl.textContent = `คะแนน: ${state.timeChallenge.score}`;
    setTimeout(() => {
        state.timeChallenge.currentQuestion++;
        document.querySelectorAll('.time-answer').forEach(a => a.style.pointerEvents = '');
        renderTimeQuestion();
    }, 600);
}

// ============ WEAK TOPIC ============
function initWeakTopic() {
    state.weakTopic = { difficulty:'easy', current:0, score:0, questions: shuffleArray(getSubjectQuestions(subjects[state.currentSubject].id)).slice(0,5), answered:false };
    const backBtn = document.getElementById('btn-back-weak');
    if (backBtn) backBtn.addEventListener('click', () => showScreen('home'));
    document.querySelectorAll('#screen-weaktopic .difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#screen-weaktopic .difficulty-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.weakTopic.difficulty = btn.dataset.diff;
        });
    });
    renderWeakTopicQuestion();
}

function renderWeakTopicQuestion() {
    const container = document.getElementById('weak-topic-progress');
    if (!container) return;
    const q = state.weakTopic.questions[state.weakTopic.current];
    const total = state.weakTopic.questions.length;
    const cur = state.weakTopic.current + 1;
    container.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-top"><span class="quiz-progress-text">ข้อ ${cur} / ${total}</span><span class="quiz-score">คะแนน: ${state.weakTopic.score}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${cur/total*100}%"></div></div>
            <h3 class="quiz-question" style="margin-top:16px">${q.question}</h3>
            <div class="quiz-answers">${q.answers.map((a,i)=>`<button class="quiz-answer" data-index="${i}"><span class="answer-letter">${['A','B','C','D'][i]}</span><span>${a}</span></button>`).join('')}</div>
        </div>`;
    container.querySelectorAll('.quiz-answer').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.weakTopic.answered) return;
            state.weakTopic.answered = true;
            const idx = parseInt(btn.dataset.index);
            const isCorrect = idx === q.correct;
            container.querySelectorAll('.quiz-answer').forEach(a=>a.classList.add('disabled'));
            if (isCorrect) { btn.classList.add('correct'); state.weakTopic.score++; showConfetti(10); }
            else { btn.classList.add('wrong'); }
            setTimeout(() => {
                if (state.weakTopic.current >= total-1) showResults();
                else { state.weakTopic.current++; renderWeakTopicQuestion(); const badge = document.getElementById('improvement-badge'); if (badge && state.weakTopic.current === Math.floor(total/2)) badge.style.display = 'block'; }
            }, 1500);
        });
    });
}

// ============ RESULTS ============
function showResults() {
    clearAllTimers();
    let total, score;
    if (state.quiz.questions.length > 0) { total = state.quiz.questions.length; score = state.quiz.score; }
    else if (state.weakTopic.questions.length > 0) { total = state.weakTopic.questions.length; score = state.weakTopic.score; }
    else if (state.matching.matched.length > 0) { total = 4; score = state.matching.matched.length; }
    else { total = 4; score = Math.floor(state.timeChallenge.score / 100); }
    const accuracy = Math.round((score / total) * 100);
    const xpEarned = score * 20 + (accuracy >= 80 ? 50 : 0);
    state.user.xp += xpEarned;
    state.user.lessonsReviewed++;
    const scoreEl = document.getElementById('result-score');
    if (scoreEl) { scoreEl.textContent = '0 / ' + total; setTimeout(() => { scoreEl.textContent = `${score} / ${total}`; }, 100); }
    const accEl = document.getElementById('result-accuracy');
    if (accEl) accEl.textContent = `${accuracy}%`;
    const xpEl = document.getElementById('result-xp');
    if (xpEl) xpEl.textContent = `+${xpEarned} XP`;
    const timeEl = document.getElementById('result-time');
    if (timeEl) timeEl.textContent = formatTime(state.quiz.startTime ? Math.round((Date.now() - state.quiz.startTime) / 1000) : 30);
    const streakEl = document.getElementById('result-streak');
    if (streakEl) streakEl.textContent = state.quiz.maxStreak || state.matching.maxCombo;
    const msgEl = document.getElementById('result-message');
    if (msgEl) { if (accuracy >= 80) msgEl.textContent = t('result_great'); else if (accuracy >= 50) msgEl.textContent = t('result_good'); else msgEl.textContent = t('result_ok'); }
    const strongTopics = [], weakTopics = [];
    state.quiz.answers.forEach(a => { if (a.correct && !strongTopics.includes(a.topic)) strongTopics.push(a.topic); if (!a.correct && !weakTopics.includes(a.topic)) weakTopics.push(a.topic); });
    const strongEl = document.getElementById('strong-tags');
    const weakEl = document.getElementById('weak-tags');
    if (strongEl) strongEl.innerHTML = strongTopics.map(t=>`<span class="analysis-tag strong">${t}</span>`).join('');
    if (weakEl) weakEl.innerHTML = weakTopics.map(t=>`<span class="analysis-tag weak">${t}</span>`).join('');
    showScreen('result');
    showConfetti(40);
    const fb = getAIFeedback(accuracy);
    setTimeout(() => {
        const fbEl = document.createElement('div');
        fbEl.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--card);border-radius:16px;padding:16px 24px;z-index:2500;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:slideUp 0.4s ease;max-width:320px;text-align:center';
        fbEl.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${fb.emoji}</div><p style="font-size:0.9rem;font-weight:600">${fb.text}</p>`;
        document.body.appendChild(fbEl);
        setTimeout(() => { if (fbEl.parentElement) fbEl.remove(); }, 4000);
    }, 1500);
    if (!state.mysteryBoxOpened && Math.random() > 0.5) setTimeout(() => showMysteryBox(), 2000);
}

// ============ QUIZ ============
function renderQuizQuestion() {
    const q = state.quiz.questions[state.quiz.current];
    const total = state.quiz.questions.length;
    const cur = state.quiz.current + 1;
    const progText = document.getElementById('quiz-progress-text');
    const scoreEl = document.getElementById('quiz-score');
    const progFill = document.getElementById('quiz-progress-fill');
    const streakEl = document.getElementById('quiz-streak');
    const qEl = document.getElementById('quiz-question');
    const container = document.getElementById('quiz-answers');
    if (progText) progText.textContent = `ข้อ ${cur} / ${total}`;
    if (scoreEl) scoreEl.textContent = `คะแนน: ${state.quiz.score}`;
    if (progFill) progFill.style.width = (cur/total*100)+'%';
    if (streakEl) streakEl.textContent = state.quiz.streak >= 2 ? `🔥 ตอบถูก ${state.quiz.streak} ข้อ` : '';
    if (qEl) qEl.textContent = q.question;
    if (!container) return;
    container.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-answer';
        btn.innerHTML = `<span class="answer-letter">${letters[idx]}</span><span>${ans}</span>`;
        btn.addEventListener('click', () => handleQuizAnswer(idx, btn));
        container.appendChild(btn);
    });
    const explEl = document.getElementById('quiz-explanation');
    const qCard = document.getElementById('quiz-question-card');
    if (explEl) explEl.style.display = 'none';
    if (qCard) qCard.style.display = 'block';
    state.quiz.answered = false;
}

function handleQuizAnswer(idx, btn) {
    if (state.quiz.answered) return;
    state.quiz.answered = true;
    const q = state.quiz.questions[state.quiz.current];
    const isCorrect = idx === q.correct;
    document.querySelectorAll('.quiz-answer').forEach(a => a.classList.add('disabled'));
    const explEl = document.getElementById('quiz-explanation');
    const explCard = document.getElementById('explanation-card');
    const explText = document.getElementById('explanation-text');
    if (isCorrect) {
        btn.classList.add('correct');
        state.quiz.score++;
        state.quiz.streak++;
        if (state.quiz.streak > state.quiz.maxStreak) state.quiz.maxStreak = state.quiz.streak;
        if (explCard) explCard.style.borderLeft = '4px solid var(--mint)';
        if (explText) explText.innerHTML = `<strong style="color:var(--mint)">${t('correct')}</strong><br>${q.explanation}`;
        showConfetti(15);
    } else {
        btn.classList.add('wrong');
        state.quiz.streak = 0;
        if (explCard) explCard.style.borderLeft = '4px solid var(--coral)';
        if (explText) explText.innerHTML = `<strong style="color:var(--coral)">${t('wrong')}</strong><br>${q.explanation}`;
    }
    state.quiz.answers.push({ correct: isCorrect, topic: q.topic });
    const scoreEl = document.getElementById('quiz-score');
    if (scoreEl) scoreEl.textContent = `คะแนน: ${state.quiz.score}`;
    if (explEl) explEl.style.display = 'block';
    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) nextBtn.textContent = state.quiz.current >= state.quiz.questions.length-1 ? 'ดูผลลัพธ์' : t('next');
}

function initQuiz() {
    document.getElementById('btn-next-question').addEventListener('click', () => {
        if (state.quiz.current >= state.quiz.questions.length-1) showResults();
        else { state.quiz.current++; renderQuizQuestion(); }
    });
    document.getElementById('btn-hint').addEventListener('click', () => {
        const q = state.quiz.questions[state.quiz.current];
        alert(`💡 คำใบ้: ${q.explanation.substring(0,50)}...`);
    });
}

// ============ MATCHING ============
function initMatchingGame() {
    clearAllTimers();
    state.matching = { selectedLeft:null, selectedRight:null, matched:[], combo:0, maxCombo:0, timer:45, timerInterval:null, score:0 };
    const subject = subjects[state.currentSubject];
    const leftEl = document.getElementById('matching-left');
    const rightEl = document.getElementById('matching-right');
    leftEl.innerHTML = ''; rightEl.innerHTML = '';
    // Build pairs from subject lessons
    const pairs = [];
    subject.lessons.forEach(l => l.keyPoints.slice(0,2).forEach(kp => pairs.push({left:kp, right:l.title})));
    const gamePairs = pairs.slice(0,4);
    gamePairs.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.textContent = item.left;
        card.dataset.idx = idx;
        card.addEventListener('click', () => handleMatchingClick(card, 'left'));
        leftEl.appendChild(card);
    });
    shuffleArray(gamePairs).forEach(item => {
        const card = document.createElement('div');
        card.className = 'matching-card';
        card.textContent = item.right;
        card.dataset.idx = gamePairs.findIndex(m => m.right === item.right);
        card.addEventListener('click', () => handleMatchingClick(card, 'right'));
        rightEl.appendChild(card);
    });
    state.matching.timerInterval = setInterval(() => {
        state.matching.timer--;
        document.getElementById('matching-timer').textContent = `⏱️ ${formatTime(state.matching.timer)}`;
        if (state.matching.timer <= 0) { clearAllTimers(); showResults(); }
    }, 1000);
}

function handleMatchingClick(card, side) {
    if (card.classList.contains('matched')) return;
    if (side === 'left') { document.querySelectorAll('#matching-left .matching-card').forEach(c=>c.classList.remove('selected')); card.classList.add('selected'); state.matching.selectedLeft = card; }
    else { document.querySelectorAll('#matching-right .matching-card').forEach(c=>c.classList.remove('selected')); card.classList.add('selected'); state.matching.selectedRight = card; }
    if (state.matching.selectedLeft && state.matching.selectedRight) {
        const li = state.matching.selectedLeft.dataset.idx;
        const ri = state.matching.selectedRight.dataset.idx;
        if (li === ri) {
            state.matching.selectedLeft.classList.add('matched');
            state.matching.selectedRight.classList.add('matched');
            state.matching.selectedLeft.classList.remove('selected');
            state.matching.selectedRight.classList.remove('selected');
            state.matching.matched.push(li);
            state.matching.combo++;
            state.matching.score += 100;
            if (state.matching.combo > state.matching.maxCombo) state.matching.maxCombo = state.matching.combo;
            const comboEl = document.getElementById('matching-combo');
            if (state.matching.combo >= 2) comboEl.textContent = `Combo x${state.matching.combo} 🔥`;
            showConfetti(5);
            if (state.matching.matched.length === 4) { clearAllTimers(); setTimeout(()=>showResults(),500); }
        } else {
            state.matching.combo = 0;
            document.getElementById('matching-combo').textContent = '';
            state.matching.selectedLeft.classList.add('wrong');
            state.matching.selectedRight.classList.add('wrong');
            setTimeout(() => { state.matching.selectedLeft.classList.remove('wrong','selected'); state.matching.selectedRight.classList.remove('wrong','selected'); }, 400);
        }
        state.matching.selectedLeft = null;
        state.matching.selectedRight = null;
    }
}

// ============ TIME CHALLENGE ============
function initTimeChallenge() {
    clearAllTimers();
    state.timeChallenge = { score:0, timer:30, timerInterval:null, currentQuestion:0, answered:false };
    document.getElementById('time-score').textContent = 'คะแนน: 0';
    document.getElementById('time-timer').textContent = '00:30';
    document.getElementById('time-timer').classList.remove('urgent');
    state.timeChallenge.timerInterval = setInterval(() => {
        state.timeChallenge.timer--;
        const timerEl = document.getElementById('time-timer');
        timerEl.textContent = formatTime(state.timeChallenge.timer);
        if (state.timeChallenge.timer <= 10) timerEl.classList.add('urgent');
        if (state.timeChallenge.timer <= 0) { clearAllTimers(); showResults(); }
    }, 1000);
    renderTimeQuestion();
}

function renderTimeQuestion() {
    const qs = getSubjectQuestions(subjects[state.currentSubject].id);
    const q = qs[state.timeChallenge.currentQuestion % qs.length];
    document.getElementById('time-question').textContent = q.question;
    const container = document.getElementById('time-answers');
    container.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.answers.forEach((ans, idx) => {
        const btn = document.createElement('button');
        btn.className = 'time-answer';
        btn.textContent = `${letters[idx]}. ${ans}`;
        btn.addEventListener('click', () => handleTimeAnswer(idx, btn));
        container.appendChild(btn);
    });
    document.getElementById('time-bonus').textContent = '';
    state.timeChallenge.answered = false;
}

function handleTimeAnswer(idx, btn) {
    if (state.timeChallenge.answered) return;
    state.timeChallenge.answered = true;
    const qs = getSubjectQuestions(subjects[state.currentSubject].id);
    const q = qs[state.timeChallenge.currentQuestion % qs.length];
    const isCorrect = idx === q.correct;
    document.querySelectorAll('.time-answer').forEach(a => a.style.pointerEvents = 'none');
    if (isCorrect) {
        btn.classList.add('correct');
        const bonus = state.timeChallenge.timer > 20 ? 30 : state.timeChallenge.timer > 10 ? 20 : 10;
        state.timeChallenge.score += 100 + bonus;
        document.getElementById('time-bonus').textContent = `ตอบเร็ว +${bonus}`;
        showConfetti(5);
    } else { btn.classList.add('wrong'); }
    document.getElementById('time-score').textContent = `คะแนน: ${state.timeChallenge.score}`;
    setTimeout(() => {
        state.timeChallenge.currentQuestion++;
        document.querySelectorAll('.time-answer').forEach(a => a.style.pointerEvents = '');
        renderTimeQuestion();
    }, 600);
}

// ============ WEAK TOPIC ============
function initWeakTopic() {
    state.weakTopic = { difficulty:'easy', current:0, score:0, questions: shuffleArray(getSubjectQuestions(subjects[state.currentSubject].id)).slice(0,5), answered:false };
    document.getElementById('btn-back-weak').addEventListener('click', () => showScreen('home'));
    document.querySelectorAll('#screen-weaktopic .difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#screen-weaktopic .difficulty-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.weakTopic.difficulty = btn.dataset.diff;
        });
    });
    renderWeakTopicQuestion();
}

function renderWeakTopicQuestion() {
    const container = document.getElementById('weak-topic-progress');
    const q = state.weakTopic.questions[state.weakTopic.current];
    const total = state.weakTopic.questions.length;
    const cur = state.weakTopic.current + 1;
    container.innerHTML = `
        <div class="quiz-question-card">
            <div class="quiz-top"><span class="quiz-progress-text">ข้อ ${cur} / ${total}</span><span class="quiz-score">คะแนน: ${state.weakTopic.score}</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width:${cur/total*100}%"></div></div>
            <h3 class="quiz-question" style="margin-top:16px">${q.question}</h3>
            <div class="quiz-answers">${q.answers.map((a,i)=>`<button class="quiz-answer" data-index="${i}"><span class="answer-letter">${['A','B','C','D'][i]}</span><span>${a}</span></button>`).join('')}</div>
        </div>`;
    container.querySelectorAll('.quiz-answer').forEach(btn => {
        btn.addEventListener('click', () => {
            if (state.weakTopic.answered) return;
            state.weakTopic.answered = true;
            const idx = parseInt(btn.dataset.index);
            const isCorrect = idx === q.correct;
            container.querySelectorAll('.quiz-answer').forEach(a=>a.classList.add('disabled'));
            if (isCorrect) { btn.classList.add('correct'); state.weakTopic.score++; showConfetti(10); }
            else { btn.classList.add('wrong'); }
            setTimeout(() => {
                if (state.weakTopic.current >= total-1) showResults();
                else { state.weakTopic.current++; renderWeakTopicQuestion(); if (state.weakTopic.current === Math.floor(total/2)) document.getElementById('improvement-badge').style.display = 'block'; }
            }, 1500);
        });
    });
}

// ============ RESULTS ============
function showResults() {
    clearAllTimers();
    let total, score;
    if (state.quiz.questions.length > 0) { total = state.quiz.questions.length; score = state.quiz.score; }
    else if (state.weakTopic.questions.length > 0) { total = state.weakTopic.questions.length; score = state.weakTopic.score; }
    else if (state.matching.matched.length > 0) { total = 4; score = state.matching.matched.length; }
    else { total = 4; score = Math.floor(state.timeChallenge.score / 100); }
    const accuracy = Math.round((score / total) * 100);
    const xpEarned = score * 20 + (accuracy >= 80 ? 50 : 0);
    state.user.xp += xpEarned;
    state.user.lessonsReviewed++;
    const scoreEl = document.getElementById('result-score');
    scoreEl.textContent = '0 / ' + total;
    setTimeout(() => { scoreEl.textContent = `${score} / ${total}`; }, 100);
    document.getElementById('result-accuracy').textContent = `${accuracy}%`;
    document.getElementById('result-xp').textContent = `+${xpEarned} XP`;
    const elapsed = state.quiz.startTime ? Math.round((Date.now() - state.quiz.startTime) / 1000) : 30;
    document.getElementById('result-time').textContent = formatTime(elapsed);
    document.getElementById('result-streak').textContent = state.quiz.maxStreak || state.matching.maxCombo;
    const msgEl = document.getElementById('result-message');
    if (accuracy >= 80) msgEl.textContent = t('result_great');
    else if (accuracy >= 50) msgEl.textContent = t('result_good');
    else msgEl.textContent = t('result_ok');
    const strongTopics = [], weakTopics = [];
    state.quiz.answers.forEach(a => { if (a.correct && !strongTopics.includes(a.topic)) strongTopics.push(a.topic); if (!a.correct && !weakTopics.includes(a.topic)) weakTopics.push(a.topic); });
    document.getElementById('strong-tags').innerHTML = strongTopics.map(t=>`<span class="analysis-tag strong">${t}</span>`).join('');
    document.getElementById('weak-tags').innerHTML = weakTopics.map(t=>`<span class="analysis-tag weak">${t}</span>`).join('');
    showScreen('result');
    showConfetti(40);
    // AI feedback
    const fb = getAIFeedback(accuracy);
    setTimeout(() => {
        const fbEl = document.createElement('div');
        fbEl.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:var(--card);border-radius:16px;padding:16px 24px;z-index:2500;box-shadow:0 8px 30px rgba(0,0,0,0.15);animation:slideUp 0.4s ease;max-width:320px;text-align:center';
        fbEl.innerHTML = `<div style="font-size:2rem;margin-bottom:8px">${fb.emoji}</div><p style="font-size:0.9rem;font-weight:600">${fb.text}</p>`;
        document.body.appendChild(fbEl);
        setTimeout(() => { if (fbEl.parentElement) fbEl.remove(); }, 4000);
    }, 1500);
    // Mystery box
    if (!state.mysteryBoxOpened && Math.random() > 0.5) setTimeout(() => showMysteryBox(), 2000);
}

function initResults() {
    const weakBtn = document.getElementById('btn-practice-weak');
    const retryBtn = document.getElementById('btn-retry');
    const homeBtn = document.getElementById('btn-back-home-result');
    if (weakBtn) weakBtn.addEventListener('click', () => showScreen('weaktopic'));
    if (retryBtn) retryBtn.addEventListener('click', () => startGame(state.quiz.mode || 'quick'));
    if (homeBtn) homeBtn.addEventListener('click', () => showScreen('home'));
}

// ============ ANALYTICS ============
function initAnalytics() {
    const chartContainer = document.getElementById('weekly-chart');
    if (!chartContainer) return;
    const days = ['จ','อ','พ','พฤ','ศ','ส','อา'];
    const values = [3,5,2,7,4,6,3];
    const maxVal = Math.max(...values);
    chartContainer.innerHTML = values.map((v,i) => `<div class="chart-bar" style="height:${v/maxVal*100}%" data-day="${days[i]}"></div>`).join('');
    const masteryList = document.getElementById('mastery-list');
    if (!masteryList) return;
    const subject = subjects[state.currentSubject];
    const masteryData = subject.lessons.slice(0,3).map((l,i) => ({
        name: l.title, value: l.progress, color: ['var(--mint)','var(--blue)','var(--coral)'][i%3]
    }));
    masteryList.innerHTML = masteryData.map(m => `<div class="mastery-item"><div class="mastery-header"><span>${m.name}</span><span>${m.value}%</span></div><div class="mastery-bar"><div class="mastery-fill" style="width:${m.value}%;background:${m.color}"></div></div></div>`).join('');
    const btn = document.getElementById('btn-start-mastery');
    if (btn) btn.addEventListener('click', () => showScreen('weaktopic'));
}

// ============ TEACHER MODE ============
function initTeacher() {
    document.querySelectorAll('.mode-switch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mode-switch-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.teacher.mode = btn.dataset.mode;
        });
    });
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.count-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.teacher.questionCount = parseInt(btn.dataset.count);
        });
    });
    document.querySelectorAll('#screen-teacher .difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#screen-teacher .difficulty-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.teacher.difficulty = btn.dataset.diff;
        });
    });
    document.querySelectorAll('.activity-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.activity-btn').forEach(b=>b.classList.remove('active'));
            btn.classList.add('active');
            state.teacher.activityType = btn.dataset.type;
        });
    });
    const genBtn = document.getElementById('btn-generate-quiz');
    if (genBtn) genBtn.addEventListener('click', () => {
        const preview = document.getElementById('teacher-preview');
        const previewCard = document.getElementById('preview-card');
        if (preview) preview.style.display = 'block';
        if (previewCard) previewCard.innerHTML = `<p><strong>ประเภท:</strong> ${state.teacher.activityType}</p><p><strong>จำนวน:</strong> ${state.teacher.questionCount} ข้อ</p><p><strong>ระดับ:</strong> ${state.teacher.difficulty}</p><p style="margin-top:12px;color:var(--text-muted)">AI สร้างแบบฝึกเรียบร้อยแล้ว!</p>`;
        showConfetti(20);
    });
    const shareBtn = document.getElementById('btn-share');
    if (shareBtn) shareBtn.addEventListener('click', () => showScreen('teacher-results'));
    const backBtn = document.getElementById('btn-back-teacher-results');
    if (backBtn) backBtn.addEventListener('click', () => showScreen('teacher'));
}

// ============ PROFILE ============
function initProfile() {
    const xpEl = document.getElementById('profile-xp');
    const lvlEl = document.getElementById('profile-level');
    const strEl = document.getElementById('profile-streak');
    const langBtn = document.getElementById('btn-lang-toggle');
    if (xpEl) xpEl.textContent = state.user.xp;
    if (lvlEl) lvlEl.textContent = state.user.level;
    if (strEl) strEl.textContent = state.user.streak;
    if (langBtn) langBtn.addEventListener('click', () => {
        setLanguage(state.lang === 'th' ? 'en' : 'th');
    });
}

// ============ BOTTOM NAV ============
function initBottomNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
        // Remove any existing listeners by cloning
        const newItem = item.cloneNode(true);
        item.parentNode.replaceChild(newItem, item);
        // Add click listener
        newItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nav = newItem.dataset.nav;
            if (nav) showScreen(nav);
        });
        // Add touch listener for mobile
        newItem.addEventListener('touchend', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const nav = newItem.dataset.nav;
            if (nav) showScreen(nav);
        });
    });
}

// ============ MYSTERY BOX ============
function showMysteryBox() {
    state.mysteryBoxOpened = true;
    const modal = document.getElementById('mystery-box-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    const openBtn = document.getElementById('btn-open-mystery');
    const rewards = document.getElementById('mystery-rewards');
    if (openBtn) openBtn.addEventListener('click', () => {
        if (rewards) rewards.innerHTML = `<div class="mystery-reward">+50 XP 🎉</div><div class="mystery-reward">🏅 ตราประการใหม่</div><div class="mystery-reward">🎯 ชาเลนจ์พิเศษ</div>`;
        showConfetti(30);
        state.user.xp += 50;
        setTimeout(() => { modal.style.display = 'none'; }, 3000);
    });
}

// ============ REVIEW REMINDER ============
function showReviewReminder() {
    const modal = document.getElementById('review-reminder-modal');
    if (!modal) return;
    // If it is already open, do not stack duplicate listeners
    if (modal.style.display === 'flex') return;
    state.reviewReminderShown = true;
    modal.style.display = 'flex';
    const close = () => { modal.style.display = 'none'; };
    const nowBtn = document.getElementById('btn-review-now');
    const laterBtn = document.getElementById('btn-review-later');
    if (nowBtn) nowBtn.addEventListener('click', () => { close(); showScreen('play'); });
    if (laterBtn) laterBtn.addEventListener('click', close);
    // Safety net: clicking the backdrop also closes it, so the overlay can
    // never leave the app stuck/unclickable.
    modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
}

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initOnboarding();
    initSubjectSelector();
    initHome();
    initUpload();
    initSummary();
    initPlay();
    initQuiz();
    initResults();
    initAnalytics();
    initTeacher();
    initProfile();
    // Set language first
    setLanguage('th');
    // Initialize bottom nav AFTER all screens are ready
    initBottomNav();
    // Render the initial subject (populates lessons grid + hero card)
    selectSubject(state.currentSubject);
    // Show home screen
    showScreen('home');
    // NOTE: the review reminder is deliberately NOT auto-opened on load.
    // It is a full-screen overlay with a z-index above the bottom nav, so
    // firing it automatically used to make the whole app (including the nav)
    // unclickable. It is only shown from an explicit user action now.
});
