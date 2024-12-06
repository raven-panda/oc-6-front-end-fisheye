import { PhotographerService } from "../services/photographerService.js";
import { photographerTemplate } from  "../templates/photographer.js";

/**
 * Index page main function
 */
async function indexPage() {
  const photographerService = PhotographerService();

  /**
   * Templates HTML DOM for each photographers
   * @param {any[]} photographers 
   */
  const displayData = (photographers) => {
    const photographersSection = document.querySelector(".photographer_section");
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer);
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }

  // Fetching photographers data
  const photographers = await photographerService.getPhotographers();
  displayData(photographers);
}

indexPage();
    
