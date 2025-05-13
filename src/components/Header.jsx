import { useEffect, useRef, useState } from 'react'
import { Box, darken, IconButton, lighten, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import logoIcon from '../assets/logo_icon.png'
import logoText from '../assets/logo_text.png'
import { HomeRounded, LibraryMusic, Person } from '@mui/icons-material'
import { pageStore } from './utils'
import { argbToHex, isDarkMode, md3Colors } from './colors'
import SearchScreen from '../screens/SearchScreen'
import { useNavigation } from './Navigation'


function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [searchQuery, setSearchQuery] = useState('')
  const { currentPage } = pageStore()
  const inputRef = useRef(null)
  const { gotoHome, gotoLibrary, gotoSearch } = useNavigation()
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
            onClick={() => gotoSearch(resetSearch)}
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
              onClick={() => gotoSearch(resetSearch)}
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
                paddingRight: '40px',
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
          {!isMobile &&
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
            </Box>}
        </Box>
        {!isMobile &&
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
              onClick={() => gotoHome(resetSearch)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <IconButton
                sx={{
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
                onClick={() => gotoLibrary(resetSearch)}
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
      {searchQuery &&
        <SearchScreen
          query={searchQuery}
          resetSearch={resetSearch}
        />
      }
    </div>
  )
}

export default Header