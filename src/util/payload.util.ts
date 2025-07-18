export function parsePayload<T = any>(payload: string | T): T {
  return typeof payload === 'string' ? JSON.parse(payload) : { ...payload };
}
