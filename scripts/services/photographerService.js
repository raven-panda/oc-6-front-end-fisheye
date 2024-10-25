export function PhotographerService() {
  async function getPhotographers() {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return await photographersAndMedias.photographers;
  }

  async function getPhotographerById(id) {
    const photographersAndMedias = await getPhotographers();    

    return photographersAndMedias.find(photographer => photographer.id == id);
  }

  async function getPhotographersMedias(id) {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return photographersAndMedias.media.filter(media => media.photographerId == id);
  }

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

  const getMediaById = async (mediaId) => {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return photographersAndMedias.media.find(media => media.id == mediaId);
  }

  return { getPhotographers, getPhotographerById, getPhotographersMedias };
}