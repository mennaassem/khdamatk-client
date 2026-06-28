import React, { useState } from "react";
import axios from "axios";

export default function PostJop() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
    budgetMin: "",
    budgetMax: "",
    timeCommitment: "",
    experienceLevel: "",
    deadline: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      setError("Title & Category are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const encodedParams = new URLSearchParams();

      encodedParams.set("UserId", userId || "");
      encodedParams.set("Title", formData.title);
      encodedParams.set("CategoryName", formData.category);
      encodedParams.set("Description", formData.description);

      // Skills array
      if (formData.skills) {
        formData.skills
          .split(",")
          .map((s) => s.trim())
          .forEach((skill) => {
            encodedParams.append("Skills", skill);
          });
      }

      encodedParams.set("BudgetMin", formData.budgetMin || "0");
      encodedParams.set("BudgetMax", formData.budgetMax || "0");
      encodedParams.set("TimeCommitment", formData.timeCommitment);
      encodedParams.set("ExperienceLevel", formData.experienceLevel);

      // Deadline ISO format
      if (formData.deadline) {
        encodedParams.set(
          "Deadline",
          new Date(formData.deadline).toISOString()
        );
      }

      const response = await axios.post(
        "http://localhost:7210/api/JobOrder/Jobs",
        encodedParams,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      alert("Job Posted Successfully 🎉");

      // reset form
      setFormData({
        title: "",
        category: "",
        description: "",
        skills: "",
        budgetMin: "",
        budgetMax: "",
        timeCommitment: "",
        experienceLevel: "",
        deadline: "",
      });
    } catch (error) {
      console.log("ERROR:", error.response?.data || error.message);
      setError(error.response?.data || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="bg-purple-900 text-white text-center p-20 text-3xl font-medium">
        <p className="mt-5">
          Post your jobs for free to receive professional proposals Now!
        </p>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto -mt-10 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-lg shadow-md"
        >
          <h2 className="text-2xl font-bold mb-8">Post Your Job</h2>

          {error && (
            <p className="text-red-500 mb-5 font-medium">{error}</p>
          )}

          {/* Title + Category */}
          <div className="grid md:grid-cols-2 gap-10 mb-6">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job Title"
              className="border-b p-3 outline-none"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="border-b p-3 outline-none"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full bg-gray-100 p-5 rounded mb-6"
            rows="5"
          />

          {/* Skills */}
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (React, Node, JS)"
            className="w-full border-b p-3 mb-6 outline-none"
          />

          {/* Budget */}
          <div className="grid md:grid-cols-2 gap-10 mb-6">
            <input
              name="budgetMin"
              value={formData.budgetMin}
              onChange={handleChange}
              placeholder="Budget Min"
              type="number"
              className="border-b p-3 outline-none"
            />

            <input
              name="budgetMax"
              value={formData.budgetMax}
              onChange={handleChange}
              placeholder="Budget Max"
              type="number"
              className="border-b p-3 outline-none"
            />
          </div>

          {/* Experience + Time */}
          <div className="grid md:grid-cols-2 gap-10 mb-6">
            <input
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              placeholder="Experience Level"
              className="border-b p-3 outline-none"
            />

            <input
              name="timeCommitment"
              value={formData.timeCommitment}
              onChange={handleChange}
              placeholder="Time Commitment"
              className="border-b p-3 outline-none"
            />
          </div>

          {/* Deadline */}
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="border-b p-3 mb-8 outline-none w-full"
          />

          {/* Button */}
          <button
            disabled={loading}
            className="bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold"
          >
            {loading ? "Posting..." : "Post Job"}
          </button>
        </form>
      </div>
    </div>
  );
}