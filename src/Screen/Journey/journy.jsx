import React, { useEffect, useRef, useState } from "react";
import { Leaf, Sprout, TreePine, Award, Users, Globe, TrendingUp, Star, Rocket, Heart, ChevronDown, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";
import { JournyService } from "../../api/service";

// Icon map to resolve icon names from API to Lucide components
const iconMap = {
    Leaf, Sprout, TreePine, Award, Users, Globe, TrendingUp, Star, Rocket, Heart,
};

// ─── HOOK ──────────────────────────────────────────────────────────────────
const useInView = (threshold = 0.15) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true); },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);
    return [ref, inView];
};

// ─── MILESTONE CARD ────────────────────────────────────────────────────────
const MilestoneCard = ({ milestone, index }) => {
    const [ref, inView] = useInView(0.12);
    const [hovered, setHovered] = useState(false);

    // Support icon as string (from API) or as component (fallback)
    const Icon = typeof milestone.icon === "string"
        ? (iconMap[milestone.icon] || Leaf)
        : (milestone.icon || Leaf);

    const isRight = milestone.side === "right";

    return (
        <div
            ref={ref}
            className={`flex items-center w-full mb-6 md:mb-8`}
            style={{
                flexDirection: isRight ? "row" : "row-reverse",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(48px)",
                transition: `opacity 0.7s ease ${index * 70}ms, transform 0.7s ease ${index * 70}ms`,
            }}
        >
            {/* ── Card ── */}
            <div className={`w-full md:w-[44%] ${isRight ? "md:mr-auto" : "md:ml-auto"}`}>
                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    style={{
                        background: "white",
                        borderRadius: "20px",
                        padding: "28px",
                        boxShadow: hovered
                            ? `0 20px 60px ${milestone.accent}22, 0 4px 20px rgba(0,0,0,0.08)`
                            : "0 4px 24px rgba(0,0,0,0.06)",
                        border: `1px solid ${milestone.accent}22`,
                        borderLeft: isRight ? `5px solid ${milestone.accent}` : `1px solid ${milestone.accent}22`,
                        borderRight: !isRight ? `5px solid ${milestone.accent}` : `1px solid ${milestone.accent}22`,
                        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
                        transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        cursor: "default",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Background gradient blob */}
                    <div style={{
                        position: "absolute", top: "-40px", right: "-40px",
                        width: "120px", height: "120px",
                        borderRadius: "50%",
                        background: `${milestone.accent}10`,
                        transition: "all 0.4s ease",
                        transform: hovered ? "scale(2)" : "scale(1)",
                    }} />

                    {/* Year pill */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "6px",
                        padding: "5px 14px", borderRadius: "999px",
                        background: `${milestone.accent}18`,
                        border: `1.5px solid ${milestone.accent}40`,
                        marginBottom: "14px",
                    }}>
                        <Icon size={13} color={milestone.accent} />
                        <span style={{ color: milestone.accent, fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em" }}>
                            {milestone.year}
                        </span>
                    </div>

                    {/* Bilingual Title */}
                    <h3 style={{
                        fontSize: "20px", fontWeight: 800, lineHeight: 1.25,
                        color: hovered ? milestone.accent : "#1a1a2e",
                        marginBottom: "4px",
                        transition: "color 0.3s ease",
                    }}>
                        {milestone.titleHi}
                    </h3>
                    <p style={{
                        fontSize: "13px", fontWeight: 600, color: "#9ca3af",
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        marginBottom: "6px",
                    }}>
                        {milestone.titleEn}
                    </p>

                    {/* Subtitle tags */}
                    <div style={{ display: "flex", gap: "6px", marginBottom: "14px", flexWrap: "wrap" }}>
                        <span style={{
                            fontSize: "10px", fontWeight: 700, padding: "2px 10px",
                            borderRadius: "999px", background: `${milestone.accent}15`,
                            color: milestone.accent, letterSpacing: "0.05em",
                        }}>{milestone.subtitleHi}</span>
                        <span style={{
                            fontSize: "10px", fontWeight: 600, padding: "2px 10px",
                            borderRadius: "999px", background: "#f3f4f6",
                            color: "#6b7280", letterSpacing: "0.05em",
                        }}>{milestone.subtitleEn}</span>
                    </div>

                    {/* Description — bilingual */}
                    <div style={{ fontSize: "13px", lineHeight: "1.7", marginBottom: "18px" }}>
                        <p style={{ color: "#374151", marginBottom: "6px" }}>{milestone.descHi}</p>
                        <p style={{ color: "#9ca3af", fontStyle: "italic" }}>{milestone.descEn}</p>
                    </div>

                    {/* Stat chip */}
                    <div style={{
                        display: "inline-flex", flexDirection: "column", alignItems: "center",
                        padding: "12px 20px", borderRadius: "14px",
                        background: `linear-gradient(135deg, ${milestone.accent}18, ${milestone.accent}08)`,
                        border: `1px solid ${milestone.accent}30`,
                        minWidth: "110px",
                    }}>
                        <span style={{ fontSize: "28px", fontWeight: 900, color: milestone.accent, lineHeight: 1 }}>
                            {milestone.stat}
                        </span>
                        <span style={{ fontSize: "10px", fontWeight: 700, color: milestone.accent, opacity: 0.8, marginTop: "2px" }}>
                            {milestone.statUnit}
                        </span>
                        <span style={{ fontSize: "9px", color: "#9ca3af", marginTop: "2px", textAlign: "center" }}>
                            {milestone.statLabel}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Center Node ── */}
            <div className="hidden md:flex flex-col items-center" style={{ width: "12%", position: "relative" }}>
                <div style={{
                    width: "52px", height: "52px", borderRadius: "50%",
                    background: `linear-gradient(135deg, ${milestone.accent}, ${milestone.accent}cc)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 0 6px white, 0 0 0 8px ${milestone.accent}30, 0 8px 24px ${milestone.accent}40`,
                    zIndex: 10,
                    transform: inView ? "scale(1)" : "scale(0)",
                    transition: `transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 70 + 200}ms`,
                }}>
                    <Icon size={20} color="white" />
                </div>
                <span style={{
                    fontSize: "10px", fontWeight: 700, color: "#9ca3af",
                    marginTop: "8px", letterSpacing: "0.05em",
                }}>{milestone.year}</span>
            </div>

            {/* ── Spacer ── */}
            <div className="hidden md:block" style={{ width: "44%" }} />
        </div>
    );
};

// ─── HERO COUNTER ──────────────────────────────────────────────────────────
const HeroStat = ({ val, label, delay }) => {
    const [ref, inView] = useInView(0.1);
    return (
        <div ref={ref} style={{
            textAlign: "center",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: `all 0.6s ease ${delay}ms`,
        }}>
            <div style={{ fontSize: "34px", fontWeight: 900, color: "#a3e635", lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: "11px", color: "#86efac", letterSpacing: "0.1em", marginTop: "6px", textTransform: "uppercase" }}>{label}</div>
        </div>
    );
};

// ─── LOADING STATE ─────────────────────────────────────────────────────────
const LoadingState = () => (
    <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "100px 20px", gap: "16px",
    }}>
        <Loader2 size={40} color="#16a34a" style={{ animation: "spin 1s linear infinite" }} />
        <p style={{ color: "#6b7280", fontSize: "16px", fontWeight: 500 }}>यात्रा लोड हो रही है... / Loading Journey...</p>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
);

