export function createTextElement(tag, textContent, ...classList) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (classList && classList.length) element.classList.add(...classList);

    function displayMedia(parent) {
      parent.appendChild(element);
    }

    return { element, displayMedia };
}

export function createSvgElement(width, height, viewbox, paths) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  element.setAttribute('fill', "currentColor");
  element.setAttribute('width', "19");
  element.setAttribute('height', "19");
  element.setAttribute('viewBox', "0 0 19 19");

  paths.forEach(pathString => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', pathString);
    
    element.appendChild(path);
  })

  function displayMedia(parent) {
    parent.appendChild(element);
  }

  return { element, displayMedia };
}