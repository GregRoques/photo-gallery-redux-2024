import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import { grAPI } from "../../assets/BackendAPI";
import PicModal from "./PhotoModal/PictureModal";
import ImageLoader from "../ImgLoader/ImgLoader";
import {
  fadeIn,
  photoHeader2,
  photoGalleryContainer,
  photoGrid,
  photoBox
} from "./photography.module.css";

function Pictures() {
  // ====================== set State
  const [modalShow, setModalShow] = useState(false);
  const [modalPhoto, setModalPhoto] = useState(null);
  const [images, setImages] = useState([]);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumLength, setAlbumLength] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ====================== for Intersection Obeserver/ Use Effect Hook
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        getPhotos(albumLength);
      },
      { rootMargin: "-300px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  });

  // ====================== Initiate

  window.scrollTo(0, 0);
  const currentPathname = window.location.pathname
    .split("/photography/")
    .pop()
    .replace(/["_"]/g, " ");
  getPhotos(0, currentPathname);

  // ====================== Functions

  // API Call
  async function getPhotos(start, albumName) {
    if (images.length === albumLength) return;
    setIsLoading(true);
    const url = `${grAPI}/backendPhotos`;

    const params = {
      lengthStart: start,
      album: albumName,
    };

    try {
      const res = await fetch(url, params);
      const data = await res.json();
      setImages([...images, ...data.images]);
      setAlbumLength(data.albumLength || albumLength);
      setAlbumTitle(data.title);
    } catch (error) {
      isRedirected();
    } finally {
      setIsLoading(false);
      if (modalShow) {
        setModalPhoto(modalPhoto + 1);
      }
    }
  }
  function isRedirected() {
    setRedirect(true);
  }

  function pictureDisplayToggle(currentPhoto = null) {
    setModalShow(!modalShow);
    setModalPhoto(currentPhoto);
  }

  function clickL() {
    let index = modalPhoto;
    if (index === 0) return;
    setModalPhoto(index--);
  }

  function clickR() {
    let index = modalPhoto;
    const currLength = images.length - 1;
    if (index < currLength) {
      return setModalPhoto(index++);
    }
    if (index === currLength && albumLength - 1 > currLength) {
      return getPhotos(images.length, albumTitle.toLowerCase());
    }
  }

  function PicsBody() {
    return (
      <div className={fadeIn}>
        <PicModal
          state={{ modalPhoto, modalShow, images, albumTitle, albumLength }}
          clickL={clickL}
          clickR={clickR}
          pictureDisplayToggle={pictureDisplayToggle}
        />
        <h1 className={photoHeader2}>{albumTitle}</h1>
        <div className={photoGalleryContainer}>
          <div className={photoGrid}>
            {images.map((image, i) => {
              return (
                <div key={i} className={photoBox}>
                  <ImageLoader
                    onClick={() => pictureDisplayToggle(i)}
                    alt={albumTitle + i}
                    src={`/images/photography/${albumTitle}/${image}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return redirect ? (
    <Redirect push to={`/`} />
  ) : (
    <div>
      <PicsBody />
      {isLoading && <LoadingBody />}
      <div ref={ref}></div>
    </div>
  );
}
export default Pictures;
