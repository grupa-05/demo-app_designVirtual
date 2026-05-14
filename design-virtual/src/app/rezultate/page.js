"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Rezultate() {
    const [generatedImage, setGeneratedImage] = useState("");
    const [selectedStyle, setSelectedStyle] = useState("");
    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        const image = localStorage.getItem("generatedImage");
        const style = localStorage.getItem("selectedStyle");
        const ids = localStorage.getItem("productIds");

        if (image) {
            if (image.startsWith("data:image")) {
                setGeneratedImage(image);
            } else {
                setGeneratedImage(`data:image/png;base64,${image}`);
            }
        }

        if (style) {
            setSelectedStyle(style);
        }

        if (ids) {
            try {
                setProductIds(JSON.parse(ids));
            } catch {
                setProductIds([]);
            }
        }
    }, []);

    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Rezultat AI</span>

                <h1>Rezultatul designului tău 🎨</h1>

                <p>
                    Aici este afișată propunerea de design interior generată pe baza
                    imaginii încărcate.
                </p>
            </section>

            <section className="resultGrid">
                <div className="resultCard">
                    {generatedImage ? (
                        <img
                            src={generatedImage}
                            alt="Design interior generat"
                            className="generatedImage"
                        />
                    ) : (
                        <div className="imagePlaceholder">
                            <div className="placeholderIcon">🛋️</div>

                            <h2>Nu există încă un design generat</h2>

                            <p>
                                Încarcă o imagine pe pagina principală și generează un design
                                pentru a vedea rezultatul aici.
                            </p>
                        </div>
                    )}
                </div>

                <aside className="detailsCard">
                    <span className="smallTag">Status</span>

                    <h2>Previzualizare design</h2>

                    <p>
                        Rezultatul include o variantă redecorată a camerei și produse
                        recomandate pentru amenajare.
                    </p>

                    <div className="infoList">
                        <div>
                            <span>🎨</span>
                            <p>Stil selectat: {selectedStyle || "Nespecificat"}</p>
                        </div>

                        <div>
                            <span>🧠</span>
                            <p>Generare asistată de AI</p>
                        </div>

                        <div>
                            <span>🛒</span>
                            <p>
                                Produse recomandate:{" "}
                                {productIds.length > 0 ? productIds.length : "în așteptare"}
                            </p>
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
        .detailsCard {
          background: rgba(255, 255, 255, 0.72);
          border-radius: 34px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
        }

        .resultCard {
          padding: 28px;
          min-height: 430px;
        }

        .generatedImage {
          width: 100%;
          min-height: 390px;
          max-height: 620px;
          object-fit: contain;
          border-radius: 28px;
          background: white;
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

        @media (max-width: 900px) {
          .page {
            padding: 24px;
          }

          .hero h1 {
            font-size: 34px;
          }

          .resultGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </main>
    );
}