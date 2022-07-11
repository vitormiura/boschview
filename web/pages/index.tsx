import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated: boolean = true;

  if (!isAuthenticated) {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Apeview | Home</title>
        <meta name="description" content="Apeview home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <p>Welcome to dashboard</p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
