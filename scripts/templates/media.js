export function mediaImageTemplate(src) {
  const img = document.createElement('img');
  img.setAttribute("src", src)

  function displayMedia(parent) {
    parent.appendChild(img);
  }

  return { displayMedia };
}