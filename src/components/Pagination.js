'use client';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Pagination({totalPages=15}){
    const searchParams = useSearchParams();
    const pathname=usePathname();
    const {replace}= useRouter();

    if(!totalPages || totalPages<=1) return null;
    const currentPage=Number(searchParams.get('page')) || 1;

    const createPageURL = (pageNumber) => {
        if(pageNumber<1 || pageNumber>totalPages) return;
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        replace(`${pathname}?${params.toString()}`);
    };

    const isFirstPage=currentPage<=1;
    const isLastPage=currentPage>=totalPages;

    return(
        <div className="mt-12 flex justify-center">
            <div className="flex items-center justify-center gap-4 my-8">
                <button
                    onClick={()=>createPageURL(1)}
                    disabled={isFirstPage}
                    className={`px-4 py-2 border rounded-full transition-all duration-200
                    ${isFirstPage ? 'opacity-20 text-deftxt cursor-not-allowed border-deftxt' : 'cursor-pointer hover:bg-txt1/20 border-txt2'}`}
                >
                    ❮❮
                </button>

                <button
                    onClick={()=>createPageURL(currentPage-1)}
                    disabled={isFirstPage}
                    className={`px-4 py-2 border rounded-full transition-all duration-200
                    ${isFirstPage ? 'opacity-20 text-deftxt cursor-not-allowed border-deftxt' : 'cursor-pointer hover:bg-txt1/20 border-txt2'}`}
                >
                    ❮
                </button>

                <span className="font-bold text-txt2">
                    Page {currentPage}
                </span>

                <button
                    onClick={()=>createPageURL(currentPage+1)}
                    disabled={isLastPage}
                    className={`px-4 py-2 border rounded-full transition-all duration-200
                    ${isLastPage ? 'opacity-20 text-deftxt cursor-not-allowed border-deftxt' : 'cursor-pointer hover:bg-txt1/20 border-txt2'}`}
                >
                    ❯
                </button>

                <button
                    onClick={()=>createPageURL(totalPages)}
                    disabled={isLastPage}
                    className={`px-4 py-2 border rounded-full transition-all duration-200
                    ${isLastPage ? 'opacity-20 text-deftxt cursor-not-allowed border-deftxt' : 'cursor-pointer hover:bg-txt1/20 border-txt2'}`}
                >
                    ❯❯
                </button>
            </div>
        </div>
    );
}