import type { NextPage } from "next";
import { Box, Button, Link, TextField } from "@mui/material";
import styles from "../styles/Login.module.scss";
import { useRouter } from "next/router";
import Head from "next/head";

const LoginPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>BoschView | Login</title>
        <meta name="description" content="" />
        <link
          rel="icon"
          href="https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoiYm9zY2hcL2FjY291bnRzXC9hNVwvNDAwMDA5OFwvZmF2aWNvbnNcL2M0XC8xXC80OTE5YmU5YTQ0MWFhNTdlZWY0ZWNjODJjNTNmYTY1Zi0xNTgyODAyMzk2LnBuZyJ9:bosch:IDFHfQ1b9xJR_hcNEngAKJ1pHo2gl9MFWBp2Bn45nFk?width={width}&rect=0,0,32,32&reference_width=32"
        />
      </Head>
      <div className={styles.container}>
        <div className={styles.containerLogin}>
          <div className={styles.wrapLogin}>
            <form className={styles.loginForm}>
              <span className={styles.loginFormTitle}>
                <img src="/logo_bosch.png" alt="Logo da Bosch" />
                <br />
                <br />
              </span>

              <h4>Login (EDV):</h4>
              <TextField className={styles.wrapInput} variant="standard" />

              <h4>Password</h4>
              <TextField
                type="password"
                className={styles.wrapInput}
                variant="standard"
              />

              <div className={styles.containerLoginFormBtn}>
                <Button
                  variant="contained"
                  className={styles.loginFormBtn}
                  onClick={() => router.push("/")}
                >
                  Login
                </Button>
              </div>

              <div className={styles.textCenter}>
                <span className={styles.txt1}>Don't have an account?</span>
                <Link className={styles.txt2} href="/signup">
                  Sign Up!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
