import { useState, useEffect, useRef } from "react";

const useElementWidth = () => {

  const ref: any = useRef();
  const [width, setWidth] = useState<null | number>(null);

  const observer = useRef(
    new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    })
  );

  useEffect(() => {
    observer.current.observe(ref.current);
  },
    [ref, observer]);

  return [ref, width];
};

export default useElementWidth;