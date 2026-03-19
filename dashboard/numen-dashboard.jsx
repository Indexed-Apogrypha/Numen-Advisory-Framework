import { useState, useEffect, useRef } from "react";

const PERSONAS = [
  { id: 1, name: "High Priestess", emoji: "🧑‍💼", role: "Business Analyst", domain: "Requirements, user intent, ambiguity", focus: "Uncovering the real problem", arcana: "II", keywords: ["hidden assumptions","real problem","ambiguity","requirements","user needs"], failureMode: "Analysis paralysis", quote: "What is being asked versus what is actually needed?" },
  { id: 2, name: "Magician", emoji: "🎩", role: "Stakeholder Communicator", domain: "Stakeholder communication, buy-in, change management", focus: "Making the work land with the right people", arcana: "I", keywords: ["stakeholders","buy-in","communication","change management"], failureMode: "Overpromising", quote: "How do we make this land with the people who matter?" },
  { id: 3, name: "Emperor", emoji: "👑", role: "Project Manager", domain: "Execution planning, timelines, accountability", focus: "Order and delivery", arcana: "IV", keywords: ["plan","milestones","ownership","dependencies","critical path"], failureMode: "Rigidity", quote: "What is the plan, and does it have clear milestones?" },
  { id: 4, name: "Chariot", emoji: "🐎", role: "Lead Developer", domain: "Implementation, execution, momentum", focus: "Moving the work forward", arcana: "VII", keywords: ["implementation","simplest path","unblock","build","prototype"], failureMode: "Technical debt", quote: "What is the simplest implementation that satisfies this?" },
  { id: 5, name: "Hierophant", emoji: "📜", role: "Solutions Architect", domain: "Systems design, patterns, scalability", focus: "Structural integrity", arcana: "V", keywords: ["coupling","failure domains","patterns","scalability","interfaces"], failureMode: "Overengineering", quote: "Are components loosely coupled, or will change cascade?" },
  { id: 6, name: "Justice", emoji: "⚖️", role: "QA Engineer", domain: "Validation, correctness, edge cases", focus: "Catching what could go wrong", arcana: "XI", keywords: ["failure modes","edge cases","test strategy","acceptance criteria"], failureMode: "Excessive negativity", quote: "What inputs, states, or conditions cause this to break?" },
  { id: 7, name: "Temperance", emoji: "⚗️", role: "DevOps Engineer", domain: "Systems integration, CI/CD, stability", focus: "Safe production delivery", arcana: "XIV", keywords: ["deployment","CI/CD","stability","infrastructure","rollback"], failureMode: "Slowing urgency", quote: "How does this get safely into production?" },
  { id: 8, name: "Fool", emoji: "🌱", role: "Product Manager", domain: "User value and market opportunity", focus: "What users actually need", arcana: "0", keywords: ["user problem","MVP","target user","value","alternatives"], failureMode: "Lack of grounding", quote: "What user problem does this solve, and how painful is it?" },
  { id: 9, name: "Empress", emoji: "🌿", role: "UX/UI Designer", domain: "User experience, usability", focus: "How it feels to use", arcana: "III", keywords: ["experience","usability","interface","user flow","design"], failureMode: "Ignoring constraints", quote: "How does this feel in the hands of a real user?" },
  { id: 10, name: "Star", emoji: "⭐", role: "Technical Visionary", domain: "Technical vision, long-term direction", focus: "Where the technology should go", arcana: "XVII", keywords: ["12-24 months","technology trends","optionality","paradigm shift"], failureMode: "Disconnection from execution", quote: "Does this decision open future doors or close them?" },
  { id: 11, name: "Hermit", emoji: "🕯️", role: "Data / Research Analyst", domain: "Data, insights, evidence", focus: "What the evidence says", arcana: "IX", keywords: ["data","evidence","methodology","insights","metrics"], failureMode: "Delayed action", quote: "What does the evidence actually tell us?" },
  { id: 12, name: "Lovers", emoji: "🔗", role: "Customer Success", domain: "Customer trust, retention", focus: "Impact on existing customers", arcana: "VI", keywords: ["customer trust","retention","impact","relationship","churn"], failureMode: "Over-accommodation", quote: "How does this affect the people already counting on us?" },
  { id: 13, name: "Devil", emoji: "😈", role: "Security + Compliance", domain: "Security, vulnerabilities, compliance", focus: "What can be exploited", arcana: "XV", keywords: ["attack surface","sensitive data","compliance","blast radius","auth"], failureMode: "Blocking progress", quote: "Where can this approach be exploited?" },
  { id: 14, name: "Judgement", emoji: "📣", role: "Incident Commander", domain: "Incidents, outages, recovery", focus: "When things go wrong", arcana: "XX", keywords: ["incident","outage","recovery","escalation","postmortem"], failureMode: "Over-aggression", quote: "What happens when this fails at 2 AM?" },
  { id: 15, name: "Wheel of Fortune", emoji: "🎡", role: "Financial Strategist", domain: "Cost, budget, resource efficiency", focus: "Whether the money is well spent", arcana: "X", keywords: ["cost","budget","ROI","build vs buy","resource allocation"], failureMode: "Penny-pinching", quote: "Is this the best use of our limited resources?" },
];

