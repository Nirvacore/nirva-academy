"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Locale } from "@/packages/learning-core/src/index";
import type { SimulationResult } from "@/packages/game-core/src/index";
import { initialTreeState, simulateTree } from "@/packages/game-core/src/tree-simulation";
import { wiltedTree } from "@/apps/learning-world/src/missions/wilted-tree";

type Prediction = "dry" | "balanced" | "waterlogged" | "unsure";
type Explanation = "too-little" | "enough" | "too-much" | "unsure";
type Strategy = "less" | "same" | "more" | "wait";

const copy = {
  th: {
    back: "กลับไปหน้าเรียน", eyebrow: "LEARNING WORLD · ภารกิจทดลอง 01",
    intro: "ต้นไม้ใบห้อยอยู่ตรงหน้า ลองคิด ลองรดน้ำ แล้วดูว่ามันตอบสนองอย่างไร",
    local: "เล่นบนหน้านี้เท่านั้น · ไม่ต้องสมัคร · ไม่มีการส่งคำตอบออกไป",
    step1: "1 · สังเกตและคาดการณ์", question: "ถ้าเติมน้ำ ต้นไม้จะเป็นอย่างไร?",
    prediction: { dry: "ยังแห้ง", balanced: "ฟื้นตัว", waterlogged: "น้ำมากไป", unsure: "ยังไม่แน่ใจ" },
    step2: "2 · ลงมือทดลอง", action: "เลือกปริมาณน้ำ", unit: "ขัน", water: "เติมน้ำ", change: "เปลี่ยนคำคาดการณ์",
    hint: "ขอคำใบ้", hints: ["ลองดูใบที่ห้อยและดินใต้ต้น", "น้ำที่น้อยหรือมากเกินไปอาจให้ผลต่างกัน", "ลองเลือก 1, 2 หรือ 3 ขัน แล้วเปรียบเทียบผล"],
    result: "3 · ดูผลและอธิบาย", outcome: { dry: "ต้นไม้ยังดูแห้ง ดินยังขาดน้ำ", balanced: "ใบยกขึ้น ต้นไม้ได้รับน้ำพอดี", waterlogged: "ดินแฉะ รากได้รับน้ำมากเกินไป" },
    compare: "คุณคาดว่า {prediction} · ผลที่เห็นคือ {outcome}",
    explain: "คิดว่าเพราะอะไร?", explanation: { "too-little": "น้ำน้อยเกินไป", enough: "น้ำพอดี", "too-much": "น้ำมากเกินไป", unsure: "ยังไม่แน่ใจ" },
    reflect: "4 · ปรับวิธีและลองใหม่", next: "ถ้าลองอีกครั้ง คุณจะทำอย่างไร?",
    strategy: { less: "ใช้น้ำน้อยลง", same: "ใช้เท่าเดิม", more: "ใช้น้ำมากขึ้น", wait: "รอดูอีกหน่อย" },
    retry: "ลองใหม่ตั้งแต่ต้น", evidence: "สิ่งที่เกิดขึ้นในรอบนี้", observed: "สิ่งที่ทำและผลที่เห็น",
    childThinking: "สิ่งที่คุณคิด", interpretation: "สิ่งที่ยังสรุปไม่ได้", unknown: "ยังไม่มีข้อมูลพอจะสรุปความสามารถในการเรียนรู้จากการลองครั้งเดียว",
    noJudgment: "คำตอบแรกผิดได้ การลองใหม่คือส่วนหนึ่งของการเรียนรู้", reset: "การลองใหม่จะล้างคำตอบรอบนี้จากหน้านี้",
    waterLevel: "ปริมาณน้ำ", cups: "ขัน", notYet: "ยังไม่ได้เลือก", predictionLabel: "คาดการณ์", actionLabel: "ลงมือ", outcomeLabel: "ผลที่เห็น", explanationLabel: "คำอธิบาย", strategyLabel: "ครั้งหน้า",
  },
  en: {
    back: "Back to lessons", eyebrow: "LEARNING WORLD · EXPERIMENT 01",
    intro: "A tree has drooping leaves. Make a prediction, add water, and see what happens.",
    local: "Only on this page · No account · No answers sent away",
    step1: "1 · Observe and predict", question: "What might happen if you add water?",
    prediction: { dry: "Still dry", balanced: "It recovers", waterlogged: "Too much water", unsure: "I'm unsure" },
    step2: "2 · Try it", action: "Choose an amount of water", unit: "cup", water: "Add water", change: "Change prediction",
    hint: "Give me a hint", hints: ["Look at the drooping leaves and the soil", "Too little and too much water can have different effects", "Try 1, 2, or 3 cups and compare the result"],
    result: "3 · See and explain", outcome: { dry: "The tree still looks dry; the soil needs water", balanced: "The leaves lift; the tree has enough water", waterlogged: "The soil is soggy; the roots got too much water" },
    compare: "You predicted {prediction} · You observed {outcome}",
    explain: "Why might that be?", explanation: { "too-little": "Too little water", enough: "Enough water", "too-much": "Too much water", unsure: "I'm unsure" },
    reflect: "4 · Reflect and retry", next: "What would you do next time?",
    strategy: { less: "Use less water", same: "Use the same amount", more: "Use more water", wait: "Wait and watch" },
    retry: "Try again from the start", evidence: "What happened this round", observed: "Action and observed outcome",
    childThinking: "What you thought", interpretation: "What remains unknown", unknown: "One try is not enough evidence to judge anyone's learning ability",
    noJudgment: "A first guess can be wrong. Trying again is part of learning.", reset: "Retry clears this round's answers from this page",
    waterLevel: "Water level", cups: "cups", notYet: "Not chosen yet", predictionLabel: "Prediction", actionLabel: "Action", outcomeLabel: "Outcome", explanationLabel: "Explanation", strategyLabel: "Next time",
  },
} as const;