// ─── ERROR STATE ───────────────────────────────────────────────────────────
const ErrorState = ({ message, onRetry }) => (
    <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "100px 20px", gap: "16px",
    }}>
        <AlertCircle size={40} color="#ef4444" />
        <p style={{ color: "#374151", fontSize: "16px", fontWeight: 600 }}>कुछ गलत हुआ / Something went wrong</p>
        <p style={{ color: "#9ca3af", fontSize: "14px", textAlign: "center", maxWidth: "400px" }}>{message}</p>
        <button
            onClick={onRetry}
            style={{
                padding: "10px 24px", borderRadius: "999px",
                background: "linear-gradient(135deg, #16a34a, #059669)",
                color: "white", fontWeight: 700, fontSize: "14px",
                border: "none", cursor: "pointer",
            }}
        >
            पुनः प्रयास करें / Retry
        </button>
    </div>
);

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Journey() {
    const [heroRef, heroInView] = useInView(0.1);

    // ── API State ──
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMilestones = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await JournyService.getAll();
            // API returns { success, count, data: [...] }
            const raw = response?.data?.data ?? response?.data ?? response;
            const data = Array.isArray(raw) ? raw : [];
            // Sort chronologically: 2016, 2017, 2018...
            const sorted = [...data].sort((a, b) => parseInt(a.year) - parseInt(b.year));
            setMilestones(sorted);
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "Failed to load journey data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMilestones();
    }, []);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        .journey-page { font-family: 'DM Sans', sans-serif; }
        .journey-page h1, .journey-page h2 { font-family: 'Playfair Display', serif; }
        @keyframes floatLeaf {
          0% { transform: translateY(0) rotate(0deg) scale(1); }
          100% { transform: translateY(-28px) rotate(20deg) scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
        .filter-btn { transition: all 0.25s ease; cursor: pointer; border: none; }
        .filter-btn:hover { transform: translateY(-2px); }
      `}</style>

            <Header />

            <div className="journey-page" style={{ background: "#f8fafb" }}>

                {/* ══════════ HERO ══════════ */}
                <section style={{
                    minHeight: "100vh",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(160deg, #052e16 0%, #064e3b 40%, #065f46 70%, #0d4e3a 100%)",
                    position: "relative", overflow: "hidden",
                    padding: "80px 20px 60px",
                }}>
                    {/* Animated bg leaves */}
                    {[...Array(24)].map((_, i) => (
                        <Leaf key={i} style={{
                            position: "absolute",
                            color: i % 3 === 0 ? "#a3e635" : i % 3 === 1 ? "#4ade80" : "#34d399",
                            opacity: 0.06 + (i % 5) * 0.02,
                            width: 20 + (i * 9) % 55,
                            height: 20 + (i * 9) % 55,
                            left: `${(i * 19) % 100}%`,
                            top: `${(i * 13) % 100}%`,
                            animation: `floatLeaf ${5 + (i % 5)}s ease-in-out ${i * 0.4}s infinite alternate`,
                        }} />
                    ))}

                    {/* Mesh gradient orbs */}
                    <div style={{
                        position: "absolute", width: "600px", height: "600px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(132,204,22,0.12) 0%, transparent 70%)",
                        top: "-100px", left: "-100px", pointerEvents: "none",
                    }} />
                    <div style={{
                        position: "absolute", width: "400px", height: "400px",
                        borderRadius: "50%",
                        background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
                        bottom: "-50px", right: "-50px", pointerEvents: "none",
                    }} />

                    <div ref={heroRef} style={{
                        position: "relative", zIndex: 10, textAlign: "center", maxWidth: "900px",
                        opacity: heroInView ? 1 : 0,
                        transform: heroInView ? "translateY(0)" : "translateY(30px)",
                        transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}>
                        {/* Eyebrow */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: "10px",
                            padding: "8px 22px", borderRadius: "999px",
                            background: "rgba(163, 230, 53, 0.12)",
                            border: "1.5px solid rgba(163, 230, 53, 0.3)",
                            marginBottom: "32px", backdropFilter: "blur(10px)",
                        }}>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a3e635", animation: "pulse-ring 1.5s infinite" }} />
                            <span style={{ color: "#a3e635", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em" }}>
                                2016 — 2026 &nbsp;•&nbsp; हमारी यात्रा &nbsp;•&nbsp; OUR JOURNEY
                            </span>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#a3e635" }} />
                        </div>

                        {/* Main Title */}
                        <h1 style={{
                            fontSize: "clamp(48px, 8vw, 88px)",
                            fontWeight: 900, color: "white",
                            lineHeight: 1.05, marginBottom: "12px", letterSpacing: "-0.02em",
                        }}>
                            हमारी{" "}
                            <span style={{
                                background: "linear-gradient(90deg, #a3e635, #4ade80, #34d399, #a3e635)",
                                backgroundSize: "300% auto",
                                WebkitBackgroundClip: "text", backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                animation: "shimmer 4s linear infinite",
                            }}>
                                समृद्ध
                            </span>
                        </h1>
                        <h1 style={{
                            fontSize: "clamp(48px, 8vw, 88px)",
                            fontWeight: 900, color: "rgba(255,255,255,0.85)",
                            lineHeight: 1.05, marginBottom: "28px", letterSpacing: "-0.02em",
                            fontStyle: "italic",
                        }}>
                            यात्रा
                        </h1>

                        <p style={{ color: "#86efac", fontSize: "18px", maxWidth: "560px", margin: "0 auto 16px", lineHeight: 1.7, fontWeight: 400 }}>
                            एक बीज से शुरू होकर 50,000+ किसान परिवारों तक पहुंचने की कहानी।
                        </p>
                        <p style={{ color: "#4ade80", fontSize: "15px", fontWeight: 600, marginBottom: "52px", letterSpacing: "0.03em" }}>
                            From one seed to 50,000+ farmer families — a decade of transformation.
                        </p>

                        {/* Stats Row */}
                        <div style={{ display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap", marginBottom: "64px" }}>
                            {[
                                { val: "10", label: "साल • Years" },
                                { val: "50K+", label: "किसान परिवार • Families" },
                                { val: "15+", label: "जिले • Districts" },
                                { val: "∞", label: "सपने • Dreams" },
                            ].map((s, i) => (
                                <HeroStat key={i} val={s.val} label={s.label} delay={200 + i * 100} />
                            ))}
                        </div>

                        {/* Scroll cue */}
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
                            animation: "scroll-bounce 1.8s ease-in-out infinite",
                        }}>
                            <span style={{ color: "#4ade80", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                                यात्रा देखें • Explore Journey
                            </span>
                            <ChevronDown size={20} color="#4ade80" />
                        </div>
                    </div>
                </section>

                {/* ══════════ TIMELINE ══════════ */}
                <section style={{ padding: "80px 20px 60px", background: "#f8fafb", position: "relative" }}>
                    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

                        {/* Section Header */}
                        <div style={{ textAlign: "center", marginBottom: "56px" }}>
                            <div style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "8px 20px", borderRadius: "999px",
                                background: "white", border: "2px solid #d1fae5",
                                boxShadow: "0 2px 12px rgba(16,185,129,0.1)",
                                marginBottom: "20px",
                            }}>
                                <Sprout size={14} color="#10b981" />
                                <span style={{ color: "#065f46", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                    हमारी यात्रा • Our Journey
                                </span>
                            </div>
                            <h2 style={{
                                fontSize: "clamp(32px, 5vw, 52px)",
                                fontWeight: 900, color: "#1a1a2e",
                                lineHeight: 1.1, marginBottom: "14px",
                            }}>
                                हर साल एक नई{" "}
                                <span style={{
                                    background: "linear-gradient(135deg, #16a34a, #059669)",
                                    WebkitBackgroundClip: "text", backgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>कहानी</span>
                            </h2>
                            <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "480px", margin: "0 auto 8px" }}>
                                2016 से 2026 तक — हर मील का पत्थर एक नई उपलब्धि
                            </p>
                            <p style={{ color: "#9ca3af", fontSize: "14px", fontStyle: "italic" }}>
                                2016 to 2026 — Every milestone, a new achievement
                            </p>
                        </div>

                        {/* Timeline Content */}
                        {loading ? (
                            <LoadingState />
                        ) : error ? (
                            <ErrorState message={error} onRetry={fetchMilestones} />
                        ) : milestones.length === 0 ? (
                            <div style={{ textAlign: "center", padding: "60px 20px", color: "#9ca3af" }}>
                                <Sprout size={40} color="#d1fae5" style={{ margin: "0 auto 16px", display: "block" }} />
                                <p style={{ fontSize: "16px" }}>कोई डेटा नहीं मिला / No journey data found.</p>
                            </div>
                        ) : (
                            <div style={{ position: "relative" }}>
                                {/* Timeline Line */}
                                <div style={{
                                    position: "absolute", left: "50%", top: 0, bottom: 0,
                                    width: "2px", transform: "translateX(-50%)",
                                    background: "linear-gradient(to bottom, #d1fae5, #6ee7b7, #a7f3d0, #d1fae5)",
                                }} className="hidden md:block" />

                                {milestones.map((m, i) => (
                                    <MilestoneCard key={m._id || m.year} milestone={m} index={i} />
                                ))}
                            </div>
                        )}

                        {/* End cap */}
                        {!loading && !error && milestones.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px", gap: "12px" }}>
                                <div style={{
                                    width: "68px", height: "68px", borderRadius: "50%",
                                    background: "linear-gradient(135deg, #16a34a, #059669)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    boxShadow: "0 0 0 8px #d1fae5, 0 12px 32px rgba(22,163,74,0.3)",
                                }}>
                                    <Leaf size={28} color="white" />
                                </div>
                                <p style={{ color: "#16a34a", fontWeight: 800, fontSize: "18px" }}>यात्रा जारी है...</p>
                                <p style={{ color: "#9ca3af", fontSize: "14px", fontStyle: "italic" }}>The Journey Continues</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* ══════════ BOTTOM CTA ══════════ */}
                <section style={{
                    padding: "100px 20px",
                    background: "linear-gradient(160deg, #052e16, #065f46, #047857)",
                    position: "relative", overflow: "hidden",
                }}>
                    {/* decorative */}
                    {[...Array(6)].map((_, i) => (
                        <Leaf key={i} style={{
                            position: "absolute", color: "white", opacity: 0.04,
                            width: 80 + i * 20, height: 80 + i * 20,
                            left: `${i * 18}%`, top: `${(i * 29) % 70}%`,
                            transform: `rotate(${i * 60}deg)`,
                        }} />
                    ))}

                    <div style={{
                        position: "relative", zIndex: 10,
                        maxWidth: "700px", margin: "0 auto", textAlign: "center",
                    }}>
                        <div style={{
                            width: "80px", height: "80px", borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            backdropFilter: "blur(10px)",
                            border: "2px solid rgba(163,230,53,0.3)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            margin: "0 auto 32px",
                        }}>
                            <Sprout size={36} color="#a3e635" />
                        </div>

                        <h2 style={{
                            fontSize: "clamp(34px, 5vw, 56px)",
                            fontWeight: 900, color: "white",
                            lineHeight: 1.1, marginBottom: "8px",
                        }}>
                            आगे की राह और भी
                        </h2>
                        <h2 style={{
                            fontSize: "clamp(34px, 5vw, 56px)",
                            fontWeight: 900, marginBottom: "24px",
                            background: "linear-gradient(90deg, #a3e635, #4ade80)",
                            WebkitBackgroundClip: "text", backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontStyle: "italic",
                        }}>
                            उज्ज्वल है
                        </h2>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "8px", letterSpacing: "0.05em" }}>
                            The road ahead is even brighter
                        </p>
                    </div>
                </section>

            </div>

            <Footer />
        </>
    );
}