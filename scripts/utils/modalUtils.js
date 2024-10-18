export default function ModalUtils() {
  const elementsToToggleTabindex = [
    document.querySelector(".logo"),
    document.querySelector(".photograph-album"),
    document.querySelector(".photograph-filter-container"),
    document.querySelector("#contactButton"),
    ...document.querySelectorAll(".photograph-album-item a"),
    ...document.querySelectorAll(".photograph-album-item .photograph-album_like-button")
  ];

  function disablePageTabIndex() {
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "-1"));
  }

  function enablePageTabIndex() {
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "0"));
  }

  return { disablePageTabIndex, enablePageTabIndex }

}