import { faArrowLeft, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logoPhoto from '../../assets/Images/Logo.png';
import SocialButtons from '../../Components/SocialButtons/SocialButtons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendDataToVerifyCode } from '../../Services/auth-services';

export default function VerifyCode() {
  const navigate = useNavigate();

  // State
  const [isExistError, setIsExistError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Validation schema
  const validationSchema = yup.object({
    value: yup
      .number()
      .typeError("Code must be numbers only")
      .required("Code is required"),
  });

  // Verify code
  async function handelVerifyCode(values) {
    try {
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        setIsExistError("Email not found. Please restart the reset process.");
        return;
      }

      const payload = {
        codeType: "changePassword",
        email: email,
        password: "Abc123!@", 
       value: values.value
      };

      const response = await sendDataToVerifyCode(payload);

      if (response.isSuccess) {
        toast.success("Code verified successfully");
        navigate('/set-new-password');
      } else {
        setIsExistError(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setIsExistError(error.response.data.message || "Something went wrong");
        toast.error(error.response.data.message || "Something went wrong");
      } else {
        setIsExistError(error.message);
        toast.error(error.message);
      }
    }
  }

  const formik = useFormik({
    initialValues: { value: "" },
    validationSchema,
    onSubmit: handelVerifyCode,
  });

  return (
    <div className="pt-20 lg:pt-0 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="container items-center justify-between gap-16 grid lg:grid-cols-2">

        {/* Left side */}
        <div className="p-10 bg-white dark:bg-gray-900 shadow-lg rounded-xl border border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div className="mb-4">
            <button
              className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition"
              onClick={() => navigate("/login")}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              <span>Back to login</span>
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="font-bold text-2xl text-gray-900 dark:text-white">Verify code</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              An authentication code has been sent to your email.
            </p>
          </div>

          <form className="mt-5 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="relative">
              <span className="absolute left-4 -top-3 bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
                Enter Code
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="value"
                value={formik.values.value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-gray-950 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
              {formik.touched.value && formik.errors.value && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.value}</p>
              )}
              {isExistError && (
                <p className="text-red-500 text-sm mt-1">{isExistError}</p>
              )}
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition"
              >
                Verify
              </button>
            </div>
          </form>

          <div className="text-center relative m-9">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
            <p className="text-gray-500 dark:text-gray-400 text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 px-2">
              Or login with
            </p>
          </div>

          <SocialButtons />
        </div>

        {/* Right side */}
        <div>
          <img src={logoPhoto} alt="Sign in" className="dark:opacity-90" />
        </div>

      </div>
    </div>
  );
}