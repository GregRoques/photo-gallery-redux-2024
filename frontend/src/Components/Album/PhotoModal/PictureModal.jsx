import React from "react";
import ImageLoader from "../../ImgLoader/ImgLoader"
import {
    photoModal,
    closePhotoModal,
    photoContent,
    imageGalleryButtons,
    imageGalleryButtonsHidden,
    sliderContainer,
    imageGalleryButtons,
    imageGalleryButtonsHidden
}
from "./modal.module.css";


function PicModal({
  state,
  clickL,
  clickR,
  pictureDisplayToggle,
  preventDragHandler,
}){
  const { modalShow, modalPhoto, images, albumTitle, albumLength } = state;
  return modalShow ? (
    <div className={photoModal}>
      <div
        className={closePhotoModal}
        onClick={() => pictureDisplayToggle()}
      >
        x
      </div>
      <div className={photoContent}>
        <div
          className={
            modalPhoto > 0
              ? imageGalleryButtons
              : imageGalleryButtonsHidden
          }
          onClick={() => clickL()}
        >{`<`}</div>
        <div
          className={sliderContainer}
          onContextMenu={preventDragHandler}
          onDragStart={preventDragHandler}
        >
          <ImageLoader
            alt={albumTitle + modalPhoto}
            src={`/images/photography/${albumTitle}/${images[modalPhoto]}`}
          />
        </div>
        <div
          className={
            modalPhoto < albumLength -1
              ? imageGalleryButtons
              : imageGalleryButtonsHidden
          }
          onClick={() => clickR()}
        >{`>`}</div>
      </div>
    </div>
  ) : null;
};
export default PicModal;