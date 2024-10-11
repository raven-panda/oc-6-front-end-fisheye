export default function UrlUtils() {
  const url = new URL(document.location.href);
  const searchParams = url.searchParams;

  function setParam(param, value) {
    searchParams.set(param, value);
    history.pushState({}, "", url.href);
  }

  function removeParam(param) {
    searchParams.delete(param);
    history.pushState({}, "", url.href);
  }

  function getParam(param) {
    return searchParams.get(param);
  }

  function getMediaUrl(photographerId, fileName) {
    return `assets/albums/${photographerId}/${fileName}`;
  }

  return { getParam, setParam, removeParam, getMediaUrl }
}