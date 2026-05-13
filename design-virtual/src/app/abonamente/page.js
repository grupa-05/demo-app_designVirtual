"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Abonamente() {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authMessage, setAuthMessage] = useState("");

    useEffect(() => {
        const logged = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(logged === "true");
    }, []);

    const plans = [
        {
            name: "Bronze",
            emoji: "🥉",
            price: "19 lei",
            tokens: "1 token",
            images: "1 imagine generată",
            description:
                "Potrivit pentru testarea aplicației și generarea unei singure propuneri de design.",
            features: [
                "1 imagine generată AI",
                "Alegerea unui stil de amenajare",
                "Recomandări generale de design",
                "Acces la produse recomandate",
            ],
            highlighted: false,
        },
        {
            name: "Silver",
            emoji: "🥈",
            price: "49 lei",
            tokens: "3 token-uri",
            images: "3 imagini generate",
            description:
                "Ideal pentru utilizatorii care vor să testeze mai multe stiluri pentru aceeași cameră.",
            features: [
                "3 imagini generate AI",
                "Mai multe variante de stil",
                "Sugestii de mobilier și decor",
                "Potrivit pentru camere diferite",
            ],
            highlighted: false,
        },
        {
            name: "Gold",
            emoji: "🥇",
            price: "89 lei",
            tokens: "7 token-uri",
            images: "7 imagini generate",
            description:
                "Cel mai echilibrat pachet pentru redecorarea mai multor camere sau compararea mai multor idei.",
            features: [
                "7 imagini generate AI",
                "Recomandări mai detaliate",
                "Comparație între stiluri",
                "Acces prioritar la rezultate",
            ],
            highlighted: true,
        },
        {
            name: "Platinum",
            emoji: "💎",
            price: "149 lei",
            tokens: "15 token-uri",
            images: "15 imagini generate",
            description:
                "Pachet premium pentru utilizatorii care vor mai multe variante și o experiență completă.",
            features: [
                "15 imagini generate AI",
                "Design pentru mai multe camere",
                "Sugestii premium de mobilier",
                "Recomandări decorative avansate",
            ],
            highlighted: false,
        },
    ];

    function handleChoosePlan(planName) {
        if (!isLoggedIn) {
            setAuthMessage(
                "Pentru a alege un pachet, trebuie mai întâi să te autentifici sau să îți creezi un cont."
            );

            setTimeout(() => {
                router.push("/login");
            }, 900);

            return;
        }

        router.push(`/plata?pachet=${planName}`);
    }

    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Token-uri & Abonamente</span>

                <h1>Alege pachetul potrivit pentru designul camerei tale ✨</h1>

                <p>
                    Fiecare token poate fi folosit pentru generarea unei imagini de design
                    interior. Poți alege un pachet simplu pentru testare sau un abonament
                    mai mare pentru mai multe camere și stiluri.
                </p>
            </section>

            {!isLoggedIn && (
                <section className="loginNotice">
                    <div className="noticeIcon">🔐</div>

                    <div>
                        <h3>Ai nevoie de un cont pentru a alege un pachet</h3>
                        <p>
                            Autentifică-te sau creează un cont pentru a putea activa
                            token-urile și folosi pachetele disponibile.
                        </p>
                    </div>

                    <button type="button" onClick={() => router.push("/login")}>
                        Login
                    </button>
                </section>
            )}

            {authMessage && <div className="authMessage">{authMessage}</div>}

            <section className="explanation">
                <div className="explanationCard">
                    <div className="explanationIcon">🪙</div>
                    <h2>Cum funcționează token-urile?</h2>
                    <p>
                        Un token reprezintă o generare AI. De exemplu, dacă ai 3 token-uri,
                        poți genera 3 variante diferite de design interior.
                    </p>
                </div>

                <div className="explanationCard">
                    <div className="explanationIcon">🎨</div>
                    <h2>De ce ai avea nevoie de mai multe?</h2>
                    <p>
                        Poți testa mai multe stiluri, precum modern, minimalist, luxury,
                        boho sau scandinav, până găsești varianta potrivită.
                    </p>
                </div>

                <div className="explanationCard">
                    <div className="explanationIcon">🛋️</div>
                    <h2>Ce primești?</h2>
                    <p>
                        Primești o propunere de design, idei de amenajare și produse
                        recomandate care pot completa stilul ales.
                    </p>
                </div>
            </section>

            <section className="plansGrid">
                {plans.map((plan, index) => (
                    <div
                        className={plan.highlighted ? "planCard highlighted" : "planCard"}
                        key={index}
                    >
                        {plan.highlighted && <div className="popularBadge">Popular</div>}

                        <div className="planHeader">
                            <div className="planEmoji">{plan.emoji}</div>

                            <div>
                                <h2>{plan.name}</h2>
                                <p>{plan.images}</p>
                            </div>
                        </div>

                        <div className="price">{plan.price}</div>

                        <div className="tokens">{plan.tokens}</div>

                        <p className="description">{plan.description}</p>

                        <ul>
                            {plan.features.map((feature, i) => (
                                <li key={i}>✓ {feature}</li>
                            ))}
                        </ul>

                        <button type="button" onClick={() => handleChoosePlan(plan.name)}>
                            {isLoggedIn
                                ? `Alege pachetul ${plan.name}`
                                : "Login pentru a alege"}
                        </button>
                    </div>
                ))}
            </section>

            <style jsx>{`
                .page {
                    min-height: 100vh;
                    padding: 34px 58px;
                    font-family: Arial, sans-serif;
                    color: #111;
                    background:
                            radial-gradient(
                                    circle at top left,
                                    rgba(255, 255, 255, 0.95),
                                    transparent 35%
                            ),
                            radial-gradient(
                                    circle at top right,
                                    rgba(255, 223, 180, 0.8),
                                    transparent 30%
                            ),
                            linear-gradient(135deg, #f4eadb, #c9b08d);
                }

                .hero {
                    background: rgba(255, 255, 255, 0.72);
                    border-radius: 34px;
                    padding: 46px;
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
                    max-width: 900px;
                    margin: 0 auto 16px;
                    line-height: 1.15;
                }

                .hero p {
                    max-width: 850px;
                    margin: 0 auto;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #333;
                }

                .loginNotice {
                    background: #fff6e8;
                    border: 1px solid #e5c894;
                    border-radius: 24px;
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 30px;
                    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
                }

                .noticeIcon {
                    width: 48px;
                    height: 48px;
                    background: #111;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    flex-shrink: 0;
                }

                .loginNotice h3 {
                    margin: 0 0 4px;
                }

                .loginNotice p {
                    margin: 0;
                    color: #6a4b15;
                    line-height: 1.5;
                }

                .loginNotice button {
                    margin-left: auto;
                    white-space: nowrap;
                }

                .authMessage {
                    background: white;
                    color: #8a1f11;
                    border-radius: 20px;
                    padding: 16px 20px;
                    font-weight: 900;
                    margin-bottom: 24px;
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.08);
                }

                .explanation {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 34px;
                }

                .explanationCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 28px;
                    padding: 28px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    transition: 0.2s;
                }

                .explanationCard:hover {
                    transform: translateY(-6px);
                }

                .explanationIcon {
                    font-size: 38px;
                    margin-bottom: 12px;
                }

                .explanationCard h2 {
                    font-size: 22px;
                    margin: 0 0 10px;
                }

                .explanationCard p {
                    color: #555;
                    line-height: 1.6;
                    margin: 0;
                }

                .plansGrid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                    margin-bottom: 34px;
                }

                .planCard {
                    position: relative;
                    background: rgba(255, 255, 255, 0.86);
                    border-radius: 30px;
                    padding: 28px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    transition: 0.2s;
                    display: flex;
                    flex-direction: column;
                    min-height: 520px;
                    border: 2px solid transparent;
                }

                .planCard:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 24px 55px rgba(0, 0, 0, 0.16);
                }

                .highlighted {
                    border-color: #111;
                    background: linear-gradient(135deg, #ffffff, #fff6e8);
                }

                .popularBadge {
                    position: absolute;
                    top: -14px;
                    right: 24px;
                    background: #111;
                    color: white;
                    padding: 8px 14px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 900;
                    text-transform: uppercase;
                }

                .planHeader {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 20px;
                }

                .planEmoji {
                    width: 58px;
                    height: 58px;
                    border-radius: 20px;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 34px;
                    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
                }

                .planHeader h2 {
                    font-size: 26px;
                    margin: 0 0 4px;
                }

                .planHeader p {
                    margin: 0;
                    color: #555;
                    font-weight: 700;
                }

                .price {
                    font-size: 36px;
                    font-weight: 900;
                    margin-bottom: 8px;
                }

                .tokens {
                    display: inline-block;
                    background: #111;
                    color: white;
                    padding: 9px 14px;
                    border-radius: 999px;
                    font-size: 13px;
                    font-weight: 900;
                    width: fit-content;
                    margin-bottom: 18px;
                }

                .description {
                    color: #555;
                    line-height: 1.6;
                    margin: 0 0 18px;
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0 0 22px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    color: #333;
                    line-height: 1.4;
                    flex: 1;
                }

                li {
                    font-weight: 700;
                }

                button {
                    border: none;
                    text-align: center;
                    border-radius: 18px;
                    background: #111;
                    color: white;
                    padding: 15px 18px;
                    font-weight: 900;
                    cursor: pointer;
                    transition: 0.2s;
                    margin-top: auto;
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
                    font-size: 15px;
                }

                button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
                }

                @media (max-width: 1200px) {
                    .plansGrid {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .explanation {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 700px) {
                    .page {
                        padding: 24px;
                    }

                    .hero h1 {
                        font-size: 34px;
                    }

                    .plansGrid {
                        grid-template-columns: 1fr;
                    }

                    .loginNotice {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .loginNotice button {
                        margin-left: 0;
                    }
                }
            `}</style>
        </main>
    );
}