const CATEGORIES = [
  { id: "execution", label: "Execution", icon: "⚡", desc: "Behind schedule, blocked, build failing, deployment issues", personas: [3, 4, 6, 7], color: "#e8a838" },
  { id: "design", label: "Design", icon: "🏗️", desc: "Architecture, tech stack, system design, API design", personas: [5, 4, 7, 9], color: "#5b8fd4" },
  { id: "strategy", label: "Strategy", icon: "🧭", desc: "What to build, market fit, product direction, pivots", personas: [10, 8, 2, 11], color: "#9b6fd4" },
  { id: "people", label: "People / Process", icon: "🤝", desc: "Team friction, stakeholder concerns, communication", personas: [12, 3, 9, 2], color: "#4dbd74" },
  { id: "crisis", label: "Crisis", icon: "🔥", desc: "Outages, security incidents, data breaches, urgent fires", personas: [14, 13, 7, 6], color: "#d45b5b" },
  { id: "financial", label: "Financial", icon: "💰", desc: "Budget, cost optimization, build-vs-buy, pricing", personas: [15, 3, 2, 10], color: "#d4a85b" },
  { id: "quality", label: "Quality / Risk", icon: "🛡️", desc: "Tech debt, compliance, testing gaps, audit prep", personas: [6, 13, 11, 5], color: "#5bd4c4" },
];

const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.textContent = `
  @keyframes cardFloat {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 15px rgba(212,175,55,0.15), inset 0 0 15px rgba(212,175,55,0.05); }
    50% { box-shadow: 0 0 30px rgba(212,175,55,0.3), inset 0 0 25px rgba(212,175,55,0.1); }
  }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(10px, -15px) scale(1.05); }
    66% { transform: translate(-8px, 8px) scale(0.95); }
  }
  @keyframes starTwinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
  }
  .tarot-card-enter {
    animation: fadeUp 0.5s ease-out forwards;
  }
  .card-glow-active {
    animation: glowPulse 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

function StarField() {
  const stars = useRef(
    Array.from({ length: 60 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  ).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: "rgba(212,175,55,0.6)",
          animation: `starTwinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
        }} />
      ))}
    </div>
  );
}

