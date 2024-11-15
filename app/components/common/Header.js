import Link from "next/link";
import styles from "@/styles/components/Header.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Products 1st</h1>
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href="/public">Shop</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/public">Kurv</Link>
                    </li>
                    <li className={styles.li}>
                        <Link href="/public">Om os</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}