function TreeScene({ condition, label }: { condition: "dry" | "balanced" | "waterlogged"; label: string }) {
  return (
    <svg className={`tree-scene tree-scene--${condition}`} viewBox="0 0 360 290" role="img" aria-label={label}>
      <title>{label}</title>
      <ellipse cx="180" cy="262" rx="148" ry="18" fill="#cba575" opacity=".25" />
      <path d="M30 256 Q180 222 330 256 L330 290 H30Z" fill="#62472e" />
      <path d="M180 235 Q171 179 180 123" stroke="#765035" strokeWidth="19" strokeLinecap="round" fill="none" />
      <path d="M179 180 Q145 158 127 129 M180 160 Q218 140 231 112" stroke="#765035" strokeWidth="10" strokeLinecap="round" fill="none" />
      <circle cx="180" cy="94" r="65" fill="#537e55" />
      <circle cx="130" cy="122" r="46" fill="#648f5d" />
      <circle cx="227" cy="115" r="47" fill="#6e9c62" />
      <path d="M131 95 Q143 86 153 95 M205 95 Q216 86 227 95" stroke="#183d34" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d={condition === "balanced" ? "M165 125 Q180 139 195 125" : "M168 132 Q180 121 192 132"} stroke="#183d34" strokeWidth="4" strokeLinecap="round" fill="none" />
      {condition === "waterlogged" && <><path d="M72 249 Q128 237 180 249 T288 249" stroke="#69bdd0" strokeWidth="8" fill="none" /><circle cx="229" cy="67" r="5" fill="#a7d8df" /></>}
      {condition === "dry" && <path d="M67 256 l22 -8 m-12 0 l14 11 M263 254 l20 -7 m-12 0 l13 11" stroke="#c59d6e" strokeWidth="3" fill="none" />}
    </svg>
  );
}

