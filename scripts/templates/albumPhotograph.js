import { mediaTemplate } from "./media.js";
import { createSvgElement, createTextElement } from "./elementDom.js";
import UrlUtils from "../utils/urlUtils.js";

/**
 * Album photograph template function
 * @param {*} data The media to create
 * @returns The DOM element and the displayData function to render the element
 */
export function albumPhotographTemplate(data) {
  const { id, photographerId, title, image, video, likes } = data;
  const urlUtils = UrlUtils();
  const mediaSrc = urlUtils.getMediaUrl(photographerId, image || video);

  function getAlbumItemDOM() {
    const articleDOM = document.createElement('article');
    articleDOM.classList.add("photograph-album-item");
    articleDOM.dataset.mediaId = id;
    const mediaLinkDOM = document.createElement('a');
    mediaLinkDOM.href = `#`;
    mediaLinkDOM.ariaLabel = title;
    const mediaDOM = getAlbumItemMediaDOM();

    const descriptionDOM = document.createElement('div');
    descriptionDOM.classList.add("photograph-album-item-description");
    
    const itemNameDOM = createTextElement('h2', title);
    const itemLikesDOM = createTextElement('p', likes);
    const buttonDOM = document.createElement('button');
    buttonDOM.classList.add("photograph-album_like-button");
    buttonDOM.setAttribute("aria-label", "J'aime");

    const heartIconSvg = createSvgElement(19, 19, "0 0 19 19", ["M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z"])

    const displayData = (parent) => {
      parent.appendChild(articleDOM);
      articleDOM.appendChild(mediaLinkDOM);
      mediaDOM.displayData(mediaLinkDOM);
      articleDOM.appendChild(descriptionDOM);
      itemNameDOM.displayMedia(descriptionDOM);
      itemLikesDOM.displayMedia(descriptionDOM);
      heartIconSvg.displayMedia(buttonDOM);
      descriptionDOM.appendChild(buttonDOM);
    }

    return { articleDOM, displayData }
  }

  function getAlbumItemMediaDOM() {
    const media = mediaTemplate();
    let mediaDOM;

    if (video) {
      let type = "video/" + video.split('.').pop();
      mediaDOM = media.mediaVideoTemplate(mediaSrc, title, type, false);
    } else {
      mediaDOM = media.mediaImageTemplate(mediaSrc, title, 350, 300);
    }

    const displayData = (parent) => {
      mediaDOM.displayMedia(parent);
    }

    return { displayData }
  }
  
  return getAlbumItemDOM();
}