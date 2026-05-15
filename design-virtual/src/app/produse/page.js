"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const API_URL = "http://localhost:8080";

export default function Produse() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchProducts() {
            const token = localStorage.getItem("token");
            const idsFromStorage = localStorage.getItem("productIds");

            if (!token) {
                setErrorMessage("Trebuie să fii autentificat pentru a vedea produsele.");
                setLoading(false);
                return;
            }

            if (!idsFromStorage) {
                setErrorMessage("Nu există produse recomandate momentan.");
                setLoading(false);
                return;
            }

            let ids = [];

            try {
                ids = JSON.parse(idsFromStorage);
            } catch {
                ids = [];
            }

            if (!ids.length) {
                setErrorMessage("Nu există produse recomandate momentan.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/api/products?ids=${ids.join(",")}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Produsele nu au putut fi încărcate.");
                }

                setProducts(data);
            } catch (error) {
                setErrorMessage(
                    error.message || "A apărut o eroare la încărcarea produselor."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    function getImageUrl(imageUrl) {
        if (!imageUrl) return "";

        if (imageUrl.startsWith("http")) {
            return imageUrl;
        }

        if (imageUrl.startsWith("/")) {
            return `${API_URL}${imageUrl}`;
        }

        return `${API_URL}/${imageUrl}`;
    }

    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Recomandări</span>

                <h1>Produse recomandate 🛒</h1>

                <p>
                    Aici sunt afișate produsele recomandate pentru designul generat.
                    Produsele sunt preluate automat pe baza rezultatului primit de la AI.
                </p>
            </section>

            {loading && (
                <section className="messageCard">
                    <h2>Se încarcă produsele...</h2>
                    <p>Te rugăm să aștepți câteva secunde.</p>
                </section>
            )}

            {!loading && errorMessage && (
                <section className="messageCard">
                    <h2>Nu există produse de afișat</h2>
                    <p>{errorMessage}</p>

                    <Link href="/" className="primaryAction">
                        Generează un design
                    </Link>
                </section>
            )}

            {!loading && !errorMessage && (
                <section className="productsGrid">
                    {products.map((product) => (
                        <div className="productCard" key={product.id}>
                            <div className="productImageBox">
                                {product.imageUrl ? (
                                    <img
                                        src={getImageUrl(product.imageUrl)}
                                        alt={product.name}
                                        className="productImage"
                                    />
                                ) : (
                                    <div className="noImage">
                                        <span>Imagine indisponibilă</span>
                                    </div>
                                )}
                            </div>

                            <div className="productInfo">
                <span className="storeBadge">
                  {product.storeName || "Magazin"}
                </span>

                                <h2>{product.name}</h2>

                                <p className="category">
                                    {product.category || "Produs recomandat"}
                                </p>

                                <p className="description">
                                    {product.description || "Produs potrivit pentru amenajare."}
                                </p>

                                <div className="dimensions">
                                    {product.width && <span>Lățime: {product.width} cm</span>}
                                    {product.height && <span>Înălțime: {product.height} cm</span>}
                                </div>

                                <div className="productBottom">
                                    <strong>{product.price} lei</strong>

                                    {product.productUrl ? (
                                        <a
                                            href={product.productUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Vezi produsul
                                        </a>
                                    ) : (
                                        <button type="button">Vezi produsul</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>
            )}

            <section className="bottomActions">
                <Link href="/rezultate" className="secondaryAction">
                    ← Înapoi la rezultate
                </Link>

                <Link href="/" className="primaryAction">
                    Generează alt design ✨
                </Link>
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
                    max-width: 800px;
                    margin: 0 auto;
                    font-size: 18px;
                    line-height: 1.6;
                    color: #333;
                }

                .messageCard {
                    background: rgba(255, 255, 255, 0.82);
                    border-radius: 30px;
                    padding: 34px;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                    text-align: center;
                }

                .messageCard h2 {
                    margin: 0 0 10px;
                    font-size: 30px;
                }

                .messageCard p {
                    color: #555;
                    font-size: 17px;
                    margin-bottom: 20px;
                }

                .productsGrid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 24px;
                    margin-bottom: 34px;
                }

                .productCard {
                    background: rgba(255, 255, 255, 0.86);
                    border-radius: 28px;
                    overflow: hidden;
                    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
                    transition: 0.2s;
                    display: flex;
                    flex-direction: column;
                }

                .productCard:hover {
                    transform: translateY(-6px);
                    box-shadow: 0 24px 55px rgba(0, 0, 0, 0.14);
                }

                .productImageBox {
                    height: 240px;
                    background: linear-gradient(135deg, #ffffff, #f3eadf);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                }

                .productImage {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    padding: 20px;
                }

                .noImage {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #777;
                    font-weight: 800;
                    text-align: center;
                }

                .productInfo {
                    padding: 24px;
                    display: flex;
                    flex-direction: column;
                    flex: 1;
                }

                .storeBadge {
                    background: #111;
                    color: white;
                    padding: 8px 13px;
                    border-radius: 999px;
                    font-size: 12px;
                    font-weight: 800;
                    width: fit-content;
                    margin-bottom: 14px;
                    text-transform: uppercase;
                }

                .productInfo h2 {
                    font-size: 24px;
                    margin: 0 0 8px;
                }

                .category {
                    color: #8a5a2b;
                    font-weight: 800;
                    margin: 0 0 14px;
                }

                .description {
                    color: #555;
                    line-height: 1.6;
                    margin: 0 0 16px;
                    flex: 1;
                }

                .dimensions {
                    display: flex;
                    gap: 10px;
                    flex-wrap: wrap;
                    margin-bottom: 18px;
                }

                .dimensions span {
                    background: white;
                    border-radius: 999px;
                    padding: 7px 11px;
                    font-size: 13px;
                    font-weight: 700;
                    color: #555;
                }

                .productBottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 14px;
                    margin-top: auto;
                }

                .productBottom strong {
                    font-size: 22px;
                }

                .productBottom a,
                .productBottom button,
                .primaryAction,
                .secondaryAction {
                    text-decoration: none;
                    border: none;
                    border-radius: 16px;
                    background: #111;
                    color: white;
                    padding: 13px 18px;
                    font-weight: 900;
                    cursor: pointer;
                    transition: 0.2s;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }

                .productBottom a:hover,
                .productBottom button:hover,
                .primaryAction:hover,
                .secondaryAction:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
                }

                .bottomActions {
                    display: flex;
                    justify-content: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 30px;
                }

                .secondaryAction {
                    background: white;
                    color: #111;
                    border: 1px solid #ddd;
                }

                @media (max-width: 1000px) {
                    .productsGrid {
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

                    .productsGrid {
                        grid-template-columns: 1fr;
                    }

                    .productBottom {
                        flex-direction: column;
                        align-items: flex-start;
                    }
                }
            `}</style>
        </main>
    );
}