import { useState, useEffect } from "react";

const O = "#E8521F";
const D = "#1A1A1A";
const W = "#FFFFFF";
const GN = "#16A34A";
const BL = "#2563EB";
const PR = "#7C3AED";

const practitioners = [
  { id: 1, name: "Dr. Ana Blackwell", spec: "General Practitioner", org: "Melbourne CBD Clinic", status: "Active", pts: 34, appts: 128, ini: "AB" },
  { id: 2, name: "Dr. Thomas Tran", spec: "General Practitioner", org: "Melbourne CBD Clinic", status: "Active", pts: 28, appts: 97, ini: "TT" },
  { id: 3, name: "Dr. Maria Mirowski", spec: "General Practitioner", org: "Sydney North Practice", status: "Active", pts: 19, appts: 64, ini: "MM" },
  { id: 4, name: "Dr. James Chen", spec: "General Practitioner", org: "Sydney North Practice", status: "Pending", pts: 0, appts: 0, ini: "JC" },
  { id: 5, name: "Dr. Sarah Williams", spec: "General Practitioner", org: "Brisbane South Clinic", status: "Invited", pts: 0, appts: 0, ini: "SW" },
];
const orgs = [
  { id: 1, name: "Melbourne CBD Clinic", docs: 2, pts: 62, status: "Active", since: "Nov 2025" },
  { id: 2, name: "Sydney North Practice", docs: 2, pts: 19, status: "Active", since: "Dec 2025" },
  { id: 3, name: "Brisbane South Clinic", docs: 1, pts: 0, status: "Setting up", since: "Feb 2026" },
];
const plans = [
  { id: 1, name: "Upper Respiratory Tract Infection", ab: "URTI", paths: 4, uses: 47, status: "Active" },
  { id: 2, name: "Anxiety (Mild to Moderate)", ab: "ANX", paths: 3, uses: 31, status: "Active" },
  { id: 3, name: "Gastroenteritis", ab: "GAST", paths: 3, uses: 22, status: "Active" },
  { id: 4, name: "STI Screening & Treatment", ab: "STI", paths: 5, uses: 0, status: "Draft" },
  { id: 5, name: "Sprained Ankle", ab: "ANKL", paths: 3, uses: 0, status: "Draft" },
];
const appts = [
  { id: 1, pt: "Jane Cooper", doc: "Dr. Ana Blackwell", time: "2:30 PM", date: "Today", type: "Initial", st: "Confirmed", paid: true },
  { id: 2, pt: "Michael Brown", doc: "Dr. Thomas Tran", time: "3:00 PM", date: "Today", type: "Follow-up", st: "Confirmed", paid: true },
  { id: 3, pt: "Sarah Lee", doc: "Dr. Ana Blackwell", time: "4:15 PM", date: "Today", type: "Initial", st: "In Progress", paid: true },
  { id: 4, pt: "David Kim", doc: "Dr. Maria Mirowski", time: "9:00 AM", date: "Tomorrow", type: "Review", st: "Confirmed", paid: true },
  { id: 5, pt: "Emma Wilson", doc: "Dr. Thomas Tran", time: "10:30 AM", date: "Tomorrow", type: "Initial", st: "Pending", paid: false },
  { id: 6, pt: "Tom Harris", doc: "Dr. Ana Blackwell", time: "11:00 AM", date: "Tomorrow", type: "Follow-up", st: "Confirmed", paid: true },
];

const sc = s => s === "Active" || s === "Confirmed" ? GN : s === "In Progress" ? BL : s === "Pending" || s === "Setting up" ? O : "#999";

