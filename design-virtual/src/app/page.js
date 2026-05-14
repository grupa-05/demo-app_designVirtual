"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

const API_URL = "http://localhost:8080";

export default function Home() {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [style, setStyle] = useState("Modern");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    const token = localStorage.getItem("token");

    setIsLoggedIn(logged === "true" && !!token);
  }, []);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setSelectedFile(file);
    setImagePreview(imageUrl);
  }

  function handleDeleteImage() {
    setImagePreview(null);
    setSelectedFile(null);

    const input = document.getElementById("room-image-input");
    if (input) {
      input.value = "";
    }
  }

  async function handleGenerate() {
    if (!isLoggedIn) {
      setAuthMessage(
          "Pentru a genera un design, trebuie mai întâi să te autentifici sau să îți creezi un cont."
      );

      setTimeout(() => {
        router.push("/login");
      }, 900);

      return;
    }

    if (!selectedFile) {
      alert("Încarcă mai întâi o imagine.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      setAuthMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch(`${API_URL}/api/furniture/generate-multiple`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Generarea designului a eșuat.");
      }

      if (!data.image) {
        throw new Error("Backend-ul nu a trimis imaginea generată.");
      }

      localStorage.setItem("selectedStyle", style);
      localStorage.setItem("generatedImage", data.image);
      localStorage.setItem(
          "productIds",
          JSON.stringify(data.productIds || [])
      );

      router.push("/rezultate");
    } catch (error) {
      alert(error.message || "A apărut o eroare la generarea designului.");
    } finally {
      setLoading(false);
    }
  }

  return (
      <main className="page">
        <Navbar />

        <section className="hero">
          <div className="heroContent">
            <div className="tag">AI Interior Design Platform</div>

            <h1>
              Redecorează-ți camera cu ajutorul inteligenței artificiale ✨
            </h1>

            <p>
              Încarcă o fotografie cu spațiul tău, alege stilul dorit și primește
              o propunere de design interior adaptată camerei tale.
            </p>

            <div className="heroButtons">
              <a href="#generate" className="primaryBtn">
                ✨ Începe acum
              </a>

              <a href="/about" className="secondaryBtn">
                ℹ️ Află mai multe
              </a>
            </div>

            <div className="stats">
              <div>
                <strong>5+</strong>
                <span>stiluri</span>
              </div>

              <div>
                <strong>AI</strong>
                <span>design asistat</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>personalizat</span>
              </div>
            </div>
          </div>

          <div className="visualCard">
            <div className="roomPreview">
              <div className="roomIcon">🛋️</div>
              <p>Modernizează-ți camera rapid și ușor</p>
            </div>

            <div className="floatingCard cardOne">🎨 Stil: {style}</div>

            <div className="floatingCard cardTwo">✨ Design personalizat</div>
          </div>
        </section>

        <section id="generate" className="generator">
          <div className="sectionHeader">
            <span>Generator AI</span>
            <h2>Creează designul camerei tale</h2>
            <p>
              Încarcă imaginea camerei și alege stilul de amenajare dorit.
            </p>
          </div>

          {!isLoggedIn && (
              <div className="loginNotice">
                <div className="noticeIcon">🔐</div>

                <div>
                  <h3>Ai nevoie de un cont pentru a genera designuri</h3>
                  <p>
                    Autentifică-te sau creează un cont pentru a putea folosi
                    generatorul AI.
                  </p>
                </div>

                <a href="/login">Login</a>
              </div>
          )}

          <div className="formGrid">
            <div className="formCard uploadCard">
              <div className="step">1</div>

              <h3>Încarcă poza camerei</h3>
              <p>
                Alege o fotografie clară cu spațiul pe care vrei să îl
                redecorezi.
              </p>

              <label className="uploadBox">
                <span>📷</span>
                <span>Alege imaginea</span>
                <input
                    id="room-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                />
              </label>

              {imagePreview ? (
                  <div className="uploadedStatus">
                    <div className="statusIcon">✓</div>

                    <div className="statusText">
                      <strong>Imagine încărcată</strong>
                      <span>Poza este pregătită pentru generare.</span>
                    </div>

                    <button
                        type="button"
                        className="deleteImageBtn"
                        onClick={handleDeleteImage}
                    >
                      Șterge
                    </button>
                  </div>
              ) : (
                  <div className="emptyStatus">
                    <span>📁</span>
                    <p>Nicio imagine încărcată momentan.</p>
                  </div>
              )}
            </div>

            <div className="formCard">
              <div className="step">2</div>

              <h3>Alege stilul de amenajare</h3>
              <p>Selectează direcția vizuală dorită pentru camera ta.</p>

              <div className="controls">
                <select value={style} onChange={(e) => setStyle(e.target.value)}>
                  <option>Modern</option>
                  <option>Minimalist</option>
                  <option>Luxury</option>
                  <option>Boho</option>
                  <option>Scandinav</option>
                </select>

                <button
                    type="button"
                    disabled={!selectedFile || loading}
                    onClick={handleGenerate}
                >
                  {loading
                      ? "Se generează..."
                      : isLoggedIn
                          ? "Generează design AI ✨"
                          : "Login pentru generare"}
                </button>
              </div>

              {!selectedFile && (
                  <p className="warning">
                    Încarcă mai întâi o imagine pentru a activa generarea.
                  </p>
              )}

              {authMessage && <p className="authMessage">{authMessage}</p>}
            </div>
          </div>
        </section>

        <section className="howItWorks">
          <div className="sectionHeader">
            <span>Proces simplu</span>
            <h2>Cum funcționează aplicația?</h2>
          </div>

          <div className="stepsGrid">
            <div className="infoCard">
              <div className="infoIcon">📷</div>
              <h3>Încarci imaginea</h3>
              <p>Adaugi o fotografie cu propria cameră.</p>
            </div>

            <div className="infoCard">
              <div className="infoIcon">🎨</div>
              <h3>Alegi stilul</h3>
              <p>Selectezi stilul dorit pentru amenajare.</p>
            </div>

            <div className="infoCard">
              <div className="infoIcon">🤖</div>
              <h3>Primești rezultat</h3>
              <p>Aplicația generează o idee de design și produse recomandate.</p>
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
            display: grid;
            grid-template-columns: 1.25fr 0.85fr;
            gap: 36px;
            align-items: center;
            margin-bottom: 50px;
          }

          .heroContent,
          .visualCard,
          .generator,
          .howItWorks {
            background: rgba(255, 255, 255, 0.72);
            border-radius: 34px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
          }

          .heroContent {
            padding: 48px;
          }

          .tag {
            display: inline-block;
            background: #111;
            color: white;
            padding: 9px 16px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 800;
            margin-bottom: 22px;
          }

          .heroContent h1 {
            font-size: 42px;
            line-height: 1.12;
            margin: 0 0 20px;
          }

          .heroContent p {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
            margin-bottom: 26px;
          }

          .heroButtons {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            margin-bottom: 30px;
          }

          .heroButtons a {
            text-decoration: none;
            padding: 15px 24px;
            border-radius: 18px;
            font-weight: 900;
            background: #111;
            color: white;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
          }

          .stats {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
          }

          .stats div {
            background: white;
            padding: 16px 22px;
            border-radius: 18px;
            min-width: 120px;
          }

          .stats strong {
            display: block;
            font-size: 24px;
          }

          .stats span {
            font-size: 13px;
            color: #555;
          }

          .visualCard {
            position: relative;
            min-height: 430px;
            padding: 26px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .visualCard::before {
            content: "";
            position: absolute;
            width: 260px;
            height: 260px;
            background: #ead5b9;
            border-radius: 50%;
            top: -80px;
            right: -70px;
          }

          .roomPreview {
            width: 100%;
            height: 300px;
            border-radius: 28px;
            background: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            position: relative;
            z-index: 1;
          }

          .roomIcon {
            font-size: 76px;
            margin-bottom: 10px;
          }

          .roomPreview p {
            font-weight: 800;
            font-size: 18px;
          }

          .floatingCard {
            position: absolute;
            z-index: 2;
            background: #111;
            color: white;
            padding: 12px 18px;
            border-radius: 18px;
            font-weight: 800;
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
          }

          .cardOne {
            top: 56px;
            left: 28px;
          }

          .cardTwo {
            bottom: 52px;
            right: 30px;
          }

          .generator,
          .howItWorks {
            padding: 36px;
            margin-bottom: 40px;
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

          .sectionHeader p {
            color: #555;
            font-size: 16px;
            max-width: 650px;
            margin: 0 auto;
            line-height: 1.5;
          }

          .loginNotice {
            background: #fff6e8;
            border: 1px solid #e5c894;
            border-radius: 24px;
            padding: 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 24px;
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
          }

          .loginNotice a {
            margin-left: auto;
            text-decoration: none;
            background: #111;
            color: white;
            padding: 13px 18px;
            border-radius: 16px;
            font-weight: 900;
          }

          .formGrid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }

          .formCard {
            background: white;
            border-radius: 28px;
            padding: 34px;
            box-shadow: 0 14px 35px rgba(0, 0, 0, 0.11);
          }

          .step {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: #111;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 22px;
            font-weight: 900;
            margin-bottom: 16px;
          }

          .formCard h3 {
            font-size: 25px;
            margin: 0 0 8px;
          }

          .formCard p {
            color: #555;
            margin-bottom: 18px;
          }

          .uploadBox {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #f3eadf;
            padding: 15px 22px;
            border-radius: 18px;
            cursor: pointer;
            font-weight: 800;
            border: 1px solid #ddd;
          }

          .uploadBox input {
            display: none;
          }

          .uploadedStatus,
          .emptyStatus {
            margin-top: 22px;
            border-radius: 20px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
          }

          .uploadedStatus {
            background: #f3fff5;
            border: 1px solid #bfe8c6;
          }

          .emptyStatus {
            background: #faf7f2;
            border: 1px dashed #d7c5ad;
          }

          .statusIcon {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #2f7d32;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 900;
          }

          .statusText {
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .statusText strong {
            color: #1f6b25;
          }

          .statusText span {
            color: #4f6f52;
            font-size: 14px;
          }

          .deleteImageBtn {
            background: white;
            color: #b42318;
            border: 1px solid #f0b8b8;
            padding: 10px 16px;
            border-radius: 14px;
            font-weight: 800;
            cursor: pointer;
          }

          .controls {
            display: flex;
            gap: 14px;
            flex-wrap: wrap;
            align-items: center;
          }

          select {
            padding: 14px 18px;
            border-radius: 16px;
            border: 1px solid #ccc;
            font-size: 15px;
            background: white;
            min-width: 150px;
          }

          button {
            padding: 15px 24px;
            border: none;
            border-radius: 16px;
            background: #111;
            color: white;
            font-weight: 900;
            font-size: 15px;
            cursor: pointer;
          }

          button:disabled {
            background: #999;
            cursor: not-allowed;
          }

          .warning {
            color: #9a5b00 !important;
            font-weight: 700;
            margin-top: 16px;
          }

          .authMessage {
            color: #8a1f11 !important;
            font-weight: 800;
            margin-top: 16px;
          }

          .stepsGrid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }

          .infoCard {
            background: white;
            border-radius: 26px;
            padding: 28px;
            text-align: center;
            box-shadow: 0 14px 35px rgba(0, 0, 0, 0.1);
          }

          .infoIcon {
            font-size: 42px;
            margin-bottom: 12px;
          }

          .infoCard p {
            color: #555;
            line-height: 1.5;
          }

          @media (max-width: 900px) {
            .page {
              padding: 24px;
            }

            .hero,
            .formGrid,
            .stepsGrid {
              grid-template-columns: 1fr;
            }

            .heroContent h1 {
              font-size: 34px;
            }

            .visualCard {
              min-height: 320px;
            }

            .loginNotice {
              flex-direction: column;
              align-items: flex-start;
            }

            .loginNotice a {
              margin-left: 0;
            }

            .uploadedStatus {
              align-items: flex-start;
              flex-direction: column;
            }
          }
        `}</style>
      </main>
  );
}