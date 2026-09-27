# Nirva Learning World — Foundation v0.1

สถานะ: ฐานเอกสารและสัญญาข้อมูลสำหรับ review ยังไม่มีเกมที่เล่นได้ ไม่มีบัญชีเด็กหรือการเรียก AI จริง

เป้าหมาย: เด็กเล่น ทดลอง คิด เห็นผล แก้ไข และสร้าง โดย AI ช่วยตั้งคำถาม ไม่ทำแทนเด็ก

## เริ่มอ่าน

1. [PRD](PRD.md) — ผู้ใช้ ขอบเขต และเกณฑ์ยอมรับ
2. [Architecture](architecture.md) — ขอบเขตกับระบบเดิมและข้อมูล
3. [ADR 0001](adr/0001-reuse-academy.md) — เหตุผลเลือก repository เดิม
4. [ADR 0002](adr/0002-offline-first-foundation.md) — ฐานจำลองก่อนเชื่อมบริการ
5. [Safety and data](safety-and-data.md) — ข้อกำหนดก่อนใช้ข้อมูลเด็กจริง
6. [Delivery plan](delivery-plan.md) — งานถัดไปและวิธีตรวจ
7. [Coding stack](coding-stack-2026-09-27.md) — เครื่องมือและงบประมาณ

## สิ่งที่มีใน PR นี้

- โครง `apps/learning-world` และสัญญาข้อมูล `packages/learning-core`, `packages/game-core`
- ตัวอย่างภารกิจต้นไม้เหี่ยวที่ตรวจชนิดข้อมูลได้ แต่ยังไม่ใช่ simulation
- กติกา agent, เจ้าของ review, templates, CI และตัวอย่าง environment ที่ปิดการเชื่อมต่อ
- ไม่ย้าย `app/`, ไม่เปลี่ยน route, database, DNS หรือ deployment

## ตรวจบนเครื่อง

ใช้ Node 22 ตาม CI และ lockfile เดิม จาก root repository:

```sh
npm ci --no-audit --no-fund
npm run check:learning-world
npm run typecheck
npm run build
```

ไม่ต้องสร้าง `.env` เพื่อรัน checks เหล่านี้ ดู [app README](../../apps/learning-world/README.md)
สำหรับสถานะ scaffold และ [delivery plan](delivery-plan.md) สำหรับ secret scan ก่อน push

GitHub เป็นแหล่ง code/PR หลัก ไม่มีการเขียน mirror ไป Forgejo ในงานนี้
