import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPasswordByEmail, sendOtp } from "../../api/signup";
import logo from "../../../public/svg/blacklogo.png";
import Input from "../../components/ui-reusable/Input";
import { Link } from "react-router";


const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const navigate = useNavigate();

  // Send OTP to email
  const handleSendOtp = async () => {
    if (!email || !email.includes("@")) {
      console.error("Please enter a valid email address");
      return;
    }

    setSendingOtp(true);
    try {
      const result = await sendOtp({ identifier: email });

      if (result?.statusCode === 200 || result?.statusCode === 201) {
        toast.success("OTP sent to your email!");
        setOtpSent(true);
      } else {
        console.error(result?.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSendingOtp(false);
    }
  };

  // Reset password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!otp || otp.length < 4) {
      toast.error("Please enter a valid OTP");
      return;
    }

    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email,
        otp,
        password: newPassword,
      };

      const result = await resetPasswordByEmail(payload);

      if (result?.statusCode === 200) {
        toast.success("Password reset successful!");

        // Store token if backend returns it
        if (result?.data?.token) {
          localStorage.setItem("accessToken", result.data.token);
        }

        navigate("/signin", { replace: true });
      } else {
        toast.error(result?.message || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="bg-[#114654] w-full py-7 block lg:hidden" />

      <div className="flex items-center justify-center p-8 min-h-screen">
        <div className="w-full max-w-md lg:bg-white p-8 rounded-lg lg:shadow-md">
          <div className="flex items-start justify-start mb-4">
            <img src={logo} alt="Logo" className="w-auto h-11" />
          </div>

          <h2 className="text-2xl font-semibold text-black mb-2 text-left">
            Reset Password
          </h2>

          <p className="text-xs text-[#3C3C4399] mb-8 text-left">
            Enter your email and verify with OTP to reset your password
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            {/* Email Input */}
            <div className="flex gap-2">
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpSent}
                className="w-full px-4 py-2 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none disabled:bg-gray-100"
              />
              {!otpSent && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                  className="px-4 py-2 bg-[#0A4863] text-white rounded-3xl font-semibold hover:bg-[#0A4863]/90 disabled:bg-gray-400 whitespace-nowrap mt-6 text-xs "
                >
                  {sendingOtp ? "Sending..." : "Send OTP"}
                </button>
              )}
            </div>

            {/* OTP Input - Only show after OTP is sent */}
            {otpSent && (
              <>
                <div className="flex gap-2 items-end">
                  <Input
                    type="text"
                    name="otp"
                    label="OTP Code"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-2 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={sendingOtp}
                    className="px-4 py-2 text-sm text-[#0A4863] hover:underline whitespace-nowrap"
                  >
                    Resend OTP
                  </button>
                </div>

                {/* New Password */}
                <div className="relative flex flex-col gap-1">
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-11 -translate-y-1/2 text-gray-600"
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative flex flex-col gap-1">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-2 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-11 -translate-y-1/2 text-gray-600"
                  >
                    {showConfirmPassword ? "🙈" : "👁"}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0A4863] text-white py-2 rounded-3xl font-semibold hover:bg-[#0A4863]/90 disabled:bg-gray-400"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </>
            )}

            {/* Back to Login */}
                      <div className="mt-8">
                      
                       <Link
to="/signin"
             
              className=" w-full text-center text-sm text-[#0A4863] hover:underline"
            >
              Back to Login
            </Link></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
