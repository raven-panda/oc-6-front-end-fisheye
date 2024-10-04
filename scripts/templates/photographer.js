import { mediaTemplate } from "./media.js";
import { createTextElement } from "./elementDom.js";
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
        const fullNameTitle = createTextElement('h2', name, "photographer-card");
        const locationTitle = createTextElement('h3', city + ", " + country, "photographer-card");
        const taglineParagraph = createTextElement('p', tagline, "photographer-card");

        function displayData(fullNameParent, locationParent, taglineParent) {
            fullNameTitle.displayMedia(fullNameParent);
            locationTitle.displayMedia(locationParent);
            taglineParagraph.displayMedia(taglineParent);
        }

        return { displayData }
    }

    function getUserCardPictureDOM() {
        const media = mediaTemplate();
        const img = media.mediaImageTemplate(picture, name, "photographer-card");

        function displayData(parent) {
            img.displayMedia(parent);
        }
        
        return { displayData }
    }

    function getUserCardPriceDOM() {
        const priceParagraph = createTextElement('p', price + "€/jour", "price", "photographer-card");

        function displayData(parent) {
            priceParagraph.displayMedia(parent);
        }

        return { displayData }
    }

    return { getUserCardDOM, getUserCardDescriptionDOM, getUserCardPictureDOM }
}