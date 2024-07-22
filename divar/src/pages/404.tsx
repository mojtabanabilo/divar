import { Link } from "react-router-dom";
import styles from "./404.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>صفحه مورد نظر یافت نشد.</p>
      <Link to="/" className={styles.homeLink}>
        بازگشت
      </Link>
    </div>
  );
}
