import { apiClient } from "./api-client";

/**
 * Submit a verification request with ID images and personal info.
 * @param {FormData} formData - FormData containing NationalNumber, Country, City, IdFront, IdBack, SelfieWithId
 * @returns {Promise<any>}
 */
export async function submitVerificationRequest(formData) {
  try {
    const response = await apiClient.post(
      "/api/Verification/submit-request",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("Verification Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get the current verification status for the logged-in user.
 * @returns {Promise<any>}
 */
export async function getVerificationStatus() {
  try {
    const response = await apiClient.get("/api/Verification/status");
    return response.data;
  } catch (error) {
    console.log("Get Verification Status Error:", error.response?.data || error.message);
    throw error;
  }
}