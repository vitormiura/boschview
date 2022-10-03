import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/About.module.scss";

const AboutPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BoschView | About-Us</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <img src="/sombra.png" alt="Sombra" className={styles.sombra} />
      <div className={styles.conteudo}>
        <div className={styles.texto}>
          <h2>
            <b>ApeView</b>
          </h2>
          <p>
            {" "}
            Nós somos um grupo com 7 integrantes da turma de Smart Automation da
            ETS, nosso grupo é composto por:
          </p>
          <br></br>
          <br></br>
          <ul>
            <li>Daniel Dante;</li>
            <li>Giovanna Freitas;</li>
            <li>Guilherme Abe;</li>
            <li>Ícaro Duarte;</li>
            <li>João Montanari;</li>
            <li>Nathã Wolff;</li>
            <li>Vitor Miura.</li>
          </ul>
          <br></br>
          <p>
            O projeto se trata de uma das propostas do Hackaton das turmas de
            Smart Automation 3 e 4. A intenção do mesmo é de criar um ambiente
            Web, na onde é possível monitorar e identificar os projetos que
            estão sendo desenvolvidos pelos alunos da ETS nas diversas áreas que
            integram a Bosch por meio de ferramentas de pesquisa e Dashboards
            dinâmicos.
          </p>
        </div>
        <img
          src="/ilustracao-about-us.png"
          alt="Ilustacao"
          className={styles.ilustracao}
        />
      </div>
    </div>
  );
};

export default AboutPage;
