'use client';

import React, { useState, useEffect } from "react";

// Add hamburger icon SVG as a component
const HamburgerButton = ({ onClick, isOpen }) => (
    <button
        onClick={onClick}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginLeft: 20,
            marginBottom: 20,
            outline: "none",
            display: "flex",
            alignItems: "center",
            height: 40,
            width: 40,
        }}
    >
        <svg width="28" height="28" viewBox="0 0 28 28">
            <rect y="5" width="28" height="3" rx="1.5" fill="#fff" />
            <rect y="12" width="28" height="3" rx="1.5" fill="#fff" />
            <rect y="19" width="28" height="3" rx="1.5" fill="#fff" />
        </svg>
    </button>
);

const FeedbackIcon = () => (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
        <path d="M12 21c-4.97 0-9-3.582-9-8 0-2.21 1.79-4 4-4h1V7c0-2.21 1.79-4 4-4s4 1.79 4 4v2h1c2.21 0 4 1.79 4 4 0 4.418-4.03 8-9 8zm-3-8c0 1.657 1.343 3 3 3s3-1.343 3-3" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const styles = {
    dashboard: {
        display: "flex",
        height: "100vh",
        fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        background: "#f8fafc",
        color: "#222",
        overflow: "hidden",
    },
    sidebar: {
        background: "#2563eb",
        color: "#fff",
        width: 260,
        display: "flex",
        flexDirection: "column",
        padding: "28px 0 18px 0",
        boxShadow: "4px 0 16px rgba(37,99,235,0.08)",
        flexShrink: 0,
        transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
        zIndex: 10,
        borderTopRightRadius: 24,
        borderBottomRightRadius: 24,
        position: "relative",
    },
    sidebarHidden: {
        transform: "translateX(-110%)",
        position: "absolute",
        left: 0,
        top: 0,
        height: "100%",
    },
    sidebarHeader: {
        margin: "0 0 36px 32px",
        fontSize: 26,
        letterSpacing: 1.5,
        fontWeight: 800,
        color: "#fff",
        textShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    navLinks: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },
    navButton: {
        background: "none",
        border: "none",
        color: "#dbeafe",
        padding: "14px 36px",
        fontSize: 17,
        textAlign: "left",
        cursor: "pointer",
        transition: "background 0.25s, color 0.25s, border-left 0.25s",
        borderLeft: "4px solid transparent",
        fontWeight: 600,
        borderRadius: "0 20px 20px 0",
        display: "flex",
        alignItems: "center",
        outline: "none",
    },
    navButtonActive: {
        background: "#1d4ed8",
        color: "#fff",
        borderLeft: "4px solid #38bdf8",
        boxShadow: "0 2px 8px rgba(56,189,248,0.10)",
    },
    feedbackBtn: {
        background: "linear-gradient(90deg, #38bdf8 60%, #60a5fa 100%)",
        color: "#1e293b",
        fontWeight: 700,
        border: "none",
        padding: "14px 36px",
        margin: "18px 0 0 0",
        borderRadius: "0 20px 20px 0",
        cursor: "pointer",
        fontSize: 17,
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 8px rgba(56,189,248,0.10)",
        transition: "background 0.25s, color 0.25s",
        outline: "none",
    },
    feedbackBtnActive: {
        background: "linear-gradient(90deg, #60a5fa 60%, #38bdf8 100%)",
        color: "#1e293b",
    },
    logoutBtn: {
        background: "linear-gradient(90deg, #ef4444 60%, #f87171 100%)",
        color: "#fff",
        fontWeight: 700,
        border: "none",
        padding: "14px 36px",
        margin: "24px 20px 0 20px",
        borderRadius: "0 20px 20px 0",
        cursor: "pointer",
        fontSize: 17,
        boxShadow: "0 2px 8px rgba(239,68,68,0.10)",
        transition: "background 0.3s",
        outline: "none",
        alignSelf: "stretch",
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    mainContent: {
        flexGrow: 1,
        padding: "48px 60px",
        overflowY: "auto",
        background: "#fff",
        borderTopLeftRadius: 32,
        borderBottomLeftRadius: 32,
        margin: "18px 18px 18px 0",
        boxShadow: "0 2px 24px rgba(37,99,235,0.07)",
        minHeight: "calc(100vh - 36px)",
        position: "relative",
    },
    mainTitle: {
        marginBottom: 32,
        fontSize: 32,
        fontWeight: 800,
        color: "#2563eb",
        letterSpacing: 1.2,
        textShadow: "0 2px 8px rgba(37,99,235,0.07)",
        display: "flex",
        alignItems: "center",
        gap: 10,
    },
    emailHistory: {
        background: "#f1f5f9",
        borderRadius: 16,
        boxShadow: "0 1px 10px rgba(0,0,0,0.04)",
        padding: 28,
        marginBottom: 24,
    },
    emailItem: {
        borderBottom: "1px solid #e5e7eb",
        padding: "18px 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "background 0.2s",
        borderRadius: 8,
    },
    emailItemLast: {
        borderBottom: "none",
    },
    emailInfo: {
        maxWidth: "70%",
    },
    emailSubject: {
        fontWeight: 700,
        fontSize: 18,
        color: "#2563eb",
        marginBottom: 6,
    },
    emailSender: {
        fontSize: 15,
        color: "#64748b",
    },
    emailDate: {
        fontSize: 14,
        color: "#94a3b8",
        fontStyle: "italic",
    },
    hamburgerWrapper: {
        display: "none",
        position: "absolute",
        top: 24,
        left: 24,
        zIndex: 20,
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.2)",
        zIndex: 9,
        display: "block",
    },
    // Responsive
    '@media (max-width: 900px)': {
        sidebar: {
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            zIndex: 10,
        },
        hamburgerWrapper: {
            display: "block",
        },
    },
};

const FeedbackSection = () => (
    <section style={{
        background: "linear-gradient(120deg, #fffbe6 80%, #fff9cc 100%)",
        borderRadius: 16,
        boxShadow: "0 1px 10px rgba(255,204,0,0.07)",
        padding: 28,
        marginBottom: 24,
        minHeight: 180,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center"
    }}>
        <h2 style={{ color: "#bfa100", fontWeight: 800, fontSize: 22, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <FeedbackIcon /> Feedback
        </h2>
        <p style={{ color: "#7a6a00", fontSize: 16, marginBottom: 16 }}>
            We value your feedback! Please let us know how we can improve your experience.
        </p>
        <textarea
            rows={3}
            placeholder="Type your feedback here..."
            style={{
                width: "100%",
                borderRadius: 8,
                border: "1px solid #ffe066",
                padding: 10,
                fontSize: 15,
                marginBottom: 12,
                resize: "vertical",
                fontFamily: "inherit"
            }}
        />
        <button
            style={{
                background: "linear-gradient(90deg, #ffcc00 60%, #ffe066 100%)",
                color: "#1e2a78",
                fontWeight: 700,
                border: "none",
                padding: "10px 28px",
                borderRadius: 8,
                cursor: "pointer",
                fontSize: 16,
                boxShadow: "0 2px 8px rgba(255,204,0,0.10)",
                transition: "background 0.25s, color 0.25s",
            }}
            onClick={() => alert("Thank you for your feedback!")}
        >
            Submit Feedback
        </button>
    </section>
);

const Dashboard = () => {
    const [activeSection, setActiveSection] = useState("emailHistory");
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 900);
    const [emailHistoryData, setEmailHistoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Responsive sidebar toggle
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 900) setSidebarOpen(true);
            else setSidebarOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Fetch email history from backend
    useEffect(() => {
        setLoading(true);
        setError(null);
        fetch("/api/email-history") // Change this endpoint to your backend route
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch");
                return res.json();
            })
            .then((data) => {
                setEmailHistoryData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Could not load emails.");
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        alert("You have been logged out.");
        // In real app, add logout logic here, e.g. clearing tokens and redirecting
    };

    // Updated EmailHistory to accept data, loading, and error
    const EmailHistory = ({ data, loading, error }) => (
        <section aria-live="polite" aria-relevant="additions removals" aria-atomic="true" style={styles.emailHistory}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : data.length === 0 ? (
                <p>No emails found.</p>
            ) : (
                data.map((email, index) => (
                    <article
                        key={email.id}
                        tabIndex={0}
                        style={index === data.length - 1 ? { ...styles.emailItem, ...styles.emailItemLast } : styles.emailItem}
                    >
                        <div style={styles.emailInfo}>
                            <div style={styles.emailSubject}>{email.subject}</div>
                            <div style={styles.emailSender}>{email.sender}</div>
                        </div>
                        <time dateTime={email.date?.replace(" ", "T")} style={styles.emailDate}>
                            {email.date}
                        </time>
                    </article>
                ))
            )}
        </section>
    );

    return (
        <div style={styles.dashboard}>
            {/* Hamburger button for mobile */}
            <div style={{ ...styles.hamburgerWrapper, ...(window.innerWidth <= 900 ? { display: "block" } : {}) }}>
                <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
            </div>
            {/* Overlay for mobile */}
            {window.innerWidth <= 900 && sidebarOpen && (
                <div style={styles.overlay} onClick={() => setSidebarOpen(false)} />
            )}
            {/* Sidebar */}
            <nav
                style={{
                    ...styles.sidebar,
                    ...(window.innerWidth <= 900 && !sidebarOpen ? styles.sidebarHidden : {}),
                }}
                aria-label="Sidebar Navigation"
            >
                <h2 style={styles.sidebarHeader}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 32 32" style={{ marginRight: 8 }}>
                        <circle cx="16" cy="16" r="16" fill="#ffcc00" />
                        <text x="16" y="21" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1e2a78">EM</text>
                    </svg>
                    User Dashboard
                </h2>
                <div style={styles.navLinks} role="navigation" aria-label="Main navigation">
                    <button
                        onClick={() => setActiveSection("emailHistory")}
                        style={activeSection === "emailHistory" ? { ...styles.navButton, ...styles.navButtonActive } : styles.navButton}
                        aria-current={activeSection === "emailHistory" ? "page" : undefined}
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
                            <rect x="3" y="5" width="18" height="14" rx="3" fill="#fff" stroke="#1e2a78" strokeWidth="2"/>
                            <path d="M3 7l9 6 9-6" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Email History
                    </button>
                    <button
                        onClick={() => setActiveSection("feedback")}
                        style={activeSection === "feedback" ? { ...styles.feedbackBtn, ...styles.feedbackBtnActive } : styles.feedbackBtn}
                        aria-current={activeSection === "feedback" ? "page" : undefined}
                    >
                        <FeedbackIcon />
                        Feedback
                    </button>
                </div>
                <button style={styles.logoutBtn} onClick={handleLogout} aria-label="Logout">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" style={{ marginRight: 10 }}>
                        <path d="M16 17l5-5-5-5M21 12H9M13 21a9 9 0 1 1 0-18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Logout
                </button>
            </nav>

            <main tabIndex={-1} role="main" style={styles.mainContent}>
                {activeSection === "emailHistory" && (
                    <>
                        <h1 style={styles.mainTitle}>
                            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                                <rect x="3" y="5" width="18" height="14" rx="3" fill="#fff" stroke="#1e2a78" strokeWidth="2"/>
                                <path d="M3 7l9 6 9-6" stroke="#ffcc00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Email History
                        </h1>
                        <EmailHistory data={emailHistoryData} loading={loading} error={error} />
                    </>
                )}
                {activeSection === "feedback" && (
                    <>
                        <h1 style={styles.mainTitle}>
                            <FeedbackIcon />
                            Feedback
                        </h1>
                        <FeedbackSection />
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;

