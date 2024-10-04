import LightboxModalUtils from "./lightboxModal.js";
import UrlUtils from "./urlUtils.js";

export default function PhotographerUtils() {
  const filterSelectContainer = document.querySelector(".photograph-filter-container");
  const filterButton = document.querySelector("#photograph-filter");
  const filterButtonLabel = document.querySelector("#photograph-filter-label");
  const filterOptionListContainer = filterSelectContainer.querySelector("#filter-options");
  const albumPhotograph = document.querySelector(".photograph-album-content");
  const urlUtils = UrlUtils();
  const lightboxModalUtils = LightboxModalUtils();
  let photographersMedias;

  let isFilterActive = false;

  const filterLabels = {
    popular: {
      value: "popular",
      label: "Popularité"
    },
    date: {
      value: "date",
      label: "Date"
    },
    title: {
      value: "title",
      label: "Titre"
    }
  }

  function initializeValues() {
    filterButtonLabel.textContent = filterLabels.popular.label;
    filterButton.value = filterLabels.popular.value;
    filterOptionListContainer.setAttribute("aria-activedescendant", "filter-" + filterLabels.popular.value);
  }

  function createEvents(_photographersMedias) {
    initializeValues();

    document.addEventListener("click", closeOnClickOutside);
    filterSelectContainer.addEventListener("click", selectFilterEvent);
    filterSelectContainer.addEventListener("keydown", selectFilterKeydownEvent);

    photographersMedias = _photographersMedias;

    createAlbumEvents();
    lightboxModalUtils.createEvents();
  }

  function createAlbumEvents() {
    const clickableAlbumItems = albumPhotograph.querySelectorAll(".photograph-album-item a");
    clickableAlbumItems.forEach(link => {
      link.addEventListener("click", selectAlbumtItemEvent);
      link.addEventListener("keydown", selectAlbumtItemEvent);
    });
  }

  function selectAlbumtItemEvent(e) {       
    if (e.code && (e.code !== "Space" && e.code !== "Enter")) return;
      
    e.preventDefault();

    const mediaId = e.currentTarget?.parentNode?.dataset?.mediaId;
    let media = photographersMedias.find(media => mediaId && media.id === parseInt(mediaId));
    
    if (!mediaId || !media)
      return;

    urlUtils.setParam("mediaId", mediaId);
    const photographerId = urlUtils.getParam("photographerId");

    lightboxModalUtils.displayData(`assets/albums/${photographerId}/${media.image || media.video}`, media.title, media.id);
  }

  function closeOnClickOutside(e) {        
    if (isFilterActive && (e.target.parentNode != filterButton && e.target.parentNode != filterSelectContainer)) toggleFilters();
  }

  function selectFilterEvent(e) {
    toggleFilters();

    if (isFilterActive) return;

    const value = e.target?.tagName === "SPAN" ? e.target.parentNode?.dataset?.value : e.target?.dataset?.value;
    if (!value) return;

    filterButton.value = filterLabels[value].value;

    const filterOptions = filterOptionListContainer.querySelectorAll("li");
    filterOptions.forEach(option => option.ariaSelected = option.dataset.value === filterButton.value);
    
    filterButtonLabel.textContent = filterLabels[value].label;
    
    filterButton.setAttribute("aria-activedescendant", "filter-" + filterLabels[value].value);
  }

  function toggleFilters() {
    isFilterActive = !isFilterActive;
    filterSelectContainer.classList.toggle("active");
    filterButton.ariaExpanded = isFilterActive;
    togglePageItemsTabIndex();
  }

  function selectFilterKeydownEvent(e) {    
    if (e.code === "Space" || e.code === "Enter") {
      e.preventDefault();
      toggleFilters();
    }

    if (isFilterActive) return;

    const value = e.target?.dataset?.value;
    if (!value) return;

    filterButton.value = filterLabels[value].value;

    const filterOptions = filterSelectContainer.querySelectorAll(".filter-options > li");
    filterOptions.forEach(option => {
      if (option.dataset.value === filterButton.value) {
        option.ariaSelected = true;
        option.removeAttribute("tabindex");
      } else {
        option.ariaSelected = false;
        option.setAttribute("tabindex", "0");
      }
    });      

    filterButtonLabel.textContent = filterLabels[value].label;
    
    filterButton.setAttribute("aria-activedescendant", "filter-" + filterLabels[value].value);
  }

  function togglePageItemsTabIndex() {
    const clickableAlbumItems = albumPhotograph.querySelectorAll(".photograph-album-item a");
    const likesButton = albumPhotograph.querySelectorAll(".photograph-album-item .photograph-album-item-description .photograph-album_like-button");
    const logo = document.querySelector(".logo");
    const contactButton = document.querySelector(".contact_button");
    const elements = [...clickableAlbumItems, ...likesButton, logo, contactButton];

    elements.forEach(link => link.setAttribute("tabindex", isFilterActive ? "-1&" : "0"))
  }

  return { createEvents }

}