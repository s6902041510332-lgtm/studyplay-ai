# StudyPlay AI

แพลตฟอร์มเว็บช่วยสร้างแบบฝึกหัดและทบทวนบทเรียนด้วย AI รองรับ 5 วิชา พร้อมเกมและระบบวัดผลการเรียนรู้

**เรียนดูเว็บไซต์ได้ที่:** https://studyplay-ai-app.vercel.app

---

## ความสามารถหลัก

- **หน้าเรียนรู้ (Learn)** — มี 5 วิชา วิชาละ 6 บทเรียน เนื้อหาแยกกันตามวิชาจริง ไม่ซ้ำกัน
- **เกมและแบบฝึกหัด (Play)** — 7 โหมด ได้แก่
  - Quiz เร็ว 5 ข้อ
  - แบบทดสอบ 10 ข้อ พร้อมคะแนน
  - เกมจับคู่ (Matching) พร้อมระบบ Combo
  - แข่งตอบเร็ว (Time Challenge)
  - ฝึกหัดจุดอ่อน (Weak Topic) เลือกระดับความยากได้
  - แบบเติมคำ
  - สุ่มโหมดสุ่ม
- **คลังข้อสอบ** — 51 ข้อ แยกตามวิชา พร้อมคำอธิบายเฉลยทุกข้อ
- **หน้าความคืบหน้า (Progress)** — แผนภูมิความคืบหน้ารายวิชา, สถิติ, กราฟ
- **หน้าโปรไฟล์ (Profile)** — ระดับ, XP, Streak, สลับภาษาไทย/อังกฤษ
- **โหมดครู (Teacher)** — สร้างแบบทดสอบตามจำนวนข้อ ระดับความยาก และดูผลนักเรียน
- **รองรับสองภาษา** — ไทย (ต้นฉบับ) และอังกฤษ
- **Responsive** — ใช้งานได้ทั้งคอมพิวเตอร์และมือถือ

## เทคโนโลยีที่ใช้

- HTML5
- CSS3 (มี responsive design และ dark mode)
- JavaScript (Vanilla ES6+ — ไม่ใช้ framework)

เลือกใช้ Vanilla JavaScript เพื่อให้รันได้โดยตรงโดยไม่ต้องติดตั้งอะไรเพิ่ม และเปิดเป็นเว็บไซต์ได้ทันที

## โครงสร้างไฟล์

```
studyplay-ai/
├── index.html        # โครงสร้างหน้าจอทั้งหมด 16 หน้า + modals
├── styles.css        # สไตล์ทั้งหมด
├── app.js            # ตรรกะของแอป (state, ข้อมูลวิชา, เกม, การนำทาง)
└── translations.js   # พจนานุกรมแปลภาษา ไทย / อังกฤษ
```

## วิธีเปิดใช้งานบนเครื่องตัวเอง

ไม่ต้องติดตั้งอะไร เพียงเปิดไฟล์ `index.html` ด้วยเบราว์เซอร์ (Chrome / Edge / Firefox) ก็ใช้งานได้ทันที

หรือเปิดผ่าน Live Server (แนะนำ VS Code extension "Live Server")

## การนำขึ้นเว็บไซต์ (Deployment)

| แพลตฟอร์ม | ลิงก์ |
|---|---|
| **Vercel** (Production) | https://studyplay-ai-app.vercel.app |
| GitHub Pages | https://s6902041510332-lgtm.github.io/studyplay-ai |
| ซอร์สโค้ด | https://github.com/s6902041510332-lgtm/studyplay-ai |

- อัปโหลดขึ้น Vercel ด้วย Vercel CLI (`vercel --prod`)
- เผยแพร่บน GitHub Pages จาก branch `main`
- ซอร์สโค้ดเผยแพร่แบบ Public

## ข้อมูลวิชาและข้อสอบ

| วิชา | บทเรียน | ข้อสอบ |
|---|---|---|
| คอมพิวเตอร์ | Cache Memory, CPU Architecture, Operating Systems, Networks, Data Structures, Database Systems | 10 |
| คณิตศาสตร์ | Calculus, Linear Algebra, Statistics, Geometry, Number Theory, Probability | 10 |
| วิทยาศาสตร์ | Physics, Chemistry, Biology, Astronomy, Earth Science, Genetics | 10 |
| ภาษาอังกฤษ | Grammar, Vocabulary, Reading, Writing, Listening, Speaking | 10 |
| สังคมศึกษา | History, Geography, Civics, Economics, Thai History, World Geography | 11 |

ข้อมูลวิชาทั้งหมดและคลังข้อสอบเก็บอยู่ในไฟล์ `app.js` ในรูปแบบโครงสร้างข้อมูล (`subjects` และ `questionBank`) ซึ่งเชื่อมต่อกับทุกโหมดของเกมโดยอัตโนมัติ เมื่อเปลี่ยนวิชา บทเรียนและข้อสอบจะเปลี่ยนตามทันที

## การออกแบบระบบนำทาง

- มีหน้าจอ 16 หน้า แต่ **แสดงหน้าเดียวต่อครั้งเท่านั้น** ผ่านฟังก์ชัน `showScreen()` เพื่อป้องกันหน้าจอซ้อนทับกัน
- **แถบนำทางด้านล่าง** ตั้งเป็น `position: fixed` ด้วย `z-index: 99999` เพื่อให้อยู่เหนือทุกชั้นและกดได้เสมอ
- ทุก element อ้างอิงด้วย `getElementById` มีการตรวจ `null` ก่อนใช้งานทุกจุด เพื่อไม่ให้เกิด error

## ผู้พัฒนา

นักศึกษา คณะวิทยากาศรรพนาธิ สาขาเทคโนโลยีสารสนเทศ มหาวิทยาลัยเทคโนโลยีมงคลล้านนา

Repository: https://github.com/s6902041510332-lgtm/studyplay-ai