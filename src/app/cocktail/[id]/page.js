import Details from "@/components/Details";
import DetailsButtons from "@/components/DetailsButtons";

export default async function CocktailDetails({ params }) {
  const { id } = await params;

  const res = await fetch(`https://cocktails.solvro.pl/api/v1/cocktails/${id}`,{ cache: 'no-store'});

  if (!res.ok){
    return(
      <div className="min-h-screen flex items-center justify-center text-txt2 font-bold text-2xl">
        Cocktail not found (Status: {res.status})
      </div>
    );
  }

  const object = await res.json();
  const cocktail = object.data;

  return(
  <div className="min-h-screen flex flex-col items-center justify-center p-6 lg:p-12">
    <Details cocktail={cocktail}/>
    <DetailsButtons id={cocktail.id} name={cocktail.name}/>
  </div>
  );
}