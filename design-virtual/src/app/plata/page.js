"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Plata() {
    const [selectedPlan, setSelectedPlan] = useState("Pachet selectat");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [paid, setPaid] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const plan = params.get("pachet");

        if (plan) {
            setSelectedPlan(plan);
        }
    }, []);

    function formatCardNumber(value) {
        const onlyNumbers = value.replace(/\D/g, "").slice(0, 16);
        return onlyNumbers.replace(/(.{4})/g, "$1 ").trim();
    }

    function formatExpiry(value) {
        const onlyNumbers = value.replace(/\D/g, "").slice(0, 4);

        if (onlyNumbers.length <= 2) {
            return onlyNumbers;
        }

        return `${onlyNumbers.slice(0, 2)}/${onlyNumbers.slice(2)}`;
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!cardNumber || !cardName || !expiry || !cvv) {
            alert("Completează toate câmpurile pentru a continua.");
            return;
        }

        setPaid(true);
    }

    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Plată</span>

                <h1>Finalizează alegerea pachetului 💳</h1>

                <p>
                    Completează datele de plată pentru a activa pachetul ales și pentru a
                    începe generarea designurilor interioare.
                </p>
            </section>

            <section className="paymentGrid">
                <div className="summaryCard">
                    <span className="smallTag">Pachet ales</span>

                    <h2>{selectedPlan}</h2>

                    <p>
                        Pachetul selectat îți oferă token-uri pe care le poți folosi pentru
                        generarea imaginilor de design interior.
                    </p>

                    <div className="summaryList">
                        <div>
                            <span>🪙</span>
                            <p>Token-uri pentru generări AI</p>
                        </div>

                        <div>
                            <span>🎨</span>
                            <p>Design interior personalizat</p>
                        </div>

                        <div>
                            <span>🛋️</span>
                            <p>Recomandări pentru amenajare</p>
                        </div>
                    </div>

                    <div className="secureBox">
                        🔒 Datele sunt folosite pentru finalizarea comenzii.
                    </div>
                </div>

                <div className="paymentCard">
                    {!paid ? (
                        <>
                            <span className="smallTag">Date card</span>

                            <h2>Detalii plată</h2>

                            <form onSubmit={handleSubmit}>
                                <label>
                                    Număr card
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardNumber}
                                        onChange={(e) =>
                                            setCardNumber(formatCardNumber(e.target.value))
                                        }
                                    />
                                </label>

                                <label>
                                    Nume titular
                                    <input
                                        type="text"
                                        placeholder="Popescu Ana"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value)}
                                    />
                                </label>

                                <div className="row">
                                    <label>
                                        Expirare
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={expiry}
                                            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                                        />
                                    </label>

                                    <label>
                                        CVV
                                        <input
                                            type="password"
                                            placeholder="123"
                                            maxLength="3"
                                            value={cvv}
                                            onChange={(e) =>
                                                setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                                            }
                                        />
                                    </label>
                                </div>

                                <button type="submit">Confirmă plata ✨</button>
                            </form>
                        </>
                    ) : (
                        <div className="successBox">
                            <div className="successIcon">✓</div>

                            <h2>Plată finalizată cu succes</h2>

                            <p>
                                Pachetul <strong>{selectedPlan}</strong> a fost activat. Poți
                                începe acum să generezi designuri pentru camera ta.
                            </p>

                            <div className="successActions">
                                <Link href="/" className="primaryAction">
                                    Generează design
                                </Link>

                                <Link href="/abonamente" className="secondaryAction">
                                    Înapoi la abonamente
                                </Link>
                            </div>
                        </div>
                    )}
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
                    padding: 40px;
                    text-align: center;
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
                    margin-bottom: 32px;
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
                    font-size: 36px;
                    margin: 0 0 14px;
                    line-height: 1.15;
                }

                .hero p {
                    max-width: 760px;
                    margin: 0 auto;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #333;
                }

                .paymentGrid {
                    display: grid;
                    grid-template-columns: 0.9fr 1.1fr;
                    gap: 28px;
                    margin-bottom: 30px;
                }

                .summaryCard,
                .paymentCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 34px;
                    padding: 34px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                }

                .summaryCard h2,
                .paymentCard h2 {
                    font-size: 32px;
                    margin: 0 0 12px;
                }

                .summaryCard > p {
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    font-size: 16px;
                }

                .summaryList {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                    margin-bottom: 24px;
                }

                .summaryList div {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    background: white;
                    padding: 15px;
                    border-radius: 18px;
                    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
                }

                .summaryList span {
                    font-size: 24px;
                }

                .summaryList p {
                    margin: 0;
                    font-weight: 800;
                    color: #333;
                }

                .secureBox {
                    background: #f3fff5;
                    border: 1px solid #bfe8c6;
                    border-radius: 18px;
                    padding: 15px;
                    color: #1f6b25;
                    font-weight: 800;
                    line-height: 1.5;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    margin-top: 10px;
                }

                label {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    font-weight: 900;
                    color: #222;
                }

                input {
                    border: 1px solid #ddd;
                    border-radius: 16px;
                    padding: 16px;
                    font-size: 16px;
                    outline: none;
                    background: white;
                    transition: 0.2s;
                }

                input:focus {
                    border-color: #111;
                    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.08);
                }

                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 18px;
                }

                button {
                    margin-top: 10px;
                    border: none;
                    border-radius: 18px;
                    background: #111;
                    color: white;
                    padding: 16px 22px;
                    font-weight: 900;
                    font-size: 15px;
                    cursor: pointer;
                    transition: 0.2s;
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
                }

                button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
                }

                .successBox {
                    min-height: 430px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }

                .successIcon {
                    width: 78px;
                    height: 78px;
                    border-radius: 50%;
                    background: #2f7d32;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 38px;
                    font-weight: 900;
                    margin-bottom: 20px;
                }

                .successBox h2 {
                    font-size: 32px;
                    margin-bottom: 14px;
                }

                .successBox p {
                    max-width: 560px;
                    color: #555;
                    line-height: 1.6;
                    margin-bottom: 24px;
                    font-size: 17px;
                }

                .successActions {
                    display: flex;
                    gap: 14px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .successActions :global(a) {
                    text-decoration: none;
                    padding: 15px 22px;
                    border-radius: 18px;
                    font-weight: 900;
                    transition: 0.2s;
                }

                .successActions :global(.primaryAction) {
                    background: #111;
                    color: white;
                }

                .successActions :global(.secondaryAction) {
                    background: white;
                    color: #111;
                    border: 1px solid #ddd;
                }

                .successActions :global(a:hover) {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
                }

                @media (max-width: 900px) {
                    .page {
                        padding: 24px;
                    }

                    .hero h1 {
                        font-size: 30px;
                    }

                    .paymentGrid {
                        grid-template-columns: 1fr;
                    }

                    .row {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </main>
    );
}