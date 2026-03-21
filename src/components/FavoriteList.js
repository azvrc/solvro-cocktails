'use client';
import {useEffect, useState} from 'react';
import Link from "next/link";

export default function FavoriteList(){
    const [isOpen, setIsOpen]=useState(false);
    const [favs, setFavs]=useState([]);

    const loadFavs=()=>{
        const rawData=localStorage.getItem('fav_cocktails');
        if (!rawData){
            setFavs([]);
            return;
        }

        try{
            const data = JSON.parse(rawData);
            const cleanData = Array.isArray(data) ? data.filter(item=>item && item.id) : [];
            setFavs(cleanData);
        } catch(e){
            console.error("Error parsing favorites", e);
            setFavs([]);
        }
    };

    useEffect(()=>{
        loadFavs();
        window.addEventListener("storage", loadFavs);
        return () => window.removeEventListener("storage", loadFavs);
    }, []);

    const toggleMenu=()=>{
        if(!isOpen) loadFavs();
        setIsOpen(!isOpen);
    };

    return(
        <div className="relative">
            <button onClick={toggleMenu} className="p-2 cursor-pointer">
                ♥ ({favs.length})
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-mode shadow-xl rounded-lg border p-4 z-50">
                    <h4 className="font-bold border-bottom pb-2 mb-2 text-deftxt">
                        Favorites:
                    </h4>
                    {favs.length===0 ? (
                        <p className="text-deftxt/50 text-sm">
                            No favorites selected
                        </p>
                    ) : (
                        <ul className="flex flex-col gap-2">
                            {favs.filter((fav, index, self)=>
                            fav && fav.id && self.findIndex(f=>f.id===fav.id)===index).map(fav=>(
                                <li key={fav.id} className="border-b last:border-b-0 pb-1 border-deftxt/20">
                                    <Link className="text-txt2 hover:underline text-sm"
                                    href={`/cocktail/${fav.id}`}
                                    onClick={()=>setIsOpen(false)}>
                                        {fav.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}