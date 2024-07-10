import styles from "./loader.module.css";

export default function Loader(): JSX.Element {
  return (
    <div className={styles.container}>
      <span className={styles.loader}></span>
    </div>
  );
}
