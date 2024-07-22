import { Dispatch } from "react";
import styles from "./hamburgerMenu.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

export default function HamburgerMenu(props: {
  show: {
    isOpen: boolean;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  };
}): JSX.Element {
  const cookie = new Cookies();

  const removeCookie = () => {
    cookie.remove("refreshToken");
    cookie.remove("accessToken");
    window.location.reload();
  };

  return (
    <div className={`${styles.menu} ${props.show.isOpen ? styles.open : ""}`}>
      <Link to="/admin" className={styles.link}>
        <p>پنل ادمین</p>
      </Link>
      <Link to="/dashboard" className={styles.link}>
        <p>دیوار من</p>
      </Link>
      <Link to={"/dashboard"} className={styles.submit}>
        ثبت آگهی
      </Link>
      <button className={styles.exit} onClick={() => removeCookie()}>خروج</button>
    </div>
  );
}
