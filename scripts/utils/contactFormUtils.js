import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");
    const bodyContainer = document.querySelector("body");
    const contactForm = document.querySelector("#contact-form");

    /**
     * Creates event listeners for contact modal
     */
    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
        contactForm.addEventListener("submit", formSubmitCallback);
    }

    const formSubmitCallback = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log({
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            email: formData.get("email"),
            contactMessage: formData.get("contactMessage")
        });
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