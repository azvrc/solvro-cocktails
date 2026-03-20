'use client';
import { useEffect, useState } from "react";

export default function ColorMode(){
  const [isDark, setIsDark] = useState(false);

  useEffect(()=>{
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)){
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme=()=>{
    if (isDark){
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else{
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return(
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-12 h-12 text-2xl bg-bg2/20 text-txt2 border border-txt1/30 rounded-full transition-all duration-300 hover:scale-110 hover:bg-bg2/40 shadow-md"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? "⛭" : "⏾"}
    </button>
  );
}