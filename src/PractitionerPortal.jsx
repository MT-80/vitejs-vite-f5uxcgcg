import { useState } from "react";

const O = "#E8521F";
const D = "#1A1A1A";
const W = "#FFFFFF";
const GN = "#16A34A";
const BL = "#2563EB";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30", "12:00", "14:00", "14:30", "15:00", "15:30", "16:00"];

const myAppts = [
  { id: 1, pt: "Jane Cooper", time: "2:30 PM", date: "Today", type: "Initial Consult", st: "ready", symptoms: "Persistent cough for 5 days, mild fever, sore throat. Has tried OTC cough syrup with no improvement. No known allergies. Non-smoker.", ini: "JC", age: 34 },
  { id: 2, pt: "Michael Brown", time: "3:00 PM", date: "Today", type: "Follow-up", st: "confirmed", symptoms: "Follow-up for anxiety management. Previously prescribed sertraline 50mg. Reports some improvement but still experiencing sleep issues and occasional racing thoughts.", ini: "MB", age: 41 },
  { id: 3, pt: "Sarah Lee", time: "4:15 PM", date: "Today", type: "Initial Consult", st: "confirmed", symptoms: "Stomach pain and nausea for 2 days. No vomiting. Keeping fluids down. Ate takeaway sushi 3 days ago.", ini: "SL", age: 27 },
  { id: 4, pt: "David Kim", time: "9:00 AM", date: "Tomorrow", type: "Care Plan Review", st: "confirmed", symptoms: "Review of URTI care plan from last week. Reports symptoms mostly resolved.", ini: "DK", age: 52 },
  { id: 5, pt: "Emma Wilson", time: "10:30 AM", date: "Tomorrow", type: "Initial Consult", st: "pending", symptoms: "Twisted right ankle playing netball 2 days ago. Swelling and bruising on outer ankle. Can weight-bear with pain.", ini: "EW", age: 23 },
];

const pathways = [
  { id: "urti", name: "Upper Respiratory Tract Infection", color: "#F97316", tasks: ["Prescribe paracetamol/ibuprofen", "Advise rest, fluids, throat lozenges", "Monitor for bacterial infection", "Review in 5-7 days"], scripts: ["Paracetamol 500mg", "Ibuprofen 200mg"], refs: [], fu: "7 days" },
  { id: "anxiety", name: "Anxiety (Mild to Moderate)", color: "#8B5CF6", tasks: ["Mental health assessment", "Discuss treatment options", "Create MH care plan", "Schedule fortnightly check-ins"], scripts: ["Sertraline 50mg (if appropriate)"], refs: ["Psychology (6 Medicare sessions)"], fu: "14 days" },
  { id: "gastro", name: "Gastroenteritis", color: "#06B6D4", tasks: ["Assess hydration", "Prescribe antiemetic if needed", "Advise oral rehydration + BRAT diet", "Monitor dehydration signs"], scripts: ["Ondansetron 4mg wafer", "Gastrolyte sachets"], refs: [], fu: "3 days" },
  { id: "sti", name: "STI Screening", color: "#EC4899", tasks: ["Order STI panel", "Discuss safe practices", "Schedule results follow-up", "Treat + notify if positive"], scripts: [], refs: ["Pathology: STI panel"], fu: "5-7 days" },
  { id: "ankle", name: "Sprained Ankle", color: "#10B981", tasks: ["Assess severity (Grade 1-3)", "RICE protocol advice", "Anti-inflammatory medication", "Consider imaging if Grade 2+"], scripts: ["Ibuprofen 400mg", "Voltaren Emulgel"], refs: ["X-ray (if indicated)", "Physio (6 sessions)"], fu: "10 days" },
];

const sc = s => s === "ready" ? GN : s === "confirmed" ? BL : O;

