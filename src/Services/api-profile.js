import { apiClient } from "./api-client"



export async function getFreelancerProfile(userId) {
  try {
    const { data } = await apiClient.get(
      `/api/ServiceProvider/freelancer-profile/${userId}`
    );

    return data.data; //  
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error;
  }
} 
 export async function updateBasicInfo(values) {
  try {
     

    const optain = {
      method: "PUT",
      url: `/api/ServiceProvider/update-basic-info`,
      data: {
        bio: values.bio,
        experienceYears: Number(values.experienceYears),
        facebookUrl: values.facebookUrl || null,
        githubUrl: values.githubUrl || null,
        hourlyRate: Number(values.hourlyRate),
        jobTitle: values.jobTitle,
        linkedInUrl: values.linkedInUrl || null,
        twitterUrl: values.twitterUrl || null,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 👈 هنا التوكن
      },
    };

    console.log("DATA SENT:", optain.data);
    console.log("DATA SENT:", values);

    const { data } = await apiClient.request(optain);
    return data;

  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
}
export async function updateSkills(data = {}) {
  const { skills = [] } = data;

  const res = await apiClient.put(
    "/api/ServiceProvider/update-skills",
    {
      skills
    }
  );

  return res.data;
}
export async function sendDataToEducation(payload) {
  try {
    console.log("FINAL PAYLOAD:", payload);

    const response = await apiClient.post(
      "/api/ServiceProvider/add-education",
      payload
    );

    return response.data;

  } catch (error) {
    console.log(error.response?.data);
    throw error;
  }
}
 


