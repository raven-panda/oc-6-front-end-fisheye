/**
 * Creates a text element by providing a element tagname, text content and optional classes
 * @param {string} tag Tag of the HTML element
 * @param {string} textContent Content of the HTML text element
 * @param {...string} classList Classes of the HTML element
 * @returns {{element: HTMLElement, displayMedia: (parent: HTMLElement) => void}} DOM element and displayMedia to render the element
 */
export function createTextElement(tag, textContent, ...classList) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  if (classList && classList.length) element.classList.add(...classList);

  const displayMedia = (parent) => {
    parent.appendChild(element);
  }

  return { element, displayMedia };
}

/**
 * Creates a SVG element by providing a width, height, viewbox and paths
 * @param {string|number} width Width of the SVG
 * @param {string|number} height Height of the SVG
 * @param {string} viewbox Viewbox of the SVG
 * @param {string[]} paths Paths to render in the SVG
 * @returns {{element: SVGSVGElement, displayMedia: (parent: HTMLElement) => void}} DOM svg element and displayMedia to render the element
 */
export function createSvgElement(width, height, viewbox, paths) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  element.setAttribute('fill', "currentColor");
  element.setAttribute('width', width);
  element.setAttribute('height', height);
  element.setAttribute('viewBox', viewbox);

  paths.forEach(pathString => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute('d', pathString);
    
    element.appendChild(path);
  })

  const displayMedia = (parent) => {
    parent.appendChild(element);
  }

  return { element, displayMedia };
}