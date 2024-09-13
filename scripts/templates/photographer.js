import { mediaImageTemplate } from "./media.js";
import { createTextElement } from "./textDom.js";
export function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.href = "photographer.html?photographerId=" + id;
        const img = getUserCardPictureDOM();
        
        const userDescription = getUserCardDescriptionDOM();
        const userPrice = getUserCardPriceDOM();

        img.displayData(link);
        article.appendChild(link);
        userDescription.displayData(link, article, article);
        userPrice.displayData(article);

        return article;
    }

    function getUserCardDescriptionDOM() {
        const fullNameTitle = createTextElement('h2', name);
        const locationTitle = createTextElement('h3', city + ", " + country);
        const taglineParagraph = createTextElement('p', tagline);

        function displayData(fullNameParent, locationParent, taglineParent) {
            fullNameTitle.displayMedia(fullNameParent);
            locationTitle.displayMedia(locationParent);
            taglineParagraph.displayMedia(taglineParent);
        }

        return { displayData }
    }

    function getUserCardPictureDOM() {
        const img = mediaImageTemplate(picture, name);

        function displayData(parent) {
            img.displayMedia(parent);
        }
        
        return { displayData }
    }

    function getUserCardPriceDOM() {
        const priceParagraph = createTextElement('p', price + "€/jour", "price");

        function displayData(parent) {
            priceParagraph.displayMedia(parent);
        }

        return { displayData }
    }

    return { getUserCardDOM, getUserCardDescriptionDOM, getUserCardPictureDOM }
}