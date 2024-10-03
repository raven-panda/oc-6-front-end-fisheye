export function mediaTemplate() {

  function mediaImageTemplate(src, alt, ...classList) {
    const img = document.createElement('img');
    img.setAttribute("src", src)
    img.setAttribute("alt", alt);
    if (classList && classList.length) img.classList.add(...classList);
  
    function displayMedia(parent) {
      parent.appendChild(img);
    }
  
    return { displayMedia };
  }
  
  function mediaVideoTemplate(src, alt, type, ...classList) {
    const video = document.createElement('video');
    /** @TODO : video must play on hover */
    if (classList && classList.length) video.classList.add(...classList);

    const source = document.createElement('source');
    source.setAttribute("src", src);

    const errorMsg = "Votre navigateur ne prends pas en charge les vidéos. Voici";

    const downloadLink = document.createElement('a');
    downloadLink.setAttribute("href", src);
    downloadLink.textContent = "un lien pour télécharger la vidéo";

    function displayMedia(parent) {
      parent.appendChild(video);
      video.appendChild(source);
      video.append(errorMsg);
      video.appendChild(downloadLink);
    }

    return { displayMedia };
  }

  return { mediaImageTemplate, mediaVideoTemplate }
}