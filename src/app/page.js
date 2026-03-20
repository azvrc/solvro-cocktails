'use client';
import {useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import Pagination from "@/components/Pagination"
import Search from "@/components/Search"
import Filter from "@/components/Filter"
import CocktailCard from "@/components/CocktailCard"
import FavoriteList from "@/components/FavoriteList";
import ColorMode from "@/components/ColorMode";
import {getCocktails} from "@/lib/api";

export default function Home(){
  const searchParams = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';
  const alcoholic = searchParams.get('alcoholic') || '';
  const category = searchParams.get('category') || '';

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['cocktails', currentPage, query, alcoholic, category],
    queryFn: ()=>getCocktails({
      page: currentPage,
      query,
      alcoholic,
      category
    })
  });

  const totalPages = data?.meta?.lastPage || 1;
  const cocktailsToDisplay = data?.data || [];

  return(
    <main className="container mx-auto px-8 py-8 min-h-screen bg-fixed bg-cover bg-center">
      <header className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
        <h1 className="text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-txt2 to-txt1 drop-shadow-lg">
          SOLVRO COCKTAILS
        </h1>

        <div className="flex-1 w-full md:max-w-md flex items-center gap-4">
          <Search />
          <ColorMode/>
        </div>
        <FavoriteList/>
      </header>

      <section className="mb-8">
        <Filter/>
      </section>

      {isLoading ? (
        <div className="flex justify-center py-20 text-txt2 font-bold animate-pulse">
          Loading cocktails...
        </div>
      ) : isError ? (
        <div className="text-center text-txt2 p-6 rounded-xl">
          Error: {error.message}
        </div>
      ) : (
        <>
        {cocktailsToDisplay.length>0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4">
            {cocktailsToDisplay.map(cocktail=>(
              <CocktailCard key={cocktail.id} cocktail={cocktail} />
            ))}
          </ul>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-deftxt bg-mode/20 rounded-[3rem] backdrop-blur-sm border border-deftxt/10">
              <span className="text-6xl mb-4">
                ⌕
              </span>
              <h2 className="text-2xl font-bold">
                No cocktails found
              </h2>
              <p className="text-deftxt/50">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
          <Pagination totalPages={totalPages} />
        </>
      )}
    </main>
  );
}