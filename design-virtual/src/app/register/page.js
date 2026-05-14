"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:8080";

export default function Register() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function handleRegister(e) {
        e.preventDefault();

        if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("Completează toate câmpurile.");
            setSuccessMessage("");
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage("Parolele nu coincid.");
            setSuccessMessage("");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");
            setSuccessMessage("");

            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });

            let data = {};

            try {
                data = await response.json();
            } catch {
                data = {};
            }

            if (!response.ok) {
                throw new Error(data.message || "Înregistrarea a eșuat.");
            }

            setSuccessMessage("Contul a fost creat cu succes. Te poți autentifica.");

            setTimeout(() => {
                router.push("/login");
            }, 1000);
        } catch (error) {
            setErrorMessage(error.message || "A apărut o eroare la înregistrare.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page">
            <Navbar />

            <section className="authWrapper">
                <div className="infoCard">
                    <span className="tag">Cont nou</span>

                    <h1>Creează-ți contul ✨</h1>

                    <p>
                        Înregistrează-te pentru a putea folosi generatorul AI, pachetele cu
                        token-uri și recomandările personalizate pentru design interior.
                    </p>

                    <div className="benefits">
                        <div>
                            <span>🔐</span>
                            <p>Acces la zona de generare</p>
                        </div>

                        <div>
                            <span>🪙</span>
                            <p>Token-uri asociate contului tău</p>
                        </div>

                        <div>
                            <span>🏠</span>
                            <p>Experiență personalizată pentru camera ta</p>
                        </div>
                    </div>
                </div>

                <div className="formCard">
                    <span className="smallTag">Register</span>

                    <h2>Înregistrare</h2>

                    <form onSubmit={handleRegister}>
                        <label>
                            Username
                            <input
                                type="text"
                                placeholder="alege un username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label>

                        <label>
                            Email
                            <input
                                type="email"
                                placeholder="exemplu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label>
                            Parolă
                            <input
                                type="password"
                                placeholder="Alege o parolă"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        <label>
                            Confirmă parola
                            <input
                                type="password"
                                placeholder="Reintrodu parola"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>

                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        {successMessage && (
                            <p className="successMessage">{successMessage}</p>
                        )}

                        <button type="submit" disabled={loading}>
                            {loading ? "Se creează contul..." : "Creează cont"}
                        </button>
                    </form>

                    <p className="switchText">
                        Ai deja cont? <Link href="/login">Intră în cont</Link>
                    </p>
                </div>
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

                .authWrapper {
                    display: grid;
                    grid-template-columns: 1fr 0.9fr;
                    gap: 30px;
                    align-items: stretch;
                }

                .infoCard,
                .formCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 34px;
                    padding: 42px;
                    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
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

                h1 {
                    font-size: 42px;
                    margin: 0 0 16px;
                }

                h2 {
                    font-size: 34px;
                    margin: 0 0 22px;
                }

                .infoCard > p {
                    color: #444;
                    font-size: 18px;
                    line-height: 1.6;
                    max-width: 700px;
                    margin-bottom: 28px;
                }

                .benefits {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .benefits div {
                    display: flex;
                    gap: 14px;
                    align-items: center;
                    background: white;
                    padding: 16px;
                    border-radius: 18px;
                    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
                }

                .benefits span {
                    font-size: 26px;
                }

                .benefits p {
                    margin: 0;
                    font-weight: 800;
                    color: #333;
                }

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }

                label {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    font-weight: 900;
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

                .errorMessage {
                    background: #ffecec;
                    border: 1px solid #f0b8b8;
                    color: #b42318;
                    border-radius: 14px;
                    padding: 12px 14px;
                    font-weight: 800;
                    margin: 0;
                }

                .successMessage {
                    background: #f3fff5;
                    border: 1px solid #bfe8c6;
                    color: #1f6b25;
                    border-radius: 14px;
                    padding: 12px 14px;
                    font-weight: 800;
                    margin: 0;
                }

                button {
                    margin-top: 8px;
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

                button:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.18);
                }

                button:disabled {
                    background: #999;
                    cursor: not-allowed;
                }

                .switchText {
                    margin-top: 20px;
                    color: #555;
                    font-weight: 700;
                }

                .switchText :global(a) {
                    color: #111;
                    font-weight: 900;
                }

                @media (max-width: 900px) {
                    .page {
                        padding: 24px;
                    }

                    .authWrapper {
                        grid-template-columns: 1fr;
                    }

                    h1 {
                        font-size: 34px;
                    }
                }
            `}</style>
        </main>
    );
}