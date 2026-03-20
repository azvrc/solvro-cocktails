'use client';
 
import {useSearchParams, usePathname, useRouter} from 'next/navigation';
import {useDebouncedCallback} from "use-debounce";
 
export default function Search(){
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
 
  const handleSearch = useDebouncedCallback((term)=>{
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term){
        params.set('query', term);
    } else{
        params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
    }, 222);
    
    return(
        <div className="relative flex flex-1 shrink-0 rounded-[2rem] drop-shadow-xl bg-mode/30 backdrop-blur-md border border-deftxt/10">
        <label htmlFor="search" className="sr-only">
            Search
        </label>
        <input
            className="peer block w-full rounded-[2rem] py-[9px] pl-10 text-sm placeholder:text-gray-500"
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)}
            defaultValue={searchParams.get('query')?.toString()}
        />
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            ⌕
        </span>
        </div>
    );
}