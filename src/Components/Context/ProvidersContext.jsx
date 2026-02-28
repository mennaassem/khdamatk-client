import { createContext, useContext, useEffect, useState } from "react";
import { getAllProviders } from "../../Services/auth-services";

 export const ProvidersContext = createContext();

export default  function ProvidersProvider({ children }) {

  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchProviders(type = "", value = "") {
    try {
      setLoading(true);

      const response = await getAllProviders(type, value);

      if (response.isSuccess) {
        setProviders(response.data.providers);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProviders(); 
  }, []);

  return (
    <ProvidersContext.Provider
      value={{ providers, loading, fetchProviders }}
    >
      {children}
    </ProvidersContext.Provider>
  );
}

export function useProviders() {
  return useContext(ProvidersContext);
}
// import { createContext, useState, useEffect } from "react";
// import { getAllProviders } from "../../Services/auth-services";

// export const ProvidersContext = createContext();

// export default function ProvidersProvider({ children }) {

//   const [providers, setProviders] = useState([]);
//   const [services, setServices] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedService, setSelectedService] = useState("");

//   async function fetchData() {
//     try {
//       const response = await getAllProviders();

//       setProviders(response.data.providers);
//       setServices(response.data.servicesCard);

//     } catch (error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // الفلترة
//   const filteredProviders = providers.filter((provider) => {

//     if (searchTerm !== "") {
//       return provider.userName
//         .toLowerCase()
//         .includes(searchTerm.toLowerCase());
//     }

//     if (selectedService !== "") {
//       return provider.jobTitle
//         .toLowerCase()
//         .includes(selectedService.toLowerCase());
//     }

//     return true;
//   });

//   return (
//     <ProvidersContext.Provider
//       value={{
//         services,
//         filteredProviders,
//         searchTerm,
//         setSearchTerm,
//         selectedService,
//         setSelectedService
//       }}
//     >
//       {children}
//     </ProvidersContext.Provider>
//   );
// }