function InviteModal({ onClose }) {
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div className="si" onClick={e => e.stopPropagation()} style={{ background: W, borderRadius: 24, width: 440, padding: "36px 32px", boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>
        {!sent ? <>
          <h3 style={{ fontSize: 20, fontWeight: 900, color: D, marginBottom: 4 }}>Invite Practitioner</h3>
          <p style={{ fontSize: 13, color: "#AAA", marginBottom: 28 }}>They'll receive an email to join Totium.</p>
          {[["Full Name", "Dr. First Last"], ["Email", "doctor@clinic.com.au"], ["Organisation", "Select organisation"]].map(([l, p]) => (
            <div key={l} style={{ marginBottom: 18 }}>
              <label style={{ fontSize: 11, fontWeight: 700, color: "#BBB", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</label>
              <input placeholder={p} style={{ width: "100%", padding: "12px 14px", border: "1.5px solid #E8E8E6", borderRadius: 12, fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "13px", borderRadius: 12, border: "1.5px solid #E8E8E6", background: W, cursor: "pointer", fontSize: 14, fontWeight: 600, color: "#999", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={() => setSent(true)} style={{ flex: 1, padding: "13px", border: "none", borderRadius: 12, background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit", boxShadow: `0 4px 16px ${O}30` }}>Send Invite</button>
          </div>
        </> : <>
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${GN}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 24, color: GN }}>&#10003;</div>
            <h3 style={{ fontSize: 20, fontWeight: 900, color: D, marginBottom: 8 }}>Invitation Sent</h3>
            <p style={{ fontSize: 13, color: "#AAA", marginBottom: 28 }}>They'll get an email with instructions to activate their account.</p>
            <button onClick={onClose} style={{ padding: "13px 40px", border: "none", borderRadius: 12, background: D, color: W, cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "inherit" }}>Done</button>
          </div>
        </>}
      </div>
    </div>
  );
}

export default function AdminPortal() {
  const [pg, setPg] = useState("dash");
  const [modal, setModal] = useState(false);
  const nav = [
    { id: "dash", icon: "◫", label: "Dashboard" },
    { id: "orgs", icon: "⬡", label: "Organisations" },
    { id: "docs", icon: "⚕", label: "Practitioners" },
    { id: "appts", icon: "▦", label: "Appointments" },
    { id: "plans", icon: "♡", label: "Care Plans" },
  ];

  const bars = [35, 42, 38, 55, 48, 62, 58, 71, 65, 78, 82, 73];

  return (
    <div style={{ fontFamily: "'Outfit', -apple-system, sans-serif", background: "#FAFAF8", minHeight: "100vh", display: "flex" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { margin:0; padding:0; box-sizing:border-box; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:scale(1); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }
        @keyframes growBar { from { height: 0; } }
        .fi { animation: fadeIn 0.35s ease both; }
        .si { animation: scaleIn 0.3s ease both; }
        .sli { animation: slideIn 0.3s ease both; }
        button, input { font-family: inherit; }
        input:focus { outline: none; border-color: ${O} !important; box-shadow: 0 0 0 3px ${O}15; }
      `}</style>

      {/* Sidebar */}
      <aside style={{ width: 240, background: W, borderRight: "1px solid #EEEDEB", display: "flex", flexDirection: "column", flexShrink: 0, height: "100vh", position: "sticky", top: 0 }}>
        <div style={{ padding: "24px 24px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg, ${O}, #D4461A)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: W, fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>T</span>
            </div>
            <span style={{ fontSize: 17, fontWeight: 900, letterSpacing: 2.5, color: D }}>TOTIUM</span>
          </div>
          <div style={{ fontSize: 10.5, color: "#CCC", marginTop: 6, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Admin Portal</div>
        </div>
        <nav style={{ padding: "6px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPg(n.id)} style={{
              display: "flex", alignItems: "center", gap: 11, width: "100%", padding: "10px 14px",
              border: "none", borderRadius: 10, cursor: "pointer", textAlign: "left",
              background: pg === n.id ? `${O}0A` : "transparent",
              color: pg === n.id ? O : "#999",
              fontWeight: pg === n.id ? 700 : 500, fontSize: 13.5,
              transition: "all 0.15s",
            }}>
              <span style={{ fontSize: 15, width: 20, textAlign: "center", opacity: 0.7 }}>{n.icon}</span>{n.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "18px 18px 22px", borderTop: "1px solid #EEEDEB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: D, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: W }}>TA</div>
            <div><div style={{ fontSize: 12.5, fontWeight: 700, color: D }}>Totium Admin</div><div style={{ fontSize: 11, color: "#CCC" }}>Super Admin</div></div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <header style={{ background: W, borderBottom: "1px solid #EEEDEB", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h1 style={{ fontSize: 17, fontWeight: 800, color: D }}>{nav.find(n => n.id === pg)?.label}</h1>
          {(pg === "docs" || pg === "dash") && (
            <button onClick={() => setModal(true)} style={{
              padding: "9px 20px", border: "none", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 700,
              background: `linear-gradient(135deg, ${O}, #D4461A)`, color: W,
              boxShadow: `0 2px 12px ${O}25`, fontFamily: "inherit",
            }}>+ Invite Practitioner</button>
          )}
        </header>

        <main style={{ flex: 1, overflow: "auto", padding: 32 }}>
          {/* DASHBOARD */}
          {pg === "dash" && <div className="fi">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
              {[
                { l: "Organisations", v: "3", s: "1 setting up", c: O, g: `linear-gradient(135deg, ${O}08, ${O}15)` },
                { l: "Practitioners", v: "5", s: "3 active", c: BL, g: `linear-gradient(135deg, ${BL}08, ${BL}15)` },
                { l: "Patients", v: "81", s: "+12 this week", c: GN, g: `linear-gradient(135deg, ${GN}08, ${GN}15)` },
                { l: "Appointments", v: "147", s: "6 today", c: PR, g: `linear-gradient(135deg, ${PR}08, ${PR}15)` },
              ].map((s, i) => (
                <div key={i} className="fi" style={{ background: s.g, borderRadius: 16, padding: "22px 24px", border: `1px solid ${s.c}15`, animationDelay: `${i * 60}ms`, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${s.c}, ${s.c}60)` }} />
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#AAA", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{s.l}</div>
                  <div style={{ fontSize: 32, fontWeight: 900, color: D }}>{s.v}</div>
                  <div style={{ fontSize: 12, color: "#BBB", marginTop: 4 }}>{s.s}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}>
              {/* Appointments list */}
              <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                <div style={{ padding: "16px 22px", borderBottom: "1px solid #EEEDEB", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: D }}>Upcoming Appointments</span>
                  <button onClick={() => setPg("appts")} style={{ fontSize: 12, color: O, background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>View all &#8594;</button>
                </div>
                {appts.slice(0, 5).map((a, i) => (
                  <div key={a.id} className="sli" style={{ padding: "13px 22px", borderBottom: "1px solid #F5F5F3", display: "flex", alignItems: "center", justifyContent: "space-between", animationDelay: `${i * 40}ms` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F5F5F3", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#999" }}>{a.pt.split(" ").map(w => w[0]).join("")}</div>
                      <div><div style={{ fontSize: 13, fontWeight: 600, color: D }}>{a.pt}</div><div style={{ fontSize: 11, color: "#BBB" }}>{a.doc} · {a.type}</div></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "#888" }}>{a.date === "Today" ? a.time : `Tomorrow, ${a.time}`}</div>
                      <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 100, fontSize: 10.5, fontWeight: 600, background: `${sc(a.st)}12`, color: sc(a.st) }}>{a.st}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Revenue */}
                <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: "22px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 10 }}>Revenue (This Month)</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                    <span style={{ fontSize: 30, fontWeight: 900, color: D }}>$7,350</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: GN, background: `${GN}12`, padding: "2px 8px", borderRadius: 100 }}>+18%</span>
                  </div>
                  <div style={{ display: "flex", gap: 4, marginTop: 16, height: 40, alignItems: "flex-end" }}>
                    {bars.map((h, i) => (
                      <div key={i} style={{
                        flex: 1, height: `${h}%`, borderRadius: 4,
                        background: i === bars.length - 1 ? `linear-gradient(to top, ${O}, #F97316)` : `${O}20`,
                        animation: "growBar 0.5s ease both",
                        animationDelay: `${i * 40}ms`,
                      }} />
                    ))}
                  </div>
                </div>

                {/* Plan usage */}
                <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: "22px", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>Care Plans Applied</div>
                  {plans.filter(p => p.status === "Active").map(p => (
                    <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                      <span style={{ fontSize: 11, fontWeight: 800, color: O, background: `${O}10`, padding: "2px 8px", borderRadius: 4, letterSpacing: 0.3, width: 44, textAlign: "center" }}>{p.ab}</span>
                      <div style={{ flex: 1, height: 6, background: "#F0EFED", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(p.uses * 2, 100)}%`, background: `linear-gradient(90deg, ${O}, #F97316)`, borderRadius: 3, transition: "width 0.8s cubic-bezier(0.16,1,0.3,1)" }} />
                      </div>
                      <span style={{ fontSize: 12, color: "#BBB", fontWeight: 600, width: 24, textAlign: "right" }}>{p.uses}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>}

          {/* ORGANISATIONS */}
          {pg === "orgs" && <div className="fi">
            <div style={{ background: `linear-gradient(135deg, ${O}06, ${O}10)`, border: `1.5px solid ${O}20`, borderRadius: 18, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: W, fontSize: 15, fontWeight: 900, letterSpacing: 1 }}>T</span></div>
              <div><div style={{ fontSize: 16, fontWeight: 900, color: D }}>Totium Health Network</div><div style={{ fontSize: 12.5, color: "#AAA" }}>Parent Organisation · {orgs.length} child organisations</div></div>
            </div>
            {orgs.map((o, i) => (
              <div key={o.id} className="sli" style={{ background: W, borderRadius: 16, border: "1px solid #EEEDEB", padding: "20px 24px", marginBottom: 10, display: "flex", alignItems: "center", justifyContent: "space-between", animationDelay: `${i * 60}ms`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: sc(o.status) }} />
                  <div><div style={{ fontSize: 15, fontWeight: 700, color: D }}>{o.name}</div><div style={{ fontSize: 12, color: "#BBB" }}>{o.docs} practitioners · {o.pts} patients · Since {o.since}</div></div>
                </div>
                <span style={{ padding: "3px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${sc(o.status)}12`, color: sc(o.status) }}>{o.status}</span>
              </div>
            ))}
          </div>}

          {/* PRACTITIONERS */}
          {pg === "docs" && <div className="fi" style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ background: "#FAFAF8" }}>{["Practitioner", "Organisation", "Status", "Patients", "Consults"].map(h => <th key={h} style={{ padding: "14px 22px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "#BBB", textTransform: "uppercase", letterSpacing: 0.8, borderBottom: "1px solid #EEEDEB" }}>{h}</th>)}</tr></thead>
              <tbody>{practitioners.map((p, i) => (
                <tr key={p.id} className="sli" style={{ borderBottom: "1px solid #F5F5F3", animationDelay: `${i * 40}ms` }}>
                  <td style={{ padding: "14px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${D}, #333)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: W }}>{p.ini}</div>
                      <div><div style={{ fontSize: 13.5, fontWeight: 700, color: D }}>{p.name}</div><div style={{ fontSize: 11, color: "#CCC" }}>{p.spec}</div></div>
                    </div>
                  </td>
                  <td style={{ padding: "14px 22px", fontSize: 13, color: "#888" }}>{p.org}</td>
                  <td style={{ padding: "14px 22px" }}><span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${sc(p.status)}12`, color: sc(p.status) }}>{p.status}</span></td>
                  <td style={{ padding: "14px 22px", fontSize: 14, fontWeight: 700, color: D }}>{p.pts}</td>
                  <td style={{ padding: "14px 22px", fontSize: 14, fontWeight: 700, color: D }}>{p.appts}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>}

          {/* APPOINTMENTS */}
          {pg === "appts" && <div className="fi">{["Today", "Tomorrow"].map(dg => (
            <div key={dg} style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#CCC", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12 }}>{dg}</div>
              <div style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.03)" }}>
                {appts.filter(a => a.date === dg).map((a, i) => (
                  <div key={a.id} className="sli" style={{ padding: "15px 22px", borderBottom: "1px solid #F5F5F3", display: "flex", alignItems: "center", justifyContent: "space-between", animationDelay: `${i * 40}ms` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <div style={{ width: 48, textAlign: "center" }}><div style={{ fontSize: 14, fontWeight: 800, color: D }}>{a.time.split(" ")[0]}</div><div style={{ fontSize: 10, color: "#CCC", fontWeight: 500 }}>{a.time.split(" ")[1]}</div></div>
                      <div style={{ width: 1.5, height: 32, background: "#EEEDEB", borderRadius: 1 }} />
                      <div><div style={{ fontSize: 14, fontWeight: 600, color: D }}>{a.pt}</div><div style={{ fontSize: 12, color: "#BBB" }}>{a.doc} · {a.type}</div></div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${sc(a.st)}12`, color: sc(a.st) }}>{a.st}</span>
                      {a.paid && <span style={{ padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600, background: `${GN}12`, color: GN }}>Paid</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}</div>}

          {/* CARE PLANS */}
          {pg === "plans" && <div className="fi" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {plans.map((p, i) => (
              <div key={p.id} className="sli" style={{ background: W, borderRadius: 18, border: "1px solid #EEEDEB", padding: "22px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", animationDelay: `${i * 50}ms`, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 800, color: O, background: `${O}10`, padding: "3px 10px", borderRadius: 6, letterSpacing: 0.3 }}>{p.ab}</span>
                    <span style={{ fontSize: 15, fontWeight: 700, color: D }}>{p.name}</span>
                    <span style={{ padding: "2px 10px", borderRadius: 100, fontSize: 10.5, fontWeight: 600, background: `${sc(p.status)}12`, color: sc(p.status) }}>{p.status}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "#BBB" }}>{p.paths} pathways · Used {p.uses} times</div>
                </div>
                <div style={{ textAlign: "center", padding: "8px 16px", borderRadius: 12, background: "#FAFAF8" }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: D }}>{p.paths}</div>
                  <div style={{ fontSize: 10, color: "#CCC", textTransform: "uppercase", letterSpacing: 0.5, fontWeight: 600 }}>pathways</div>
                </div>
              </div>
            ))}
          </div>}
        </main>
      </div>
      {modal && <InviteModal onClose={() => setModal(false)} />}
    </div>
  );
}
