import Link from "next/link";

export default function Produse() {
    const products = [
        { name: "Canapea IKEA", price: "1499 lei" },
        { name: "Masă Dedeman", price: "349 lei" },
        { name: "Lampă IKEA", price: "199 lei" }
    ];

    return (
        <main style={{ padding: "40px" }}>

            <nav>
                <Link href="/">Home</Link> |{" "}
                <Link href="/rezultate">Rezultate</Link> |{" "}
                <Link href="/about">About</Link>
            </nav>

            <h1>Produse recomandate 🛒</h1>

            {products.map((p, i) => (
                <div key={i} style={{ marginBottom: "15px" }}>
                    <strong>{p.name}</strong>
                    <p>{p.price}</p>
                    <button>Cumpără</button>
                </div>
            ))}
        </main>
    );
}