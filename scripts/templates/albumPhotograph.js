import { mediaTemplate } from "./media.js";
import { createTextElement } from "./textDom.js";

export function albumPhotographTemplate(data) {
  const { id, photographerId, title, image, video, likes } = data;
  const mediaSrc = `assets/albums/${photographerId}/${image || video}`;

  function getAlbumItemDOM() {
    const articleDOM = document.createElement('article');
    articleDOM.classList.add("photograph-album-item");
    articleDOM.dataset.pictureid = id;
    const mediaLinkDOM = document.createElement('a');
    mediaLinkDOM.href = `#`;
    const mediaDOM = getAlbumItemMediaDOM();

    const descriptionDOM = document.createElement('div');
    descriptionDOM.classList.add("photograph-album-item-description");
    
    const itemNameDOM = createTextElement('h2', title);
    const itemLikesDOM = createTextElement('p', likes);
    const buttonDOM = document.createElement('button');
    buttonDOM.classList.add("photograph-album_like-button");

    const heartIconDOM = createTextElement('i', '', "fa-solid", "fa-heart", "fa-xl");
    heartIconDOM.element.setAttribute('aria-label', "likes");

    function displayData(parent) {
      parent.appendChild(articleDOM);
      articleDOM.appendChild(mediaLinkDOM);
      mediaDOM.displayData(mediaLinkDOM);
      articleDOM.appendChild(descriptionDOM);
      itemNameDOM.displayMedia(descriptionDOM);
      itemLikesDOM.displayMedia(descriptionDOM);
      heartIconDOM.displayMedia(buttonDOM);
      descriptionDOM.appendChild(buttonDOM);
    }

    return { articleDOM, displayData }
  }

  function getAlbumItemMediaDOM() {
    const media = mediaTemplate();
    let mediaDOM;

    if (video) {
      let type = "video/" + video.split('.').pop();
      mediaDOM = media.mediaVideoTemplate(mediaSrc, title, type);
    } else {
      mediaDOM = media.mediaImageTemplate(mediaSrc, title);
    }

    function displayData(parent) {
      mediaDOM.displayMedia(parent);
    }

    return { displayData }
  }
  
  return { getAlbumItemDOM}
}