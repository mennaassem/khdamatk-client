 
// import { faXmark } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// export default function SkillsModification({ closeModal }) {

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center z-50 justify-center">

//       <div className='bg-white shadow p-5 w-[500px] flex flex-col rounded'>

//         <h2 className='font-semibold text-lg mb-4'>
//           Skills Modification
//         </h2>

//         <div className='space-y-4'>

//           <p className='font-semibold text-sm'>Skills</p>

//           <div>
//             <p className='text-sm bg-gray-100 w-fit p-2 rounded flex items-center gap-2 mb-2'>
//               <span>Skills</span>
//               <FontAwesomeIcon className="cursor-pointer" icon={faXmark} />
//             </p>
//           </div>

//           <p className='border-t pt-2 text-sm text-gray-600'>
//             Note that any manipulation of the skills field will be saved automatically
//           </p>

//         </div>

//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={closeModal}
//             className='btn w-fit text-white'
//           >
//             Close
//           </button>
//         </div>

//       </div>

//     </div>
//   )
// }
  import { useState, useEffect } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFreelancerProfile, updateSkills } from "../../Services/api-profile";
import { useParams } from "react-router-dom";

export default function SkillsModification({
  closeModal,
  setSkills,
  initialSkills
}) {
  const { userId } = useParams();

  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // تحميل skills الحالية
  useEffect(() => {
    setSelectedSkills(initialSkills || []);
  }, [initialSkills]);

  // تحميل كل skills من السيرفر
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch("https://localhost:7210/api/skills");
        const data = await res.json();
        setAllSkills(data || []);
      } catch (err) {
        console.error(err);
      }
    }

    fetchSkills();
  }, []);

  // إضافة skill
  const handleSelect = (e) => {
    const id = Number(e.target.value);
    const skill = allSkills.find(s => s.id === id);

    if (!skill) return;

    if (selectedSkills.some(s => s.id === skill.id)) return;

    setSelectedSkills(prev => [...prev, skill]);
  };

  // حذف skill
  const removeSkill = (id) => {
    setSelectedSkills(prev => prev.filter(s => s.id !== id));
  };

  // حفظ
  const handleSave = async () => {
    try {
      const skillIds = selectedSkills.map(s => s.id);

      await updateSkills({ skillIds });

      const updated = await getFreelancerProfile(userId);
      setSkills(updated.skills || []);

      closeModal();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">

      <div className="bg-white p-5 w-[500px] rounded">

        <h2 className="font-bold mb-4">Skills Modification</h2>

        {/* SELECT SKILL */}
        <select
          onChange={handleSelect}
          className="border p-2 w-full mb-4"
        >
          <option value="">Select skill</option>

          {allSkills.map(skill => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>

        {/* SELECTED SKILLS */}
        <div className="flex flex-wrap gap-2 mb-4">

          {selectedSkills.map(skill => (
            <span
              key={skill.id}
              className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
            >
              {skill.name}

              <FontAwesomeIcon
                icon={faXmark}
                className="cursor-pointer text-red-500"
                onClick={() => removeSkill(skill.id)}
              />
            </span>
          ))}

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2">

          <button
            onClick={closeModal}
            className="px-3 py-1 bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-3 py-1 bg-purple-600 text-white"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}