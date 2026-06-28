import axios from "axios"
import { API_CONFIG } from "../Config"
import { apiClient } from "./api-client"

  export async function sendDataToLogin(values){
    try {
        const optain={
                method:"POST",
                url:`/Auth`,
                data:{
                    email:values.email,
                    password:values.password
                }
            }
            const {data}= await apiClient.request(optain)
            console.log(data)
            return data
        
    } catch (error) {
        throw error
        
    }
}

 export async function sendDataToSignup(values){
    try {
        const optain={
                method:"POST",
                url:`/Auth/Register`,
                data:{
                      userName: values.userName,
                email: values.email,
                password: values.password,
                phoneNumber: values.phoneNumber,
                bio: values.bio,
                jobTitle: values.jobTitle,
                isServiceProvider: values.isServiceProvider
                }
            }
            const {data}= await apiClient.request(optain)
            return data
        
    } catch (error) {
        throw error
        
    }
}
 export async function sendDataToConfirmEmail(values){
    try {
       const option = {
         method: "POST",
         url: "/Auth/resend-confirmation-email",
         data: {
           email: values.email,
         },
       }
   
       const { data } = await apiClient.request(option)
       console.log(data)
       return data
   
     } catch (error) {
       throw error
     }
}
export async function confirmEmail(token) {
  try {
    const { data } = await apiClient.get(`/Auth/Confirm?token=${token}`);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendDataToForgetEmail(values){
  try {
     const option = {
       method: "POST",
       url: "/Auth/forget-password",
       params: { email: values.email },
     }

     const { data } = await apiClient.request(option)
     console.log(data)
     return data

   } catch (error) {
     throw error
   }
}
 
export async function sendDataToVerifyCode(values) {
  try {
    const option = {
      method: "POST",
      url: "/Auth/verify-code",
      data: values,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await apiClient.request(option);
    return data;

  } catch (error) {
    // ما نستخدمش setIsExistError هنا
    // نخلي الكومبوننت هو اللي يتعامل مع الخطأ
    throw error;
  }
}
export async function setNewPassword(values) {
  try {
    const options = {
      method: "POST",
      url: "/Auth/set-password",
      data:{
        email:  localStorage.getItem("email") || '',
        currentPassword: localStorage.getItem("password") || '',
        newPassword: ''
      }
    };

    const { data } = await apiClient.request(options);
    return data;

  } catch (error) {
    throw error.response?.data || error;
  }
}
 

export async function getAllProviders(type = "", value = "") {
  try {
    const option = {
      method: "GET",
      url: "/api/ServiceProvider/Freelancers",  
       params: {
          Type: type,
          Value: value,
        },
    };

    const { data } = await apiClient.request(option);
    return data;

  } catch (error) {
    throw error;
  }
}