import { useState, Dispatch, useEffect } from "react";
import { Link } from "react-router-dom";
import divar from "/divar.svg";
import menu from "/menu.svg";
import location from "/location.svg";
import styles from "./header.module.css";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/user";
import Cookies from "universal-cookie";

import HamburgerMenu from "../components/modules/HamburgerMenu";

export default function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [screen, setScreen] = useState<number>(0);

  const cookie = new Cookies();
  const { data } = useQuery(["profile"], getProfile);

  const setStateResize: Function = (
    setData: Dispatch<React.SetStateAction<number>>
  ): any => {
    const handleResizeWindow: any = () => setData(window.innerWidth);
    handleResizeWindow();
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  };

  const removeCookie = () => {
    cookie.remove("refreshToken");
    cookie.remove("accessToken");
    window.location.reload();
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setStateResize(setScreen);
  }, [window.innerWidth]);

  return (
    <>
      <header className={styles.header}>
        <div>
          <Link to={"/"}>
            <img src={divar} alt="divar" className={styles.logo} />
          </Link>
          <span>
            <img src={location} alt="location" />
            <p>تهران</p>
          </span>
        </div>
        {screen < 680 ? (
          <button className={styles.hamburger_btn} onClick={() => toggleMenu()}>
            <img src={menu} alt="hamburger-menu" />
          </button>
        ) : (
          <div>
            {data?.data?.role === "ADMIN" && (
              <Link to={"/admin"}>
                <p className={styles.admin}>پنل ادمین</p>
              </Link>
            )}
            <Link to={"/auth"}>
              <p className={styles.profile}>دیوار من</p>
            </Link>
            <Link to={"/dashboard"} className={styles.button}>
              ثبت آگهی
            </Link>
            {data && (
              <button className={styles.exit} onClick={() => removeCookie()}>
                خروج
              </button>
            )}
          </div>
        )}
      </header>
      {screen < 680 && isOpen && <HamburgerMenu show={{ isOpen, setIsOpen }} />}
    </>
  );
}
