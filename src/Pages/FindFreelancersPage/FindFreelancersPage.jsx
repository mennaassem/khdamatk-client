import React, { useContext } from 'react'
import FreelancersSidebar from '../../Components/FreelancersSidebar/FreelancersSidebar'
import FreelancerProfileCard from '../../Components/FreelancerProfileCard/FreelancerProfileCard'
import FreelancerCard from '../../Components/FreelancerCard/FreelancerCard'
import { data } from 'react-router-dom'
import { ProvidersContext } from '../../Components/Context/ProvidersContext'

export default function FindFreelancersPage() {
   const { providers, loading } = useContext(ProvidersContext);
  return (
     <>
     <main className='pt-24 bg-Purple-500 text-white text-center pb-9' >
       <div className="container space-y-4">
        <h1 className='font-bold text-2xl'>Best Freelancers for Hire in Egypt</h1>
      <p className='line-clamp-3 w-96 mx-auto'>khadma hubis a freelance & remote work marketplace with thousands of top-rated freelancers & remote employees., It is simple and quick to Post your job for free and get quick proposals for your jobs Top companies and start-ups in Egypt hire  freelancers</p>
      <button type='button' className='btn bg-yellow-500 w-fit rounded-xl'>hire best freelancers now</button>
       </div>
     </main>
    <section className='pt-5 bg-gray-50'>
  <div className="container flex flex-col md:flex-row items-start gap-4">
       
    {/* Sidebar */}
    <div className="w-full md:w-1/4  mt-16">
      <FreelancersSidebar/>
    </div>

    {/* search and results */}
    <div className="w-full md:w-3/4 flex flex-col gap-4">
      
      {/* Search Bar */}
      <div className="p-4">
        <input
          type="text"
          placeholder="Search freelancers..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
   {providers.map((provider) => (
        <FreelancerProfileCard key={provider.id} provider={provider} />
      ))}
       
      </div>

    </div>

  </div>
</section>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     </>
  )
}
