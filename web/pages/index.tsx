import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated: boolean = true;

  if (!isAuthenticated) {
    router.push("/login");
  }

  let { isLoading, error, data } = useQuery("apiData", () =>
    fetch("https://jsonplaceholder.typicode.com/photos").then((res) =>
      res.json()
    )
  );

  isLoading = true;

  if (isLoading) return <CircularProgress />;
  if (error) {
    console.log(error);
    return <p>An error ocurred</p>;
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
        <p>{JSON.stringify(data)}</p>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
