import { photographerTemplate } from  "../templates/photographer.js";
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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    }

    init();
    
