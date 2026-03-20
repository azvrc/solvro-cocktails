export const getCocktails = async({page='1', query='', alcoholic='', category=''})=>{
  let apiUrl = `https://cocktails.solvro.pl/api/v1/cocktails?page=${page}`;

  if(query){
    apiUrl+=`&name=%${query}%`;
  }
  if(alcoholic){
    apiUrl+=`&alcoholic=${alcoholic}`;
  }
  if(category){
    apiUrl+=`&category=${category}`;
  }

  const res=await fetch(apiUrl);
  
  if(!res.ok){
    throw new Error(`Failed to fetch cocktails: ${res.status}`);
  }
  
  return res.json();
};