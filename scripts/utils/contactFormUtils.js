import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");
    const bodyContainer = document.querySelector("body");

    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
    }

    const displayModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.disablePageTabIndex();
        modal.classList.add('active');
        bodyContainer.classList.add("modal-open");
    }
    
    const closeModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.enablePageTabIndex();
        modal.classList.remove('active');
        bodyContainer.classList.remove("modal-open");
    }

    return { createEvents }

}