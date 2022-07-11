import type { NextPage } from "next";
import styles from "../styles/Header.module.css";
import HeaderComponent from "./Header";

const Layout: NextPage = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <HeaderComponent />
      {children}
    </div>
  );
};

export default Layout;
