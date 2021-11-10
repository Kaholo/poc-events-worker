const testFun = (a: number, b: { c: string, d: any }): boolean => {
  console.info(a, b);
  return false;
}

setInterval(() => testFun(7, {c: "ala", d: 4}), 1000);