function TarotCard({ persona, isSelected, isRostered, onClick, delay }) {
  const [flipped, setFlipped] = useState(false);
  const borderColor = isRostered ? "rgba(212,175,55,0.9)" : isSelected ? "rgba(212,175,55,0.5)" : "rgba(212,175,55,0.15)";

  return (
    <div
      className="tarot-card-enter"
      onClick={() => { setFlipped(!flipped); onClick?.(persona.id); }}
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        perspective: "1000px",
        cursor: "pointer",
        width: "100%",
        maxWidth: 200,
        aspectRatio: "2/3",
      }}
    >
      <div style={{
        position: "relative", width: "100%", height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* FRONT */}
        <div className={isRostered ? "card-glow-active" : ""} style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          borderRadius: 14,
          border: `2px solid ${borderColor}`,
          background: "linear-gradient(165deg, #1a1525 0%, #0d0a14 50%, #15101f 100%)",
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", padding: "16px 12px", gap: 8,
          transition: "border-color 0.4s, box-shadow 0.4s",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.04,
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.3) 10px, rgba(212,175,55,0.3) 11px)`,
          }} />
          <div style={{
            fontSize: 11, fontFamily: "'Cinzel', serif", color: "rgba(212,175,55,0.5)",
            letterSpacing: 4, textTransform: "uppercase",
          }}>{persona.arcana}</div>
          <div style={{ fontSize: 42, lineHeight: 1, filter: isRostered ? "drop-shadow(0 0 8px rgba(212,175,55,0.4))" : "none", transition: "filter 0.4s" }}>
            {persona.emoji}
          </div>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
            color: "#d4af37", textAlign: "center", lineHeight: 1.3, letterSpacing: 1,
          }}>{persona.name}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 11,
            color: "rgba(200,190,170,0.6)", textAlign: "center", fontStyle: "italic",
          }}>{persona.role}</div>
          <div style={{
            position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)",
            fontSize: 9, color: "rgba(212,175,55,0.3)", fontFamily: "'Cinzel', serif",
            letterSpacing: 2,
          }}>TAP TO REVEAL</div>
        </div>

        {/* BACK */}
        <div style={{
          position: "absolute", inset: 0, backfaceVisibility: "hidden",
          transform: "rotateY(180deg)", borderRadius: 14,
          border: "2px solid rgba(212,175,55,0.4)",
          background: "linear-gradient(165deg, #1f1830 0%, #120e1a 50%, #1a1428 100%)",
          padding: "14px 12px", overflow: "hidden",
          display: "flex", flexDirection: "column", gap: 6,
        }}>
          <div style={{
            position: "absolute", inset: 0, opacity: 0.03,
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(212,175,55,0.4) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(120,80,200,0.3) 0%, transparent 50%)`,
          }} />
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, fontWeight: 700,
            color: "#d4af37", textAlign: "center", letterSpacing: 1,
            borderBottom: "1px solid rgba(212,175,55,0.2)", paddingBottom: 5,
          }}>
            {persona.emoji} {persona.name}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: "rgba(200,190,170,0.8)",
            lineHeight: 1.4,
          }}>
            <span style={{ color: "#d4af37", fontSize: 10, fontFamily: "'Cinzel', serif" }}>FOCUS</span>
            <br />{persona.focus}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: "rgba(200,190,170,0.8)",
            lineHeight: 1.4,
          }}>
            <span style={{ color: "#d4af37", fontSize: 10, fontFamily: "'Cinzel', serif" }}>DOMAIN</span>
            <br />{persona.domain}
          </div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5,
            color: "rgba(200,190,170,0.55)", fontStyle: "italic", lineHeight: 1.4,
            marginTop: "auto", borderTop: "1px solid rgba(212,175,55,0.1)", paddingTop: 5,
          }}>
            "{persona.quote}"
          </div>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, marginTop: 2,
          }}>
            <span style={{ fontSize: 9, color: "rgba(220,80,80,0.7)", fontFamily: "'Cinzel', serif" }}>⚠️</span>
            <span style={{
              fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5,
              color: "rgba(220,80,80,0.6)", fontStyle: "italic",
            }}>{persona.failureMode}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ cat, isActive, onClick }) {
  return (
    <button onClick={onClick} style={{
      background: isActive ? `${cat.color}22` : "rgba(255,255,255,0.03)",
      border: `1px solid ${isActive ? cat.color : "rgba(212,175,55,0.12)"}`,
      borderRadius: 20, padding: "8px 16px",
      cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
      transition: "all 0.3s", color: isActive ? cat.color : "rgba(200,190,170,0.6)",
      fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 1,
    }}>
      <span style={{ fontSize: 16 }}>{cat.icon}</span>
      {cat.label}
    </button>
  );
}

