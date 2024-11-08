export function mediaTemplate() {

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
  
  function mediaVideoTemplate(src, alt, type, enableAutoplay, ...classList) {
    const video = document.createElement('video');
    video.autoplay = enableAutoplay;
    if (classList && classList.length) video.classList.add(...classList);

    const source = document.createElement('source');
    source.setAttribute("src", src);

    const errorMsg = "Votre navigateur ne prends pas en charge les vidéos. Voici";

    const downloadLink = document.createElement('a');
    downloadLink.setAttribute("href", src);
    downloadLink.textContent = "un lien pour télécharger la vidéo";

    const displayMedia = (parent) => {
      parent.appendChild(video);
      video.appendChild(source);
      video.append(errorMsg);
      video.appendChild(downloadLink);
    }

    return { video, displayMedia };
  }

  return { mediaImageTemplate, mediaVideoTemplate }
}