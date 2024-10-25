export default function ModalUtils() {

  const getElementsToToggle = () => {
    return [
      document.querySelector(".logo"),
      document.querySelector(".photograph-filter-container"),
      document.querySelector("#contactButton"),
      ...document.querySelectorAll(".photograph-album-item a"),
      ...document.querySelectorAll(".photograph-album-item .photograph-album_like-button")
    ]
  }

  function disablePageTabIndex() {
    const elementsToToggleTabindex = getElementsToToggle();
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "-1"));
  }

  function enablePageTabIndex() {
    const elementsToToggleTabindex = getElementsToToggle();
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "0"));
  }

  return { disablePageTabIndex, enablePageTabIndex }

}