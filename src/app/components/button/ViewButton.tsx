import Link from "next/link";

export default function ViewButton({ refto }: { refto: string }) {
  return (
    <Link href={refto}>
      <button className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
        View
      </button>
    </Link>
  );
}
