import { useEffect, useRef, useState } from 'react'
import { Box, darken, IconButton, lighten, TextField, Typography } from '@mui/material'
import logoIcon from '../icons/logo_icon.png'
import logoText from '../icons/logo_text.png'
import { HomeRounded, LibraryMusic, Person } from '@mui/icons-material'
import { useScreenWidth, pageStore } from './utils'
import { argbToHex, isDarkMode, md3Colors } from './colors'
import SearchScreen from '../screens/SearchScreen'
import { useNavigate } from 'react-router-dom'


function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const screenWidth = useScreenWidth()
  const isMobile = screenWidth < 700
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = pageStore()
  const inputRef = useRef(null)

  const resetSearch = () => setSearchQuery('')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 's' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const gotoHome = () => {
    navigate('/home')
    resetSearch()
    setCurrentPage('home')
    console.log('navigating to Home')
  }

  const gotoLibrary = () => {
    navigate('/library')
    resetSearch()
    setCurrentPage('library')
    console.log('navigating to Library')
  }

  const gotoSearch = () => {
    setCurrentPage('search')
    navigate('/search')
    resetSearch()
    console.log('navigating to Search')
  }

  // const fetchSearchResults = async (query) => {
  //   if (!query) return
  //   console.log(`Fetching data for: ${query}`)
  //   const data = fetchSongs(query)
  //   console.log(data)
  // };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value)
  //   fetchSongs(searchQuery).then(data => {
  //     console.log('Fetched songs in Header:', data)
  //     console.log(data)
  //   })
  //   console.log(fetchSongs(e.target.value))
  //   fetchSearchResults(e.target.value)
  // }

  // const handleSearchSubmit = (e) => {
  //   if (e.key === 'Enter' && searchQuery.trim()) {
  //     navigate(`/?q=${encodeURIComponent(searchQuery.trim())}`);
  //     setSearchQuery('');
  //   }
  // }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: lighten(argbToHex(md3Colors.primaryContainer), 0.2),
          backgroundColor: argbToHex(md3Colors.primaryContainer),
          color: argbToHex(md3Colors.onPrimaryContainer),
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.20)',
          padding: '1rem',
          borderBottomRightRadius: '32px',
          borderBottomLeftRadius: '32px',
        }}
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
          <img
            src={logoIcon}
            height={60}
            alt='Logo'
            onClick={gotoSearch}
            style={{
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              marginRight: '10px',
              borderRadius: '16px',
              cursor: 'pointer'
            }}
          />
          {isMobile ? null :
            <img
              src={logoText}
              height={60}
              alt='Logo'
              onClick={gotoSearch}
              style={{
                height: '50px',
                display: 'flex',
                alignItems: 'center',
                marginRight: '10px',
                borderRadius: '16px',
              }}
            />
          }
        </span>

        <Box sx={{
          position: 'relative',
          width: isMobile ? '100%' : '40%'
        }}>
          <TextField
            inputRef={inputRef}
            id='searchField'
            label='Search for a song, artist, or album'
            variant='filled'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              width: '100%',
              fontSize: '1.5rem',
              '& .MuiFilledInput-root': {
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: isDarkMode
                  ? lighten(argbToHex(md3Colors.primaryContainer), 0.1)
                  : null,
                '&:hover': {
                  backgroundColor: isDarkMode
                    ? lighten(argbToHex(md3Colors.primaryContainer), 0.2)
                    : null,
                },
                '&.Mui-focused': {
                  backgroundColor: isDarkMode
                    ? lighten(argbToHex(md3Colors.primaryContainer), 0.1)
                    : null,
                },
              },
              '& .MuiFilledInput-input': {
                color: argbToHex(md3Colors.onPrimaryContainer),
                padding: '16px 10px 10px',
                paddingRight: '40px', // Make space for the hint
              },
              '& .MuiInputLabel-root': {
                color: darken(argbToHex(md3Colors.onPrimaryContainer), 0.3),
                fontSize: '0.9rem',
                '&.Mui-focused': {
                  color: darken(argbToHex(md3Colors.onPrimaryContainer), 0.2),
                },
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              right: 12,
              top: '50%',
              transform: 'translateY(-75%)',
              color: darken(argbToHex(md3Colors.onPrimaryContainer), 0.5),
              fontSize: '0.8rem',
              pointerEvents: 'none',
              backgroundColor: isDarkMode
                ? darken(argbToHex(md3Colors.primaryContainer), 0.05)
                : lighten(argbToHex(md3Colors.primaryContainer), 0.05),
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            S
          </Box>
        </Box>
        {isMobile ? null :
          <span
            style={{
              display: 'flex',
              width: '15%',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              flexDirection: 'row'
            }}
          >
            <span
              onClick={
                gotoHome
              }
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <IconButton
                sx={{
                  // fontSize: '1.75rem',
                  // cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  height: '60px',
                  width: '60px',
                }}
              >
                <HomeRounded
                  sx={{
                    fontSize: '1.6rem',
                    color: argbToHex(md3Colors.primary),
                    backgroundColor: currentPage === 'home'
                      ? isDarkMode
                        ? lighten(argbToHex(md3Colors.secondaryContainer), 0.16)
                        : darken(argbToHex(md3Colors.secondaryContainer), 0.16)
                      : null,
                    width: '50px',
                    borderRadius: '16px',

                  }}
                />
                <Typography variant='body2' color={argbToHex(md3Colors.onPrimaryContainer)}> Home </Typography>
              </IconButton>
            </span>
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',

              }}
            >
              <IconButton
                onClick={gotoLibrary}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '16px',
                  height: '60px',
                  width: '60px',
                }}
              >
                <LibraryMusic
                  style={{
                    fontSize: '1.6rem',
                    cursor: 'pointer',
                    color: argbToHex(md3Colors.primary),
                    backgroundColor: currentPage === 'library'
                      ? isDarkMode
                        ? lighten(argbToHex(md3Colors.secondaryContainer), 0.16)
                        : darken(argbToHex(md3Colors.secondaryContainer), 0.16)
                      : null,
                    width: '50px',
                    borderRadius: '16px',
                  }}
                />
                <Typography variant='body2' color={argbToHex(md3Colors.onPrimaryContainer)}> Library </Typography>
              </IconButton>
            </span>
          </span>
        }


        <IconButton
          onClick={() => alert('Not implemented 😛')}
          style={{
            // marginLeft: '10px',
            backgroundColor: md3Colors.secondary,
            borderRadius: '16px',
            height: '50px',
            width: '50px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Person
            style={{
              fontSize: '2.5rem'
            }}
          />
        </IconButton>
      </div>
      {searchQuery ?
        <SearchScreen
          query={searchQuery}
          resetSearch={resetSearch}
        /> : null
      }
    </div>
  )
}

export default Header