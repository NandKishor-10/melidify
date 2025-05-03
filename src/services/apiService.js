export async function fetchSongs(query) {
    const response = await fetch(`/search/${query}?count=10`);
    const data = await response.json();  // Parse the JSON response
    return data;  // Return the array directly since the response is a list of songs
}

