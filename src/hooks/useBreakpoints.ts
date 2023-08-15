import { debounce } from "@/utils";
import { useState, useEffect } from "react";

const breakpoints = {
  none: {
    name: "none",
    value: 0,
  },
  XS: {
    name: "xs",
    value: 480,
  },
  SS: {
    name: "ss",
    value: 620,
  },
  SM: {
    name: "sm",
    value: 768,
  },
  MD: {
    name: "md",
    value: 1060,
  },
  LG: {
    name: "lg",
    value: 1200,
  },
  XL: {
    name: "xl",
    value: 1360,
  },
};

interface Props {
  timeDebounce?: number;
}

const useBreakpoints = ({ timeDebounce = 200 }: Props = {}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string | null>(
    () => getCurrentBreakpoint(window.innerWidth),
  );

  function getCurrentBreakpoint(width: number): string | null {
    const matchingBreakpoint = Object.entries(breakpoints).find(
      ([, breakpoint]) => width < breakpoint.value,
    );

    return matchingBreakpoint?.[1]?.name ?? null;
  }

  useEffect(() => {
    const handleResize = () => {
      setCurrentBreakpoint(getCurrentBreakpoint(window.innerWidth));
    };

    const debouncedHandleResize = debounce(handleResize, timeDebounce);
    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [timeDebounce]);

  return {
    currentBreakpoint,
    breakpoints,
  };
};

export default useBreakpoints;
