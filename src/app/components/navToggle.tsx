"use client";
import Image from "next/image";
import navToggle from "../hooks/useNavTog";

export default function NavToggle() {
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
