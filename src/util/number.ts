export function toNum(v: unknown): number {
  return typeof v === 'number' ? v : Number(v ?? 0);
}
