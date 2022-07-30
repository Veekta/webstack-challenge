Kuimport React, { useState } from "react";
import ProfileIcon from "../assets/profileIcon.svg";
import getPhotoUrl from "get-photo-url";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";
import { useEffect } from "react";

const Bio = () => {
  // const [userDetails, setUserDetails] = useState({
  //   name: "Victor Sunday",
  //   about:
  //     "Building SchoolKode. -Manage and store your school daily acivities Building SchoolKode. -Manage and store your school daily acivities",
  // });

  const [editFormIsOpen, setEditFormIsOpen] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(ProfileIcon);

  const userDetails = useLiveQuery(() => db.bio.get[]);
  const updateUserDetails = async (event) => {
    event.preventDefault();
    const objectData = {
      name: document.querySelector("#nameOfUser").value,
      about: document.querySelector("#aboutUser").value,
    };
    await db.bio.put(objectData, "info");
    setEditFormIsOpen(false);
  };

  const updateProfilePhoto = async () => {
    const newProfilePhoto = await getPhotoUrl("#profilePhotoInput");
    setProfilePhoto(newProfilePhoto);
    await db.bio.put(newProfilePhoto, "profilePhoto");
  };

  const editButton = (
    <button onClick={() => setEditFormIsOpen(true)}>Edit</button>
  );
  useEffect(() => {
    const setDataFromDb = async () => {
      // const userDetailsFromDb = await db.bio.get("info");
      // userDetailsFromDb && setUserDetails(userDetailsFromDb);
      const profilePhotoFromDb = await db.bio.get("profilePhoto");
      profilePhotoFromDb && setProfilePhoto(profilePhotoFromDb);
    };
    setDataFromDb();
  }, []);

  const editForm = (
    <form className="edit-bio-form" onSubmit={(e) => updateUserDetails(e)}>
      <input
        type="text"
        id="nameOfUser"
        name="nameOfUser"
        defaultValue={userDetails?.name}
        placeholder="Your Name"
      />
      <input
        type="text"
        id="aboutUser"
        name="aboutUser"
        defaultValue={userDetails?.about}
        placeholder="About You"
      />
      <br />
      <div className="button-hold">
        <button
          type="button"
          className="cancel-button"
          onClick={() => setEditFormIsOpen(false)}
        >
          Cancel
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  );

  return (
    <section className="bio">
      <input type="file" accept="image/*" name="photo" id="profilePhotoInput" />
      <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div className="profile-photo" role="button" title="Click to edit">
          <img src={profilePhoto} alt="profile" />
        </div>
      </label>
      {userDetails?.map((detail) => (
        <div className="profile-info" key={detail.id}>
          <p className="name">{detail?.name}</p>
          <p className="about">{detail?.about}</>
        {editFormIsOpen ? editForm : editButton}
     
        </div>
      ))}
  
    </section>
  );
};

export default Bio;
