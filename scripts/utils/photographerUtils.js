import AlbumPhotographUtils from "./albumPhotograph.js";
import ContactFormUtils from "./contactFormUtils.js";
import UrlUtils from "./urlUtils.js";

export default function PhotographerUtils() {
  const urlUtils = UrlUtils();
  const filterSelectContainer = document.querySelector(".photograph-filter-container");
  const filterButton = document.querySelector("#photograph-filter");
  const filterButtonLabel = document.querySelector("#photograph-filter-label");
  const filterOptionListContainer = filterSelectContainer.querySelector("#filter-options");
  const albumPhotograph = document.querySelector(".photograph-album-content");
  const albumPhotographUtils = AlbumPhotographUtils();
  const contactModalUtils = ContactFormUtils();

  let isFilterActive = false;

  function createEvents (photographersMedias) {
    initializeValues();

    document.addEventListener("click", closeOnClickOutside);
    filterSelectContainer.addEventListener("click", selectFilterEvent);
    filterSelectContainer.addEventListener("keydown", selectFilterKeydownEvent);

    albumPhotographUtils.createEvents(photographersMedias);
    contactModalUtils.createEvents();
  }

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

  const initializeValues = () => {
    const filterUrlParamValue = urlUtils.getParam("sortFilter");
    const currentValue = filterLabels[filterUrlParamValue] || filterLabels.popular;
    selectFilter(currentValue.value);
  }

  const closeOnClickOutside = (e) => {        
    if (isFilterActive && (e.target.parentNode != filterButton && e.target.parentNode != filterSelectContainer)) toggleFilters();
  }

  const selectFilterEvent = (e) => {
    toggleFilters();

    if (isFilterActive) return;

    const value = e.target?.tagName === "SPAN" ? e.target.parentNode?.dataset?.value : e.target?.dataset?.value;
    selectFilter(value);
  }

  const selectFilter = (value) => {
    const currentValue = filterLabels[value];
    if (!currentValue) return;

    filterButton.value = filterLabels[value].value;

    const filterOptions = filterOptionListContainer.querySelectorAll("li");
    filterOptions.forEach(option => option.ariaSelected = option.dataset.value === filterButton.value);
    
    filterButtonLabel.textContent = filterLabels[value].label;
    
    filterButton.setAttribute("aria-activedescendant", "filter-" + filterLabels[value].value);
    urlUtils.setParam("sortFilter", filterLabels[value].value)
    albumPhotographUtils.updateAlbum(filterLabels[value].value);
  }

  const toggleFilters = () => {
    isFilterActive = !isFilterActive;
    filterSelectContainer.classList.toggle("active");
    filterButton.ariaExpanded = isFilterActive;
    togglePageItemsTabIndex();
  }

  const selectFilterKeydownEvent = (e) => {    
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

  const togglePageItemsTabIndex = () => {
    const clickableAlbumItems = albumPhotograph.querySelectorAll(".photograph-album-item a");
    const likesButton = albumPhotograph.querySelectorAll(".photograph-album-item .photograph-album-item-description .photograph-album_like-button");
    const logo = document.querySelector(".logo");
    const contactButton = document.querySelector(".contact_button");
    const elements = [...clickableAlbumItems, ...likesButton, logo, contactButton];

    elements.forEach(link => link.setAttribute("tabindex", isFilterActive ? "-1&" : "0"))
  }

  return { createEvents }

}