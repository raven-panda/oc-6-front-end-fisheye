export default function LightboxModalUtils() {
  const lightboxModal = document.querySelector("#lightbox_modal");
  const bodyContainer = document.querySelector("body");
  const pictureElement = lightboxModal.querySelector(".lightbox_modal-picture-navigation img");
  const closeModalButton = lightboxModal.querySelector("#lightbox_modal-close-btn");

  function displayData(src, alt, id) {
    lightboxModal.classList.add("active");
    bodyContainer.classList.add("modal-open");

    pictureElement.setAttribute("src", src);
    pictureElement.setAttribute("alt", alt);
  }

  function closeModal() {
    lightboxModal.classList.remove("active");
    bodyContainer.classList.remove("modal-open");
  }

  function createEvents() {
    closeModalButton.addEventListener("click", closeModal);
  }

  return { displayData, closeModal, createEvents }

}