function Consult({ appt, onBack }) {
  const [tab, setTab] = useState("pre");
  const [notes, setNotes] = useState("");
  const [sel, setSel] = useState(null);
  const [applied, setApplied] = useState(false);
  const [inCall, setInCall] = useState(false);

  if (inCall) return (
    <div style={{ background: "#0A0A0A", borderRadius: 20, height: 460, position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "16px 22px", display: "flex", justifyContent: "space-between", zIndex: 2 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite" }} /><span style={{ color: W, fontSize: 12, fontWeight: 600 }}>Live</span></div>
        <span style={{ color: "#666", fontSize: 12 }}>{appt.pt} · {appt.type}</span>
      </div>
      <div style={{ width: 88, height: 88, borderRadius: 22, background: `linear-gradient(135deg, ${O}50, ${O}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 800, color: W, boxShadow: `0 0 50px ${O}30` }}>{appt.ini}</div>
      <div style={{ color: W, fontSize: 18, fontWeight: 800, marginTop: 14 }}>{appt.pt}</div>
      <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Video consultation in progress</div>
      <div style={{ display: "flex", gap: 14, marginTop: 28 }}>
        {[["🎤", "#333"], ["📹", "#333"], ["💬", "#333"], ["✕", "#DC2626"]].map(([ic, bg], i) => (
          <button key={i} onClick={i === 3 ? () => setInCall(false) : undefined} style={{ width: 50, height: 50, borderRadius: "50%", background: bg, border: "none", cursor: "pointer", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", color: W }}>{ic}</button>
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 16, right: 16, width: 130, height: 92, borderRadius: 12, background: "#1A1A1A", border: "2px solid #333", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${BL}, ${BL}CC)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: W }}>AB</div>
      </div>
    </div>
  );

  return (
    <div className="fi">
      <button onClick={onBack} style={{ background: "none", border: "none", color: "#BBB", cursor: "pointer", fontSize: 13, fontWeight: 600, marginBottom: 18, padding: 0 }}>← Back to appointments</button>
      <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: "20px 24px", marginBottom: 18, display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: W }}>{appt.ini}</div>
          <div><div style={{ fontSize: 18, fontWeight: 900, color: D }}>{appt.pt}</div><div style={{ fontSize: 13, color: "#AAA" }}>{appt.type} · {appt.date}, {appt.time} · Age {appt.age}</div></div>
        </div>
        <button onClick={() => setInCall(true)} style={{ padding: "11px 24px", border: "none", borderRadius: 12, background: `linear-gradient(135deg, ${GN}, #15803D)`, color: W, cursor: "pointer", fontSize: 14, fontWeight: 700, boxShadow: `0 4px 16px ${GN}30`, display: "flex", alignItems: "center", gap: 8 }}>{"📹"} Start Video Call</button>
      </div>

      <div style={{ display: "flex", gap: 0, marginBottom: 18 }}>
        {[["pre", "Pre-Screening"], ["notes", "Case Notes"], ["plan", "Care Plan"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "11px 22px", border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === k ? 700 : 500, color: tab === k ? O : "#BBB", background: "transparent", borderBottom: tab === k ? `3px solid ${O}` : "3px solid transparent", marginBottom: -1 }}>{l}</button>
        ))}
      </div>

      {tab === "pre" && <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: 26, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: D, marginBottom: 4 }}>Patient's Reported Symptoms</div>
        <div style={{ fontSize: 12.5, color: "#BBB", marginBottom: 18 }}>Submitted during booking</div>
        <div style={{ background: "#FAFAF8", borderRadius: 14, padding: "20px 22px", fontSize: 14, color: "#555", lineHeight: 1.7, borderLeft: `4px solid ${O}` }}>{appt.symptoms}</div>
        <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
          {[["Age", appt.age], ["Type", appt.type], ["Status", appt.st === "ready" ? "Ready" : "Confirmed"]].map(([l, v]) => (
            <div key={l} style={{ background: "#FAFAF8", borderRadius: 10, padding: "10px 16px", border: "1px solid #F0EFED" }}><div style={{ fontSize: 10, fontWeight: 700, color: "#CCC", textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</div><div style={{ fontSize: 14, fontWeight: 700, color: D, marginTop: 3 }}>{v}</div></div>
          ))}
        </div>
      </div>}

      {tab === "notes" && <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: 26, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: D, marginBottom: 14 }}>Consultation Notes</div>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Document your findings, assessment, and plan here..." style={{ width: "100%", minHeight: 200, padding: 18, border: "1.5px solid #E8E8E6", borderRadius: 14, fontSize: 14, resize: "vertical", lineHeight: 1.7, boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button style={{ padding: "11px 22px", borderRadius: 10, border: "1.5px solid #E8E8E6", background: W, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#999" }}>Save Draft</button>
          <button style={{ padding: "11px 22px", border: "none", borderRadius: 10, background: D, color: W, cursor: "pointer", fontSize: 13, fontWeight: 700 }}>Save & Finalise</button>
        </div>
      </div>}

      {tab === "plan" && <div>
        {!applied ? <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: 26, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: D, marginBottom: 4 }}>Apply a Care Plan</div>
          <div style={{ fontSize: 13, color: "#BBB", marginBottom: 20 }}>Select a clinical pathway for {appt.pt}.</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {pathways.map(p => (
              <button key={p.id} onClick={() => setSel(p)} style={{
                padding: "16px 18px", borderRadius: 14, cursor: "pointer", textAlign: "left",
                border: sel?.id === p.id ? `2.5px solid ${p.color}` : "1.5px solid #EEEDEB",
                background: sel?.id === p.id ? `${p.color}06` : W,
                boxShadow: sel?.id === p.id ? `0 4px 16px ${p.color}15` : "0 1px 3px rgba(0,0,0,0.03)",
                transition: "all 0.2s", width: "100%",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, marginBottom: 10 }} />
                <div style={{ fontSize: 13.5, fontWeight: 700, color: D }}>{p.name}</div>
                <div style={{ fontSize: 11.5, color: "#BBB", marginTop: 4 }}>{p.tasks.length} tasks · {p.scripts.length} scripts · {p.refs.length} referrals</div>
              </button>
            ))}
          </div>
          {sel && <div className="fi" style={{ marginTop: 20 }}>
            <div style={{ background: "#FAFAF8", borderRadius: 16, padding: "20px 22px", marginBottom: 16, border: "1px solid #F0EFED" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><div style={{ width: 10, height: 10, borderRadius: "50%", background: sel.color }} /><span style={{ fontSize: 14, fontWeight: 800, color: D }}>{sel.name}</span></div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#999", marginBottom: 6 }}>Tasks</div>
              {sel.tasks.map((t, i) => <div key={i} style={{ fontSize: 12.5, color: "#666", marginBottom: 3, paddingLeft: 14 }}>→ {t}</div>)}
              {sel.scripts.length > 0 && <><div style={{ fontSize: 12.5, fontWeight: 700, color: "#999", marginTop: 10, marginBottom: 6 }}>Prescriptions</div>{sel.scripts.map((s, i) => <div key={i} style={{ fontSize: 12.5, color: "#666", marginBottom: 3, paddingLeft: 14 }}>{"💊"} {s}</div>)}</>}
              {sel.refs.length > 0 && <><div style={{ fontSize: 12.5, fontWeight: 700, color: "#999", marginTop: 10, marginBottom: 6 }}>Referrals</div>{sel.refs.map((r, i) => <div key={i} style={{ fontSize: 12.5, color: "#666", marginBottom: 3, paddingLeft: 14 }}>{"📋"} {r}</div>)}</>}
              <div style={{ fontSize: 12.5, color: "#999", marginTop: 10 }}><strong>Follow-up:</strong> {sel.fu}</div>
            </div>
            <button onClick={() => setApplied(true)} style={{ padding: "14px 36px", border: "none", borderRadius: 12, background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W, cursor: "pointer", fontSize: 15, fontWeight: 800, boxShadow: `0 4px 20px ${O}35` }}>Apply Care Plan</button>
          </div>}
        </div> : <div style={{ background: W, borderRadius: 18, border: `2px solid ${GN}`, padding: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${GN}12`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: GN }}>{"✓"}</div>
            <div><div style={{ fontSize: 16, fontWeight: 900, color: GN }}>Care Plan Applied</div><div style={{ fontSize: 13, color: "#AAA" }}>{sel.name} for {appt.pt}</div></div>
          </div>
          <div style={{ background: "#FAFAF8", borderRadius: 14, padding: "16px 20px", border: "1px solid #F0EFED" }}>
            {[`${sel.tasks.length} treatment tasks created`, ...(sel.scripts.length ? [`${sel.scripts.length} prescription(s) ready`] : []), ...(sel.refs.length ? [`${sel.refs.length} referral(s) generated`] : []), `Follow-up: ${sel.fu}`, "Patient will see this in their portal"].map((t, i) => (
              <div key={i} style={{ fontSize: 13, color: "#666", marginBottom: 5 }}>{"✓"} {t}</div>
            ))}
          </div>
        </div>}
      </div>}
    </div>
  );
}

export default function PractPortal() {
  const [pg, setPg] = useState("appts");
  const [selAppt, setSelAppt] = useState(null);
  const [avail, setAvail] = useState({ Mon: [0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0], Tue: [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], Wed: [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1], Thu: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1], Fri: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] });
  const nav = [{ id: "appts", ic: "🩺", label: "Appointments", badge: "3" }, { id: "sched", ic: "📅", label: "My Schedule" }, { id: "plans", ic: "♡", label: "Care Plans" }, { id: "profile", ic: "⚙", label: "Profile" }];

  return (
    <div style={{ fontFamily: "'Outfit', -apple-system, sans-serif", background: "#FAFAF8", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        .fi { animation: fadeIn 0.35s ease both; }
        .sli { animation: slideIn 0.3s ease both; }
        .si { animation: scaleIn 0.3s ease both; }
        button, input, textarea { font-family: inherit; }
        textarea:focus { outline: none; border-color: ${O} !important; box-shadow: 0 0 0 3px ${O}15; }
      `}</style>

      <aside style={{ width: 240, background: W, borderRight: "1px solid #EEEDEB", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${O}, #D4461A)`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: W, fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>T</span></div>
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: 2.5, color: D }}>TOTIUM</span>
          </div>
          <div style={{ fontSize: 10.5, color: "#CCC", marginTop: 6, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Practitioner</div>
        </div>
        <nav style={{ padding: "6px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => { setPg(n.id); setSelAppt(null); }} style={{ display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "10px 14px", border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left", background: pg === n.id ? `${O}0A` : "transparent", color: pg === n.id ? O : "#999", fontWeight: pg === n.id ? 700 : 500, fontSize: 13.5, position: "relative" }}>
              <span style={{ fontSize: 15, width: 20, textAlign: "center", opacity: 0.7 }}>{n.ic}</span>{n.label}
              {n.badge && <span style={{ marginLeft: "auto", background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W, borderRadius: 10, padding: "1px 8px", fontSize: 10, fontWeight: 800 }}>{n.badge}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "18px 18px 22px", borderTop: "1px solid #EEEDEB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: W }}>AB</div>
            <div><div style={{ fontSize: 13, fontWeight: 700, color: D }}>Dr. Ana Blackwell</div><div style={{ fontSize: 11, color: "#CCC" }}>Melbourne CBD Clinic</div></div>
          </div>
        </div>
      </aside>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {!selAppt && <header style={{ background: W, borderBottom: "1px solid #EEEDEB", padding: "14px 32px", flexShrink: 0 }}><h1 style={{ fontSize: 17, fontWeight: 800, color: D }}>{nav.find(n => n.id === pg)?.label}</h1></header>}
        <main style={{ flex: 1, overflow: "auto", padding: selAppt ? "28px 32px" : 32 }}>
          {selAppt ? <Consult appt={selAppt} onBack={() => setSelAppt(null)} /> : <>

            {pg === "appts" && <div className="fi">{["Today", "Tomorrow"].map(dg => (
              <div key={dg} style={{ marginBottom: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#CCC", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>{dg}</div>
                {myAppts.filter(a => a.date === dg).map((a, i) => (
                  <button key={a.id} onClick={() => setSelAppt(a)} className="sli" style={{
                    width: "100%", background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "18px 22px", marginBottom: 10,
                    display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)", animationDelay: `${i * 50}ms`, transition: "box-shadow 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: W }}>{a.ini}</div>
                      <div><div style={{ fontSize: 15, fontWeight: 700, color: D }}>{a.pt}</div><div style={{ fontSize: 12.5, color: "#BBB" }}>{a.type} · {a.time}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ padding: "4px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${sc(a.st)}12`, color: sc(a.st) }}>{a.st === "ready" ? "Ready to join" : a.st === "confirmed" ? "Confirmed" : "Pending"}</span>
                      <span style={{ color: "#DDD", fontSize: 18 }}>›</span>
                    </div>
                  </button>
                ))}
              </div>
            ))}</div>}

            {pg === "sched" && <div className="fi">
              <p style={{ fontSize: 13, color: "#BBB", marginBottom: 16 }}>Click slots to toggle availability. Green = open for bookings.</p>
              <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead><tr style={{ background: "#FAFAF8" }}>
                    <th style={{ padding: "12px 18px", fontSize: 11, fontWeight: 700, color: "#CCC", textAlign: "left", textTransform: "uppercase", letterSpacing: 0.5 }}>Time</th>
                    {days.map(d => <th key={d} style={{ padding: "12px 8px", fontSize: 13, fontWeight: 800, color: D, textAlign: "center" }}>{d}</th>)}
                  </tr></thead>
                  <tbody>{times.map((t, idx) => (
                    <tr key={t} style={{ borderTop: "1px solid #F5F5F3" }}>
                      <td style={{ padding: "5px 18px", fontSize: 12, color: "#BBB", fontWeight: 600 }}>{t}</td>
                      {days.map(d => (
                        <td key={d} style={{ padding: "3px 5px", textAlign: "center" }}>
                          <button onClick={() => setAvail(p => ({ ...p, [d]: p[d].map((v, i) => i === idx ? v ? 0 : 1 : v) }))} style={{
                            width: "100%", height: 28, border: "none", borderRadius: 7, cursor: "pointer",
                            background: avail[d][idx] ? `linear-gradient(135deg, ${GN}18, ${GN}28)` : "#F5F5F3",
                            transition: "all 0.15s",
                          }}>
                            {avail[d][idx] && <span style={{ fontSize: 9, color: GN, fontWeight: 800 }}>{"●"}</span>}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}</tbody>
                </table>
              </div>
            </div>}

            {pg === "plans" && <div className="fi">
              <p style={{ fontSize: 13, color: "#BBB", marginBottom: 16 }}>Care plans you have applied to patients.</p>
              {[{ pt: "Jane Cooper", plan: "Upper Respiratory Tract Infection", date: "Today", tasks: 4, scripts: 2, fu: "7 days", c: "#F97316" }, { pt: "Tom Harris", plan: "Anxiety (Mild to Moderate)", date: "Yesterday", tasks: 4, scripts: 1, fu: "14 days", c: "#8B5CF6" }, { pt: "Lisa Park", plan: "Gastroenteritis", date: "2 days ago", tasks: 4, scripts: 2, fu: "3 days", c: "#06B6D4" }].map((c, i) => (
                <div key={i} className="sli" style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "18px 22px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", animationDelay: `${i * 50}ms`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: c.c }} />
                    <div><div style={{ fontSize: 14, fontWeight: 700, color: D }}>{c.pt}</div><div style={{ fontSize: 12, color: "#BBB" }}>{c.plan} · Applied {c.date}</div></div>
                  </div>
                  <div style={{ fontSize: 12, color: "#BBB" }}>{c.tasks} tasks · {c.scripts} scripts · Follow-up {c.fu}</div>
                </div>
              ))}
            </div>}

            {pg === "profile" && <div className="fi" style={{ maxWidth: 500 }}>
              <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 24, paddingBottom: 22, borderBottom: "1px solid #EEEDEB" }}>
                  <div style={{ width: 60, height: 60, borderRadius: 18, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: W }}>AB</div>
                  <div><div style={{ fontSize: 20, fontWeight: 900, color: D }}>Dr. Ana Blackwell</div><div style={{ fontSize: 14, color: "#AAA", marginBottom: 6 }}>General Practitioner · MBBS, FRACGP</div><span style={{ padding: "3px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${GN}12`, color: GN }}>Verified</span></div>
                </div>
                {[["Email", "ana.blackwell@totium.health"], ["Phone", "+61 4XX XXX XXX"], ["Organisation", "Melbourne CBD Clinic"], ["AHPRA Number", "MED00012345678"], ["Provider Number", "1234567A"]].map(([l, v]) => (
                  <div key={l} style={{ marginBottom: 16 }}><div style={{ fontSize: 11, fontWeight: 700, color: "#CCC", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>{l}</div><div style={{ fontSize: 15, fontWeight: 600, color: D }}>{v}</div></div>
                ))}
              </div>
            </div>}
          </>}
        </main>
      </div>
    </div>
  );
}
