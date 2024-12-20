import ModalUtils from "./modalUtils.js";

export default function ContactFormUtils() {
    const modalUtils = ModalUtils();
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");
    const bodyContainer = document.querySelector("body");
    const contactForm = document.querySelector("#contact-form");
    const modal = document.querySelector("#contact_modal");

    /**
     * Creates event listeners for contact modal
     */
    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
        contactForm.addEventListener("submit", formSubmitCallback);

        document.addEventListener("keydown", closeModalKeyEvent);
    }

    /**
     * Form submission callback, logs data in the console
     * @param {*} e Event of the submission
     */
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
        modalUtils.disablePageTabIndex();
        modal.setAttribute("open", true);
        bodyContainer.classList.add("modal-open");
    }
    
    /**
     * Callback of clicking on close contact modal button event
     */
    const closeModal = () => {
        modalUtils.enablePageTabIndex();
        modal.removeAttribute("open")
        bodyContainer.classList.remove("modal-open");
    }

    const closeModalKeyEvent = (e) => {
        if (!modal.open === "true" || e.key !== "Escape") return;
        closeModal();
    }

    return { createEvents }

}