import Link from "next/link";
import { Category } from "../types/category";

export default function CardCategory({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col items-center justify-center text-center border border-gray-100"
    >
      <div className="text-4xl mb-2">{category.icon}</div>
      <h3 className="text-sm font-medium text-gray-800">{category.name}</h3>
    </Link>
  );
}
