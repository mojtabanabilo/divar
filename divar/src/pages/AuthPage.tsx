import { useState } from "react";
import SendOtpForm from "../components/templates/SendOtpForm";
import CheckOtpForm from "../components/templates/CheckOtpForm";

export default function AuthPage() {
  // states
  const [step, setStep] = useState<number>(1);
  const [mobile, setMobile] = useState<string>("");
  const [code, setCode] = useState<string>("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && (
        <CheckOtpForm code={code} setCode={setCode} mobile={mobile} setStep={setStep}/>
      )}
    </div>
  );
}
