import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFreelancerProfile } from "../../Services/api-profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEducational from "../ModalPage/AddEducational";

export default function EducationSection() {
  const { userId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [educationList, setEducationList] = useState([]);

  // 🔥 fetch data
const fetchData = async () => {
  try {
    const profile = await getFreelancerProfile(userId);

    console.log("PROFILE FULL:", profile);

    setEducationList(profile?.education || []);
    
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchData();
  }, [userId]);

  // 🔥 refresh after add
const handleAddEducation = (newList) => {
  setEducationList(newList);
};

  return (
    <>
      <div className="border-t p-4 space-y-2">

        <h1 className="flex items-center justify-between">
          <span className="font-bold">Educational</span>

          <button
            className="btn w-fit bg-purple-200"
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon className="text-purple-600" icon={faPlus} />
          </button>
        </h1>

        {educationList.map((item, index) => (
          <div key={index} className="flex items-center gap-10">

            <FontAwesomeIcon className="text-2xl" icon={faGraduationCap} />

            <div className="space-y-1">

              {/* 🔥 IMPORTANT: names from backend */}
              <p>{item.institutionName}</p>
              <p>{item.specialty}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
              <p className="text-sm">{item.dateRange}</p>

            </div>

          </div>
        ))}

      </div>

      {isModalOpen && (
        <AddEducational
          closeModal={() => setIsModalOpen(false)}
          onAdd={handleAddEducation}
        />
      )}
    </>
  );
}