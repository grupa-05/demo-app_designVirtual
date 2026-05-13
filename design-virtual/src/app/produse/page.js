"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Produse() {
    const products = [
        {
            name: "Canapea IKEA",
            price: "1499 lei",
            store: "IKEA",
            category: "Mobilier",
            description:
                "Canapea potrivită pentru un living modern, confortabilă și ușor de integrat în diferite stiluri de amenajare.",
            icon: "🛋️",
        },
        {
            name: "Masă Dedeman",
            price: "349 lei",
            store: "Dedeman",
            category: "Mobilier",
            description:
                "Masă practică pentru living sau dining, potrivită pentru amenajări simple, moderne sau minimaliste.",
            icon: "🪑",
        },
        {
            name: "Lampă IKEA",
            price: "199 lei",
            store: "IKEA",
            category: "Iluminat",
            description:
                "Lampă decorativă care poate îmbunătăți atmosfera camerei și poate completa designul interior ales.",
            icon: "💡",
        },
        {
            name: "Covor decorativ",
            price: "249 lei",
            store: "Dedeman",
            category: "Decor",
            description:
                "Covor potrivit pentru a adăuga căldură, textură și un aspect mai primitor camerei.",
            icon: "🧶",
        },
        {
            name: "Plantă artificială",
            price: "89 lei",
            store: "IKEA",
            category: "Decor",
            description:
                "Element decorativ ușor de întreținut, ideal pentru a adăuga prospețime și culoare spațiului.",
            icon: "🌿",
        },
        {
            name: "Tablou decorativ",
            price: "129 lei",
            store: "Dedeman",
            category: "Decor",
            description:
                "Accesoriu vizual care poate completa stilul ales și poate oferi personalitate camerei.",
            icon: "🖼️",
        },
    ];

    return (
        <main className="page">
            <Navbar />

            <section className="hero">
                <span className="tag">Recomandări</span>

                <h1>Produse recomandate 🛒</h1>

                <p>
                    Aici sunt afișate produse care pot completa designul interior generat.
                    Lista poate include mobilier, corpuri de iluminat și elemente
                    decorative potrivite pentru stilul ales.
                </p>
            </section>

            <section className="productsGrid">
                {products.map((product, index) => (
                    <div className="productCard" key={index}>
                        <div className="productTop">
                            <div className="productIcon">{product.icon}</div>

                            <span className="storeBadge">{product.store}</span>
                        </div>

                        <h2>{product.name}</h2>

                        <p className="category">{product.category}</p>

                        <p className="description">{product.description}</p>

                        <div className="productBottom">
                            <strong>{product.price}</strong>

                            <button type="button">Vezi produsul</button>
                        </div>
                    </div>
                ))}
            </section>

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
          max-width: 800px;
          margin: 0 auto;
          font-size: 18px;
          line-height: 1.6;
          color: #333;
        }

        .productsGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 34px;
        }

        .productCard {
          background: rgba(255, 255, 255, 0.82);
          border-radius: 28px;
          padding: 26px;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
          transition: 0.2s;
          min-height: 310px;
          display: flex;
          flex-direction: column;
        }

        .productCard:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 55px rgba(0, 0, 0, 0.14);
        }

        .productTop {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .productIcon {
          width: 64px;
          height: 64px;
          border-radius: 22px;
          background: linear-gradient(135deg, #ffffff, #f3eadf);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 34px;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
        }

        .storeBadge {
          background: #111;
          color: white;
          padding: 8px 13px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          text-transform: uppercase;
        }

        .productCard h2 {
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
          margin: 0 0 22px;
          flex: 1;
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

        button {
          border: none;
          border-radius: 16px;
          background: #111;
          color: white;
          padding: 13px 18px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.2s;
        }

        button:hover {
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

        .bottomActions :global(a) {
          text-decoration: none;
          padding: 15px 24px;
          border-radius: 18px;
          font-weight: 900;
          transition: 0.2s;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .bottomActions :global(.primaryAction) {
          background: #111;
          color: white;
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
        }

        .bottomActions :global(.secondaryAction) {
          background: white;
          color: #111;
          border: 1px solid #ddd;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
        }

        .bottomActions :global(a:hover) {
          transform: translateY(-3px);
          box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
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