import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");

    function displayModal() {
        const modal = document.querySelector("#contact_modal");
        modalUtils.disablePageTabIndex();
        modal.classList.add('active');
    }
    
    function closeModal() {
        const modal = document.querySelector("#contact_modal");
        modalUtils.enablePageTabIndex();
        modal.classList.remove('active');
    }

    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
    }

    return { createEvents }

}