import {
  faArrowLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import logoPhoto from "../../assets/Images/Logo.png";
import SocialButtons from "../../Components/SocialButtons/SocialButtons";
import { sendDataToVerifyCode } from "../../Services/auth-services";

export default function VerifyCode() {
  const navigate = useNavigate();

  // States
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation
  const validationSchema = yup.object({
    code: yup
      .number()
      .typeError("Code must be numbers only")
      .required("Code is required"),

    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  });

  // Submit Function
  async function handelVerifyCode(values) {
    try {
      setLoading(true);
      setApiError("");

      const email = localStorage.getItem("resetEmail");

      if (!email) {
        setApiError("Email not found. Please restart reset password process.");
        setLoading(false);
        return;
      }

      const payload = {
        codeType: 0, // لو منفعش خليها 1
        email: email,
        password: values.password,
      value: Number(values.code)
      };

      console.log("PAYLOAD:", payload);

      const response = await sendDataToVerifyCode(payload);

      console.log("SUCCESS RESPONSE:", response);

      if (response?.isSuccess) {
        toast.success("Password changed successfully");

        localStorage.removeItem("resetEmail");

        navigate("/login");
      } else {
        setApiError(response?.message || "Something went wrong");
        toast.error(response?.message || "Something went wrong");
      }
    } catch (error) {
      console.log("ERROR RESPONSE:", error?.response?.data);

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Something went wrong";

      setApiError(errorMessage);

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Formik
  const formik = useFormik({
   initialValues: {
  code: "",
  password: "",
},
    validationSchema,
    onSubmit: handelVerifyCode,
  });

  return (
    <div className="pt-20 lg:pt-0 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="container items-center justify-between gap-16 grid lg:grid-cols-2">
        
        {/* Left Side */}
        <div className="p-10 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">

          {/* Back Button */}
          <div className="mb-4">
            <button
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              onClick={() => navigate("/login")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to login</span>
            </button>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
              Verify Code & Reset Password
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Enter the verification code and your new password.
            </p>
          </div>

          {/* Form */}
          <form
            className="mt-6 space-y-6"
              autoComplete="off"
            onSubmit={formik.handleSubmit}
          >

            {/* Code Input */}
            <div className="relative">
              <span className="absolute left-4 -top-3 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
                Verification Code
              </span>

              <input
                type="text"
              
                autoComplete="off"
                placeholder="Enter code"
                name="code"
value={formik.values.code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

             {formik.touched.code && formik.errors.value && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.value}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="relative">
              <span className="absolute left-4 -top-3 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
                New Password
              </span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
               autoComplete="new-password"
                placeholder="Enter new password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />

              {/* Eye Icon */}
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 cursor-pointer transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                />
              </span>

              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* API Error */}
            {apiError && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm">
                {apiError}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition disabled:opacity-60"
            >
              {loading ? "Loading..." : "Verify & Reset Password"}
            </button>
          </form>

          {/* Divider */}
          <div className="text-center relative my-9">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>

            <p className="text-gray-500 dark:text-gray-400 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-2">
              Or login with
            </p>
          </div>

          {/* Social Buttons */}
          <SocialButtons />
        </div>

        {/* Right Side */}
        <div>
          <img
            src={logoPhoto}
            alt="Verify Code"
            className="dark:opacity-90"
          />
        </div>
      </div>
    </div>
  );
}