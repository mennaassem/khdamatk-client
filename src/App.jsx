import React from 'react';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerifyCode from './Pages/VerifyCode/VerifyCode';
import SetNewPassword from './Pages/SetNewPassword/SetNewPassword';
import { ToastContainer } from 'react-toastify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Home from './Pages/Home/Home';
import NotFound from './Pages/NotFound/NotFound';
import SendConfirmEmail from './Pages/SendConfirmEmail/SendConfirmEmail';
import ConfirmEmail from './Pages/ConfirmEmail/ConfirmEmail';
 
import AuthProvider from './Components/Context/AuthContext';
import Profile from './Pages/Profile/Profile';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout';
 
import ThemeProvider from './Components/Context/Theme.Context';

 
import ThemeWrapper from './Components/Context/ThemeWrapper';
import JobDetails from './Pages/JobDetails/JobDetails';
import AddService from './Pages/AddService/AddService';
import AdminDashbord from './Pages/AdminDashbord/AdminDashbord';
import ReportDetails from './Pages/ReportDetails/ReportDetails';
import GitJob from './Pages/GitJob/GitJob';
import Service from './Pages/Service/Service';
import FindFreelancersPage from './Pages/FindFreelancersPage/FindFreelancersPage';
import ProvidersProvider from './Components/Context/ProvidersContext';
 
import ServicesPage from '../Pages/ServicesPage/ServicesPage';
import ClientPropList from '../Pages/ClientPropList/ClientPropList';
import MessagePage from '../Pages/MessagePage/MessagePage';
import ServiceDetails from '../Pages/ServiceDetails/ServiceDetails';
import SelectedFreeLancer from '../Pages/SelectedFreeLancer/SelectedFreeLancer';
import Client from './Pages/Client/Client';
import PostJob from '../Pages/PostJob/PostJob';
import EmbtyDasheBoord from '../Pages/EmbtyDasheBoord/EmbtyDasheBoord';
import Wallet from '../Pages/Wallet/Wallet';
import About from './Pages/About/About';
import Verification from '../Pages/Verification/Verification';
import Job from '../Pages/Job/Job';
 
 
 
 

 
 
 
 
 
 

function App() {
 
    const router=createBrowserRouter([
        {
            path:'/',
            element:<Layout/>,
            children:[
              {
                   index: true,
                   element:<Home/>
              },
              {
                path:'signup',
                element:<Signup/>
              },
              {
                path:'login',
                element:<Login/>
              },
              {
                path:'forget-password',
                element:<ForgetPassword/>
              },
              {
                path:'verify-code',
                element:<VerifyCode/>
              },
              {
                path:'set-new-password',
                element:<SetNewPassword/>
              },
              {
                path:'send-confirm-email',
                element:<SendConfirmEmail/>
              },
              {
  path: "confirm-email",
  element: <ConfirmEmail/>
}, 
              {
  path: "postjob",
  element: <ProtectedRout>
    <PostJob/>
  </ProtectedRout>
},
{ 
  path: "git-job",
  element:  <ProtectedRout>
    <GitJob/>
  </ProtectedRout> 
},
 {
  path:"profile/:userId",
  element:  
    <Profile/>
   
},

   {
  path: "client",
  element: <Client/>
},
 
 
   {
  path: "wallet",
  element: <Wallet/>
},

   {
  path: "job",
  element:<Job/>
},
   {
  path: "about",
  element:  <About/>
},
   {
  path: "emptydashboard",
  element: <EmbtyDasheBoord/>
},
//  {
//   path: "job-details/:id",
//   element: <JobDetails/>
// },
 {
  path: "job-details/:userId",
  element: <JobDetails/>
},
{
  path: "add-service",
  element: <AddService/>
},
{
  path: "add-dashbord",
  element: <AdminDashbord/>
},
{
  path: "report-details",
  element: <ReportDetails/>
},
 
{
  path: "service",
  element: <Service/>
},
{
  path: "find-freelancers-page",
  element: <FindFreelancersPage/>
},
 
//  {
// path: "message",
// element: <Message/>
// },
   
              
     {
path: "servicespage",
element: <ServicesPage/>
},  
     {
path: "verification",
element: <Verification/>
},          
         
           {
path: "clientproplist",
element: <ClientPropList/>
},      

   {
path: "messagepage",
element: <MessagePage/>
}, 
   {
path: "servicedetails",
element: <ServiceDetails/>
},

   {
path: "selectedfreelancer",
element: <SelectedFreeLancer/>
},
               
              {
                path:'*',
                element:<NotFound/>

              }

            ]
        }
    ])
    return (
        <div>
            {/* <Signup/> */}
            {/* <Login/> */}
            {/* <ForgetPassword/> */}
            {/* <VerifyCode/> */}
            {/* <SetNewPassword/> */}

            {/* <AuthProvider>
               <RouterProvider router={router}/>
             <ToastContainer position='top-right' autoClose={3000}  closeButton={false}  closeOnClick={true} />
            </AuthProvider> */}
            {/* <AuthProvider>
               <ThemeProvider>
                  <RouterProvider router={router}/>
             <ToastContainer position='top-right' autoClose={3000}  closeButton={false}  closeOnClick={true} />
               </ThemeProvider>
            </AuthProvider> */}
            {/* <AuthProvider>
  <ThemeProvider>
    <ThemeWrapper>
       <RouterProvider router={router}/>
    <ToastContainer position='top-right' autoClose={3000} closeButton={false} closeOnClick/>
    </ThemeWrapper>
  </ThemeProvider>
</AuthProvider> */}
        <AuthProvider>
  <ThemeProvider>
       <ThemeWrapper>
        <ProvidersProvider>
          <RouterProvider router={router}/>
       <ToastContainer position='top-right' autoClose={3000} closeButton={false} closeOnClick/>
        </ProvidersProvider>
    </ThemeWrapper>
  </ThemeProvider>
</AuthProvider>
        </div>
    );
}

export default App;

