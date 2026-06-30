import { apiClient } from "./api-client";
import { jwtDecode } from "jwt-decode";

/**
 * Get the current user's wallet balance and summary.
 * @returns {Promise<any>}
 */
export async function getWalletBalance() {
  try {
    const response = await apiClient.get("/api/Payment/GetWalletBalance");
    return response.data;
  } catch (error) {
    console.log("Get Wallet Balance Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get wallet transaction history with optional filters.
 * @param {object} params - Query params: page, pageSize, type, status, startDate, endDate, search, sortBy
 * @returns {Promise<any>}
 */
export async function getWalletTransactions(params = {}) {
  try {
    const response = await apiClient.get("/api/Payment/GetTransactions", { params });
    return response.data;
  } catch (error) {
    console.log("Get Transactions Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Top up wallet by paying an amount.
 * POST /api/Payment/PayToWallet
 * @param {number} amount
 * @returns {Promise<any>}
 */
export async function topUpWallet(amount) {
  try {
    const token = localStorage.getItem("token");
    const user = token ? jwtDecode(token) : null;
    const userId = user?.UserId || "";

    const response = await apiClient.post("/api/Payment/PayToWallet", {
      amount: Number(amount),
      userId,
    });
    return response.data;
  } catch (error) {
    console.log("Top Up Wallet Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Request a withdrawal from wallet.
 * @param {number} amount
 * @returns {Promise<any>}
 */
export async function withdrawFromWallet(amount) {
  try {
    const response = await apiClient.post("/api/Payment/WithdrawFromWallet", {
      amount: Number(amount),
    });
    return response.data;
  } catch (error) {
    console.log("Withdraw Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Pay a freelancer from wallet.
 * @param {string} freelancerId
 * @param {number} amount
 * @param {string} notes
 * @returns {Promise<any>}
 */
export async function payFreelancer(freelancerId, amount, notes = "") {
  try {
    const response = await apiClient.post("/api/Payment/PayFreelancer", {
      freelancerId,
      amount: Number(amount),
      notes,
    });
    return response.data;
  } catch (error) {
    console.log("Pay Freelancer Error:", error.response?.data || error.message);
    throw error;
  }
}

/**
 * Get list of freelancers to pay.
 * @returns {Promise<any>}
 */
export async function getFreelancersForPayment() {
  try {
    const response = await apiClient.get("/api/ServiceProvider/Freelancers");
    return response.data;
  } catch (error) {
    console.log("Get Freelancers Error:", error.response?.data || error.message);
    throw error;
  }
}