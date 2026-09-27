# Coding agents and cost decision — 2026-09-27

คำแนะนำ: ใช้เครื่องมือที่สมัครอยู่เป็นตัวหลักก่อน ไม่จำเป็นต้องซื้อทุกค่าย ใช้ Codex กับ GPT-6 Sol สำหรับงานประจำ, Luna สำหรับงานเล็กที่ตรวจง่าย และ Astra เฉพาะงานสถาปัตยกรรม/ปัญหายากเมื่อสิทธิ์เดิมรองรับ นี่เป็นข้อเสนอจากลักษณะงาน ไม่ใช่ผล benchmark ของโครงการ

## เครื่องมือและโมเดลแยกกัน

Agent คือเครื่องมืออ่าน/แก้ไฟล์/รันทดสอบ ส่วน model คือระบบ reasoning ที่อยู่ข้างใน การเลือก agent ไม่จำเป็นต้องผูกทุกงานกับโมเดลราคาแพงที่สุด

| ทางเลือก | งานที่เสนอให้ใช้ | ราคาที่ตรวจจากหน้าทางการ (USD) | ข้อจำกัด |
| --- | --- | --- | --- |
| Codex / GPT-6 Sol, Luna; Astra เฉพาะงานยาก | ลงมือใน repo, tests, PR และ integration | รวมใน ChatGPT; Plus $20/เดือน, Pro เริ่ม $100/เดือน | มี usage limits; สิทธิ์แต่ละโมเดลต่างกัน; API คิดแยก |
| Claude Code / Sonnet 5; Opus 5.5 สำหรับ review ยาก | ความเห็นที่สองเรื่องสัญญาข้อมูล/ขอบเขตและ refactor | Pro $20/เดือนแบบรายเดือน; Max เริ่ม $100/เดือน | ใช้ quota ร่วมกับ Claude; ไม่ต้องซื้อเพิ่มถ้ายังไม่พิสูจน์คุณค่า |
| Cursor | งาน UI ที่ผู้ใช้แก้และดูผลร่วมกับ editor บ่อย | Pro $20/เดือน | agent/model usage มีขีดจำกัดและบางบริการคิดตามการใช้ |
| Gemini CLI | ทดลองอ่านเอกสารสาธารณะ/ตรวจ fixture อีกมุม | มี free plan ผ่าน Google account | ตรวจ quota และเงื่อนไขข้อมูลตามวิธี login; ห้ามใส่ข้อมูลเด็ก/ความลับ |

แหล่งทางการที่เปิดตรวจวันที่ข้างต้น:

- [Codex pricing](https://learn.chatgpt.com/docs/pricing) — subscription/usage แยกจาก API
- [OpenAI model guidance](https://developers.openai.com/api/docs/guides/latest-model) — Sol สำหรับ reasoning, Luna สำหรับงานซ้ำที่ต้องประหยัด, Astra สำหรับความสามารถสูงสุด
- [Claude pricing](https://claude.com/pricing) — Pro รวม Claude Code; รายการโมเดลปัจจุบัน
- [Cursor pricing](https://cursor.com/pricing) — Pro และขอบเขตบริการ
- [Gemini CLI plans](https://geminicli.com/plans/) และ [privacy notices](https://geminicli.com/docs/resources/tos-privacy/) — free/paid/authentication boundaries

ราคาอาจเปลี่ยน ไม่รวมการรับรองภาษี/ค่าเงินหรือสิทธิ์จริงของบัญชีนี้ การเห็นชื่อโมเดลไม่ได้ยืนยันว่าได้ quota เท่าใด ยังไม่มีการซื้อ เปลี่ยน plan หรือเรียก paid API จากคำแนะนำนี้

## เลือกจากผลงานที่ผ่าน review ไม่ใช่คำโฆษณา

ทดลองชุดงานเดียวกัน 3 งาน: (1) simulation น้ำที่มี edge cases, (2) หน้าภารกิจภาษาไทยที่ใช้ keyboard ได้, (3) review การเข้าถึงเด็กข้าม guardian/tenant ใช้ synthetic fixtures และ branch แยก วัดผลทดสอบ ความผิดพลาดที่ reviewer พบ เวลาแก้ซ้ำ และต้นทุนจริงต่อ PR ที่ยอมรับ ไม่วัดจำนวนบรรทัดโค้ด

ไม่มีผลทดลองเปรียบเทียบเหล่านี้ใน foundation นี้ จึงไม่อ้างว่าค่ายหนึ่งเก่งกว่าอีกค่ายอย่างพิสูจน์แล้ว ถ้า Claude/Cursor/Gemini ให้ผลดีกว่าในงานเดียวกันให้เปลี่ยนผู้รับงานได้ โดยรักษาสัญญาและ tests เดิม

## แผนงบที่เสนอ

- เริ่มด้วย subscription ที่มีอยู่: งบซื้อเครื่องมือเพิ่ม $0
- ถ้าต้องเพิ่ม ให้ทดลองเพียงหนึ่งตัว $20/เดือนก่อน ไม่เปิดหลาย subscription พร้อมกัน
- ปิด/ไม่เปิด overage, auto top-up และ API billing จนเจ้าของกำหนดงบ; quota หมดให้หยุดหรือรอ ไม่สลับไป paid API เงียบ ๆ
- แบ่งงานเล็ก ส่งเฉพาะ diff/บริบทที่จำเป็น ใช้ tests/validator สำหรับการตรวจซ้ำ เลี่ยง agent loop ที่ไม่มีเงื่อนไขจบ
- AI ในเกมแยกงบจาก coding tools: foundation ใช้ scripted hints จึงไม่มี model inference cost; hosting/CI และเวลาคนยังมีต้นทุน
- ก่อนเปิด AI จริง บังคับ budget และ token/time limits ที่ server รวมถึง fallback; ค่า budget=0 ในไฟล์ตัวอย่างเป็นข้อกำหนด ไม่ใช่การบังคับใช้ที่สร้างแล้ว

## Product stack

คง Next.js/React/TypeScript และ lockfile ที่ repo ใช้อยู่ เริ่มฉาก DOM/SVG กับ pure simulation เพื่อพิสูจน์ loop ก่อนเพิ่ม 2D engine ส่วน 3D/native ยังไม่มี requirement ที่คุ้มการเพิ่มความซับซ้อน ใช้ NirvaCore/NirvaAI ผ่านสัญญาที่ review แล้วในระยะถัดไป ไม่ตั้ง auth/database/gateway ซ้ำ
