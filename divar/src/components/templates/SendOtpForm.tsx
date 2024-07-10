import { Dispatch, SetStateAction } from "react";
import { sendOtp } from "../../services/auth";
import styles from "./sendotpForm.module.css"

export default function SendOtpForm(props: {
  mobile: string;
  setMobile: Dispatch<SetStateAction<string>>;
  setStep: Dispatch<SetStateAction<number>>;
}): JSX.Element {
  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (props.mobile.length !== 11) return;
    const { response, error } = await sendOtp(props.mobile);
    props.setStep(2);
    console.log(response, error);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار, لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره ارسال خواهد شد
      </span>
      <label htmlFor="input"></label>
      <input
        type="text"
        id="input"
        placeholder="شماره موبایل"
        value={props.mobile}
        onChange={(e) => props.setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}
