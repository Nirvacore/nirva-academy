import { Suspense } from "react";
import Link from "next/link";
import { Dashboard } from "@/components/Dashboard";
import { WeekPlan } from "@/components/WeekPlan";
import { LearningCenterHome } from "@/components/LearningCenterHome";
import { TrackedLink } from "@/components/TrackSwitch";
import { courseHours, phaseLabel, portalLessons } from "@/lib/catalog";
import { loadSchema } from "@/lib/curriculum";

export default function HomePage() {
  const schema = loadSchema();
  const lessons = portalLessons();
  const hours = courseHours();

  return (
    <Suspense fallback={null}>
      <LearningCenterHome lessons={lessons} />

      <section className="tree-home-invite" aria-labelledby="tree-home-title">
        <p className="eyebrow">Learning World · ทดลองด้วยข้อมูลสมมติ</p>
        <h2 id="tree-home-title">ต้นไม้กำลังบอกอะไรเรา?</h2>
        <p>ลองคาดการณ์ รดน้ำ ดูผล และเปลี่ยนวิธีคิดได้ในหนึ่งภารกิจ ไม่ต้องสมัครหรือส่งคำตอบออกไป</p>
        <Link className="btn primary" href="/learning-world/tree">ลองภารกิจต้นไม้</Link>
      </section>

      <details className="more-lms">
        <summary>แผนเรียน ผลการเรียน และรายการบททั้งหมด</summary>
        <Dashboard lessons={lessons} hours={hours} />
        <WeekPlan lessons={lessons} />
        <div className="modules">
          {schema.modules.map((module) => (
            <article className="card" key={module.id}>
              <p className="eyebrow">{phaseLabel(module.phase)}</p>
              <h2>{module.name}</h2>
              <ol>
                {module.lessons.map((lesson) => (
                  <li key={lesson.id}>
                    <TrackedLink href={`/learn/${lesson.slug}`}>{lesson.title_th}</TrackedLink>
                  </li>
                ))}
              </ol>
            </article>
          ))}
          <article className="card">
            <p className="eyebrow">ของจริง</p>
            <h2>เทียบเครื่องมือและร้านค้า</h2>
            <p className="lede">ใช้หลังผ่านภาพหลอนแล้ว อย่าเริ่มที่นี่ถ้ายังไม่รู้ว่าเธอคือใคร</p>
            <div className="actions">
              <TrackedLink className="btn primary" href="/tracks">
                เทียบแทร็กบริษัท
              </TrackedLink>
              <TrackedLink className="btn ghost" href="/media">
                กรณีศึกษาสื่อ
              </TrackedLink>
              <TrackedLink className="btn ghost" href="/shop">
                ร้านค้าตัวอย่าง
              </TrackedLink>
            </div>
          </article>
        </div>
      </details>
    </Suspense>
  );
}
