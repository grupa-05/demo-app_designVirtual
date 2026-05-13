"use client";

import Navbar from "../components/Navbar";

export default function About() {
    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Despre proiect</span>

                <h1>Despre aplicație ℹ️</h1>

                <p>
                    Virtual Room Designer este o platformă web care ajută utilizatorii să
                    își imagineze mai ușor cum ar putea arăta camera lor după o
                    redecorare.
                </p>
            </section>

            <section className="mainCard">
                <h2>🏠 Ce face aplicația?</h2>

                <p>
                    Aplicația permite încărcarea unei fotografii cu o cameră, alegerea unui
                    stil de amenajare interioară și generarea unor idei de design adaptate
                    spațiului respectiv. Scopul este de a oferi utilizatorului o imagine
                    mai clară asupra modului în care poate fi transformată o cameră
                    folosind elemente decorative și mobilier potrivit.
                </p>
            </section>

            <section className="featuresGrid">
                <div className="featureCard">
                    <div className="icon">📷</div>
                    <h3>Încărcare imagine</h3>
                    <p>
                        Utilizatorul poate încărca o fotografie cu propria cameră pentru a
                        porni procesul de personalizare a designului.
                    </p>
                </div>

                <div className="featureCard">
                    <div className="icon">🎨</div>
                    <h3>Alegerea stilului</h3>
                    <p>
                        Aplicația oferă mai multe stiluri de amenajare, precum modern,
                        minimalist, luxury, boho sau scandinav.
                    </p>
                </div>

                <div className="featureCard">
                    <div className="icon">🤖</div>
                    <h3>Design asistat de AI</h3>
                    <p>
                        Pe baza imaginii și a stilului ales, aplicația poate genera o
                        propunere vizuală de redecorare a spațiului.
                    </p>
                </div>

                <div className="featureCard">
                    <div className="icon">🛒</div>
                    <h3>Produse recomandate</h3>
                    <p>
                        Utilizatorul primește sugestii de mobilier și obiecte decorative care
                        se potrivesc cu stilul ales.
                    </p>
                </div>
            </section>

            <section className="mainCard">
                <h2>✨ Scopul proiectului</h2>

                <p>
                    Scopul acestei aplicații este de a combina tehnologiile web moderne cu
                    inteligența artificială pentru a crea o experiență practică și ușor de
                    folosit în domeniul designului interior. Aplicația este utilă pentru
                    persoanele care doresc să își redecoreze locuința, dar au nevoie de
                    inspirație vizuală și de recomandări concrete.
                </p>
            </section>

            <section className="mainCard">
                <h2>🧩 Funcționalități principale</h2>

                <ul>
                    <li>Încărcarea unei imagini cu o cameră.</li>
                    <li>Selectarea unui stil de design interior.</li>
                    <li>Generarea unei variante de cameră redecorată.</li>
                    <li>Afișarea produselor recomandate pentru amenajare.</li>
                    <li>Utilizarea pachetelor cu token-uri pentru generări AI.</li>
                    <li>Autentificare și înregistrare pentru acces la generator.</li>
                </ul>
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
                    margin-bottom: 30px;
                }

                .tag {
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
                    max-width: 850px;
                    margin: 0 auto;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #333;
                }

                .mainCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 30px;
                    padding: 30px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    margin-bottom: 28px;
                }

                .mainCard h2 {
                    font-size: 28px;
                    margin: 0 0 14px;
                }

                .mainCard p {
                    color: #333;
                    font-size: 17px;
                    line-height: 1.7;
                    margin: 0;
                }

                .mainCard ul {
                    margin: 0;
                    padding-left: 22px;
                    color: #333;
                    font-size: 17px;
                    line-height: 1.9;
                }

                .featuresGrid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 22px;
                    margin-bottom: 28px;
                }

                .featureCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 26px;
                    padding: 26px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    transition: 0.2s;
                    min-height: 210px;
                }

                .featureCard:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 24px 55px rgba(0, 0, 0, 0.14);
                }

                .icon {
                    font-size: 32px;
                    margin-bottom: 12px;
                }

                .featureCard h3 {
                    font-size: 22px;
                    margin: 0 0 10px;
                }

                .featureCard p {
                    color: #444;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 1100px) {
                    .featuresGrid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 700px) {
                    .page {
                        padding: 24px;
                    }

                    .hero h1 {
                        font-size: 34px;
                    }

                    .featuresGrid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </main>
    );
}