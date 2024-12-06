import { mediaTemplate } from "./media.js";
import { createTextElement } from "./elementDom.js";

/**
 * Template for displaying photographer template
 * @param data Photographer's data
 * @function **getUserCardDOM** is used to display user card in index page
 * @function **getUserCardDescriptionDOM** is used to display user description in photographer page
 * @function **getUserCardPictureDOM** is used to display user picture in photographer page
 * @returns Those three functions
 */
export function photographerTemplate(data) {
    const { id, name, city, country, tagline, price, portrait } = data;
    const picture = `./assets/photographers/${portrait}`;

    /**
     * @returns { HTMLElement } The user card displayed in index page
     */
    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const link = document.createElement('a');
        link.href = "photographer.html?photographerId=" + id;
        const img = getUserCardPictureDOM();
        
        const userDescription = getUserCardDescriptionDOM();
        const userPrice = getUserCardPriceDOM();

        img.displayData(link);
        article.appendChild(link);
        userDescription.displayData(link, link, link);
        userPrice.displayData(link);

        return article;
    }

    /**
     * Create user card description and returns display data function, when called displays each element into specified parents
     * @returns { HTMLElement } The displayData function to render user description displayed in paragraph page
     */
    function getUserCardDescriptionDOM() {
        const fullNameTitle = createTextElement('h2', name, "photographer-card");
        const locationTitle = createTextElement('h3', city + ", " + country, "photographer-card");
        const taglineParagraph = createTextElement('p', tagline, "photographer-card");
        fullNameTitle.element.ariaLabel = "Nom du photographe " + name;
        locationTitle.element.ariaLabel = "Lieu du photographe " + locationTitle.element.textContent;
        taglineParagraph.element.ariaLabel = "Slogan du photographe " + taglineParagraph.element.textContent;

        const displayData = (fullNameParent, locationParent, taglineParent) => {
            fullNameTitle.displayMedia(fullNameParent);
            locationTitle.displayMedia(locationParent);
            taglineParagraph.displayMedia(taglineParent);
        }

        return { displayData }
    }

    /**
     * Create user card picture and returns display data function, when called displays the element into specified parent
     * @returns { HTMLElement } The displayData function to render picture displayed in paragraph page
     */
    function getUserCardPictureDOM() {
        const media = mediaTemplate();
        const img = media.mediaImageTemplate(picture, "Portrait de " + name, 200, 200, "photographer-card");

        const displayData = (parent) => {
            img.displayMedia(parent);
        }
        
        return { displayData }
    }    

    /**
     * Create user card price paragraph and returns display data function, when called displays the element into specified parent
     * @returns { HTMLElement } The displayData function to render picture displayed in paragraph page
     */
    function getUserCardPriceDOM() {
        const priceParagraph = createTextElement('p', price + "€/jour", "price", "photographer-card");
        priceParagraph.element.ariaLabel = "Prix du photographe " + price + "euros par jours";

        const displayData = (parent) => {
            priceParagraph.displayMedia(parent);
        }

        return { displayData }
    }

    return { getUserCardDOM, getUserCardDescriptionDOM, getUserCardPictureDOM }
}