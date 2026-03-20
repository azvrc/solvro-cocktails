export default function Details({cocktail}){
    if(!cocktail) return null;

    return(
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 items-stretch">
        <div className="w-full h-[400px] lg:h-auto">
            <img 
            src={cocktail.imageUrl} 
            alt={cocktail.name} 
            className="rounded-[3rem] shadow-2xl w-full h-full object-cover border border-txt1/10"
            />
        </div>
        
         <div className="bg-mode/30 backdrop-blur-md p-8 lg:p-12 rounded-[3rem] shadow-xl border border-deftxt/5 flex flex-col justify-center">
            <h1 className="text-5xl lg:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-txt1 to-txt2 drop-shadow-lg pb-3 leading-tight">
                {cocktail.name}
            </h1>
                
            <div className="flex flex-wrap gap-3 mb-8 text-txt1 font-bold">
                <span className="px-5 py-2.5 bg-bg1 text-txt2 rounded-full text-md shadow-sm border border-txt1/10">
                    {cocktail.category}
                </span>
                <span className="px-5 py-2.5 bg-bg1 text-txt2 rounded-full text-md shadow-sm border border-txt1/10">
                    {cocktail.alcoholic ? "Alcoholic" : "Non-alcoholic"}
                </span>
            </div>
            
            <h2 className="text-3xl font-bold mb-4 text-txt2">
                Ingredients:
            </h2>
            <ul className="text-deftxt text-lg lg:text-xl list-disc pl-6 mb-10 space-y-2 marker:text-txt1">
                {cocktail.ingredients?.map((ing, index)=>(
                    <li key={index}>
                        <span className="font-bold">
                            {ing.name}
                        </span> 
                        {ing.measure ? ` - ${ing.measure}` : ''}
                    </li>
                ))}
                </ul>
                
                <h2 className="text-3xl font-bold mb-4 text-txt2">
                    Instructions:
                </h2>
                <p className="text-deftxt text-lg lg:text-xl leading-relaxed opacity-90">
                    {cocktail.instructions}
                </p>
            </div>
        </div>
    );
}