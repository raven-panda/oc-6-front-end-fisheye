import LightboxModalUtils from "./lightboxModal.js";
import UrlUtils from "./urlUtils.js";

export default function AlbumPhotographUtils() {
  const albumPhotograph = document.querySelector(".photograph-album-content");
  const lightboxModalUtils = LightboxModalUtils();
  const urlUtils = UrlUtils();
  let photographersMedias;

  function createEvents(_photographersMedias) {
    photographersMedias = _photographersMedias;
    
    const clickableAlbumItems = albumPhotograph.querySelectorAll(".photograph-album-item a");
    clickableAlbumItems.forEach(link => {
      link.addEventListener("click", selectAlbumtItemEvent);
      link.addEventListener("keydown", selectAlbumtItemEvent);
    });
  }

  function selectAlbumtItemEvent(e) {       
    if (e.code && (e.code !== "Space" && e.code !== "Enter")) return;
      
    e.preventDefault();

    const mediaId = e.currentTarget?.parentNode?.dataset?.mediaId;
    let media = photographersMedias.find(media => mediaId && media.id === parseInt(mediaId));
    
    if (!mediaId || !media)
      return;

    urlUtils.setParam("mediaId", mediaId); // find a way to use this instead of dataset
    const photographerId = urlUtils.getParam("photographerId");

    lightboxModalUtils.displayData();
  }

  return { createEvents }
}