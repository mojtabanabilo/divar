import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import styles from "./layouts.module.css";

export default function Layouts(props: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.main}>{props.children}</div>
      <Footer />
    </>
  );
}
