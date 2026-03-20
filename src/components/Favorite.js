'use client';
import {useState, useEffect} from 'react';

export function Favorite({id, name}){
    const [isFav, setIsFav] = useState(false);
    useEffect(()=>{
        const checkStatus=()=>{
            const savedFavs=JSON.parse(localStorage.getItem('fav_cocktails')||'[]');
            if (savedFavs.some(fav => fav?.id === id)){
                setIsFav(true);
            }
        };
        checkStatus();
        
        return()=>window.removeEventListener('storage', checkStatus);
    },[id]);

    const toggleFavs=()=>{
        let savedFavs=JSON.parse(localStorage.getItem('fav_cocktails')||'[]');
        if(isFav){
            savedFavs=savedFavs.filter(fav=>fav?.id!==id);
        }else{
            savedFavs.push({id, name});
        }
        localStorage.setItem('fav_cocktails', JSON.stringify(savedFavs));
        window.dispatchEvent(new Event("storage"));
        setIsFav(!isFav);
    };

    return(
        <button onClick={toggleFavs} className="text-l text- hover: transition-transform cursor-pointer">
            {isFav ? '♥ Remove From Favorites':'♡ Add To Favorites'}
        </button>
    );
}