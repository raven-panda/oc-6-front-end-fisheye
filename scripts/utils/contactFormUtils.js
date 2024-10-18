export default function ContactFormUtils() {
    const closeContactModalButton = document.querySelector("#closeContactModalButton");
    const openContactModalButton = document.querySelector("#contactButton");

    function displayModal() {
        const modal = document.querySelector("#contact_modal");
        modal.classList.add('active');
    }
    
    function closeModal() {
        const modal = document.querySelector("#contact_modal");
        modal.classList.remove('active');
    }

    function createEvents() {
        closeContactModalButton.addEventListener("click", closeModal);
        openContactModalButton.addEventListener("click", displayModal);
    }

    return { createEvents }

}