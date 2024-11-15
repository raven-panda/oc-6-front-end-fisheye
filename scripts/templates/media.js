import { createTextElement } from "./elementDom.js";

/**
 * Media template parent function for image and video element rendering
 * @returns Image and video template functions
 */
export function mediaTemplate() {
  /**
   * Template function for "img" element
   * @param {string} src Src link to the desired picture
   * @param {string} alt Alternative text of HTML "img" element
   * @param {string|number} width Width of the picture
   * @param {string|number} height Height of the picture
   * @param {...string} classList Optional classes for HTML "img" element
   * @returns DOM element and the displayData function to render the element
   */
  function mediaImageTemplate(src, alt, width, height, ...classList) {
    const img = document.createElement('img');
    img.setAttribute("src", src)
    img.setAttribute("alt", alt);
    img.setAttribute("width", width)
    img.setAttribute("height", height);
    if (classList && classList.length) img.classList.add(...classList);
  
    const displayMedia = (parent) => {
      parent.appendChild(img);
    }
  
    return { img, displayMedia };
  }
  
  /**
   * Template function for "video" element
   * @param {string} src Src link to the desired video
   * @param {string} alt Alternative text if the video cannot be rendered by navigator
   * @param {string} type MIME type of the video
   * @param {boolean} enableAutoplay
   * @param {...string} classList Optional classes for HTML video element
   * @returns DOM element and the displayData function to render the element
   */
  function mediaVideoTemplate(src, alt, type, enableAutoplay, ...classList) {
    const video = document.createElement('video');
    video.autoplay = enableAutoplay;
    if (classList && classList.length) video.classList.add(...classList);

    const source = document.createElement('source');
    source.setAttribute("src", src);
    source.setAttribute("type", type);

    const errorMsg = "Votre navigateur ne prends pas en charge les vidéos. Voici";

    const downloadLink = document.createElement('a');
    downloadLink.setAttribute("href", src);
    downloadLink.textContent = "un lien pour télécharger la vidéo";

    const altParagraph = createTextElement("p", alt);

    const displayMedia = (parent) => {
      parent.appendChild(video);
      video.appendChild(source);
      video.append(errorMsg);
      video.appendChild(downloadLink);
      altParagraph.displayMedia(video);
    }

    return { video, displayMedia };
  }

  return { mediaImageTemplate, mediaVideoTemplate }
}