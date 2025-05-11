export async function fetchSongs(query) {
	const response = await fetch(`/search/${query}?count=10`)
	const data = await response.json()
	return data
}