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
