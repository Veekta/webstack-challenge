import getPhotoUrl from "get-photo-url";
import React, { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../dexie";
import Loading from "../components/LoadingState";

const Gallery = () => {
  // const [allPhotos, setAllPhotos] = useState([]);
  const allPhotos = useLiveQuery(() => db.gallery.reverse().toArray(), []);

  const [open, setOpen] = useState(false);

  const modalOpen = () => {
    setOpen(true);
  };

  const modalClose = () => {
    setOpen(false);
  };

  // const addPhoto = async () => {
  //   const newPhoto = {
  //     id: Date.now(),
  //     url: await getPhotoUrl("#addPhotoInput"),
  //   };
  //   setAllPhotos([newPhoto, ...allPhotos]);
  // };

  const addPhoto = async () => {
    db.gallery.add({
      url: await getPhotoUrl("#addPhotoInput"),
    });
  };
  const removePhoto = (id) => {
    db.gallery.delete(id);
  };
  const clearPhotos = (id) => {
    db.gallery.clear(id);
  };

  return (
    <>
      <input type="file" name="photo" id="addPhotoInput" />
      <label htmlFor="addPhotoInput" onClick={addPhoto}>
        <i className="add-photo-button fas fa-plus-square"></i>
      </label>

      <label htmlFor="clear">
        {open ? (
          <div className="modal">
            <div className="modal-delete">Delete Message</div>

            <div className="main">
              <p>Are you sure you want to clear all photos?</p>
            </div>
            <div className="clear-control">
              <button onClick={modalClose} className="close-button">
                Cancel
              </button>
              <button
                className="Yes"
                onClick={() => {
                  clearPhotos();
                  modalClose();
                }}
              >
                Yes Delete It!
              </button>
            </div>
          </div>
        ) : null}
        {allPhotos?.length > 0 ? (
          <div className="top-gallery">
            <p>Gallery</p>
            <i
              className="clear-button fas fa-times"
              onClick={() => modalOpen()}
            ></i>
          </div>
        ) : null}
      </label>

      <section className="gallery">
        {!allPhotos && <Loading />}
        {allPhotos?.length <= 0 ? <p>No Photo In Gallery</p> : null}
        {allPhotos?.map((photo) => (
          <div className="item" key={photo.id}>
            <img src={photo.url} className="item-image" alt="" />
            <button
              className="delete-button"
              onClick={() => removePhoto(photo.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default Gallery;
