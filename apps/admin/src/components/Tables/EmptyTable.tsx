import { TableRow } from "../ui/table";

export default function EmptyRow() {
    return (
        <div
            className="border-[#eee] dark:border-dark-3 max-w-[500px] h-[250px] flex items-center justify-center mx-auto bg-white p-4 rounded-md"
        >
            <div className="flex flex-col items-center justify-center space-y-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        strokeWidth="2"
                        d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V5a2 2 0 012-2h6l5 5v11a2 2 0 01-2 2z"
                    />
                </svg>
                <p className="text-sm">
                    No items found. Add new entries to populate this table.
                </p>
            </div>
        </div>
    );
}