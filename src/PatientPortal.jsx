import { useState, useEffect, useCallback } from "react";

const O = "#E8521F";
const D = "#1A1A1A";
const W = "#FFFFFF";
const GN = "#16A34A";
const BL = "#2563EB";

export default function TotiumPatient() {
  const [view, setView] = useState("book");
  const [step, setStep] = useState(0);
  const [bk, setBk] = useState(null);
  const [time, setTime] = useState(null);
  const [doc, setDoc] = useState(null);
  const [symp, setSymp] = useState("");
  const [per, setPer] = useState("morning");
  const [busy, setBusy] = useState(false);
  const [waitStep, setWaitStep] = useState(0);
  const [exp, setExp] = useState({ meds: true, refs: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (view !== "wait") return;
    const t = [
      setTimeout(() => setWaitStep(1), 1800),
      setTimeout(() => setWaitStep(2), 3600),
      setTimeout(() => setWaitStep(3), 5500),
    ];
    return () => t.forEach(clearTimeout);
  }, [view]);

  const morningSlots = ["9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
  const afternoonSlots = ["2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM"];
  const activeSlots = per === "morning" ? morningSlots : afternoonSlots;

  const doctors = [
    { id: 1, name: "Dr. Ana Blackwell", spec: "General Practitioner", ini: "AB", stars: 4.9, next: "Today, 2:30 PM" },
    { id: 2, name: "Dr. Thomas Tran", spec: "General Practitioner", ini: "TT", stars: 4.8, next: "Today, 3:00 PM" },
    { id: 3, name: "Dr. Maria Mirowski", spec: "General Practitioner", ini: "MM", stars: 4.7, next: "Tomorrow, 9:00 AM" },
  ];

  const bookSteps = ["Your Selection", "Your Details", "Pay & Book"];
  const calDays = Array.from({ length: 28 }, (_, i) => i + 1);

  const confirm = useCallback(() => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setBk({ time, doc });
      setView("wait");
      setWaitStep(0);
    }, 2000);
  }, [time, doc]);

  return (
    <div style={{ fontFamily: "'Outfit', 'SF Pro Display', -apple-system, sans-serif", background: "#FAFAF8", minHeight: "100vh", color: D }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes breathe { 0%,100% { transform:scale(1); opacity:0.6; } 50% { transform:scale(1.15); opacity:1; } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        .fi { animation: fadeIn 0.4s ease both; }
        .su { animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .si { animation: scaleIn 0.3s ease both; }
        button { font-family: inherit; }
        input, textarea { font-family: inherit; }
        input:focus, textarea:focus { outline: none; border-color: ${O} !important; box-shadow: 0 0 0 3px ${O}15; }
      `}</style>

      {/* ========== HEADER ========== */}
      <header style={{
        background: view === "call" ? "#111" : W,
        borderBottom: view === "call" ? "none" : "1px solid #EEEDEB",
        padding: "0 28px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: 3, color: view === "call" ? W : D }}>TOTIUM</span>
          </div>
          {view !== "book" && view !== "wait" && view !== "call" && (
            <nav style={{ display: "flex", gap: 4 }}>
              {[["dash", "Home"], ["plan", "My Care Plan"]].map(([k, l]) => (
                <button key={k} onClick={() => setView(k)} style={{
                  padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: view === k ? 700 : 500,
                  background: view === k ? `${O}10` : "transparent",
                  color: view === k ? O : "#999",
                }}>{l}</button>
              ))}
            </nav>
          )}
        </div>

        {/* Step progress for booking */}
        {view === "book" && (
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {bookSteps.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  background: i < step ? GN : i === step ? O : "#E8E8E6",
                  color: i <= step ? W : "#BBB",
                  transition: "all 0.3s ease",
                }}>{i < step ? "✓" : i + 1}</div>
                <span style={{ fontSize: 12, fontWeight: i === step ? 700 : 400, color: i === step ? D : "#BBB" }}>{s}</span>
                {i < bookSteps.length - 1 && <div style={{ width: 20, height: 1.5, background: i < step ? GN : "#E8E8E6", margin: "0 2px" }} />}
              </div>
            ))}
          </div>
        )}

        {view !== "book" && view !== "call" && (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {view === "wait" && <span style={{ fontSize: 12, color: "#999" }}>Booking confirmed</span>}
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: `linear-gradient(135deg, ${O}, #F97316)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: W,
            }}>JC</div>
          </div>
        )}
      </header>

      {/* ========== BOOKING PROGRESS BAR ========== */}
      {view === "book" && (
        <div style={{ height: 3, background: "#EEEDEB" }}>
          <div style={{
            height: "100%", background: `linear-gradient(90deg, ${O}, #F97316)`,
            width: `${((step + 1) / bookSteps.length) * 100}%`,
            transition: "width 0.5s cubic-bezier(0.16,1,0.3,1)",
            borderRadius: "0 2px 2px 0",
          }} />
        </div>
      )}

      {/* ========== MAIN CONTENT ========== */}
      <main style={{ maxWidth: view === "call" ? "100%" : 680, margin: "0 auto", padding: view === "call" ? 0 : "36px 24px" }}>

        {/* ===================== BOOKING FLOW ===================== */}
        {view === "book" && step === 0 && (
          <div key="step0" className="fi">
            <h1 style={{ fontSize: 28, fontWeight: 900, color: D, lineHeight: 1.2, marginBottom: 6 }}>
              The First Step to<br />Feeling Better
            </h1>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 24, lineHeight: 1.5 }}>
              Choose a time and we'll <span style={{ color: O, fontWeight: 600 }}>hold this slot for 20 minutes</span>. Complete your booking to secure your consultation.
            </p>

            {/* Mode toggle */}
            <div style={{ display: "flex", background: "#F0EFED", borderRadius: 10, padding: 3, marginBottom: 24, width: "fit-content" }}>
              {["Book a time", "Meet a GP now"].map((t, i) => (
                <button key={t} style={{
                  padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 600,
                  background: i === 0 ? D : "transparent", color: i === 0 ? W : "#999",
                }}>{t}</button>
              ))}
            </div>

            {/* Calendar */}
            <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "20px 22px", marginBottom: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontSize: 15, fontWeight: 700 }}>February 2026</span>
                <div style={{ display: "flex", gap: 4 }}>
                  {["‹", "›"].map(a => (
                    <button key={a} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #E8E8E6", background: W, cursor: "pointer", fontSize: 16, color: "#888", display: "flex", alignItems: "center", justifyContent: "center" }}>{a}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, textAlign: "center" }}>
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                  <div key={d} style={{ fontSize: 11, fontWeight: 600, color: "#CCC", padding: "6px 0" }}>{d}</div>
                ))}
                {calDays.map(d => {
                  const today = d === 24;
                  const past = d < 24;
                  return (
                    <button key={d} disabled={past} style={{
                      padding: "8px 0", borderRadius: 10, border: "none", cursor: past ? "default" : "pointer",
                      fontSize: 13, fontWeight: today ? 800 : 500,
                      background: today ? O : "transparent",
                      color: today ? W : past ? "#DDD" : D,
                      transition: "all 0.15s",
                    }}>{d}</button>
                  );
                })}
              </div>
            </div>

            {/* Period toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {["morning", "afternoon"].map(p => (
                <button key={p} onClick={() => { setPer(p); setTime(null); }} style={{
                  padding: "7px 18px", borderRadius: 100, cursor: "pointer", fontSize: 12.5, fontWeight: 600,
                  border: per === p ? `2px solid ${O}` : "1.5px solid #E8E8E6",
                  background: per === p ? `${O}08` : W, color: per === p ? O : "#888",
                  textTransform: "capitalize",
                }}>{p === "morning" ? "☀️ Morning" : "☁️ Afternoon"}</button>
              ))}
            </div>

            {/* Time slots */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {activeSlots.map(t => (
                <button key={t} onClick={() => setTime(t)} style={{
                  padding: "10px 18px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600,
                  border: time === t ? `2px solid ${O}` : "1.5px solid #E8E8E6",
                  background: time === t ? `linear-gradient(135deg, ${O}08, ${O}12)` : W,
                  color: time === t ? O : D,
                  transition: "all 0.2s", boxShadow: time === t ? `0 0 0 3px ${O}10` : "none",
                }}>{t}</button>
              ))}
            </div>

            {/* Doctor cards */}
            {time && (
              <div className="fi" style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#BBB", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>Meet a GP Now</div>
                {doctors.map((d, i) => (
                  <button key={d.id} onClick={() => setDoc(d)} className="su" style={{
                    width: "100%", padding: "16px 18px", marginBottom: 10, borderRadius: 14, cursor: "pointer", textAlign: "left",
                    border: doc?.id === d.id ? `2px solid ${O}` : "1.5px solid #EEEDEB",
                    background: doc?.id === d.id ? `linear-gradient(135deg, ${O}04, ${O}08)` : W,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    animationDelay: `${i * 80}ms`,
                    boxShadow: doc?.id === d.id ? `0 4px 20px ${O}12` : "0 1px 3px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: 12,
                        background: `linear-gradient(135deg, ${D}, #333)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700, color: W,
                      }}>{d.ini}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: D }}>{d.name}</div>
                        <div style={{ fontSize: 12, color: "#AAA" }}>{d.spec} · ⭐ {d.stars}</div>
                      </div>
                    </div>
                    <div style={{
                      padding: "7px 16px", borderRadius: 8,
                      background: doc?.id === d.id ? O : `${O}10`,
                      color: doc?.id === d.id ? W : O,
                      fontSize: 12, fontWeight: 700, transition: "all 0.2s",
                    }}>Request Care</div>
                  </button>
                ))}
              </div>
            )}

            {time && doc && (
              <button onClick={() => setStep(1)} className="si" style={{
                width: "100%", padding: "15px", border: "none", borderRadius: 12, cursor: "pointer",
                background: `linear-gradient(135deg, ${O}, #D4461A)`,
                color: W, fontSize: 15, fontWeight: 700,
                boxShadow: `0 4px 20px ${O}40`,
                transition: "transform 0.2s, box-shadow 0.2s",
              }}>Add to Proceed →</button>
            )}
          </div>
        )}

        {view === "book" && step === 1 && (
          <div key="step1" className="fi">
            <h1 style={{ fontSize: 28, fontWeight: 900, color: D, marginBottom: 6 }}>Tell us about your health concerns</h1>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 24, lineHeight: 1.5 }}>Describe your symptoms or concerns below. Attach photos or relevant documents if helpful.</p>

            <div style={{ position: "relative", marginBottom: 16 }}>
              <textarea value={symp} onChange={e => setSymp(e.target.value)} placeholder="E.g. I've had a persistent cough for about 5 days, along with a mild fever and sore throat. I've tried over-the-counter cough syrup with no improvement..."
                style={{
                  width: "100%", minHeight: 160, padding: "18px 20px", border: "1.5px solid #E8E8E6", borderRadius: 14,
                  fontSize: 14, resize: "vertical", lineHeight: 1.7, boxSizing: "border-box",
                  background: W, transition: "border 0.2s, box-shadow 0.2s",
                }} />
              <div style={{ position: "absolute", bottom: 12, right: 12, display: "flex", gap: 6 }}>
                {["🎤", "📷"].map(ic => (
                  <button key={ic} style={{
                    width: 34, height: 34, borderRadius: 10, border: "1px solid #E8E8E6", background: "#FAFAF8",
                    cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{ic}</button>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {["Sore throat", "Headache", "Skin issue", "Anxiety", "Stomach pain", "Cough"].map(t => (
                <button key={t} onClick={() => setSymp(s => s ? s + ", " + t.toLowerCase() : t)} style={{
                  padding: "6px 14px", borderRadius: 100, border: "1.5px solid #E8E8E6", background: W,
                  cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#888",
                }}>{t}</button>
              ))}
            </div>

            {/* Emergency banner */}
            <div style={{
              background: "linear-gradient(135deg, #FEF2F2, #FFF5F5)", border: "1.5px solid #FECACA", borderRadius: 14,
              padding: "16px 18px", marginBottom: 24,
            }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", marginBottom: 4 }}>Please call 000 for any emergency symptoms.</div>
              <div style={{ fontSize: 12, color: "#999", lineHeight: 1.5 }}>Chest pain, difficulty breathing, severe bleeding, or life-threatening symptoms require immediate emergency care.</div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(0)} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "1.5px solid #E8E8E6", background: W, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#999" }}>← Back</button>
              <button onClick={() => setStep(2)} disabled={!symp} style={{
                flex: 2, padding: "14px", border: "none", borderRadius: 12, cursor: symp ? "pointer" : "default",
                background: symp ? `linear-gradient(135deg, ${O}, #D4461A)` : "#DDD",
                color: W, fontSize: 14, fontWeight: 700, boxShadow: symp ? `0 4px 20px ${O}30` : "none",
              }}>Continue →</button>
            </div>
          </div>
        )}

        {view === "book" && step === 2 && (
          <div key="step2" className="fi">
            <h1 style={{ fontSize: 28, fontWeight: 900, color: D, marginBottom: 6 }}>Secure your booking</h1>
            <p style={{ fontSize: 14, color: "#999", marginBottom: 24 }}>We'll add your Medicare and payment details, then confirm your appointment.</p>

            {/* Fee banner */}
            <div style={{
              background: `linear-gradient(135deg, ${O}06, ${O}10)`, border: `1.5px solid ${O}25`,
              borderRadius: 14, padding: "18px 22px", marginBottom: 24,
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#999", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 2 }}>Consultation Fee</div>
                <div style={{ fontSize: 12, color: "#AAA" }}>With {doc?.name} · Today, {time}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 900, color: O }}>$50</div>
            </div>

            {/* Medicare section */}
            <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "22px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: D, marginBottom: 14 }}>Medicare Details</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Card Number", "1234 56789 0", "1fr / span 2"], ["IRN", "1", ""], ["Expiry", "03/2027", ""]].map(([l, p, span]) => (
                  <div key={l} style={{ gridColumn: span || "auto" }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#BBB", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</label>
                    <input placeholder={p} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E8E8E6", borderRadius: 10, fontSize: 14, boxSizing: "border-box", transition: "all 0.2s" }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment section */}
            <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "22px", marginBottom: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: D }}>Payment</div>
                <div style={{ fontSize: 11, color: "#BBB", display: "flex", alignItems: "center", gap: 4 }}>🔒 Secured by Stripe</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["First Name", "Jane", ""], ["Last Name", "Cooper", ""], ["Card Number", "4242 4242 4242 4242", "1fr / span 2"], ["MM/YY", "03/28", ""], ["CVC", "123", ""]].map(([l, p, span]) => (
                  <div key={l} style={{ gridColumn: span || "auto" }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: "#BBB", display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</label>
                    <input placeholder={p} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E8E8E6", borderRadius: 10, fontSize: 14, boxSizing: "border-box", transition: "all 0.2s" }} />
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", borderRadius: 12, border: "1.5px solid #E8E8E6", background: W, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#999" }}>← Back</button>
              <button onClick={confirm} style={{
                flex: 2, padding: "14px", border: "none", borderRadius: 12, cursor: "pointer",
                background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W,
                fontSize: 14, fontWeight: 700, boxShadow: `0 4px 20px ${O}40`,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              }}>
                {busy ? <><div style={{ width: 16, height: 16, border: "2.5px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite" }} />Processing...</> : "Confirm Booking →"}
              </button>
            </div>
          </div>
        )}

        {/* ===================== WAITING ROOM ===================== */}
        {view === "wait" && (
          <div className="fi" style={{ maxWidth: 520, margin: "0 auto" }}>
            {/* Hero card */}
            <div style={{
              background: `linear-gradient(135deg, ${O}08, #FFF7ED)`,
              borderRadius: 20, padding: "32px 28px", marginBottom: 24, textAlign: "center",
              borderLeft: `4px solid ${O}`,
            }}>
              <h2 style={{ fontSize: 22, fontWeight: 900, color: D, lineHeight: 1.3, marginBottom: 8 }}>
                Thanks for pulling through, you've done the hard part.
              </h2>
              <p style={{ fontSize: 13, color: "#999" }}>We'll alert you the moment your doctor is ready.</p>
            </div>

            {/* Appointment card */}
            <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "22px 24px", marginBottom: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: D }}>Today, {bk?.time}</div>
                  <div style={{ fontSize: 13, color: "#AAA", marginTop: 2 }}>With {bk?.doc?.name}</div>
                </div>
                <div style={{ padding: "5px 12px", borderRadius: 100, background: waitStep >= 3 ? `${GN}12` : `${O}12`, fontSize: 11, fontWeight: 700, color: waitStep >= 3 ? GN : O }}>
                  {waitStep >= 3 ? "Ready" : "Preparing"}
                </div>
              </div>

              {[
                { l: "Booking confirmed", d: "Your appointment is secured" },
                { l: "Finding your GP", d: `Matching you with ${bk?.doc?.name || "a practitioner"}` },
                { l: "Getting ready", d: "Your GP is reviewing your symptoms" },
                { l: "Your GP is waiting for you", d: "Join your consultation now" },
              ].map((it, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: i < 3 ? 16 : 0, opacity: i <= waitStep ? 1 : 0.35, transition: "opacity 0.5s ease" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: i < waitStep ? GN : i === waitStep ? W : "#F0F0EE",
                      border: i === waitStep ? `2.5px solid ${O}` : i < waitStep ? "none" : "1.5px solid #E0E0DE",
                      transition: "all 0.4s",
                    }}>
                      {i < waitStep && <span style={{ color: W, fontSize: 11, fontWeight: 800 }}>{"✓"}</span>}
                      {i === waitStep && <div style={{ width: 7, height: 7, borderRadius: "50%", background: O, animation: "breathe 1.5s ease infinite" }} />}
                    </div>
                    {i < 3 && <div style={{ width: 2, flex: 1, marginTop: 4, background: i < waitStep ? GN : "#E8E8E6", transition: "background 0.5s", minHeight: 16 }} />}
                  </div>
                  <div style={{ paddingBottom: 2 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: i < waitStep ? GN : i === waitStep ? D : "#CCC" }}>{it.l}</div>
                    <div style={{ fontSize: 12, color: i <= waitStep ? "#AAA" : "#DDD" }}>{it.d}</div>
                  </div>
                </div>
              ))}
            </div>

            {waitStep >= 3 && (
              <button onClick={() => setView("call")} className="su" style={{
                width: "100%", padding: "16px", border: "none", borderRadius: 14, cursor: "pointer",
                background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W,
                fontSize: 16, fontWeight: 800, boxShadow: `0 6px 30px ${O}40`,
              }}>Join Your Consultation →</button>
            )}
          </div>
        )}

        {/* ===================== VIDEO CALL ===================== */}
        {view === "call" && (
          <div className="si" style={{ height: "calc(100vh - 56px)", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: 20, left: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#EF4444", animation: "pulse 1.5s infinite" }} />
              <span style={{ color: W, fontSize: 12, fontWeight: 600 }}>Live</span>
              <span style={{ color: "#666", fontSize: 12, marginLeft: 8 }}>{bk?.doc?.name}</span>
            </div>

            <div style={{
              width: 100, height: 100, borderRadius: 24,
              background: `linear-gradient(135deg, ${O}40, ${O}80)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, fontWeight: 800, color: W,
              boxShadow: `0 0 60px ${O}30`,
            }}>{bk?.doc?.ini}</div>
            <div style={{ color: W, fontSize: 20, fontWeight: 800, marginTop: 16 }}>Hi Jane, {bk?.doc?.name?.split(" ")[1]} is with you</div>
            <div style={{ color: "#666", fontSize: 13, marginTop: 4 }}>Your consultation is in progress</div>

            <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
              {[
                { ic: "🎤", bg: "#333" },
                { ic: "📹", bg: "#333" },
                { ic: "💬", bg: "#333" },
                { ic: "✕", bg: "#DC2626", action: () => setView("plan") },
              ].map((b, i) => (
                <button key={i} onClick={b.action} style={{
                  width: 52, height: 52, borderRadius: "50%", background: b.bg, border: "none", cursor: "pointer",
                  fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", color: W,
                  transition: "transform 0.15s",
                }}>{b.ic}</button>
              ))}
            </div>

            <div style={{
              position: "absolute", bottom: 24, right: 24, width: 140, height: 100, borderRadius: 14,
              background: "#1A1A1A", border: "2px solid #333",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: `linear-gradient(135deg, ${O}, #F97316)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: W,
              }}>JC</div>
            </div>
          </div>
        )}

        {/* ===================== CARE PLAN ===================== */}
        {view === "plan" && (
          <div key="plan" className="fi" style={{ maxWidth: 580, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px",
                borderRadius: 100, background: `${GN}10`, marginBottom: 12,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: GN }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: GN }}>Consultation Complete</span>
              </div>
              <h1 style={{ fontSize: 26, fontWeight: 900, color: D, lineHeight: 1.2 }}>
                Your Care Plan is ready.<br />Let's get you feeling better.
              </h1>
              <p style={{ fontSize: 13, color: "#AAA", marginTop: 8, lineHeight: 1.5 }}>
                We've confirmed your diagnosis and set up everything you need. Your prescriptions are ready,
                and we've tentatively reserved appointment times for your next steps.
              </p>
            </div>

            {/* Tab toggle */}
            <div style={{ display: "flex", background: "#F0EFED", borderRadius: 10, padding: 3, marginBottom: 24 }}>
              {["Consult Summary", "Your Care Plan"].map((t, i) => (
                <button key={t} style={{
                  flex: 1, padding: "10px", borderRadius: 8, border: "none", cursor: "pointer",
                  fontSize: 13, fontWeight: 700,
                  background: i === 1 ? O : "transparent",
                  color: i === 1 ? W : "#999",
                }}>{t}</button>
              ))}
            </div>

            {/* Care Plan Card */}
            <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              {/* Header */}
              <div style={{ padding: "20px 24px", borderBottom: "1px solid #EEEDEB" }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: D }}>Your Care Plan</div>
                <div style={{ fontSize: 12.5, color: "#AAA", marginTop: 3 }}>Diagnosis: Upper Respiratory Tract Infection (URTI) Treatment Plan</div>
              </div>

              {/* Status banner */}
              <div style={{ padding: "14px 24px", background: `${GN}06`, borderBottom: "1px solid #EEEDEB" }}>
                <div style={{ fontSize: 12.5, color: GN, fontWeight: 500, lineHeight: 1.5 }}>
                  {"✓"} We've already set up your medication(s), tests and check-ins. Review them below and change timings if they don't suit you.
                </div>
              </div>

              {/* Medications accordion */}
              <button onClick={() => setExp(p => ({ ...p, meds: !p.meds }))} style={{
                width: "100%", padding: "16px 24px", background: W, border: "none", borderBottom: "1px solid #EEEDEB",
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: D }}>{"💊"} Steps to Take Now</span>
                <span style={{ color: "#CCC", fontSize: 16, transform: exp.meds ? "rotate(180deg)" : "", transition: "transform 0.25s" }}>{"▾"}</span>
              </button>
              {exp.meds && (
                <div className="fi" style={{ padding: "16px 24px", borderBottom: "1px solid #EEEDEB" }}>
                  <div style={{
                    background: `linear-gradient(135deg, ${O}06, ${O}10)`, border: `1px solid ${O}20`,
                    borderRadius: 12, padding: "12px 16px", marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 12, color: O, fontWeight: 600 }}>Your GP has already sent these prescriptions to your pharmacy. Tap to view or change pharmacy.</div>
                  </div>
                  {[
                    { name: "Paracetamol 500mg", dose: "As needed", dur: "Take 1-2 tablets, max 8/day" },
                    { name: "Ibuprofen 200mg", dose: "With food", dur: "Take 1 tablet, 3x daily" },
                  ].map((m, i) => (
                    <div key={i} style={{
                      padding: "14px 16px", background: "#FAFAF8", borderRadius: 12, marginBottom: 8,
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      border: "1px solid #F0EFED",
                    }}>
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: D }}>{m.name}</div>
                        <div style={{ fontSize: 12, color: "#AAA", marginTop: 2 }}>{m.dose} · {m.dur}</div>
                      </div>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#F0EFED", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 14 }}>{"📋"}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Referrals accordion */}
              <button onClick={() => setExp(p => ({ ...p, refs: !p.refs }))} style={{
                width: "100%", padding: "16px 24px", background: W, border: "none",
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: D }}>{"📋"} Your Referrals & Follow-ups</span>
                <span style={{ color: "#CCC", fontSize: 16, transform: exp.refs ? "rotate(180deg)" : "", transition: "transform 0.25s" }}>{"▾"}</span>
              </button>
              {exp.refs && (
                <div className="fi" style={{ padding: "16px 24px" }}>
                  <div style={{
                    background: `${BL}06`, border: `1px solid ${BL}20`, borderRadius: 12, padding: "12px 16px", marginBottom: 16,
                  }}>
                    <div style={{ fontSize: 12, color: BL, fontWeight: 600 }}>Referrals are being prepared by your GP. We'll notify you once confirmed.</div>
                  </div>
                  {[
                    { name: "Follow-up with Dr. Blackwell", status: "Booked", detail: "Tuesday, 3 Mar 2026 · 10:00 AM AEDT", sc: GN },
                  ].map((r, i) => (
                    <div key={i} style={{ padding: "14px 16px", background: "#FAFAF8", borderRadius: 12, border: "1px solid #F0EFED" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 13.5, fontWeight: 700, color: D }}>{r.name}</span>
                        <span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${r.sc}12`, color: r.sc }}>{r.status}</span>
                      </div>
                      <div style={{ fontSize: 12, color: "#AAA" }}>{r.detail}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== DASHBOARD ===================== */}
        {view === "dash" && (
          <div key="dash" className="fi" style={{ maxWidth: 580, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: `linear-gradient(135deg, ${O}, #F97316)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 18, fontWeight: 800, color: W,
              }}>JC</div>
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 900, color: D }}>Welcome back, Jane</h1>
                <div style={{ fontSize: 13, color: "#AAA", marginTop: 2 }}>Active treatment · 1 upcoming appointment</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
              {/* Tasks */}
              <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>My Tasks</div>
                {[
                  { t: "Take Paracetamol 500mg", done: true },
                  { t: "Apply Ibuprofen if needed", done: false },
                  { t: "Complete pathology test", done: false },
                ].map((task, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                      border: task.done ? "none" : "1.5px solid #DDD",
                      background: task.done ? GN : "transparent",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, color: W, fontWeight: 800,
                    }}>{task.done ? "✓" : ""}</div>
                    <span style={{ fontSize: 12.5, color: task.done ? "#CCC" : D, textDecoration: task.done ? "line-through" : "none" }}>{task.t}</span>
                  </div>
                ))}
              </div>

              {/* Next Appointment */}
              <div style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "18px 20px", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 12 }}>Upcoming</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: D }}>Follow-up with Dr. Blackwell</div>
                <div style={{ fontSize: 12, color: "#AAA", marginTop: 4, marginBottom: 12 }}>Tue, 3 Mar · 10:00 AM</div>
                <button style={{
                  padding: "8px 16px", borderRadius: 8, border: "1.5px solid #E8E8E6", background: W,
                  cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#999",
                }}>Manage</button>
              </div>
            </div>

            {/* Active Care Plan */}
            <div style={{
              background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "20px 22px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)", cursor: "pointer",
            }} onClick={() => setView("plan")}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Active Care Plan</div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: D }}>Upper Respiratory Tract Infection</div>
                  <div style={{ fontSize: 12, color: "#AAA", marginTop: 4 }}>Dr. Ana Blackwell · Started today</div>
                </div>
                <span style={{ fontSize: 18, color: "#CCC" }}>{"›"}</span>
              </div>
              <div style={{ display: "flex", gap: 6, marginTop: 14 }}>
                {["2 medications", "1 follow-up"].map(t => (
                  <span key={t} style={{ padding: "4px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${O}10`, color: O }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
