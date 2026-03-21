'use client';
import {usePathname, useRouter, useSearchParams} from "next/navigation";

export default function Filter(){
    const pathname = usePathname();
    const {replace} = useRouter();
    const searchParams = useSearchParams();

    const currentAlcoholic = searchParams.get('alcoholic');

    const handleUpdate = (key, value)=>{
        const params = new URLSearchParams(searchParams);
        params.set('page','1');

        if(value && value != ""){
          if(key==='alcoholic' && currentAlcoholic===value){
            params.delete(key);
          }else{
            params.set(key, value);
          } 
        }else{
          params.delete(key)
        }
        replace(`${pathname}?${params.toString()}`);
    };

    return(
    <div className="flex flex-col gap-4 p-5 rounded-[2rem] mb-5 drop-shadow-xl bg-mode/30 backdrop-blur-md border border-deftxt/10">
      <h3 className="font-bold text-txt1 text-xl px-2 drop-shadow-lg">
        Filters:
      </h3>
      
      <div className="flex flex-wrap gap-3 text-txt1 items-center">
        <button onClick={() => handleUpdate('alcoholic', 'true')} className={`px-5 py-2 rounded-full transition-all duration-300 font-medium cursor-pointer border border-deftxt/10 drop-shadow-xl
        ${currentAlcoholic==='true' ? 'bg-txt1 text-mode shadow-inner scale-95' : 'bg-mode/40 text-txt1 hover:bg-txt2/10'}`}>
          Alcoholic
        </button>
        <button onClick={() => handleUpdate('alcoholic', 'false')} className={`px-5 py-2 rounded-full transition-all duration-300 font-medium cursor-pointer border border-deftxt/10 drop-shadow-xl
        ${currentAlcoholic==='false' ? 'bg-txt1 text-mode shadow-inner scale-95' : 'bg-mode/40 text-txt1 hover:bg-txt2/10'}`}>
          Non-alcoholic
        </button>

        <div className="h-8 w-[1px] bg-txt2/20 mx-2 hidden md:block" />
        <select
          onChange={(e) => handleUpdate('category', e.target.value)}
          className="px-4 py-2 rounded-full text-txt2 bg-mode font-medium cursor-pointer border border-deftxt/10 drop-shadow-xl"
          value={searchParams.get('category') || ""}
        >
          <option value="" disabled hidden>Choose a category</option>
          <option value="" className="text-gray-500 italic">All categories</option>
          <option value="Cocktail">Cocktail</option>
          <option value="Ordinary Drink">Ordinary Drink</option>
          <option value="Punch / Party Drink">Punch / Party Drink</option>
          <option value="Shake">Shake</option>
          <option value="Other / Unknown">Other / Unknown</option>
          <option value="Cocoa">Cocoa</option>
          <option value="Shot">Shot</option>
          <option value="Coffee / Tea">Coffee / Tea</option>
          <option value="Homemade Liqueur">Homemade Liqueur</option>
          <option value="Soft Drink">Soft Drink</option>
        </select>
      </div>
    </div>
  );
}