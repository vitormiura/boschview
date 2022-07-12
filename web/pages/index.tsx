import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import GraphData from "../src/graph.json";
import { useEffect, useState } from "react";

interface GraphProject {
  nome: string;
  area: string;
  alunos: string[];
}

const Home: NextPage = () => {
  const router = useRouter();
  const isAuthenticated: boolean = true;

  if (!isAuthenticated) {
    router.push("/login");
  }

  // let { isLoading, error, data } = useQuery("apiData", () =>
  //   fetch("https://jsonplaceholder.typicode.com/photos/1").then((res) =>
  //     res.json()
  //   )
  // );

  // isLoading = false;

  // if (isLoading) return <CircularProgress />;
  // if (error) {
  //   console.log(error);
  //   return <p>An error ocurred</p>;
  // }

  const [data, setData] = useState<GraphProject[]>([]);

  useEffect(() => {
    setData(GraphData);
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Head>
        <title>Apeview | Home</title>
        <meta name="description" content="Apeview home page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: "80%", padding: 2 }}>
        <h1>Welcome</h1>
        <Box sx={{ display: "flex", gap: 2 }}>
          {data.map((value, index) => (
            <Box
              key={index}
              sx={{ backgroundColor: "lightgreen", paddingX: 6, paddingY: 2 }}
            >
              <h1>{value.nome}</h1>
              <h3>Area: {value.area}</h3>
              <div>
                <b>Alunos:</b>
                {value.alunos.map((aluno, index) => (
                  <p key={index}>{aluno}</p>
                ))}
              </div>
            </Box>
          ))}
        </Box>
      </main>

      <footer></footer>
    </div>
  );
};

export default Home;
