export default function ModalUtils() {

  /**
   * Gets all elements in photographer page (except modals) for tabindex processing
   * @returns {HTMLElement[]}
   */
  const getElementsToToggle = () => {
    return [
      document.querySelector(".logo"),
      document.querySelector("#photograph-filter"),
      document.querySelector(".photograph_description"),
      document.querySelector("#contactButton"),
      ...document.querySelectorAll(".photograph-album-item a"),
      ...document.querySelectorAll(".photograph-album-item .photograph-album_like-button")
    ]
  }

  /**
   * Disables tabulation for all elements in photographer page (except modals)
   */
  function disablePageTabIndex() {
    const elementsToToggleTabindex = getElementsToToggle();
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "-1"));
  }

  /**
   * Enables tabulation for all elements in photographer page (except modals)
   */
  function enablePageTabIndex() {
    const elementsToToggleTabindex = getElementsToToggle();
    elementsToToggleTabindex.forEach(element => element.setAttribute("tabindex", "0"));
  }

  return { disablePageTabIndex, enablePageTabIndex }

}