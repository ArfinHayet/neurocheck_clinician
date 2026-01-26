
import p1 from "../../../public/svg/blacklogo.png";
import { verift_otp } from "../../api/signup";
import toast from "react-hot-toast";

const VerifyOtp = ({ otp, setOtp, inputsRef, setStep, identifier }) => {
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const verifyOtp = async () => {
    const payload = {
      identifier,
      otp: otp.join(""),
    };

    const result = await verift_otp(payload);
    if (result) {
      toast.success(result?.message);
      setStep(3);
    } else {
      toast.error(result?.message);
    }
  };

  return (
    <div>
      <div className="bg-[#114654] w-full py-7 block lg:hidden"></div>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white  p-8  text-center rounded-md shadow-md w-full max-w-md">
          <div className="flex items-start justify-start mb-4">
            <img
              src={p1}
              alt="Logo"
              width={800}
              height={800}
              className="w-auto h-11"
            />
          </div>
          <h2 className="text-xl font-semibold text-[#000000] text-start my-4">
            Verification
          </h2>
          <p className="text-start text-xs font-normal text-[#3C3C4399] mb-6">
            An OTP has been sent to your phone number. Enter OTP here for
            verification.
          </p>

          {/* OTP Input Boxes */}
          <div className="flex justify-center gap-3 mt-6">
            {(otp || [])?.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={(el) => (inputsRef.current[index] = el)}
                className="w-12 h-12 border border-[#D8DADC] rounded-lg text-center text-lg focus:outline-none focus:ring-1 focus:ring-[#114654]"
              />
            ))}
          </div>

          {/* Resend Link */}
          <p className="mt-3 text-sm text-gray-500">
            Didn’t get OTP?{" "}
            <button className="text-[#114654] font-medium hover:underline cursor-pointer">
              Resend OTP
            </button>
          </p>

          {/* Verify Button */}
          <button
            onClick={verifyOtp}
            className="mt-6 w-full bg-[#0A4863] cursor-pointer text-white py-3 rounded-full font-semibold"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
