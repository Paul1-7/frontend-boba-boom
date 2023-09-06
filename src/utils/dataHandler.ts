export function isActivePathname(currentPath: string, targetPath: string) {
  const pathnameArray = currentPath.split("/");
  const lastsegmentPath = pathnameArray[pathnameArray.length - 1];
  return targetPath.includes(lastsegmentPath);
}

export const debounce = (fn: (...args: unknown[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null;
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, delay);
  };
};

export const formatCurrencyToBOB = (value: number) =>
  new Intl.NumberFormat("es-BO", { style: "currency", currency: "BOB" }).format(
    value,
  );


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export  const objectByString = (o:{[x:string]:any}, s:string) => {
  s = s.replace(/\[(\w+)\]/g, '?.$1'); 
  s = s.replace(/^\./, ''); 
  const a = s.split('.');
  
  a.forEach(k => {
    if (typeof o === 'undefined') return null;
    if (k in o) {
      o = o[k];
    } else {
      return null;
    }
  });
  
  return o;
};