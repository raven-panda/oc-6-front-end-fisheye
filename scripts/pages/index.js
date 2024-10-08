import { PhotographerService } from "../services/photographerService.js";
import { photographerTemplate } from  "../templates/photographer.js";

async function indexPage() {
  const photographerService = PhotographerService();

  function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }

  const photographers = await photographerService.getPhotographers();
  displayData(photographers);
}

indexPage();
    
