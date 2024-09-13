export function mediaImageTemplate(src, alt, ...classList) {
  const img = document.createElement('img');
  img.setAttribute("src", src)
  img.setAttribute("alt", alt);
  img.classList.add(...classList);

  function displayMedia(parent) {
    parent.appendChild(img);
  }

  return { displayMedia };
}