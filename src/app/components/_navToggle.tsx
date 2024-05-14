"use client";

export default function NavToggle() {
  function toggleShowHide(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      if (element.style.display === "none") {
        element.style.display = ""; // Reset display for browser-specific defaults
      } else {
        element.style.display = "none";
      }
    } else {
      console.warn(`Element with ID "${elementId}" not found.`);
    }
  }

  const toggleButton = document.getElementById("toggleButton");
  const contentElement = document.getElementById("content");

  if (toggleButton && contentElement) {
    toggleButton.addEventListener("click", () => {
      toggleShowHide("content");
    });
  }

  return (
    <button id="toggleButton">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="block lg:hidden w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
        fill="var(--primary-bright)"
        viewBox="0 0 24 24"
      >
        <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"></path>
      </svg>
    </button>
  );
}
