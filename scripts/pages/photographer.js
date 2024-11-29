//Mettre le code JavaScript lié à la page photographer.html

import { PhotographerService } from "../services/photographerService.js";
import { albumPhotographTemplate } from "../templates/albumPhotograph.js";
import { photographerTemplate } from "../templates/photographer.js";
import PhotographerUtils from "../utils/photographerUtils.js";

/**
 * Photographer page main function
 */
async function photographerPage() {
  const params = new URLSearchParams(document.location.search);
  const photographerService = PhotographerService();
  const photographerUtils = PhotographerUtils();
  const photographerId = params.get("photographerId");

  // If no photographer ID is specified in query params, redirecting user to index page
  if (!photographerId) window.location = "./index.html";

  /**
   * Displays photographer data in contact form
   * @param photographer The photographer data 
   */
  const displayContactFormData = (photographer) => {
    const titlePhotographerName = document.querySelector("#contact_modal #contactPhotographerName");
    titlePhotographerName.textContent = photographer.name;
  }

  /**
   * Displays photographer datas and picture in photographer page header
   * @param photographer The photographer data 
   */
  const displayPhotographerHeaderData = (photographer) => {
    const photographerHeader = document.querySelector(".photograph-header");
    const photoDescriptionBox = photographerHeader.querySelector(".photograph_description");
    const photographerModel = photographerTemplate(photographer);

    const photographerDescription = photographerModel.getUserCardDescriptionDOM();
    photographerDescription.displayData(photoDescriptionBox, photoDescriptionBox, photoDescriptionBox);

    const photographerPicture = photographerModel.getUserCardPictureDOM();
    photographerPicture.displayData(photographerHeader);
  }

  /**
   * Displays photographer's pictures and videos in the album
   * @param photographer The photographer's medias 
   */
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
      const albumItemDOM = albumPhotographTemplate(media);

      albumItemDOM.displayData(albumPhotograph);
    })
  }
  
  /**
   * Displays photographer's pictures and videos in the album
   * @param photographer The photographer's medias 
   */
  const displayPhotographerDetailsData = (photographer, medias) => {
    const photographersDetailLikesParagraph = document.querySelector(".photographer-details #photographer-details-likes");
    photographersDetailLikesParagraph.textContent = medias.map(media => media.likes).reduce((acc, current) => acc + current, 0);

    const photographersDetailPriceParagraph = document.querySelector(".photographer-details #photographer-details-price");
    photographersDetailPriceParagraph.textContent = photographer.price;
  }

  const displayData = (photographer, photographersMedias) => {
    displayPhotographerHeaderData(photographer);
    displayPhotographerAlbumData(photographersMedias);
    displayContactFormData(photographer);
    displayPhotographerDetailsData(photographer, photographersMedias);
    photographerUtils.createEvents(photographersMedias);
  }

  const photographer = await photographerService.getPhotographerById(photographerId);
  const photographersMedias = await photographerService.getPhotographersMedias(photographerId);
  displayData(photographer, photographersMedias);
}

photographerPage();