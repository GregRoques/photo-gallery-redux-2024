import React, { useState, useEffect, useRef } from "react";
import { grAPI } from "../../assets/BackendAPI";
import GalleryHandler from "./GalleryHandler";
import { fadeIn, photoHeader, errorText, loader } from "./home.module.css";

function Home() {
  // ====================== set State
  const [albums, setAlbums] = useState([]);
  const [albumLength, setAlbumLength] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // for Intersection Obeserver
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
  getPhotos(0);

  // ====================== Functions

  // API Call
  async function getPhotos(start) {
    if (albums.length === albumLength) return;
    setIsLoading(true);
    const url = `${grAPI}/backendPhotos`;

    const params = {
      lengthStart: start,
      album: "ALL",
    };

    try {
      const res = await fetch(url, params);
      const data = await res.json();
      setAlbums([...albums, ...data.albums]);
      setAlbumLength(data.albumLength || albumLength);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  // Error Body

  function ErrorBody() {
    return (
      <div className={fadeIn}>
        <div className={photoHeader}>Error</div>
        <div className={errorText}>
          Sorry, we cannot load this content right now. Please try again later.
        </div>
      </div>
    );
  }

  // Loading Body

  function LoadingBody() {
    return (
      <img className={loader} src="/images/loadingImage.gif" alt="loading" />
    );
  }

  // Main Body

  function MainBody() {
    if (albums.length < 1) return;
    albums.map((album, i) => {
      const { title, images } = album;
      return <GalleryHandler key={i} albumName={title} images={images} />;
    });
  }

  // ====================== Render
  return (
    <div className={fadeIn}>
      {!isError && <MainBody />}
      {isLoading && !isError && <LoadingBody />}
      {!isError && <div ref={ref}></div>}
      {isError && <ErrorBody />}
    </div>
  );
}

export default Home;
