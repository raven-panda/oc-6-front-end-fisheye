export function mediaImageTemplate(src, alt) {
  const img = document.createElement('img');
  img.setAttribute("src", src)
  img.setAttribute("alt", alt);

  function displayMedia(parent) {
    parent.appendChild(img);
  }

  return { displayMedia };
}