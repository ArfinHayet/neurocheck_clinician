import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Signup from "../Authentication/Signup";
import { signupuser } from "../../api/signup";
import { AuthContext } from "../../Provider/AuthProvider";


import logo from "../../../public/svg/blacklogo.png";

const SignUpForm = ({ otp, identifier }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    hcpcTitle: "",
    regNo: "",
    practiceName: "",
    address: "",
    bankDetails: "",
    certifications: null,
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { setUserData } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (identifier) {
      setFormData((prev) => ({
        ...prev,
        email: identifier,
      }));
    }
  }, [identifier]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "certifications") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  console.log("EMAIL:", formData.email);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      street: formData.address,
      role: "clinician",
      identifier,
      otp: otp.join(""),
      hcpcTitle: formData.hcpcTitle,
      regNo: formData.regNo,
      practiceName: formData.practiceName,
      bankDetails: formData.bankDetails,
      certification: "test",
    };

    try {
      const result = await signupuser(payload);

      if (result?.payload?.token?.access_token) {
        localStorage.setItem("accessToken", result.payload.token.access_token);

        const userData = result.payload.user;
        setUserData?.(userData);

        toast.success("Signup successful!");
        navigate("/", { replace: true });
      } else {
        toast.error(result?.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="bg-[#114654] w-full py-7 block lg:hidden " />

      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md lg:bg-white p-8 rounded-lg lg:shadow-md">
          <div className="flex items-start justify-start">
            <img src={logo} alt="Logo" className="w-auto h-11" />
          </div>

          <h2 className="text-2xl font-semibold text-black my-2 text-left">Sign Up</h2>

          <p className="text-xs text-[#3C3C4399] mb-6 text-left">
            Join NeuroCheckPro to begin your journey toward clarity and expert
            guidance. It only takes a minute!
          </p>

          <Signup
            identifier={identifier}
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
