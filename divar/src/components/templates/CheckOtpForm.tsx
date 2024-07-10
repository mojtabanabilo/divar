import { Dispatch } from "react";
import { checkOtp } from "../../services/auth";
import { setCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import styles from "./checkOtpForm.module.css"

export default function CheckOtpForm(props: {
  code: string;
  setCode: Dispatch<React.SetStateAction<string>>;
  mobile: string;
  setStep: Dispatch<React.SetStateAction<number>>;
}):JSX.Element {
  // navigator
  const navigate = useNavigate();

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (props.code.length !== 5) return;
    const { response, error } = await checkOtp(props.mobile, props.code);

    if (response) {
      console.log(response);
      
      setCookie(response.data);
      navigate("/")
    }
    if (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد SMS شده.</p>
      <span>کد پیامک شده به شماره {props.mobile} را وارد کنید.</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={props.code}
        onChange={(e) => props.setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button onClick={() => props.setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
    </form>
  );
}