export function TreeMission() {
  const [locale, setLocale] = useState<Locale>("th");
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [water, setWater] = useState<1 | 2 | 3>(2);
  const [explanation, setExplanation] = useState<Explanation | null>(null);
  const [strategy, setStrategy] = useState<Strategy | null>(null);
  const [hintStep, setHintStep] = useState(0);
  const t = copy[locale];
  const condition = result?.state.treeCondition ?? "dry";

  useEffect(() => {
    document.title = `${wiltedTree.title[locale]} · Nirva Academy`;
  }, [locale]);

  function addWater() {
    if (!prediction || result) return;
    setResult(simulateTree(initialTreeState(), { kind: "add-water", units: water }));
  }

  function reset() {
    setPrediction(null);
    setResult(null);
    setWater(2);
    setExplanation(null);
    setStrategy(null);
    setHintStep(0);
  }

  return (
    <div className="tree-mission" lang={locale}>
      <header className="tree-header">
        <div className="tree-topline"><Link href="/">← {t.back}</Link><div className="tree-languages" role="group" aria-label={locale === "th" ? "ภาษา" : "Language"}><button type="button" aria-pressed={locale === "th"} onClick={() => setLocale("th")}>ไทย</button><button type="button" aria-pressed={locale === "en"} onClick={() => setLocale("en")}>English</button></div></div>
        <p className="tree-eyebrow">{t.eyebrow}</p>
        <h1>{wiltedTree.title[locale]}</h1>
        <p className="tree-lede">{t.intro}</p>
        <p className="tree-privacy">{t.local}</p>
      </header>

      <div className="tree-layout">
        <section className="tree-world" aria-label={t.outcome[condition]}>
          <div className="tree-sky"><span className="tree-sun" aria-hidden="true">☀</span><TreeScene condition={condition} label={t.outcome[condition]} /></div>
          <div className="tree-world-caption" role="status" aria-live="polite">{result ? t.outcome[condition] : wiltedTree.openingQuestion[locale]}</div>
          <div className="tree-water-track" aria-label={`${t.waterLevel}: ${result?.state.waterUnits ?? 0} ${t.cups}`}><span style={{ width: `${((result?.state.waterUnits ?? 0) / 6) * 100}%` }} /></div>
          <small>{t.waterLevel}: {result?.state.waterUnits ?? 0} {t.cups}</small>
        </section>

        <div className="tree-steps">
          <section className="tree-step"><h2>{t.step1}</h2><p>{t.question}</p><div className="tree-choice-grid">{(Object.keys(t.prediction) as Prediction[]).map((choice) => <button key={choice} type="button" disabled={!!result} aria-pressed={prediction === choice} onClick={() => setPrediction(choice)}>{t.prediction[choice]}</button>)}</div></section>

          <section className="tree-step"><h2>{t.step2}</h2><p>{t.action}</p><div className="tree-water-choices">{([1, 2, 3] as const).map((n) => <button key={n} type="button" disabled={!!result} aria-pressed={water === n} onClick={() => setWater(n)}><strong>{n}</strong> {n === 1 ? t.unit : t.cups}</button>)}</div><button className="tree-primary" type="button" disabled={!prediction || !!result} onClick={addWater}>{t.water}</button><button className="tree-hint" type="button" disabled={hintStep >= 3} onClick={() => setHintStep((step) => Math.min(3, step + 1))}>{t.hint}</button>{hintStep > 0 && <p className="tree-hint-text" role="status">{t.hints[hintStep - 1]}</p>}</section>

          {result && <section className="tree-step"><h2>{t.result}</h2><p className="tree-consequence">{t.outcome[condition]}</p><p className="tree-compare">{t.compare.replace("{prediction}", prediction ? t.prediction[prediction] : t.notYet).replace("{outcome}", t.outcome[condition])}</p><p>{t.explain}</p><div className="tree-choice-grid">{(Object.keys(t.explanation) as Explanation[]).map((choice) => <button key={choice} type="button" aria-pressed={explanation === choice} onClick={() => setExplanation(choice)}>{t.explanation[choice]}</button>)}</div></section>}

          {result && <section className="tree-step"><h2>{t.reflect}</h2><p>{t.next}</p><div className="tree-choice-grid">{(Object.keys(t.strategy) as Strategy[]).map((choice) => <button key={choice} type="button" aria-pressed={strategy === choice} onClick={() => setStrategy(choice)}>{t.strategy[choice]}</button>)}</div><p className="tree-kindness">{t.noJudgment}</p><button className="tree-retry" type="button" onClick={reset}>{t.retry}</button><small>{t.reset}</small></section>}
        </div>
      </div>

      {result && <section className="tree-evidence" aria-label={t.evidence}>
        <h2>{t.evidence}</h2>
        <div>
          <h3>{t.observed}</h3>
          <dl>
            <dt>{t.actionLabel}</dt><dd>{water} {t.cups}</dd>
            <dt>{t.outcomeLabel}</dt><dd>{t.outcome[condition]}</dd>
          </dl>
        </div>
        <div>
          <h3>{t.childThinking}</h3>
          <dl>
            <dt>{t.predictionLabel}</dt><dd>{prediction ? t.prediction[prediction] : t.notYet}</dd>
            <dt>{t.explanationLabel}</dt><dd>{explanation ? t.explanation[explanation] : t.notYet}</dd>
            <dt>{t.strategyLabel}</dt><dd>{strategy ? t.strategy[strategy] : t.notYet}</dd>
          </dl>
        </div>
        <div className="tree-evidence-unknown"><h3>{t.interpretation}</h3><p>{t.unknown}</p></div>
      </section>}
    </div>
  );
}
