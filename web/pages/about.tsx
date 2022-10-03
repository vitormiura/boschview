import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/About.module.scss";

const AboutPage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>BoschView | About Us</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <hr/>
      <div className={styles.conteudo}>
        <div className={styles.texto}>
          <h2>
            <b>About Us</b>
          </h2>
          <p>
            {" "}
            We are a group with 7 members of the ETS Smart Automation class, our
            group is composed of:
          </p>
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
            The project is one of the Hackaton proposals of the Smart Automation
            3 and 4. Its intention is to create an environment Web, where it is
            possible to monitor and identify the projects that are being
            developed by ETS students in the various areas that integrate Bosch
            through research tools and dynamic dashboards.
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
