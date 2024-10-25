import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");

    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
    }

    const displayModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.disablePageTabIndex();
        modal.classList.add('active');
    }
    
    const closeModal = () => {
        const modal = document.querySelector("#contact_modal");
        modalUtils.enablePageTabIndex();
        modal.classList.remove('active');
    }

    return { createEvents }

}