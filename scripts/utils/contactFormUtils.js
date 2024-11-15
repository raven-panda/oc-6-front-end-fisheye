import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");
    const bodyContainer = document.querySelector("body");

    /**
     * Creates event listeners for contact modal
     */
    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
    }

    /**
     * Callback of clicking on open contact modal button event
     */
    const displayModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.disablePageTabIndex();
        modal.classList.add('active');
        bodyContainer.classList.add("modal-open");
    }
    
    /**
     * Callback of clicking on close contact modal button event
     */
    const closeModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.enablePageTabIndex();
        modal.classList.remove('active');
        bodyContainer.classList.remove("modal-open");
    }

    return { createEvents }

}