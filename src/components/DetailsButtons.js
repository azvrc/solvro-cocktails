'use client';
import { useRouter } from "next/navigation";
import { Favorite } from "./Favorite";

export default function DetailsButtons({ id, name }){
  const router = useRouter();
  
  return(
    <div className = "flex flex-wrap gap-6 mt-12 w-full justify-center">
      <button 
        onClick={()=>router.back()}
        className = "flex items-center gap-2 px-8 py-3 bg-bg2/20 hover:bg-bg2/40 text-txt2 font-bold rounded-2xl transition-all hover:-translate-x-1 border border-txt1/20 backdrop-blur-sm cursor-pointer"
      >
        ← Back to the list
      </button>

      <div className="px-8 py-3 bg-mode/40 rounded-2xl shadow-lg border border-txt1/20 flex items-center gap-3 cursor-pointer">
         <Favorite id={id} name={name} />
      </div>
    </div>
  );
}