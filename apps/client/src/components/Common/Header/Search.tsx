import { useSearchParams } from "next/navigation";
import { SearchIcon } from "../Icons";
import { useNavigate } from "@gamezone/lib";
import { categoryFilterKey, searchFilterKey, SHOP } from "@/constants";
import { useCallback, useEffect, useState } from "react";

export function SearchProduct() {
    const params = useSearchParams();
    const {navigate} = useNavigate();
    const [query, setQuery] = useState(()=> params.get(searchFilterKey) || "");
    
    const goToUrl = useCallback(() =>{
        // You can persist this in the URL
        const oldQuery = params.get(searchFilterKey) || "";
        const category = params.get(categoryFilterKey) || "";

        const search = new URLSearchParams(Array.from(params.entries()));

        if (Object.is(oldQuery, query)) return;

        // if (query) 
        
        search.set(searchFilterKey, query)
        
        if (category) search.set(categoryFilterKey, category);

    
        navigate(`${SHOP}?${search.toString()}`);
    }, [query]);

    useEffect(() => {
        const handler = setTimeout(goToUrl, 500);

        return () => clearTimeout(handler);
    }, [query]);
    
    return (
        <form
            onSubmit={(e)=>{
                e.preventDefault();
                goToUrl();
            }}
            className="relative max-w-[333px] sm:min-w-[333px] w-full"
        >
            {/* <!-- divider --> */}
            <span className="absolute left-0 top-1/2 -translate-y-1/2 inline-block w-px h-5.5 bg-gray-4"></span>
            <input
                // onChange={(e) => setSearchQuery(e.target.value)}
                // value={searchQuery}
                type="search"
                name={searchFilterKey}
                id="search"
                value={query}
                // defaultValue={params.get(searchFilterKey) ?? ""}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter product name"
                autoComplete="off"
                className="custom-search w-full rounded-r-[5px] bg-gray-1 !border-l-0 border border-gray-3 py-2.5 pl-4 pr-10 outline-none ease-in duration-200"
            />

            <button
                id="search-btn"
                type="submit"
                aria-label="Search"
                className="flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 ease-in duration-200 hover:text-blue"
            >
                <SearchIcon />
            </button>
        </form>
    );
}