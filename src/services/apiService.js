export async function fetchSongs(query) {
  const response = await fetch(`/search/${query}?count=10`)
  return await response.json()
}
