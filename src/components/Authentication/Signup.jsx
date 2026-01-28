import Input from "../ui-reusable/Input";

const Signup = ({
  identifier,
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const formFields = [
    ["name", "Your Name", "Full Name"],
    ["phone", "Phone", "Phone Number"],
    ["hcpcTitle", "HCPC Title", "HCPC Title"],
    ["regNo", "Reg No.", "Registration Number"],
    ["practiceName", "Practice Name", "Practice Name"],
    ["address", "Address", "Practice Address"],
    ["bankDetails", "Bank details", "Bank Details"],
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Dynamic Inputs */}
      {formFields.map(([name, placeholder, label]) => (
        <Input
          key={name}
          name={name}
          placeholder={placeholder}
          label={label}
          value={formData[name] || ""}
          onChange={handleChange}
          className="w-full px-4 py-1 placeholder:text-xs border bg-white border-[#E2E2E2] rounded-3xl outline-none "
        />
      ))}

      {/* Email (Readonly) */}
      <div className="flex flex-col items-start gap-2">
        <label className="text-xs font-normal text-[#868686]">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          value={identifier || ""}
          readOnly
          className="w-full px-4 py-2 text-xs border border-[#E2E2E2] rounded-3xl outline-none bg-gray-100"
        />

        {/* <input
          name="email"
          type="email"
          placeholder="Email Address"

          value={formData.email || ""}
          onChange={handleChange}
          className="w-full px-4 py-2 placeholder:text-xs border bg-white border-[#E2E2E2] rounded-3xl outline-none text-xs"
        /> */}
      </div>

      {/* Certifications */}
      <div className="flex flex-col items-start gap-2">
        <label
          htmlFor="certifications"
          className="text-xs font-medium text-[#868686]"
        >
          Certifications
        </label>
        <input
          id="certifications"
          type="file"
          name="certifications"
          onChange={handleChange}
          className="w-full px-4 py-2 text-xs text-[#868686] border border-[#E2E2E2] rounded-3xl outline-none"
        />
      </div>

      {/* Password */}
      <div className="relative flex flex-col gap-1">
        <Input
          id="password"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={formData.password || ""}
          onChange={handleChange}
          className="w-full px-4 py-1 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-11 -translate-y-1/2 text-gray-600"
        >
          👁
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative flex flex-col gap-1">
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          value={formData.confirmPassword || ""}
          onChange={handleChange}
          className="w-full px-4 py-1 placeholder:text-xs border border-[#E2E2E2] rounded-3xl outline-none pr-10"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword((prev) => !prev)}
          className="absolute right-3 top-11 -translate-y-1/2 text-gray-600"
        >
          👁
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-[#0A4863] text-white py-2 rounded-3xl font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
};

export default Signup;
