export function createTextElement(tag, textContent, ...classList) {
    const element = document.createElement(tag);
    element.textContent = textContent;
    if (classList && classList.length) element.classList.add(...classList);

    function displayMedia(parent) {
      parent.appendChild(element);
    }

    return { element, displayMedia };
}