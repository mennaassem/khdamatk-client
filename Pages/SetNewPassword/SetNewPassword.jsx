import { faArrowLeft, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import logoPhoto from '../../assets/Images/Logo.png'
import SocialButtons from '../../Components/SocialButtons/SocialButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SetNewPassword() {
  return (

   <>
<div className="bg-white dark:bg-gray-900 text-black dark:text-dark min-h-screen transition-colors duration-300">
  <div className="container items-center justify-between gap-16 grid lg:grid-cols-2">

    {/* ===== Left side ===== */}
    <div className="p-10 bg-white dark:bg-gray-900 shadow-lg rounded-xl 
    border border-gray-200 dark:border-gray-800 transition-colors duration-300">

      {/* Back button */}
      <div className="mb-4">
        <button className="flex items-center gap-2 
        text-gray-700 dark:text-gray-300 
        hover:text-purple-600 dark:hover:text-purple-400 transition">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back to login</span>
        </button>
      </div>

      {/* Title */}
      <div className="space-y-2">
        <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
          Set a password
        </h1>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Your previous password has been reset. Please set a new password for your account.
        </p>
      </div>

      {/* Form */}
      <div>
        <form className="mt-5 space-y-6">

          {/* Create Password */}
          <div className="relative">
            <span className="absolute left-4 -top-3 
            bg-white dark:bg-gray-900 
            px-2 text-sm 
            text-gray-500 dark:text-gray-400">
              Create Password
            </span>

            <input
              type="password"
              className="
              w-full px-4 py-3 rounded-lg
              bg-white dark:bg-gray-950
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
              transition
              "
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-500 dark:text-gray-400 
            hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>

          {/* Re-enter Password */}
          <div className="relative">
            <span className="absolute left-4 -top-3 
            bg-white dark:bg-gray-900 
            px-2 text-sm 
            text-gray-500 dark:text-gray-400">
              Re-enter Password
            </span>

            <input
              type="password"
              className="
              w-full px-4 py-3 rounded-lg
              bg-white dark:bg-gray-950
              border border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-white
              focus:outline-none
              focus:ring-2 focus:ring-purple-500
              transition
              "
            />

            <span className="absolute right-4 top-1/2 -translate-y-1/2 
            text-gray-500 dark:text-gray-400 
            hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer transition">
              <FontAwesomeIcon icon={faEyeSlash} />
            </span>
          </div>

          {/* Submit */}
          <div>
            <button
              className="w-full py-3 rounded-lg
              bg-purple-600 hover:bg-purple-700
              text-white transition">
              Set password
            </button>
          </div>

        </form>

        {/* Divider */}
        <div className="text-center relative m-9">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>

          <p className="text-gray-500 dark:text-gray-400 text-sm absolute 
          top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          bg-white dark:bg-gray-900 px-2">
            Or login with
          </p>
        </div>

        {/* Social */}
        <div>
          <SocialButtons />
        </div>

      </div>
    </div>

    {/* ===== Right side ===== */}
    <div>
      <img
        src={logoPhoto}
        alt="Sign in"
        className="dark:opacity-90"
      />
    </div>

  </div>
</div>
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   </>
  )
}
