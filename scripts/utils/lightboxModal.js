export default function LightboxModalUtils() {
  const lightboxModal = document.querySelector("#lightbox_modal");

  function displayData(src, alt, id) {
    lightboxModal.classList.add("active");

    lightboxModal.setAttribute("src", src);
    lightboxModal.setAttribute("alt", alt);
    
    console.log(src, alt, id);
  
  }

  return { displayData }

}