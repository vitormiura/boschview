import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";
import { Alert, AlertColor, Snackbar } from "@mui/material";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("info");
  const notificate = (
    notificationMessage: string,
    severity?: "error" | "warning" | "info" | "success"
  ) => {
    setMessage(notificationMessage);
    if (severity) {
      console.log(severity);
      setSeverity(severity);
    } else {
      setSeverity("info");
    }
    setOpen(true);
  };
  return (
    <div>
      <Header notificate={notificate} />
      <Component {...pageProps} notificate={notificate} />
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert severity={severity}>{message}</Alert>
      </Snackbar>
    </div>
  );
}

export default MyApp;
