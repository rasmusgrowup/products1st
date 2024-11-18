import styles from "@/styles/common/page.module.scss";
import Header from "@/app/components/common/Header";
import SearchContainer from "./components/search/SearchContainer";

const Home: React.FC = () => {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.main}>
                <SearchContainer />
            </main>
        </div>
    );
}

export default Home;