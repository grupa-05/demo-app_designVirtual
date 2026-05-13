"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";

export default function Home() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [style, setStyle] = useState("Modern");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const logged = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(logged === "true");
  }, []);

  function handleUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
  }

  function handleDeleteImage() {
    setImage(null);

    const input = document.getElementById("room-image-input");
    if (input) {
      input.value = "";
    }
  }

  function handleGenerate() {
    if (!isLoggedIn) {
      setAuthMessage(
          "Pentru a genera un design, trebuie mai întâi să te autentifici sau să îți creezi un cont."
      );

      setTimeout(() => {
        router.push("/login");
      }, 900);

      return;
    }

    if (!image) {
      alert("Încarcă mai întâi o imagine.");
      return;
    }

    localStorage.setItem("selectedStyle", style);
    router.push("/rezultate");
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
              Urmează cei doi pași simpli și pregătește imaginea pentru generarea
              designului interior.
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
                <span className="uploadIcon">📷</span>
                <span>Alege imaginea</span>
                <input
                    id="room-image-input"
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                />
              </label>

              {image ? (
                  <div className="uploadedStatus">
                    <div className="statusIcon">✓</div>

                    <div className="statusText">
                      <strong>Imagine încărcată</strong>
                      <span>Poza este pregătită pentru generarea designului.</span>
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
                    disabled={!image}
                    onClick={handleGenerate}
                >
                  {isLoggedIn ? "Generează design AI ✨" : "Login pentru generare"}
                </button>
              </div>

              {!image && (
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
              <p>Utilizatorul adaugă o fotografie cu propria cameră.</p>
            </div>

            <div className="infoCard">
              <div className="infoIcon">🎨</div>
              <h3>Alegi stilul</h3>
              <p>
                Poți selecta stilul modern, minimalist, luxury, boho sau
                scandinav.
              </p>
            </div>

            <div className="infoCard">
              <div className="infoIcon">🤖</div>
              <h3>Primești rezultat</h3>
              <p>
                Aplicația generează o idee de design adaptată stilului ales.
              </p>
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
            display: grid;
            grid-template-columns: 1.25fr 0.85fr;
            gap: 36px;
            align-items: center;
            margin-bottom: 50px;
          }

          .heroContent {
            background: rgba(255, 255, 255, 0.72);
            border-radius: 34px;
            padding: 48px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
          }

          .tag {
            display: inline-block;
            background: #111;
            color: white;
            padding: 9px 16px;
            border-radius: 999px;
            font-size: 13px;
            font-weight: 700;
            margin-bottom: 22px;
          }

          .heroContent h1 {
            font-size: 42px;
            line-height: 1.12;
            margin: 0 0 20px;
            max-width: 850px;
          }

          .heroContent p {
            font-size: 18px;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
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
            transition: 0.2s;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 15px;
            background: #111;
            color: white;
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.18);
          }

          .heroButtons a:hover {
            transform: translateY(-3px);
            box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
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
            box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
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
            background: rgba(255, 255, 255, 0.82);
            border-radius: 34px;
            box-shadow: 0 24px 60px rgba(0, 0, 0, 0.14);
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
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.8);
          }

          .roomIcon {
            font-size: 76px;
            margin-bottom: 10px;
          }

          .roomPreview p {
            font-weight: 800;
            color: #111;
            font-size: 18px;
          }

          .floatingCard {
            position: absolute;
            z-index: 2;
            background: #111;
            color: white;
            padding: 12px 18px;
            border-radius: 18px;
            font-weight: 700;
            box-shadow: 0 14px 30px rgba(0, 0, 0, 0.25);
            animation: float 3s ease-in-out infinite;
          }

          .cardOne {
            top: 56px;
            left: 28px;
          }

          .cardTwo {
            bottom: 52px;
            right: 30px;
            animation-delay: 0.7s;
          }

          .generator,
          .howItWorks {
            background: rgba(255, 255, 255, 0.55);
            border-radius: 34px;
            padding: 36px;
            box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
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
            position: relative;
            min-height: 270px;
          }

          .uploadCard {
            background: linear-gradient(135deg, #ffffff, #fffaf4);
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
            transition: 0.2s;
            box-shadow: 0 8px 18px rgba(0, 0, 0, 0.06);
          }

          .uploadBox:hover {
            background: #ead9c2;
            transform: translateY(-2px);
          }

          .uploadBox input {
            display: none;
          }

          .uploadedStatus {
            margin-top: 22px;
            background: #f3fff5;
            border: 1px solid #bfe8c6;
            border-radius: 20px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            box-shadow: 0 10px 22px rgba(47, 125, 50, 0.08);
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
            font-size: 20px;
            flex-shrink: 0;
          }

          .statusText {
            display: flex;
            flex-direction: column;
            flex: 1;
          }

          .statusText strong {
            color: #1f6b25;
            font-size: 16px;
            margin-bottom: 3px;
          }

          .statusText span {
            color: #4f6f52;
            font-size: 14px;
          }

          .emptyStatus {
            margin-top: 22px;
            background: #faf7f2;
            border: 1px dashed #d7c5ad;
            border-radius: 18px;
            padding: 14px 16px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #6a5a48;
          }

          .emptyStatus p {
            margin: 0;
            color: #6a5a48;
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
            transition: 0.2s;
          }

          .deleteImageBtn:hover {
            background: #ffecec;
            transform: translateY(-2px);
            box-shadow: 0 10px 22px rgba(180, 35, 24, 0.12);
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
            font-weight: 800;
            font-size: 15px;
            cursor: pointer;
            transition: 0.2s;
          }

          button:hover:not(:disabled) {
            transform: translateY(-3px);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
          }

          button:disabled {
            background: #999;
            cursor: not-allowed;
          }

          .warning {
            color: #9a5b00 !important;
            font-weight: 600;
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
            transition: 0.2s;
          }

          .infoCard:hover {
            transform: translateY(-6px);
          }

          .infoIcon {
            font-size: 42px;
            margin-bottom: 12px;
          }

          .infoCard p {
            color: #555;
            line-height: 1.5;
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-10px);
            }

            100% {
              transform: translateY(0);
            }
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