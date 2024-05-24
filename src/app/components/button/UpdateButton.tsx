import Link from "next/link";

export default function UpdateButton({ refto }: { refto: string }) {
  return (
    <Link href={refto}>
      <button className="px-4 py-2 bg-yellow-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-300">
        Update
      </button>
    </Link>
  );
}
