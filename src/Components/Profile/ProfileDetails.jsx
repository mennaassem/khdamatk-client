import { useEffect, useState } from "react";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFreelancerProfile } from "../../Services/api-profile";
import { useParams } from "react-router-dom";
import ProfileDetailsSkeleton from "../Skeleton/ProfileDetailsSkeleton";
 

export default function ProfileDetails() {
  // const { userId } = useParams();
  const [profile, setProfile] = useState(null);
const [loading, setIsLoading] = useState(true);
 

 
const { userId } = useParams();

async function fetchDataToProfileDetails() {
  try {
    setIsLoading(true);

    const result = await getFreelancerProfile(userId);
    setProfile(result);

  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
}

useEffect(() => {
  fetchDataToProfileDetails();
}, []);
 
 if (loading || !profile) {
  return <ProfileDetailsSkeleton />;
}


  return (
    <div className="pt-14">
      
      {/* Name */}
      <h2 className="text-xl font-semibold">
        {profile.fullName}
      </h2>

      {/* Job Title */}
      <p className="text-gray-600 text-sm mt-1">
        {profile.jobTitle}
      </p>

      {/* Rating + Hourly Rate */}
      <div className="flex items-center gap-3 text-sm mt-2">

        {/* Stars */}
        <div className="flex items-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon key={i} icon={faStar} />
          ))}
          <span className="text-gray-600 ml-1">
            ({profile.rating})
          </span>
        </div>

        {/* Hourly Rate */}
        <span className="font-semibold text-black">
          ${profile.hourlyRate}/hr
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
        <FontAwesomeIcon icon={faLocationDot} />
        <span>{profile.location}</span>
      </div>

      {/* Member since */}
      <p className="text-xs text-gray-400 mt-1">
        Member since {profile.memberSince}
      </p>

      {/* Bio */}
      <p className="text-sm text-gray-700 mt-3">
        {profile.bio}
      </p>
      {/* Social Media */}
 <div className="flex gap-3 mt-4">
{/* 
  <a href={profile.facebookUrl} target="_blank" className="text-blue-600">
    Facebook
  </a>

  <a href={profile.githubUrl} target="_blank" className="text-gray-800">
    GitHub
  </a>

  <a href={profile.linkedInUrl} target="_blank" className="text-blue-700">
    LinkedIn
  </a> */}

</div>
  

 

    </div>
  );
}