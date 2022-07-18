import type { NextPage } from "next";
import { Box, Button, Link, TextField } from "@mui/material";
import styles from "../styles/Login.module.scss";
import { useRouter } from "next/router";

const LoginPage: NextPage = () => {
  const router = useRouter();
  return (
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
              <span className={styles.txt1}>Dont have an account?</span>
              <Link className={styles.txt2} href="/signup">
                Sign Up!
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
