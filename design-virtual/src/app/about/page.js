import Link from "next/link";

export default function About() {
    return (
        <main style={{ padding: "40px" }}>

            <nav>
                <Link href="/">Home</Link> |{" "}
                <Link href="/rezultate">Rezultate</Link> |{" "}
                <Link href="/produse">Produse</Link>
            </nav>

            <h1>Despre aplicație ℹ️</h1>

            <p>
                Acest site îți permite să încarci o poză cu camera ta și să primești idei de design interior generate de AI.
            </p>

            <p>
                Poți cumpăra direct produsele sugerate (IKEA, Dedeman etc).
            </p>
        </main>
    );
}