export default function TarotAdvisoryDashboard() {
  const [activeCategories, setActiveCategories] = useState([]);
  const [selectedPersonas, setSelectedPersonas] = useState(new Set());
  const [problemText, setProblemText] = useState("");
  const [showRoster, setShowRoster] = useState(false);
  const [allHands, setAllHands] = useState(false);
  const [promptReady, setPromptReady] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const promptRef = useRef(null);

  // Calculate suggested roster from active categories
  const suggestedIds = new Set();
  suggestedIds.add(3); // Emperor always
  activeCategories.forEach(catId => {
    const cat = CATEGORIES.find(c => c.id === catId);
    if (cat) cat.personas.forEach(id => suggestedIds.add(id));
  });

  const rosterIds = allHands ? new Set(PERSONAS.map(p => p.id)) : suggestedIds;
  const rosterPersonas = PERSONAS.filter(p => rosterIds.has(p.id));

  const toggleCategory = (catId) => {
    setActiveCategories(prev =>
      prev.includes(catId) ? prev.filter(c => c !== catId) : [...prev, catId]
    );
    setAllHands(false);
  };

  const conveneTeam = () => {
    if (!problemText.trim()) return;
    const names = rosterPersonas.map(p => `${p.emoji} ${p.name}`).join(", ");
    const cats = activeCategories.length > 0 ? activeCategories.join(" + ") : "All-Hands";
    const prompt = `Convene the Numen advisory team. Problem category: ${cats}. Roster: ${names}.\n\nProblem:\n${problemText}`;
    setGeneratedPrompt(prompt);
    setPromptReady(true);
    setTimeout(() => {
      if (promptRef.current) {
        promptRef.current.select();
      }
    }, 100);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0712 0%, #0f0b18 30%, #0d091a 60%, #080510 100%)",
      color: "#c8bea8", fontFamily: "'Cormorant Garamond', serif",
      position: "relative", overflow: "hidden",
    }}>
      <StarField />

      {/* Ambient orbs */}
      <div style={{
        position: "fixed", top: "10%", left: "5%", width: 300, height: 300,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(120,80,200,0.06) 0%, transparent 70%)",
        animation: "orbFloat 12s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "15%", right: "8%", width: 250, height: 250,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(212,175,55,0.05) 0%, transparent 70%)",
        animation: "orbFloat 15s 3s ease-in-out infinite", pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1100, margin: "0 auto", padding: "40px 20px" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 6,
            color: "rgba(212,175,55,0.4)", textTransform: "uppercase", marginBottom: 12,
          }}>THE COLLECTIVE INTELLIGENCE</div>
          <h1 style={{
            fontFamily: "'Cinzel', serif", fontSize: 36, fontWeight: 700,
            color: "#d4af37", margin: 0, letterSpacing: 3,
            backgroundImage: "linear-gradient(90deg, #d4af37, #f0d060, #d4af37, #b8942e, #d4af37)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            animation: "shimmer 6s linear infinite",
          }}>Numen</h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
            color: "rgba(200,190,170,0.5)", fontStyle: "italic", marginTop: 8,
          }}>
            15 minds. One recommendation.
          </p>
        </div>

        {/* PROBLEM INPUT */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(212,175,55,0.12)",
          borderRadius: 16, padding: 24, marginBottom: 32,
        }}>
          <label style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
            color: "#d4af37", display: "block", marginBottom: 12,
          }}>PRESENT YOUR PROBLEM</label>
          <textarea
            value={problemText}
            onChange={e => setProblemText(e.target.value)}
            placeholder="Describe the challenge your team is facing..."
            style={{
              width: "100%", minHeight: 80, background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(212,175,55,0.1)", borderRadius: 10,
              color: "#c8bea8", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 15, padding: 14, resize: "vertical",
              outline: "none", boxSizing: "border-box",
            }}
            onFocus={e => e.target.style.borderColor = "rgba(212,175,55,0.3)"}
            onBlur={e => e.target.style.borderColor = "rgba(212,175,55,0.1)"}
          />
        </div>

        {/* CATEGORY SELECTOR */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
            color: "#d4af37", marginBottom: 14,
          }}>PROBLEM CATEGORIES</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CATEGORIES.map(cat => (
              <CategoryPill
                key={cat.id} cat={cat}
                isActive={activeCategories.includes(cat.id)}
                onClick={() => toggleCategory(cat.id)}
              />
            ))}
            <button
              onClick={() => { setAllHands(!allHands); setActiveCategories([]); }}
              style={{
                background: allHands ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)",
                border: `1px solid ${allHands ? "#d4af37" : "rgba(212,175,55,0.12)"}`,
                borderRadius: 20, padding: "8px 16px", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8,
                transition: "all 0.3s",
                color: allHands ? "#d4af37" : "rgba(200,190,170,0.6)",
                fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 1,
              }}>
              <span style={{ fontSize: 16 }}>🃏</span> ALL-HANDS
            </button>
          </div>
          {activeCategories.length > 0 && (
            <div style={{
              marginTop: 10, fontStyle: "italic", fontSize: 13,
              color: "rgba(200,190,170,0.45)",
            }}>
              {CATEGORIES.filter(c => activeCategories.includes(c.id)).map(c => c.desc).join(" · ")}
            </div>
          )}
        </div>

        {/* ROSTER PREVIEW */}
        {(activeCategories.length > 0 || allHands) && (
          <div style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.15)",
            borderRadius: 14, padding: "16px 20px", marginBottom: 32,
            animation: "fadeUp 0.4s ease-out",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
              color: "rgba(212,175,55,0.7)", marginBottom: 10,
            }}>
              SUGGESTED ROSTER — {rosterPersonas.length} ADVISORS
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {rosterPersonas.map(p => (
                <span key={p.id} style={{
                  background: "rgba(212,175,55,0.08)",
                  border: "1px solid rgba(212,175,55,0.2)",
                  borderRadius: 8, padding: "4px 10px",
                  fontSize: 12, fontFamily: "'Cinzel', serif",
                  color: "#d4af37",
                }}>{p.emoji} {p.name}</span>
              ))}
            </div>
            {!promptReady ? (
              <button
                onClick={conveneTeam}
                disabled={!problemText.trim()}
                style={{
                  marginTop: 16, background: problemText.trim()
                    ? "linear-gradient(135deg, #d4af37, #b8942e)"
                    : "rgba(212,175,55,0.1)",
                  border: "none", borderRadius: 10, padding: "12px 28px",
                  cursor: problemText.trim() ? "pointer" : "not-allowed",
                  fontFamily: "'Cinzel', serif", fontSize: 13, fontWeight: 700,
                  letterSpacing: 2, color: problemText.trim() ? "#0a0712" : "rgba(212,175,55,0.3)",
                  transition: "all 0.3s",
                  boxShadow: problemText.trim() ? "0 4px 20px rgba(212,175,55,0.25)" : "none",
                }}
              >
                ✦ CONVENE THE TEAM ✦
              </button>
            ) : (
              <div style={{
                marginTop: 16, background: "rgba(0,0,0,0.4)",
                border: "1px solid rgba(212,175,55,0.3)", borderRadius: 12,
                padding: 16, animation: "fadeUp 0.3s ease-out",
              }}>
                <div style={{
                  fontFamily: "'Cinzel', serif", fontSize: 11, letterSpacing: 2,
                  color: "#4dbd74", marginBottom: 8, display: "flex", alignItems: "center", gap: 8,
                }}>
                  ✓ PROMPT READY — SELECT ALL &amp; COPY, THEN PASTE INTO CHAT
                </div>
                <textarea
                  ref={promptRef}
                  readOnly
                  value={generatedPrompt}
                  onFocus={e => e.target.select()}
                  style={{
                    width: "100%", minHeight: 100, background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8,
                    color: "#c8bea8", fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 13, padding: 12, resize: "vertical",
                    outline: "none", boxSizing: "border-box", lineHeight: 1.5,
                  }}
                />
                <button
                  onClick={() => { setPromptReady(false); setGeneratedPrompt(""); }}
                  style={{
                    marginTop: 10, background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(212,175,55,0.15)", borderRadius: 8,
                    padding: "6px 16px", cursor: "pointer",
                    fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 1,
                    color: "rgba(200,190,170,0.5)", transition: "all 0.3s",
                  }}
                >
                  ← BACK
                </button>
              </div>
            )}
          </div>
        )}

        {/* CARD GALLERY */}
        <div style={{
          fontFamily: "'Cinzel', serif", fontSize: 12, letterSpacing: 2,
          color: "#d4af37", marginBottom: 18,
        }}>THE MAJOR ARCANA — TAP TO REVEAL</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: 18, justifyItems: "center",
        }}>
          {PERSONAS.map((p, i) => (
            <TarotCard
              key={p.id} persona={p}
              isSelected={selectedPersonas.has(p.id)}
              isRostered={rosterIds.has(p.id) && (activeCategories.length > 0 || allHands)}
              delay={i * 60}
              onClick={(id) => {
                setSelectedPersonas(prev => {
                  const next = new Set(prev);
                  next.has(id) ? next.delete(id) : next.add(id);
                  return next;
                });
              }}
            />
          ))}
        </div>

        {/* FOOTER */}
        <div style={{
          textAlign: "center", marginTop: 48, paddingTop: 24,
          borderTop: "1px solid rgba(212,175,55,0.08)",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 10, letterSpacing: 3,
            color: "rgba(212,175,55,0.25)",
          }}>
            ✦ NUMEN ✦ 15 PERSONAS ✦ 7 DOMAINS ✦ 3 PHASES ✦
          </div>
        </div>
      </div>
    </div>
  );
}
