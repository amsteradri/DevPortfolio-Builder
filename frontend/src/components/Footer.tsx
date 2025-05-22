import React from "react";

const Footer: React.FC = () => {
    return (
        <footer
            style={{
                width: "100%",
                background: "#18181b",
                color: "#a1a1aa",
                padding: "0.75rem 0",
                textAlign: "center",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.95rem",
                letterSpacing: "0.02em",
                borderTop: "1px solid #27272a",
                boxShadow: "0 -1px 8px rgba(0,0,0,0.03)",
            }}
        >
            <span>
                © {new Date().getFullYear()} DevPortfolio Builder &mdash; Adrián Gutiérrez Segovia
            </span>
        </footer>
    );
};

export default Footer;
