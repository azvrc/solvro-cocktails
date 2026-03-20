'use client';
import Link from "next/link";
import {useState} from "react";
import {Favorite} from "@/components/Favorite";

export default function CocktailCard({cocktail}){
  const [isActive, setIsActive]=useState(false);

  return(
    <div className={`relative group aspect-square overflow-hidden rounded-3xl
    ${isActive ? "transition duration-300 shadow-none hover:shadow-2xl" : "shadow-md hover:shadow-xl"}`}
    onClick={()=>setIsActive(!isActive)}
    >
      <img className={`w-full h-full object-cover transition-all duration-400
      ${isActive ? "scale-105 blur-xs brightness-75" : "group-hover:scale-105 group-hover:blur-xs group-hover:brightness-75"}`}
      src={cocktail.imageUrl} 
      alt={cocktail.name}
      />

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="text-white font-bold text-lg drop-shadow-xl truncate">
          {cocktail.name}
        </h3>
      </div>

      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300
      ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
      >
        <Link className="text-center backdrop-blur-md px-5 py-2 rounded-full transition-colors text-m font-medium bg-black/20 text-white hover:bg-white/50 hover:text-black"
        href={`/cocktail/${cocktail.id}`}
        onClick={(e)=>e.stopPropagation()}
        >
          ⓘ See Details
        </Link>

        <div className="flex justify-center backdrop-blur-md px-5 py-2 rounded-full transition-colors bg-black/20 text-white hover:bg-white/50 hover:text-black"
        onClick={(e)=>e.stopPropagation()}
        >
          <Favorite id={cocktail.id} name={cocktail.name}/>
        </div>
      </div>
    </div>
  );
}