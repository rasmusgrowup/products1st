import { ReactNode } from "react";
import styles from "@/styles/common/page.module.scss";
import Header from "@/app/components/common/Header";

interface HomeLayoutProps {
    children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
        </div>
    );
}