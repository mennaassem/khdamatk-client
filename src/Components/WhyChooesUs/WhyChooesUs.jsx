import { faBolt, faCircleCheck, faLock, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function () {
  return (

<div className=" dark:bg-gray-950 transition-colors duration-300">

  <section className="py-16">
    <div className="container mx-auto px-4">

      <h2 className="text-3xl font-bold text-center mb-12 
      text-gray-900 dark:text-gray-100">
        Why Create an Account with KHADMA HUB?
      </h2>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

        {/* Fast Booking */}
        <div className="
        bg-white dark:bg-gray-900
        p-6 rounded-xl
        border border-gray-100 dark:border-gray-800
        shadow-sm dark:shadow-lg
        hover:-translate-y-2 hover:shadow-xl
        transition-all duration-300
        text-center space-y-4">

          <div className="
          w-12 h-12 mx-auto flex items-center justify-center 
          rounded-full 
          bg-purple-100 dark:bg-purple-500/10 
          text-purple-700 dark:text-purple-400">

            <FontAwesomeIcon icon={faBolt} />
          </div>

          <h3 className="font-semibold text-lg 
          text-gray-900 dark:text-gray-100">
            Fast & Easy Booking
          </h3>

          <p className="text-sm 
          text-gray-600 dark:text-gray-400">
            Book the service you need in minutes with simple steps.
          </p>
        </div>

        {/* Verified Providers */}
        <div className="
        bg-white dark:bg-gray-900
        p-6 rounded-xl
        border border-gray-100 dark:border-gray-800
        shadow-sm dark:shadow-lg
        hover:-translate-y-2 hover:shadow-xl
        transition-all duration-300
        text-center space-y-4">

          <div className="
          w-12 h-12 mx-auto flex items-center justify-center 
          rounded-full 
          bg-purple-100 dark:bg-purple-500/10 
          text-purple-700 dark:text-purple-400">

            <FontAwesomeIcon icon={faCircleCheck} />
          </div>

          <h3 className="font-semibold text-lg 
          text-gray-900 dark:text-gray-100">
            Verified Providers
          </h3>

          <p className="text-sm 
          text-gray-600 dark:text-gray-400">
            All service providers are reviewed for quality and safety.
          </p>
        </div>

        {/* Multiple Services */}
        <div className="
        bg-white dark:bg-gray-900
        p-6 rounded-xl
        border border-gray-100 dark:border-gray-800
        shadow-sm dark:shadow-lg
        hover:-translate-y-2 hover:shadow-xl
        transition-all duration-300
        text-center space-y-4">

          <div className="
          w-12 h-12 mx-auto flex items-center justify-center 
          rounded-full 
          bg-purple-100 dark:bg-purple-500/10 
          text-purple-700 dark:text-purple-400">

            <FontAwesomeIcon icon={faScrewdriverWrench} />
          </div>

          <h3 className="font-semibold text-lg 
          text-gray-900 dark:text-gray-100">
            Multiple Services
          </h3>

          <p className="text-sm 
          text-gray-600 dark:text-gray-400">
            Home services, maintenance, cleaning, and more.
          </p>
        </div>

        {/* Secure */}
        <div className="
        bg-white dark:bg-gray-900
        p-6 rounded-xl
        border border-gray-100 dark:border-gray-800
        shadow-sm dark:shadow-lg
        hover:-translate-y-2 hover:shadow-xl
        transition-all duration-300
        text-center space-y-4">

          <div className="
          w-12 h-12 mx-auto flex items-center justify-center 
          rounded-full 
          bg-purple-100 dark:bg-purple-500/10 
          text-purple-700 dark:text-purple-400">

            <FontAwesomeIcon icon={faLock} />
          </div>

          <h3 className="font-semibold text-lg 
          text-gray-900 dark:text-gray-100">
            Secure & Reliable
          </h3>

          <p className="text-sm 
          text-gray-600 dark:text-gray-400">
            Your data and bookings are fully protected.
          </p>
        </div>

      </div>
    </div>
  </section>

</div>
  )
}
