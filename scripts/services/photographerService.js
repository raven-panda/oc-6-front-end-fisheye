export function PhotographerService() {
  async function getPhotographersAndMedia() {
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
  
  async function getPhotographers() {
    const photographersAndMedias = await getPhotographersAndMedia();    
    return await photographersAndMedias.photographers;
  }

  return { getPhotographers };
}