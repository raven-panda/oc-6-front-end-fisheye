/**
 * Photographer service used to fetch photographers data and medias
 */
export function PhotographerService() {

  /**
   * Creates fetch request to the photographers json mocked file
   * @returns {Promise<any>} All photographers and media data
   */
  const getPhotographersAndMedia = async () => {
    return await fetch("data/photographers.json", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    })
    .then((data) => {
        return data;
    })
  }

  /**
   * Calls **getPhotographersAndMedia** and return all photographers data from fetched JSON
   * @returns {Promise<any[]>} Every photographers data
   */
  async function getPhotographers() {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return await photographersAndMedias.photographers;
  }

  /**
   * Calls **getPhotographers** and return data of the photographer specified with ID
   * @param {number} id Photographer ID
   * @returns {Promise<any>} This photographer data
   */
  async function getPhotographerById(id) {
    const photographersAndMedias = await getPhotographers();    

    return photographersAndMedias.find(photographer => photographer.id == id);
  }

  /**
   * Calls **getPhotographersAndMedia** and return data of the photographer's media specified with ID
   * @param {number} id Photographer ID
   * @returns {Promise<any>} Photographer's medias data
   */
  async function getPhotographersMedias(id) {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return photographersAndMedias.media.filter(media => media.photographerId == id);
  }
  
  return { getPhotographers, getPhotographerById, getPhotographersMedias };
}