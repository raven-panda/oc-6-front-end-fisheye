export default function UrlUtils() {
  const url = new URL(document.location.href);
  const searchParams = url.searchParams;

  /**
   * Sets the specified query param value
   * @param {string} param Query parameter's name
   * @param {string} value Query parameter's value
   */
  function setParam(param, value) {
    searchParams.set(param, value);
    history.pushState({}, "", url.href);
  }

  /**
   * Removes the specified query param and its value from URL
   * @param {string} param Query parameter's name
   */
  function removeParam(param) {
    searchParams.delete(param);
    history.pushState({}, "", url.href);
  }

  /**
   * Get the value of the specified query param
   * @param {string} param Query parameter's name
   */
  function getParam(param) {
    return searchParams.get(param);
  }

  /**
   * Get a media url by providing photographer ID and media file name
   * @param {string|number} photographerId Photographer ID
   * @param {string} fileName Media file name
   */
  function getMediaUrl(photographerId, fileName) {
    return `./assets/albums/${photographerId}/${fileName}`;
  }

  return { getParam, setParam, removeParam, getMediaUrl }
}