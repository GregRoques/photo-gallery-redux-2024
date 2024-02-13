import React, { useState} from "react";
import {
  imgLoaderTransition,
  imgLoaderVisible,
  imgLoaderHidden
} from "./ImgLoader.module.css";

const ImageLoader = (
  src,
  alt,
  title = "",
  id = "",
  className = "",
  onClick = ""
) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  preventImageTheft = (e) => {
    e.preventDefault();
  };

  return (
    <img
      src={src}
      alt={alt}
      title={title}
      id={id}
      onClick={onClick ? onClick : () => void 0}
      className={`${imgLoaderTransition} ${className} ${
        imageLoaded
          ? imgLoaderVisible
          : imgLoaderHidden
      } }`}
      onDragStart={(e) => this.preventImageTheft(e)}
      onContextMenu={(e) => this.preventImageTheft(e)}
      onLoad={() => setImageLoaded(true)}
    />
  );
};

export default ImageLoader;
