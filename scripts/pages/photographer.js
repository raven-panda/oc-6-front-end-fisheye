//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerService } from "../services/photographerService.js";
import { albumPhotographTemplate } from "../templates/albumPhotograph.js";
import { photographerTemplate } from "../templates/photographer.js";
import PhotographerUtils from "../utils/photographerUtils.js";

async function photographerPage() {
  const params = new URLSearchParams(document.location.search);
  const photographerService = PhotographerService();
  const photographerUtils = PhotographerUtils();
  const photographerId = params.get("photographerId");

  if (!photographerId) window.location = "./index.html";

  const displayContactFormData = (photographer) => {
    const photographerHeader = document.querySelector("#contact_modal");
    const titlePhotographerName = photographerHeader.querySelector("#contactPhotographerName");
    titlePhotographerName.textContent = photographer.name;
  }

  const displayPhotographerHeaderData = (photographer) => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photoDescriptionBox = photographerHeader.querySelector(".photograph_description");
    const photographerModel = photographerTemplate(photographer);

    const photographerDescription = photographerModel.getUserCardDescriptionDOM();
    photographerDescription.displayData(photoDescriptionBox, photoDescriptionBox, photoDescriptionBox);

    const photographerPicture = photographerModel.getUserCardPictureDOM();
    photographerPicture.displayData(photographerHeader);
  }

  const displayPhotographerAlbumData = (photographersMedias) => {
    const albumPhotograph = document.querySelector(".photograph-album-content");
    switch (params.get("sortFilter")) {
      case "popular":
        photographersMedias.sort((a, b) => b.likes - a.likes);
        break;
      case "date":
        photographersMedias.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "title":
        photographersMedias.sort((a, b) => a.title < b.title ? -1 : a.title > b.title ? 1 : 0);
        break;
      default:
        photographersMedias.sort((a, b) => b.likes - a.likes);
        break;
    }
    
    photographersMedias.forEach(media => {
      const albumPhotographModel = albumPhotographTemplate(media);
      const albumItemDOM = albumPhotographModel.getAlbumItemDOM();

      albumItemDOM.displayData(albumPhotograph);
    })
  }

  const displayData = (photographer, photographersMedias) => {
    displayPhotographerHeaderData(photographer);
    displayPhotographerAlbumData(photographersMedias);
    displayContactFormData(photographer);
    photographerUtils.createEvents(photographersMedias);
  }

  const photographer = await photographerService.getPhotographerById(photographerId);
  const photographersMedias = await photographerService.getPhotographersMedias(photographerId);
  displayData(photographer, photographersMedias);
}

photographerPage();