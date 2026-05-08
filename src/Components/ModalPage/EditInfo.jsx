 
import React, { useState, useEffect } from "react";
 
import { toast } from 'react-toastify'
import * as yup from "yup"
import { useFormik } from 'formik';
import { updateBasicInfo } from "../../Services/api-profile";
 

export default function EditInfo({ onClose , refetch  }) {
  const validationSchema =  yup.object({
  jobTitle: yup
    .string()
    .required("Job title is required"),

  bio: yup
    .string()
    .required("Bio is required")
    .min(10, "Bio must be at least 10 characters"),

  hourlyRate: yup
    .number()
    .typeError("Hourly rate must be a number")
    .required("Hourly rate is required")
    .min(1, "Hourly rate must be greater than 0"),

  experienceYears: yup
    .number()
    .typeError("Experience must be a number")
    .required("Experience years is required")
    .min(0, "Experience cannot be negative"),

  // facebookUrl: yup
  //   .string()
  //   .url("Invalid Facebook URL")
  //   .nullable(),

  // linkedInUrl: yup
  //   .string()
  //   .url("Invalid LinkedIn URL")
  //   .nullable(),

  // githubUrl: yup
  //   .string()
  //   .url("Invalid GitHub URL")
  //   .nullable(),

  // twitterUrl: yup
  //   .string()
  //   .url("Invalid Twitter URL")
  //   .nullable(),
  facebookUrl: yup
  .string()
  .url("Invalid Facebook URL")
  .nullable()
  .transform(value => value === "" ? null : value),

linkedInUrl: yup
  .string()
  .url("Invalid LinkedIn URL")
  .nullable()
  .transform(value => value === "" ? null : value),

githubUrl: yup
  .string()
  .url("Invalid GitHub URL")
  .nullable()
  .transform(value => value === "" ? null : value),

twitterUrl: yup
  .string()
  .url("Invalid Twitter URL")
  .nullable()
  .transform(value => value === "" ? null : value),


  
});


 
async function hanselEditInfo(values) {
  try {
    const res = await updateBasicInfo(values);

    toast.success("Profile updated successfully 🎉");

    refetch?.();  

    onClose();      
  } catch (error) {
    console.log(error);
    toast.error("Update failed ❌");
  }
}
const formik = useFormik({
  initialValues: {
    jobTitle: "",
    bio: "",
    hourlyRate: "",
    experienceYears: "",
    facebookUrl: "",
    linkedInUrl: "",
    githubUrl: "",
    twitterUrl: "",
  },
  validationSchema,
  onSubmit: hanselEditInfo,
});

 

  return (
     <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-3xl bg-gray-100 h-full overflow-y-auto p-8">

        <h2 className="text-3xl font-semibold mb-6">Edit</h2>

        <form onSubmit={formik.handleSubmit}>
          

          {/* Job Title */}
          <div className="mb-6">
            <label className="text-sm">Job Title *</label>
            <input
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              className="w-full bg-transparent border-b border-black outline-none text-2xl py-2"
            />
            {formik.errors.jobTitle && (
              <p className="text-red-500 text-sm">{formik.errors.jobTitle}</p>
            )}
          </div>

          {/* Bio */}
          <div className="mb-6 bg-gray-200 p-4">
            <label className="text-sm block mb-2">About</label>
            <textarea
              name="bio"
              rows={5}
              value={formik.values.bio}
              onChange={formik.handleChange}
              className="w-full bg-transparent outline-none resize-none"
            />
            {formik.errors.bio && (
              <p className="text-red-500 text-sm">{formik.errors.bio}</p>
            )}
          </div>

          {/* Row */}
          <div className="grid grid-cols-3 gap-6 mb-6">

            <div>
              <label className="text-sm">Hourly Rate *</label>
              <input
                name="hourlyRate"
                value={formik.values.hourlyRate}
                onChange={formik.handleChange}
                className="w-full bg-transparent border-b border-black outline-none py-1"
              />
              {formik.errors.hourlyRate && (
                <p className="text-red-500 text-sm">{formik.errors.hourlyRate}</p>
              )}
            </div>

            <div>
              <label className="text-sm">Years of Experience *</label>
              <input
                name="experienceYears"
                value={formik.values.experienceYears}
                onChange={formik.handleChange}
                className="w-full bg-transparent border-b border-black outline-none py-1"
              />
              {formik.errors.experienceYears && (
                <p className="text-red-500 text-sm">{formik.errors.experienceYears}</p>
              )}
            </div>

          </div>

          {/* Social */}
          <h3 className="text-2xl font-semibold mb-4">Social Media</h3>

 <div className="grid grid-cols-2 gap-6 mb-10">
       {/* Facebook */}
<div>
   
  <input
    name="facebookUrl"
    placeholder="https://facebook.com/username"
    value={formik.values.facebookUrl}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-black outline-none py-1"
  />
  {formik.touched.facebookUrl && formik.errors.facebookUrl && (
    <p className="text-red-500 text-sm">{formik.errors.facebookUrl}</p>
  )}
   
</div>

{/* GitHub */}
<div>
  
  <input
    name="githubUrl"
    placeholder="https://github.com/username"
    value={formik.values.githubUrl}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-black outline-none py-1"
  />
  {formik.touched.githubUrl && formik.errors.githubUrl && (
    <p className="text-red-500 text-sm">{formik.errors.githubUrl}</p>
  )}
</div>

{/* LinkedIn */}
<div>
    
  <input
    name="linkedInUrl"
    placeholder="https://linkedin.com/in/username"
    value={formik.values.linkedInUrl}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-black outline-none py-1"
  />
  {formik.touched.linkedInUrl && formik.errors.linkedInUrl && (
    <p className="text-red-500 text-sm">{formik.errors.linkedInUrl}</p>
  )}
</div>

{/* Twitter */}
<div>
  
  <input
    name="twitterUrl"
    placeholder="https://twitter.com/username"
    value={formik.values.twitterUrl}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    className="w-full bg-transparent border-b border-black outline-none py-1"
  />
  {formik.touched.twitterUrl && formik.errors.twitterUrl && (
    <p className="text-red-500 text-sm">{formik.errors.twitterUrl}</p>
  )}
</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-6 text-xl">
            <button
              type="submit"
              className="font-medium text-green-600 hover:underline"
            >
              Save
            </button>

            <button
              type="button"
              onClick={onClose}
              className="font-medium"
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}