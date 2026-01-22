
import React, { useState, useRef } from "react";
import SendOtp from "../../components/SignUp/SendOtp";
import VerifyOtp from "../../components/SignUp/VerifyOtp";
import SignUpForm from "../../components/SignUp/SignUpForm";


const SignUp = () => {
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [step, setStep] = useState(1);
  const inputsRef = useRef([]);

  return (
    <div>
      {step === 1 && (
        <SendOtp
          identifier={identifier}
          setIdentifier={setIdentifier}
          setStep={setStep}
        />
      )}

      {step === 2 && (
        <VerifyOtp
          otp={otp}
          setOtp={setOtp}
          inputsRef={inputsRef}
          setStep={setStep}
          identifier={identifier}
        />
      )}

      {step === 3 && (
        <SignUpForm
          otp={otp}
          setOtp={setOtp}
          inputsRef={inputsRef}
          setStep={setStep}
          identifier={identifier}
        />
      )}
    </div>
  );
};

export default SignUp;
