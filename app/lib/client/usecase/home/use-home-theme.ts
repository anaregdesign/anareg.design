import { useEffect, useState } from "react";

import { themeRepository } from "./theme-repository";

export function useHomeTheme() {
  const [theme, setTheme] = useState(themeRepository.getRandomTheme());

  useEffect(() => {
    const handleScroll = () => {
      setTheme(themeRepository.getRandomTheme());
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return theme;
}
