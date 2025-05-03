import React, { useEffect, useRef, useState } from 'react';
import { fetchSongs } from '../services/apiService';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import ListItemView from '../components/ListItemView';

function SearchScreen({ query, resetSearch }) {
  const [songs, setSongs] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    if (!query) {
      setSongs([])
      return
    }

    fetchSongs(query)
      .then((fetchedSongs) => {
        console.log('Fetched songs:', fetchedSongs)
        setSongs(fetchedSongs)
      })
      .catch((error) => {
        console.error('Error fetching songs:', error)
        setSongs([])
      })
  }, [query])

  return (
    // <h1>Action kamen</h1>
    <Box
      ref={containerRef}
      onWheel={(e) => {
        if (containerRef.current) {
          e.preventDefault()
          containerRef.current.scrollLeft += e.deltaY
        }
      }}
      sx={{
        overflowX: 'auto',
        width: '100%',
        py: 2,
        '&::-webkit-scrollbar': { display: 'none' },
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}
    >
      {[0, 1, 2].map((row) => (
        <Grid
          container
          spacing={2}
          key={row}
          sx={{
            justifyContent: 'center',
            // display: 'flex',
            // flexWrap: 'nowrap',
            // margin: "auto",
            mb: 2,
            px: 2,
            // width: 'max-content'
          }}
        >
          {songs.slice(row * 3, row * 3 + 3).map((song) => (
            <Grid
              item
              key={song.id}
              sx={{
                minWidth: 200,
                flexShrink: 0
              }}
            >
              <ListItemView
                song={song}
                resetSearch={resetSearch}
              />
            </Grid>
          ))}
        </Grid>
      ))}
    </Box>
  )
}


export default SearchScreen;
