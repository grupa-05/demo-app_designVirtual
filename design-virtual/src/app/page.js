"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [image, setImage] = useState(null);
  const [style, setStyle] = useState("Modern");

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }

  return (
      <main style={styles.page}>

        {/* NAVBAR */}
        <nav style={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/rezultate">Rezultate</Link>
          <Link href="/produse">Produse</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* HERO */}
        <div style={styles.hero}>
          <h1 style={styles.title}>
            Virtual Room Designer 🏠
          </h1>
          <p style={styles.subtitle}>
            Încarcă o poză cu camera ta, alege stilul și primește idei de design + produse pe care le poți cumpăra.
          </p>
        </div>

        {/* CARD 1 */}
        <div style={styles.card}>
          <h2>1. Încarcă poza camerei</h2>
          <input type="file" accept="image/*" onChange={handleUpload} />

          {image && (
              <img src={image} style={styles.preview} />
          )}
        </div>

        {/* CARD 2 */}
        <div style={styles.card}>
          <h2>2. Alege stilul</h2>

          <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              style={styles.select}
          >
            <option>Modern</option>
            <option>Minimalist</option>
            <option>Luxury</option>
            <option>Boho</option>
            <option>Scandinav</option>
          </select>

          <Link href="/rezultate">
            <button style={styles.button} disabled={!image}>
              Generează design AI ✨
            </button>
          </Link>
        </div>
      </main>
  );
}



const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background: "linear-gradient(135deg, #d6c7ae, #bfa98a)",
    fontFamily: "Arial",
  },

  nav: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  hero: {
    textAlign: "center",
    marginBottom: "40px",
  },

  title: {
    fontSize: "48px",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },

  preview: {
    marginTop: "20px",
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  select: {
    padding: "10px",
    borderRadius: "10px",
    marginRight: "10px",
  },

  button: {
    padding: "12px 20px",
    borderRadius: "12px",
    border: "none",
    background: "#111",
    color: "white",
    cursor: "pointer",
  },
};