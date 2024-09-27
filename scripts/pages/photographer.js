//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerService } from "../services/photographerService.js";
import { albumPhotographTemplate } from "../templates/albumPhotograph.js";
import { photographerTemplate } from "../templates/photographer.js";

async function photographerPage() {
  const params = new URLSearchParams(document.location.search);
  const photographerService = PhotographerService();
  const photographerId = params.get("photographerId");
  let isFilterActive = false;

  const filterLabels = {
    popular: "Popularité",
    date: "Date",
    title: "Titre"
  }

  function displayPhotographerHeaderData(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photoDescriptionBox = photographerHeader.querySelector(".photograph_description");
    const photographerModel = photographerTemplate(photographer);

    const photographerDescription = photographerModel.getUserCardDescriptionDOM();
    photographerDescription.displayData(photoDescriptionBox, photoDescriptionBox, photoDescriptionBox);

    const photographerPicture = photographerModel.getUserCardPictureDOM();
    photographerPicture.displayData(photographerHeader);
  }

  function displayPhotographerAlbumData(photographersMedias) {
    const albumPhotograph = document.querySelector(".photograph-album-content");

    photographersMedias.forEach(media => {
      const albumPhotographModel = albumPhotographTemplate(media);
      const albumItemDOM = albumPhotographModel.getAlbumItemDOM();

      albumItemDOM.displayData(albumPhotograph);
    })
  }

  function createEvents() {
    const filterSelectContainer = document.querySelector(".photograph-filter-container");
    const filterOptionsBox = filterSelectContainer.querySelector(".filter-options");
    /** @type {HTMLButtonElement} */
    const filterButton = document.querySelector("#photograph-filter");
    const filterButtonLabel = document.querySelector("#photograph-filter-label");
    filterButtonLabel.textContent = filterLabels.popular;
    
    function selectFilterEvent(e) {
      filterSelectContainer.classList.toggle("active");
      isFilterActive = !isFilterActive;
      filterButton.ariaExpanded = isFilterActive;

      if (isFilterActive) return;

      const value = e.target?.tagName === "SPAN" ? e.target.parentNode?.dataset?.value : e.target?.dataset?.value;
      if (value) filterButton.value = value;

      const filterOptions = filterSelectContainer.querySelectorAll(".filter-options > li");
      filterOptions.forEach(option => option.ariaSelected = option.dataset.value === filterButton.value);
      
      if (value) filterButtonLabel.textContent = filterLabels[value];
      
      filterButton.setAttribute("aria-activedescendant", "filter-" + value);
    }

    function selectFilterKeydownEvent(e) {      
      if (e.code === "Space" || e.code === "Enter") {
        filterSelectContainer.classList.toggle("active");
        isFilterActive = !isFilterActive;
        filterButton.ariaExpanded = isFilterActive;
      }

      if (isFilterActive) return;

      const value = e.target?.dataset?.value;
      if (!value) return;
      filterButton.value = value;

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

      filterButtonLabel.textContent = filterLabels[value];
      
      filterButton.setAttribute("aria-activedescendant", "filter-" + value);
    }

    filterSelectContainer.addEventListener("click", selectFilterEvent);
    filterSelectContainer.addEventListener("keydown", selectFilterKeydownEvent);
  }

  function displayData(photographer, photographersMedias) {
    displayPhotographerHeaderData(photographer);
    displayPhotographerAlbumData(photographersMedias);
    createEvents();
  }

  const photographer = await photographerService.getPhotographerById(photographerId);
  const photographersMedias = await photographerService.getPhotographersMedias(photographerId);
  displayData(photographer, photographersMedias);
}

photographerPage();