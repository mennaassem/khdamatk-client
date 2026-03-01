import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import logoPhoto from '../../assets/Images/Logo.png'
import SocialButtons from '../../Components/SocialButtons/SocialButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { sendDataToForgetEmail } from '../../Services/auth-services'

export default function ForgetPassword() {
      const navigate=useNavigate();

     const [isExistError,setIsExistError]=useState(null)
     const [isExistErrorEmail, setIsExistErrorEmail]=useState(null)
     const  validationSchema= yup.object({
     
           email: yup.string().email("Invalid email address").required("Email is required"),
            
        })
async function handelForgetPassword(values) {
  try {
    const response = await sendDataToForgetEmail(values);
    console.log(response);

    if (response.isSuccess) {
toast.success("Check your email for the password reset code");
  localStorage.setItem("resetEmail", values.email);
 setTimeout(() => {
      navigate('/verify-code');
    }, 3000);
    }  
  } 
 
catch (error) {
  console.log(error);

  const errorMessage = error.response?.data?.errors?.[0]?.message;
  setIsExistErrorEmail(errorMessage);
}
}
const formik=useFormik({
    initialValues:{
         email: '',
    },
    validationSchema,
    onSubmit:handelForgetPassword
})
  function handleChange(e){
        setIsExistError("")
        setIsExistErrorEmail("")
        formik.handleChange(e)
    }



  return (
    <>
  <div className="pt-20 lg:pt-0 
bg-gray-50 dark:bg-gray-950 
min-h-screen transition-colors duration-300">

  <div className="container mx-auto 
  items-center justify-between gap-16 
  grid lg:grid-cols-2 px-4">

    {/* ===== Left side: Forgot Password Form ===== */}
    <div className="
    p-10 
    bg-white dark:bg-gray-900
    border border-gray-100 dark:border-gray-800
    shadow-lg dark:shadow-xl
    rounded-xl
    transition-all duration-300">

      {/* Back button */}
      <div className="mb-6">
        <Link 
          to="/login" 
          className="flex items-center gap-2 
          text-gray-700 dark:text-gray-300
          hover:text-purple-600 dark:hover:text-purple-400
          transition">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span className="font-semibold">
            Back to login
          </span>
        </Link>
      </div>

      {/* Title */}
      <div className="space-y-3 mb-6">
        <h1 className="font-bold text-2xl 
        text-gray-900 dark:text-gray-100">
          Forgot your password?
        </h1>

        <p className="
        text-gray-500 dark:text-gray-400 
        text-sm leading-relaxed">
          Don’t worry, happens to all of us. 
          Enter your email below to recover your password.
        </p>
      </div>

      {/* Form */}
      <form 
        className="space-y-6" 
        onSubmit={formik.handleSubmit}
      >
        <div className="relative w-full">
          
          <span className="
          absolute left-4 -top-3 
          bg-white dark:bg-gray-900 
          px-2 text-sm 
          text-gray-500 dark:text-gray-400">
            Email
          </span>

          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            className="
            w-full px-4 py-3
            rounded-lg
            bg-white dark:bg-gray-950
            border border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-purple-500
            focus:outline-none
            transition"
          />

          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </p>
          )}

          {isExistErrorEmail && (
            <p className="text-red-500 text-sm mt-1">
              {isExistErrorEmail}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="
          w-full py-3 rounded-lg
          bg-purple-700 hover:bg-purple-800
          dark:bg-purple-600 dark:hover:bg-purple-500
          text-white font-medium
          transition duration-300">
          Submit
        </button>
      </form>

      {/* Divider */}
      <div className="text-center relative my-10">
        <div className="
        w-full border-t 
        border-gray-300 dark:border-gray-700"></div>

        <p className="
        text-gray-500 dark:text-gray-400 
        text-sm absolute 
        top-1/2 left-1/2 
        -translate-x-1/2 -translate-y-1/2 
        bg-white dark:bg-gray-900 px-3">
          Or login with
        </p>
      </div>

      {/* Social Buttons */}
      <SocialButtons />

    </div>

    {/* ===== Right side: Image ===== */}
    <div className="hidden lg:block">
      <img 
        src={logoPhoto} 
        alt="Sign in" 
        className="max-w-full dark:opacity-80"
      />
    </div>

  </div>
</div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>
  )
}
