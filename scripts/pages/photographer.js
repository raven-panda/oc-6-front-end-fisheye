//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerService } from "../services/photographerService.js";
import { photographerTemplate } from "../templates/photographer.js";

async function photographerPage() {
  const params = new URLSearchParams(document.location.search);
  const photographerService = PhotographerService();
  const photographerId = params.get("photographerId");
  let isFilterActive = false;

  function displayPhotographerHeaderData(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photoDescriptionBox = photographerHeader.querySelector(".photograph_description");
    const photographerModel = photographerTemplate(photographer);

    const photographerDescription = photographerModel.getUserCardDescriptionDOM();
    photographerDescription.displayData(photoDescriptionBox, photoDescriptionBox, photoDescriptionBox);

    const photographerPicture = photographerModel.getUserCardPictureDOM();
    photographerPicture.displayData(photographerHeader);

  }

  function createEvents() {
    const filterSelectContainer = document.querySelector(".photograph-filter-container");
    const filterSelect = filterSelectContainer.querySelector("#photograph-filter");
    filterSelect.value = "popular";
    
    function selectFilterEvent(e) {
      filterSelectContainer.classList.toggle("active");
      isFilterActive = !isFilterActive;

      if (isFilterActive) return;      

      const value = e.target?.tagName === "SPAN" ? e.target.parentNode?.dataset?.value : e.target?.dataset?.value;
      if (value) filterSelect.value = value;

      const filterOptions = filterSelectContainer.querySelectorAll(".filter-options > div");
      filterOptions.forEach(option => option.dataset.value === filterSelect.value ? option.classList.add("selected") : option.classList.remove("selected"));
    }

    filterSelectContainer.addEventListener("click", selectFilterEvent)
  }

  function displayData(photographer) {
    displayPhotographerHeaderData(photographer);
    createEvents();
  }

  const photographer = await photographerService.getPhotographerById(photographerId);
  displayData(photographer);
}

photographerPage();