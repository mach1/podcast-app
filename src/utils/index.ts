export function getSearchString<T>(options: T): string {
  return Object.keys(options)
    .map(key => `${key}=${encodeURIComponent(options[key])}`)
    .join('&')
}
