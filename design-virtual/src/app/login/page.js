"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:8080";

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Completează emailul și parola.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Autentificarea a eșuat.");
            }

            if (!data.token) {
                throw new Error("Nu a fost primit token-ul de autentificare.");
            }

            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("userEmail", email);
            localStorage.setItem("token", data.token);

            router.push("/");
        } catch (error) {
            setErrorMessage(error.message || "A apărut o eroare la autentificare.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="page">
            <Navbar />

            <section className="authWrapper">
                <div className="infoCard">
                    <span className="tag">Autentificare</span>

                    <h1>Bine ai revenit 👋</h1>

                    <p>
                        Conectează-te pentru a putea genera designuri interioare, salva
                        pachetele alese și accesa funcționalitățile aplicației.
                    </p>

                    <div className="benefits">
                        <div>
                            <span>🎨</span>
                            <p>Generezi designuri personalizate</p>
                        </div>

                        <div>
                            <span>🪙</span>
                            <p>Folosești token-urile din pachetul ales</p>
                        </div>

                        <div>
                            <span>🛋️</span>
                            <p>Primești recomandări pentru amenajare</p>
                        </div>
                    </div>
                </div>

                <div className="formCard">
                    <span className="smallTag">Login</span>

                    <h2>Intră în cont</h2>

                    <form onSubmit={handleLogin}>
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
                                placeholder="Introdu parola"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>

                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}

                        <button type="submit" disabled={loading}>
                            {loading ? "Se autentifică..." : "Autentificare"}
                        </button>
                    </form>

                    <p className="switchText">
                        Nu ai cont? <Link href="/register">Creează un cont</Link>
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