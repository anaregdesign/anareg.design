import { useEffect, useState } from "react";

import { getRandomHomeTheme } from "./home-theme";

export function useHomeTheme() {
  const [theme, setTheme] = useState(getRandomHomeTheme());

  useEffect(() => {
    const handleScroll = () => {
      setTheme(getRandomHomeTheme());
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return theme;
}
