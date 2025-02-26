const e2p = (s: number) =>
  s.toString().replace(/\d/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹"[d]);

const p2e = (s: any) =>
  s.toString().replace(/[۰-۹]/g, (d: string) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

const sp = (number: any) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber?.join(",");
  return e2p(joinedNumber);
};

export { e2p, p2e, sp };
