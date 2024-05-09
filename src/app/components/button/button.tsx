"use client";

export default function Button() {
  return (
    <>
      <button
        aria-expanded="true"
        aria-controls="sidebar"
        className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100"
      >
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        ></svg>
      </button>
    </>
  );
}
