import React, { useEffect, useRef, useState } from "react";
import { Leaf, Sprout, TreePine, Award, Users, Globe, TrendingUp, Star, Rocket, Heart, ChevronDown, ArrowRight } from "lucide-react";
import Header from "../Header";
import Footer from "../Footer";

const milestones = [
    {
        year: "2016",
        titleHi: "बीज बोया गया",
        titleEn: "The Seed Was Planted",
        subtitleHi: "नींव",
        subtitleEn: "Foundation",
        descHi: "Samridhi की नींव रखी गई — एक छोटे से सपने के साथ। किसानों को जोड़ना, जैविक खेती को बढ़ावा देना और ग्रामीण भारत को समृद्ध बनाना।",
        descEn: "Samridhi was born with a small but powerful dream — to connect farmers, promote organic farming, and bring prosperity to rural India.",
        icon: Sprout,
        accent: "#65a30d",
        bg: "from-lime-50 to-green-50",
        stat: "1",
        statUnit: "जिला / District",
        statLabel: "से शुरुआत • Where It Began",
        side: "right",
    },
    {
        year: "2017",
        titleHi: "पहली फसल",
        titleEn: "First Harvest",
        subtitleHi: "पहली सफलता",
        subtitleEn: "First Success",
        descHi: "पहले 500 किसानों को जोड़ा गया। जैविक उत्पादों की पहली खेप बाजार में पहुंची।",
        descEn: "The first 500 farmers were onboarded. Organic products reached the market for the very first time. Their smiles were our biggest reward.",
        icon: Leaf,
        accent: "#16a34a",
        bg: "from-green-50 to-emerald-50",
        stat: "500+",
        statUnit: "किसान / Farmers",
        statLabel: "जुड़े • Joined",
        side: "left",
    },
    {
        year: "2018",
        titleHi: "जड़ें मजबूत हुईं",
        titleEn: "Roots Strengthened",
        subtitleHi: "विस्तार",
        subtitleEn: "Expansion",
        descHi: "मध्यप्रदेश के 5 जिलों में विस्तार। Research & Development टीम की स्थापना।",
        descEn: "Expanded to 5 districts of Madhya Pradesh. R&D team established. Farmers introduced to modern agricultural techniques.",
        icon: TreePine,
        accent: "#059669",
        bg: "from-emerald-50 to-teal-50",
        stat: "5",
        statUnit: "जिले / Districts",
        statLabel: "में विस्तार • Expanded",
        side: "right",
    },
    {
        year: "2019",
        titleHi: "पहचान मिली",
        titleEn: "Recognition Earned",
        subtitleHi: "पुरस्कार",
        subtitleEn: "Award",
        descHi: "राज्य स्तरीय कृषि पुरस्कार प्राप्त। 2000+ किसान परिवारों की आय में 30% की वृद्धि।",
        descEn: "Won State-level Agriculture Award. Income of 2000+ farmer families grew by 30%. Samridhi brand established across Madhya Pradesh.",
        icon: Award,
        accent: "#0d9488",
        bg: "from-teal-50 to-cyan-50",
        stat: "30%",
        statUnit: "आय वृद्धि / Growth",
        statLabel: "किसानों की आय में • In Farmer Income",
        side: "left",
    },
    {
        year: "2020",
        titleHi: "चुनौती और संकल्प",
        titleEn: "Challenge & Resolve",
        subtitleHi: "दृढ़ता",
        subtitleEn: "Resilience",
        descHi: "COVID-19 के बावजूद Samridhi ने किसानों का साथ नहीं छोड़ा। डिजिटल प्लेटफॉर्म लॉन्च किया।",
        descEn: "Despite COVID-19, Samridhi stood by every farmer. A digital platform launched to deliver seeds and expert advice to doorsteps.",
        icon: Heart,
        accent: "#0891b2",
        bg: "from-cyan-50 to-sky-50",
        stat: "100%",
        statUnit: "प्रतिबद्धता / Commitment",
        statLabel: "सेवा जारी रही • Service Continued",
        side: "right",
    },
    {
        year: "2021",
        titleHi: "नई ऊंचाइयां",
        titleEn: "New Heights",
        subtitleHi: "विकास",
        subtitleEn: "Growth",
        descHi: "10,000+ किसान परिवार जुड़े। देशी बीजों का संरक्षण अभियान शुरू। महिला किसानों के लिए विशेष प्रशिक्षण।",
        descEn: "10,000+ farmer families joined. Native seed conservation drive launched. Special training programs started for women farmers.",
        icon: TrendingUp,
        accent: "#2563eb",
        bg: "from-blue-50 to-indigo-50",
        stat: "10K+",
        statUnit: "परिवार / Families",
        statLabel: "किसान परिवार • Farmer Families",
        side: "left",
    },
    {
        year: "2022",
        titleHi: "राष्ट्रीय पहचान",
        titleEn: "National Recognition",
        subtitleHi: "राष्ट्रीय स्तर",
        subtitleEn: "National Level",
        descHi: "राष्ट्रीय Best Agri-Startup Award। 15 जिलों में नेटवर्क। Export शुरू — भारतीय जैविक उत्पाद विदेश पहुंचे।",
        descEn: "Won National Best Agri-Startup Award. Network expanded to 15 districts. Exports began — Indian organic products reached global markets.",
        icon: Globe,
        accent: "#7c3aed",
        bg: "from-violet-50 to-purple-50",
        stat: "15",
        statUnit: "जिले / Districts",
        statLabel: "नेटवर्क • Network Spread",
        side: "right",
    },
    {
        year: "2023",
        titleHi: "टीम का विस्तार",
        titleEn: "Team Expansion",
        subtitleHi: "लोग",
        subtitleEn: "People",
        descHi: "50+ कर्मचारी। Regional Sales Managers की नियुक्ति। किसानों को 24/7 सहायता।",
        descEn: "50+ employees onboarded. Regional Sales Managers in every district. 24/7 farmer support made available across all regions.",
        icon: Users,
        accent: "#9333ea",
        bg: "from-purple-50 to-fuchsia-50",
        stat: "50+",
        statUnit: "सदस्य / Members",
        statLabel: "टीम सदस्य • Team Members",
        side: "left",
    },
    {
        year: "2024",
        titleHi: "तकनीक से जोड़ा",
        titleEn: "Tech Integration",
        subtitleHi: "डिजिटल",
        subtitleEn: "Digital",
        descHi: "Samridhi App लॉन्च। AI-based फसल सलाह। किसान सीधे ग्राहक से जुड़े। 25,000+ active users।",
        descEn: "Samridhi App launched with AI-based crop advisory. Farmers connected directly with customers via online marketplace. 25,000+ active users.",
        icon: Star,
        accent: "#c026d3",
        bg: "from-fuchsia-50 to-pink-50",
        stat: "25K+",
        statUnit: "Users / उपयोगकर्ता",
        statLabel: "Active • सक्रिय",
        side: "right",
    },
    {
        year: "2025",
        titleHi: "समृद्धि की ओर",
        titleEn: "Towards Prosperity",
        subtitleHi: "प्रभाव",
        subtitleEn: "Impact",
        descHi: "50,000+ किसान परिवारों की जिंदगी बदली। मध्यप्रदेश का सबसे बड़ा Agri-Network। अंतरराष्ट्रीय बाजार में धमक।",
        descEn: "50,000+ farmer families transformed. Madhya Pradesh's largest Agri-Network. Samridhi makes its mark in international markets.",
        icon: Rocket,
        accent: "#e11d48",
        bg: "from-rose-50 to-red-50",
        stat: "50K+",
        statUnit: "परिवार / Families",
        statLabel: "समृद्ध • Prospered",
        side: "left",
    },
    {
        year: "2026",
        titleHi: "नया अध्याय",
        titleEn: "A New Chapter",
        subtitleHi: "10 साल की यात्रा",
        subtitleEn: "A Decade of Dreams",
        descHi: "10 साल की यात्रा पूरी। अब लक्ष्य — पूरे भारत के किसानों तक पहुंचना। Samridhi 2.0 के साथ नई क्रांति।",
        descEn: "A decade of dedication complete. The goal now — to reach every farmer across India. Samridhi 2.0 begins a new revolution.",
        icon: Leaf,
        accent: "#16a34a",
        bg: "from-green-50 to-lime-50",
        stat: "10",
        statUnit: "साल / Years",
        statLabel: "की समृद्ध यात्रा • Of Rich Journey",
        side: "right",
    },
];

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
    const Icon = milestone.icon;
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
                    <div style={{
                        fontSize: "13px", lineHeight: "1.7", marginBottom: "18px",
                    }}>
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

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function Journey() {
    const [heroRef, heroInView] = useInView(0.1);
    const [activeFilter, setActiveFilter] = useState("all");

    const filtered = activeFilter === "all" ? milestones : milestones.filter(m => parseInt(m.year) >= parseInt(activeFilter));

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

                        {/* Filter Tabs */}
                        <div style={{
                            display: "flex", justifyContent: "center",
                            gap: "8px", flexWrap: "wrap", marginBottom: "56px",
                        }}>

                        </div>

                        {/* Timeline Line */}
                        <div style={{ position: "relative" }}>
                            <div style={{
                                position: "absolute", left: "50%", top: 0, bottom: 0,
                                width: "2px", transform: "translateX(-50%)",
                                background: "linear-gradient(to bottom, #d1fae5, #6ee7b7, #a7f3d0, #d1fae5)",
                            }} className="hidden md:block" />

                            {filtered.map((m, i) => (
                                <MilestoneCard key={m.year} milestone={m} index={i} />
                            ))}
                        </div>

                        {/* End cap */}
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

                        <p style={{
                            color: "#86efac", fontSize: "16px",
                            maxWidth: "500px", margin: "0 auto 36px",
                            lineHeight: 1.8,
                        }}>
                            10 साल की यात्रा एक प्रेरणा है। अगले 10 साल में हम और लाखों किसानों तक पहुंचेंगे।
                            <br />
                            <span style={{ color: "#6ee7b7", fontSize: "14px", fontStyle: "italic" }}>
                                A decade of inspiration. The next decade — millions more.
                            </span>
                        </p>

                        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                            <button style={{
                                display: "inline-flex", alignItems: "center", gap: "8px",
                                padding: "14px 32px", borderRadius: "999px",
                                background: "#a3e635", color: "#052e16",
                                fontWeight: 800, fontSize: "14px", letterSpacing: "0.05em",
                                border: "none", cursor: "pointer",
                                boxShadow: "0 8px 32px rgba(163,230,53,0.4)",
                                transition: "all 0.3s ease",
                            }}
                                onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 12px 40px rgba(163,230,53,0.5)"; }}
                                onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 8px 32px rgba(163,230,53,0.4)"; }}
                            >
                                हमसे जुड़ें <ArrowRight size={16} />
                            </button>
                            <button style={{
                                padding: "14px 32px", borderRadius: "999px",
                                background: "rgba(255,255,255,0.08)",
                                color: "white", fontWeight: 700, fontSize: "14px",
                                border: "2px solid rgba(255,255,255,0.2)",
                                cursor: "pointer", letterSpacing: "0.05em",
                                backdropFilter: "blur(10px)",
                                transition: "all 0.3s ease",
                            }}
                                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)"; }}
                                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; }}
                            >
                                हमारी टीम देखें • Meet Our Team
                            </button>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}