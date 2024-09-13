//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerService } from "../services/photographerService.js";
import { photographerTemplate } from "../templates/photographer.js";

async function photographerPage() {
  const params = new URLSearchParams(document.location.search);
  const photographerService = PhotographerService();
  const photographerId = params.get("photographerId");

  console.log(photographerId);

  function displayPhotographerHeaderData(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photoDescriptionBox = photographerHeader.querySelector(".photograph_description");
    const photographerModel = photographerTemplate(photographer);


    const photographerDescription = photographerModel.getUserCardDescriptionDOM();
    photographerDescription.displayData(photoDescriptionBox, photoDescriptionBox, photoDescriptionBox);

    const photographerPicture = photographerModel.getUserCardPictureDOM();
    photographerPicture.displayData(photographerHeader);

  }

  function displayData(photographer) {
    displayPhotographerHeaderData(photographer);
  }

  const photographer = await photographerService.getPhotographerById(photographerId);
  displayData(photographer);
}

photographerPage();