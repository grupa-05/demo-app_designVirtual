"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Rezultate() {
    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Rezultat AI</span>

                <h1>Rezultatul designului tău 🎨</h1>

                <p>
                    Aici va fi afișată propunerea de design interior generată pe baza
                    imaginii încărcate și a stilului ales.
                </p>
            </section>

            <section className="resultGrid">
                <div className="resultCard">
                    <div className="imagePlaceholder">
                        <div className="placeholderIcon">🛋️</div>

                        <h2>Design generat aici</h2>

                        <p>
                            Momentan acesta este un spațiu de prezentare. Aici va apărea
                            imaginea de design interior generată pentru camera ta.
                        </p>
                    </div>
                </div>

                <aside className="detailsCard">
                    <span className="smallTag">Status</span>

                    <h2>Previzualizare design</h2>

                    <p>
                        Această secțiune descrie ce va conține rezultatul final: o cameră
                        redecorată pe baza stilului ales și a imaginii încărcate.
                    </p>

                    <div className="infoList">
                        <div>
                            <span>🎨</span>
                            <p>Stil aplicat în design</p>
                        </div>

                        <div>
                            <span>🧠</span>
                            <p>Generare asistată de AI</p>
                        </div>

                        <div>
                            <span>🏠</span>
                            <p>Design adaptat spațiului încărcat</p>
                        </div>
                    </div>

                    <div className="actionButtons">
                        <Link href="/produse" className="resultButton primaryResultButton">
                            🛒 Vezi produsele recomandate
                        </Link>

                        <Link href="/" className="resultButton secondaryResultButton">
                            🔄 Generează alt design
                        </Link>
                    </div>
                </aside>
            </section>

            <section className="suggestions">
                <div className="sectionHeader">
                    <span>Inspirație</span>
                    <h2>Ce poate include rezultatul?</h2>
                </div>

                <div className="suggestionGrid">
                    <div className="suggestionCard">
                        <div className="icon">🪑</div>
                        <h3>Mobilier potrivit</h3>
                        <p>
                            Sugestii de canapele, mese, scaune sau dulapuri potrivite pentru
                            stilul ales.
                        </p>
                    </div>

                    <div className="suggestionCard">
                        <div className="icon">💡</div>
                        <h3>Idei de iluminat</h3>
                        <p>
                            Recomandări pentru lămpi, corpuri de iluminat și o atmosferă
                            vizuală mai plăcută.
                        </p>
                    </div>

                    <div className="suggestionCard">
                        <div className="icon">🌿</div>
                        <h3>Elemente decorative</h3>
                        <p>
                            Decorațiuni, plante, tablouri și accesorii care completează
                            amenajarea camerei.
                        </p>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .page {
                    min-height: 100vh;
                    padding: 34px 58px;
                    font-family: Arial, sans-serif;
                    color: #111;
                    background:
                            radial-gradient(circle at top left, rgba(255, 255, 255, 0.95), transparent 35%),
                            radial-gradient(circle at top right, rgba(255, 223, 180, 0.8), transparent 30%),
                            linear-gradient(135deg, #f4eadb, #c9b08d);
                }

                .hero {
                    background: rgba(255, 255, 255, 0.72);
                    border-radius: 34px;
                    padding: 44px;
                    text-align: center;
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
                    margin-bottom: 36px;
                }

                .tag,
                .smallTag {
                    display: inline-block;
                    background: #111;
                    color: white;
                    padding: 9px 16px;
                    border-radius: 999px;
                    font-size: 13px;
                    font-weight: 800;
                    margin-bottom: 18px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .hero h1 {
                    font-size: 42px;
                    margin: 0 0 14px;
                }

                .hero p {
                    max-width: 760px;
                    margin: 0 auto;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #333;
                }

                .resultGrid {
                    display: grid;
                    grid-template-columns: 1.5fr 0.8fr;
                    gap: 28px;
                    margin-bottom: 40px;
                }

                .resultCard,
                .detailsCard,
                .suggestions {
                    background: rgba(255, 255, 255, 0.72);
                    border-radius: 34px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                }

                .resultCard {
                    padding: 28px;
                    min-height: 430px;
                }

                .imagePlaceholder {
                    height: 100%;
                    min-height: 390px;
                    border-radius: 28px;
                    background: linear-gradient(135deg, #ffffff, #f3eadf);
                    border: 2px dashed #d7c5ad;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 30px;
                }

                .placeholderIcon {
                    font-size: 78px;
                    margin-bottom: 16px;
                }

                .imagePlaceholder h2 {
                    font-size: 28px;
                    margin: 0 0 10px;
                }

                .imagePlaceholder p {
                    max-width: 520px;
                    color: #555;
                    line-height: 1.6;
                    margin: 0;
                }

                .detailsCard {
                    padding: 32px;
                }

                .detailsCard h2 {
                    font-size: 28px;
                    margin: 0 0 12px;
                }

                .detailsCard > p {
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 24px;
                }

                .infoList {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-bottom: 26px;
                }

                .infoList div {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    background: white;
                    padding: 14px;
                    border-radius: 18px;
                    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
                }

                .infoList span {
                    font-size: 24px;
                }

                .infoList p {
                    margin: 0;
                    font-weight: 700;
                    color: #333;
                }

                .actionButtons {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-top: 28px;
                }

                .actionButtons :global(a) {
                    text-decoration: none;
                }

                .actionButtons :global(.resultButton) {
                    width: 100%;
                    box-sizing: border-box;
                    min-height: 54px;
                    border-radius: 18px;
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    font-size: 15px;
                    font-weight: 900;
                    transition: 0.2s;
                }

                .actionButtons :global(.primaryResultButton) {
                    background: #111;
                    color: white;
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
                }

                .actionButtons :global(.secondaryResultButton) {
                    background: white;
                    color: #111;
                    border: 1px solid #ddd;
                    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
                }

                .actionButtons :global(.resultButton:hover) {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
                }

                .suggestions {
                    padding: 36px;
                    margin-bottom: 30px;
                }

                .sectionHeader {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .sectionHeader span {
                    color: #8a5a2b;
                    font-weight: 800;
                    text-transform: uppercase;
                    font-size: 13px;
                    letter-spacing: 1px;
                }

                .sectionHeader h2 {
                    font-size: 32px;
                    margin: 8px 0;
                }

                .suggestionGrid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                }

                .suggestionCard {
                    background: white;
                    border-radius: 26px;
                    padding: 28px;
                    text-align: center;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.1);
                    transition: 0.2s;
                }

                .suggestionCard:hover {
                    transform: translateY(-6px);
                }

                .icon {
                    font-size: 42px;
                    margin-bottom: 12px;
                }

                .suggestionCard p {
                    color: #555;
                    line-height: 1.5;
                }

                @media (max-width: 900px) {
                    .page {
                        padding: 24px;
                    }

                    .hero h1 {
                        font-size: 34px;
                    }

                    .resultGrid,
                    .suggestionGrid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </main>
    );
}