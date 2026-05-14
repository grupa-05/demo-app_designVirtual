"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const logged = localStorage.getItem("isLoggedIn");
        const email = localStorage.getItem("userEmail");
        const token = localStorage.getItem("token");

        if (logged === "true" && token) {
            setIsLoggedIn(true);
            setUserEmail(email || "");
        } else {
            setIsLoggedIn(false);
            setUserEmail("");
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");

        setIsLoggedIn(false);
        setUserEmail("");

        router.push("/");
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <span className="logoIcon">🏠</span>
                <span>Virtual Room Designer</span>
            </div>

            <div className="navLinks">
                <Link href="/">Home</Link>
                <Link href="/rezultate">Results</Link>
                <Link href="/produse">Products</Link>
                <Link href="/abonamente">Subscriptions</Link>
                <Link href="/about">About</Link>
            </div>

            <div className="authArea">
                {isLoggedIn ? (
                    <>
                        <span className="userBadge">👤 {userEmail || "Cont activ"}</span>
                        <button type="button" onClick={handleLogout}>
                            Ieșire
                        </button>
                    </>
                ) : (
                    <>
                        <Link href="/login" className="loginBtn">
                            Login
                        </Link>
                        <Link href="/register" className="registerBtn">
                            Register
                        </Link>
                    </>
                )}
            </div>

            <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          padding: 18px 28px;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(14px);
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.1);
          margin-bottom: 48px;
          position: sticky;
          top: 20px;
          z-index: 10;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          font-size: 18px;
          white-space: nowrap;
        }

        .logoIcon {
          font-size: 22px;
        }

        .navLinks {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .navLinks a {
          text-decoration: none;
          color: #111;
          font-weight: 700;
          transition: 0.2s;
        }

        .navLinks a:hover {
          color: #8a5a2b;
          transform: translateY(-2px);
        }

        .authArea {
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
        }

        .authArea :global(a) {
          text-decoration: none;
        }

        .authArea :global(.loginBtn),
        .authArea :global(.registerBtn),
        .authArea button {
          border: none;
          border-radius: 14px;
          padding: 11px 16px;
          font-weight: 900;
          cursor: pointer;
          transition: 0.2s;
          font-size: 14px;
        }

        .authArea :global(.loginBtn) {
          background: white;
          color: #111;
          border: 1px solid #ddd;
        }

        .authArea :global(.registerBtn),
        .authArea button {
          background: #111;
          color: white;
        }

        .authArea :global(.loginBtn:hover),
        .authArea :global(.registerBtn:hover),
        .authArea button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.14);
        }

        .userBadge {
          background: white;
          border: 1px solid #ddd;
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 13px;
          color: #333;
          max-width: 190px;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 1000px) {
          .navbar {
            flex-direction: column;
          }

          .authArea {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}</style>
        </nav>
    );
}