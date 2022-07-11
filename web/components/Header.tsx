import type { NextPage } from "next";
import styles from "../styles/Header.module.css";

const HeaderComponent: NextPage = () => {
  return (
    <header className={styles.header}>
      <h1>Apeview</h1>
    </header>
  );
};

export default HeaderComponent;
