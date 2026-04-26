 
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
import { updateSkills } from "../../Services/api-profile";

export default function SkillsModification({
  closeModal,
  setSkills,
  initialSkills
}) {

  const [input, setInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  // 👇 لما المودال يفتح خد الداتا الحالية
  useEffect(() => {
    setSelectedSkills(initialSkills || []);
  }, [initialSkills]);

  // ➕ add skill
  const addSkill = () => {
    if (!input.trim()) return;

    setSelectedSkills(prev => [
      ...prev,
      { id: Date.now(), name: input }
    ]);

    setInput("");
  };

  // ❌ remove skill
  const removeSkill = (id) => {
    setSelectedSkills(prev =>
      prev.filter(s => s.id !== id)
    );
  };

  // 💾 save
  const handleSave = async () => {

    const skillNames = selectedSkills.map(s => s.name);

    await updateSkills({
      skills: skillNames
    });

    setSkills(selectedSkills); // 👈 يرجع للصفحة الرئيسية

    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-5 w-[500px] rounded">

        <h2 className="font-bold mb-4">Skills Modification</h2>

        {/* INPUT */}
        <div className="flex gap-2 mb-4">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border p-2 flex-1"
            placeholder="Add skill"
          />

          <button
            onClick={addSkill}
            className="bg-blue-500 text-white px-3"
          >
            Add
          </button>

        </div>

        {/* SKILLS */}
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
            className="px-3 py-1 bg-green-500 text-white"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}