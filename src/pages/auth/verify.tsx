import { useState } from "react";
import NewPassword from "./NewPassword";
import OTPVerification from "./OTPVerification";
import PasswordSetSuccess from "./PasswordSet";


const VerifyPassword =()=> {

  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    setStep(prev=> prev + 1);
  };

  const VerificationStep = () => {
    switch (step) {
      case 1:
        return <OTPVerification click={handleNext}/>;
      case 2:
        return <NewPassword click={handleNext}/>;
      case 3:
        return <PasswordSetSuccess/>
    }
  };
  return(
    <>
      {VerificationStep()}
    </>
  )
}

export default VerifyPassword