import React, { useContext, useEffect, useState } from 'react'
import FreelancerCard from '../FreelancerCard/FreelancerCard'
import { getHomeData } from '../../Services/home-api'
import Loading from '../Loading/Loading'
import { ProvidersContext } from '../Context/ProvidersContext';
 
import FreelancerProfileCard from '../FreelancerProfileCard/FreelancerProfileCard';

export default function Freelancer() {
   const { providers, loading } = useContext(ProvidersContext);
    // const[freelancer,setFreelancer]=useState([])
    // const[loading,setLoading]=useState(true)
    //  async function getFreelancerDetails(){
    //     try {
    //                 const response= await getHomeData()
    //                 if(response.isSuccess){
    //                     setLoading(false)
    //                     setFreelancer(response.data.providers)
    //                 }
    //             } catch (error) {
    //                 setLoading(true)
    //                 console.log(error)
                    
    //             }
    // }
    // useEffect(()=>{
    //    getFreelancerDetails() 
    // },[])
    // if(loading){
    //   return <Loading/>
    // }
      const firstFourProviders = providers.slice(0, 4);
  return (
    <div className='dark:bg-gray-950 dark:text-white'>
       <div className="container space-y-4  p-10 ">
         <h2 className='font-bold text-3xl text-center'>Our Top-Rated Freelancers</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {/* {freelancer.map((items)=>(
               <FreelancerCard key={items.id} data={items} />
            ))} */}
            {firstFourProviders.map((provider) => (
        <FreelancerProfileCard key={provider.id} provider={provider} />
      ))}
 
  </div>
    </div>
    </div>
    
  )
}
