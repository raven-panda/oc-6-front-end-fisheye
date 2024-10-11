import { mediaTemplate } from "../templates/media.js";
import UrlUtils from "./urlUtils.js";

export default function LightboxModalUtils() {
  const urlUtils = UrlUtils();
  const lightboxModal = document.querySelector("#lightbox_modal");
  const bodyContainer = document.querySelector("body");
  const closeModalButton = lightboxModal.querySelector("#lightbox_modal-close-btn");
  const mediaNavPreviousButton = lightboxModal.querySelector(".picture-nav.previous-picture");
  const mediaNavNextButton = lightboxModal.querySelector(".picture-nav.next-picture");
  const mediaContainer = lightboxModal.querySelector("#lightbox_modal-media");
  const mediaTemp = mediaTemplate();
  const photographerId = urlUtils.getParam("photographerId");
  let medias;
  let currentMedia;

  function displayData(_medias, selected) {
    medias = _medias;
    currentMedia = selected;    
    
    lightboxModal.classList.add("active");
    bodyContainer.classList.add("modal-open");
    if (selected?.video) {
      displayVideo(urlUtils.getMediaUrl(photographerId, currentMedia.video), currentMedia.title, "video/mp4");
    } else {
      displayImage(urlUtils.getMediaUrl(photographerId, currentMedia.image), currentMedia.title);
    }
  }
  
  function displayImage(src, alt) {
    if (mediaContainer.childElementCount > 0) mediaContainer.removeChild(mediaContainer.lastChild);
    const imgElement = mediaTemp.mediaImageTemplate(src, alt)
    imgElement.displayMedia(mediaContainer);
  }
  
  function displayVideo(src, alt, type) {
    if (mediaContainer.childElementCount > 0) mediaContainer.removeChild(mediaContainer.lastChild);
    const videoElement = mediaTemp.mediaVideoTemplate(src, alt, type, true);
    videoElement.displayMedia(mediaContainer);
  }

  function closeModal() {
    lightboxModal.classList.remove("active");
    bodyContainer.classList.remove("modal-open");
  }

  function createEvents() {
    closeModalButton.addEventListener("click", closeModal);
    mediaNavPreviousButton.addEventListener("click", () => previousItem());
    mediaNavNextButton.addEventListener("click", () =>  nextItem());
  }

  function nextItem() {
    const index = medias.indexOf(currentMedia);
    const selected = index >= 0 && index < medias.length - 1 ? medias[index + 1] : medias[0];
    displayData(medias, selected);
  }

  function previousItem() {
    const index = medias.indexOf(currentMedia);
    const selected = index > 0 && index <= medias.length - 1 ? medias[index - 1] : medias[medias.length - 1];
    displayData(medias, selected);
  }
 
  return { displayData, closeModal, createEvents }

}