import React, { useState } from "react";
import logoPhoto from "../../assets/Images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import EditCover from "../ModalPage/EditCover";
import DeletCover from "../ModalPage/DeletCover";

 

export default function CoverProfile() {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="relative">
        {/* <img src={logoPhoto} className=" size-fit object-cover" /> */}

        {/* delete */}
        <button
          onClick={() => setShowDelete(true)}
          className="absolute top-3 left-4 text-white"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>

        {/* edit */}
        <button
          onClick={() => setShowEdit(true)}
          className="absolute top-3 right-4 text-white"
        >
          <FontAwesomeIcon icon={faPen} />
        </button>
      </div>

      {/* Modals */}
      {showEdit && <EditCover setShowEdit={setShowEdit} />}
      {showDelete && <DeletCover setShowDelete={setShowDelete} />}
    </>
  );
}