import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  centerText,
  galleryInitialImgTransition,
  galleryInitialImgVisible,
  galleryInitialImgHidden,
  box,
} from "./home.module.css";

function GalleryHandler(albumName, images) {
  const extension = albumName.toLowerCase().replaceAll(" ", "_");
  const [isImageLoaded, setImageLoaded] = useState(false);

  function preventDragHandler(e) {
    e.preventDefault();
  }

  return (
    <div
      className={`${centerText} ${galleryInitialImgTransition} ${
        isImageLoaded ? galleryInitialImgVisible : galleryInitialImgHidden
      }`}
    >
      <Link to={`/${extension}`}>
        <div
          className={box}
          onContextMenu={preventDragHandler}
          onDragStart={preventDragHandler}
        >
          <img
            src={`/images/photography/${album}/${images[currentImage]}`}
            alt={props.album}
            onLoad={setImageLoaded(true)}
          />
        </div>
      </Link>
      {album}
    </div>
  );
}

export default GalleryHandler;
