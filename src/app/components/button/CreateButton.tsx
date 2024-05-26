import Link from "next/link";

export default function CreateButton(refto: { refto: string; page: string }) {
  return (
    <Link href={refto.refto}>
      <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <div className="max-sm:hidden">Add {refto.page}</div>
      </button>
    </Link>
  );
}
