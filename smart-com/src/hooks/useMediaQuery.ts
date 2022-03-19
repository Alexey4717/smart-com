import { useState, useEffect } from "react";

const useMediaQuery = (query: string): boolean => {

  const [matches, setMatches] = useState(false);
  const queryString = query.replace('@media ', '');

  useEffect(() => {
    const media = window.matchMedia(queryString);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);

  return matches;
};

export default useMediaQuery;