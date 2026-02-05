import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { resetPasswordByEmail, sendOtp } from "../../api/signup";
import Input from "../ui-reusable/Input";
import { AuthContext } from "../../Provider/AuthProvider";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

function ChangePassword({ onClose }) {
  const { userData } = useContext(AuthContext);
  const email = userData?.email;

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔹 Send OTP
  const handleSendOtp = async () => {
    if (!email) {
      toast.error("User email not found");
      return;
    }

    setSendingOtp(true);
    try {
      const res = await sendOtp({
        identifier: email,
      });

      if (res?.statusCode === 201) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(res?.message || "Failed to send OTP");
      }
    } catch (err) {
      toast.error("Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  // 🔹 Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || otp.length < 4) {
      toast.error("Enter valid OTP");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await resetPasswordByEmail({
        email,
        otp,
        password: newPassword,
      });

      if (res?.statusCode === 200) {
        toast.success("Password changed successfully");

        // ✅ Fixed: Backend returns token in payload.token.access_token
        if (res?.payload?.token?.access_token) {
          localStorage.setItem("accessToken", res.payload.token.access_token);
        }

        onClose?.();
      } else {
        toast.error(res?.message || "Reset failed");
      }
    } catch (err) {
      console.error("Password reset error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900">Change Password</h2>

      <p className="text-sm text-slate-600">
        OTP will be sent to <span className="font-medium">{email}</span>
      </p>

      {!otpSent && (
        <button
          type="button"
          onClick={handleSendOtp}
          disabled={sendingOtp}
          className="w-full bg-[#0A4863] text-white py-2 rounded-3xl hover:bg-[#083a4f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {sendingOtp ? "Sending..." : "Send OTP"}
        </button>
      )}

      {otpSent && (
        <>
          <p className="text-sm font-medium text-gray-600  ">Enter your OTP</p>
          <input
            label="OTP Code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP Code"
            required
            className="w-full mb-10 px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none focus:border-[#0A4863] transition-colors"
          />

          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none focus:border-[#0A4863] transition-colors"
              required
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700">
              <RiLockPasswordLine />
            </span>

            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              tabIndex={-1}
            >
              {showNewPassword ? <PiEyeLight /> : <PiEyeSlash />}
                      </button>
                      
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-12 py-3 border placeholder:text-xs placeholder:text-[#00000080] border-[#E2E2E2] rounded-full focus:outline-none focus:border-[#0A4863] transition-colors"
              required
            />

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-800">
              <RiLockPasswordLine />
            </span>

            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 transition-colors"
              tabIndex={-1}
            >
              <PiEyeLight />
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0A4863] text-white py-2 rounded-3xl hover:bg-[#083a4f] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}
    </form>
  );
}

export default ChangePassword;
