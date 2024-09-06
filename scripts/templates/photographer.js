import { mediaImageTemplate } from "./media.js";
import { createTextElement } from "./textDom.js";
export function photographerTemplate(data) {
    const { name, city, country, tagline, price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = mediaImageTemplate(picture);
        
        const photographerFullNameTitle = createTextElement('h2', name);
        const photographerLocationTitle = createTextElement('h3', city + ", " + country);
        const taglineParagraph = createTextElement('p', tagline);
        const priceParagraph = createTextElement('p', price + "€/jour", "price");

        img.displayMedia(article);
        photographerFullNameTitle.displayMedia(article);
        photographerLocationTitle.displayMedia(article);
        taglineParagraph.displayMedia(article);
        priceParagraph.displayMedia(article);

        return (article);
    }
    return { getUserCardDOM }
}