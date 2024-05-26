export default function navToggle() {
  const asideElement = document.querySelector("aside");
  const navContent = document.querySelector("#navContent");
  const maxSmallMediumWidth = 1023;

  if (window.innerWidth <= maxSmallMediumWidth && asideElement && navContent) {
    asideElement.classList.toggle("hidden");
    navContent.classList.toggle("hidden");
    asideElement.classList.toggle("h-full");
    asideElement.classList.toggle("rounded-lg");
    asideElement.classList.toggle("shadow-lg");
  }
}
