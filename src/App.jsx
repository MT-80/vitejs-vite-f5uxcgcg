import { useState } from "react";
import PatientPortal from "./PatientPortal";
import AdminPortal from "./AdminPortal";
import PractitionerPortal from "./PractitionerPortal";

const O = "#E8521F";
const D = "#1A1A1A";
const W = "#FFFFFF";
const BL = "#2563EB";
const PR = "#7C3AED";

const globalCSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family: 'Outfit', -apple-system, sans-serif; background: #FAFAF8; }
@keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
@keyframes slideIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
@keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
@keyframes spin { to { transform: rotate(360deg); } }
@keyframes breathe { 0%,100% { transform:scale(1); opacity:0.6; } 50% { transform:scale(1.15); opacity:1; } }
@keyframes growBar { from { height: 0; } }
.fi { animation: fadeIn 0.35s ease both; }
.sli { animation: slideIn 0.3s ease both; }
.si { animation: scaleIn 0.3s ease both; }
.su { animation: fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
button, input, textarea { font-family: 'Outfit', -apple-system, sans-serif; }
input:focus, textarea:focus { outline: none; border-color: ${O} !important; box-shadow: 0 0 0 3px rgba(232,82,31,0.08); }
::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
`;

const portals = [
  { id: "patient", title: "Patient Portal", desc: "Book a consultation, describe symptoms, pay, join a video call, and receive a care plan.", icon: "👤", color: O },
  { id: "practitioner", title: "Practitioner Portal", desc: "Manage your schedule, view pre-screening data, conduct consultations, and apply care plans.", icon: "🩺", color: BL },
  { id: "admin", title: "Admin Portal", desc: "Manage organisations, practitioners, appointments, and monitor platform metrics.", icon: "⚙️", color: PR },
];

function Landing({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, background: "linear-gradient(180deg, #FAFAF8 0%, #F0EFED 100%)" }}>
      <style>{globalCSS}</style>
      <div className="fi" style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: `linear-gradient(135deg, ${O}, #D4461A)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: W, fontSize: 16, fontWeight: 900, letterSpacing: 1 }}>T</span>
          </div>
          <span style={{ fontSize: 24, fontWeight: 900, letterSpacing: 3, color: D }}>TOTIUM</span>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: D, lineHeight: 1.2, marginBottom: 8 }}>MVP Portal Demos</h1>
        <p style={{ fontSize: 16, color: "#999", maxWidth: 480 }}>Interactive prototypes for the Totium telehealth platform. Select a portal to explore.</p>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", maxWidth: 900 }}>
        {portals.map((p, i) => (
          <button key={p.id} onClick={() => onSelect(p.id)} className="su" style={{
            width: 260, padding: "32px 28px", borderRadius: 20, border: "1px solid #EEEDEB",
            background: W, cursor: "pointer", textAlign: "left",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            transition: "all 0.25s", animationDelay: `${i * 100}ms`,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${p.color}15`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
          >
            <div style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: D, marginBottom: 6 }}>{p.title}</div>
            <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.5, marginBottom: 20 }}>{p.desc}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: p.color }}>
              Open demo <span style={{ fontSize: 16 }}>→</span>
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: 48, fontSize: 12, color: "#CCC" }}>Totium + Iterators | MVP Phase 2 | Confidential</div>
    </div>
  );
}

function DemoBanner({ onClick, label, color }) {
  return (
    <div style={{
      background: D, padding: "0 20px", height: 36,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexShrink: 0,
    }}>
      <button onClick={onClick} style={{
        background: "none", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", gap: 8,
        fontSize: 12, fontWeight: 600, color: "#999",
        transition: "color 0.15s",
      }}
        onMouseEnter={(e) => e.currentTarget.style.color = W}
        onMouseLeave={(e) => e.currentTarget.style.color = "#999"}
      >
        ← All Portals
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: color }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#777", letterSpacing: 0.5 }}>{label} Demo</span>
      </div>
      <div style={{ width: 80 }} />
    </div>
  );
}

function PatientBackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "fixed", bottom: 16, right: 16, zIndex: 1000,
      display: "flex", alignItems: "center", gap: 6,
      padding: "10px 16px", borderRadius: 12,
      background: D, border: "none",
      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
      cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#999",
      transition: "all 0.2s",
    }}
      onMouseEnter={(e) => { e.currentTarget.style.color = W; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
      ← All Portals
    </button>
  );
}

export default function App() {
  const [active, setActive] = useState(null);
  const goHome = () => setActive(null);

  if (active === "patient") return (
    <>
      <style>{globalCSS}</style>
      <PatientBackButton onClick={goHome} />
      <PatientPortal />
    </>
  );

  if (active === "admin") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <style>{globalCSS}</style>
      <DemoBanner onClick={goHome} label="Admin Portal" color={PR} />
      <div style={{ flex: 1, overflow: "auto" }}>
        <AdminPortal />
      </div>
    </div>
  );

  if (active === "practitioner") return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <style>{globalCSS}</style>
      <DemoBanner onClick={goHome} label="Practitioner Portal" color={BL} />
      <div style={{ flex: 1, overflow: "auto" }}>
        <PractitionerPortal />
      </div>
    </div>
  );

  return <Landing onSelect={setActive} />;
}
