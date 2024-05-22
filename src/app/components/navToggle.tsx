"use client";
import Image from "next/image";

export default function NavToggle() {
  const navToggle = () => {
    const asideElement = document.querySelector("aside");
    const maxSmallMediumWidth = 1024;

    if (window.innerWidth <= maxSmallMediumWidth && asideElement) {
      asideElement.classList.toggle("hidden");
      asideElement.classList.toggle("h-full");
      asideElement.classList.toggle("rounded-lg");
      asideElement.classList.toggle("shadow-lg");
    }
  };

  return (
    <a onClick={navToggle} className="flex ml-2 md:mr-24">
      <div className="h-12 w-12 mr-3">
        <Image
          className="rounded-full"
          src="https://avatars.githubusercontent.com/u/96122242?v=4"
          width={500}
          height={500}
          alt="Logo"
        />
      </div>
      <h1 className="hidden self-center whitespace-nowrap font-bold text-3xl sm:block lg:text-4xl">
        Store Management System
      </h1>
    </a>
  );
}
