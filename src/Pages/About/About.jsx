 import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faLock,
  faClipboardList,
  faTh,
  faDesktop,
  faBolt,
  faBullseye,
  faBinoculars,
} from "@fortawesome/free-solid-svg-icons";
import logoPhoto from '../../assets/Images/Logo.png'
import {
  faGithub,
  faLinkedin,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";
import menna from '../../assets/Images/mennaassem.jpeg'
import omnia from '../../assets/Images/omnia.jpeg'
import sousefsamir from '../../assets/Images/sousefsamir.jpeg'
import mohamedreda from '../../assets/Images/mohamed reda.jpeg'
import yomna from '../../assets/Images/yomna mohamed.jpeg'
import Gouda from '../../assets/Images/Gouda.jpeg'
 
import HessianMostafa from '../../assets/Images/Hessian Mostafa.jpeg'
 
import Zainab  from '../../assets/Images/Zainab Salah.jpeg'
 
 import Ahmed from '../../assets/Images/Ahmed Mahmoud.jpeg'
 import  YoussefAshra from '../../assets/Images/Youssef Ashraf.jpeg'
 import  Youssef from '../../assets/Images/Youssef.jpeg'
 import about from '../../assets/Images/about.jpeg'
  
 
 

export default function About() {
  const features = [
    {
      icon: faShieldAlt,
      title: "Trusted Freelancers",
      desc: "Verified professionals ready to help you.",
    },
    {
      icon: faLock,
      title: "Secure Platform",
      desc: "Safe communication and protected payments.",
    },
    {
      icon: faClipboardList,
      title: "Easy Job Posting",
      desc: "Post your project in just a few minutes.",
    },
    {
      icon: faTh,
      title: "Many Categories",
      desc: "Programming, Design, Marketing and more.",
    },
    {
      icon: faDesktop,
      title: "Easy To Use",
      desc: "Simple and modern user experience.",
    },
    {
      icon: faBolt,
      title: "Fast Service",
      desc: "Get proposals and start quickly.",
    },
  ];

  const team = [
   {
      name: "Menna Assem ",
      role: "Frontend Developer | React.js | UI/UX Designer",
      image: menna,
    },
    {
      name: "Omnia Salah",
      role: "Full Stack developer and  UI/UX Designer",
      image: omnia,
    },
    {
      name: "Yousef Samir",
      role: ".Net Backend Developer",
      image: sousefsamir,
    },
    {
      name: "Mohamed Reda",
      role: "Frontend Developer",
      image:  mohamedreda,
    },
      {
      name: "Yomna Mohamed",
      role: " UI & UX Designer",
      image: yomna,
    },
      {
      name: "Gouda George",
      role: "Backend .NET Developer",
      image: Gouda,
    },
      {
      name: "Hessian Mostafa",
      role: "Mobile Application Developer",
      image:  HessianMostafa,
    },
      {
      name: "Zainab Salah",
      role: "Ui &UX design",
      image:  Zainab ,
    },
      {
      name: "Ahmed Mahmoud",
      role: "Frontend Developer | React.js |",
      image:  Ahmed,
    },
        {
      name: "Youssef Ashra",
      role: ".net developer",
      image:  YoussefAshra,
    },
        {
      name: "Youssef Nabil",
      role: "Front end developer and Ui&ux design",
      image:   Youssef,
    },
    
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero Section */}
      <section className="container mx-auto px-6  py-36">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="bg-purple-100 text-purple-900 px-5 py-2 rounded-full font-semibold">
              ABOUT US
            </span>

            <h1 className="text-5xl md:text-6xl font-bold mt-6 mb-6">
              About <span className="text-purple-800">Khdamatk</span>
            </h1>

            <p className="text-gray-600 text-lg leading-8 mb-8">
            KhadmaHub is a digital freelance marketplace that connects clients with skilled freelancers in one trusted platform. It helps users find professional services easily while enabling freelancers to showcase their skills, manage projects, and grow their careers through a secure and user-friendly experience.
            </p>

            {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-xl transition duration-300">
              Explore Services
            </button> */}
          </div>

          <div>
            <img
              src= {about}
              alt="About Khdamatk"
              className="size-fit"
            />
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 flex gap-5">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex justify-center items-center text-purple-600 text-3xl">
              <FontAwesomeIcon icon={faBinoculars} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-4">
                Vision
              </h2>

              <p className="text-gray-600 leading-7">
               To become the leading freelance platform in the Arab region by empowering talent and simplifying access to high-quality digital services.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 flex gap-5">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex justify-center items-center text-purple-600 text-3xl">
              <FontAwesomeIcon icon={faBullseye} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-purple-900 mb-4">
                Mission
              </h2>

              <p className="text-gray-600 leading-7">
Our mission is to create a safe and efficient marketplace that connects clients with qualified freelancers, ensuring transparency, quality, and seamless collaboration for every project.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-purple-900">Khdamatk?</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition"
            >
              <div className="text-purple-900 text-4xl mb-5">
                <FontAwesomeIcon icon={feature.icon} />
              </div>

              <h3 className="font-bold mb-3">{feature.title}</h3>

              <p className="text-gray-500 text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Meet Our <span className="text-purple-900">Team</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 text-center"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-5 object-cover"
              />

              <h3 className="text-2xl font-bold">
                {member.name}
              </h3>

              <p className="text-purple-900 font-semibold mb-5">
                {member.role}
              </p>

              <div className="flex justify-center gap-5 text-2xl text-purple-900">
                <FontAwesomeIcon icon={faGithub} />
                <FontAwesomeIcon icon={faLinkedin} />
                <FontAwesomeIcon icon={faBehance} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Goal */}
      <section className="container mx-auto px-6 pb-20">
        <div className="bg-gradient-to-r from-purple-900 to-purple-600 rounded-3xl p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">

          <div>
            <h2 className="text-5xl font-bold mb-6">
              Our Goal
            </h2>

            <p className="text-lg leading-8 max-w-xl">
              Our goal is to make freelancing easier, safer and faster
              for both clients and freelancers.
            </p>
          </div>
 

        </div>
      </section>

    </div>
  );
}