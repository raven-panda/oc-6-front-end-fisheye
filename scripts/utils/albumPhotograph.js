import { albumPhotographTemplate } from "../templates/albumPhotograph.js";
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

      const video = link.querySelector("video");
      if (video) {
        video.addEventListener('mouseenter', () => {
          video.play();
        });
        video.addEventListener('mouseleave', () => {
          video.pause();
          video.currentTime = 0;
        });

        link.addEventListener('focus', () => {
          video.play();
        });
        link.addEventListener('blur', () => {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
    lightboxModalUtils.createEvents();
  }

  const selectAlbumtItemEvent = (e) => {       
    if (e.code && (e.code !== "Space" && e.code !== "Enter")) return;
      
    e.preventDefault();

    const mediaId = e.currentTarget?.parentNode?.dataset?.mediaId;
    let media = photographersMedias.find(media => mediaId && media.id === parseInt(mediaId));
    
    if (!mediaId || !media)
      return;

    urlUtils.setParam("mediaId", mediaId); // find a way to use this instead of dataset

    lightboxModalUtils.displayData(photographersMedias, media);
  }

  function updateAlbum(filter) {
    if (!photographersMedias) return;
    
    const albumPhotograph = document.querySelector(".photograph-album-content");
    switch (filter) {
      case "popular":
        photographersMedias.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        photographersMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title":
        photographersMedias.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
        break;
      default:
        photographersMedias.sort((a, b) => b.likes - a.likes);
        break;
    }

    albumPhotograph.innerHTML = "";
    photographersMedias.forEach(media => {
      const albumPhotographModel = albumPhotographTemplate(media);
      const albumItemDOM = albumPhotographModel.getAlbumItemDOM();

      albumItemDOM.displayData(albumPhotograph);
    })
    createEvents(photographersMedias);
  }

  return { createEvents, updateAlbum }
}