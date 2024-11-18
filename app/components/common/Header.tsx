import Link from "next/link";
import styles from "@/styles/components/Header.module.scss";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>
                <Link href="/">
                    Products 1st
                </Link>
            </h1>
            {/*
            <nav className={styles.nav}>
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <Link href="/">Kontakt</Link>
                    </li>
                </ul>
            </nav>
            */}
        </header>
    );
}

export default Header;