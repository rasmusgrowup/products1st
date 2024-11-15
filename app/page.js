import Image from "next/image";
import styles from "@/styles/common/page.module.scss";
import Header from "@/app/components/common/Header";
import SearchContainer from "./components/search/SearchContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header/>
      <main className={styles.main}>
          <SearchContainer />
      </main>
    </div>
  );
}
