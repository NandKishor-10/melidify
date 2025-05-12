import React, { useRef, useState, useEffect } from 'react'
import {
  Box, Typography, Button, Container, useMediaQuery, useTheme,
  Grow, Slide, IconButton, lighten, darken, AppBar, Toolbar,
  Dialog, DialogTitle, DialogContent
} from '@mui/material'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { argbToHex, isDarkMode, md3Colors } from '../components/colors'
import logoIcon from '../assets/logo_icon.png'
import { popAnimation, floatAnimation } from '../components/Animation'
import { LandingAbout, LandingHome, LandingContact } from '../components/LandingComp'

function LandingScreen() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [pop, setPop] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogContent, setDialogContent] = useState('')
  const [notes, setNotes] = useState([])
  const song = {
    title: 'Ajeeb Dastan Hai Yeh',
    artist: 'Lata Mangeshkar',
    imageUri: 'https://t2.genius.com/unsafe/404x0/https%3A%2F%2Fimages.genius.com%2F6a58ad04fb6fe3d5feabb1ac3aecb52a.1000x1000x1.png',
    audioUri: 'https://aac.saavncdn.com/332/e6f43b2eff51f61d585b438c0e5c9baf_320.mp4'
  }

  useEffect(() => {
    const generatedNotes = []
    const noteSymbols = ['🎼', '🎵', '🎶', '♭', '♯', '♩', '♪', '♫']
    const numNotes = isMobile ? 15 : 30

    for (let i = 0; i < numNotes; i++) {
      generatedNotes.push({
        id: i,
        symbol: noteSymbols[Math.floor(Math.random() * noteSymbols.length)],
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${8 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 10}s`,
        fontSize: `${16 + Math.random() * (isMobile ? 16 : 24)}px`,
        color: isDarkMode
          ? lighten(argbToHex(md3Colors.secondary), 0.4)
          : darken(argbToHex(md3Colors.secondary), 0.2),
      });
    }
    setNotes(generatedNotes)
  }, [isDarkMode, isMobile])

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setPop(true)
      setTimeout(() => setPop(false), 300)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (label) => {
    if (label === 'Home') {
      setDialogContent(
        <LandingHome />
      )
    } else if (label === 'About') {
      setDialogContent(
        <LandingAbout />
      )
    } else if (label === 'Contact') {
      setDialogContent(
        <LandingContact />
      )
    }
    setDialogOpen(true)
  }

  return (
    <Box
      bgcolor={isDarkMode
        ? darken(argbToHex(md3Colors.primaryContainer), 0.3)
        : lighten(argbToHex(md3Colors.primaryContainer), 0.2)}
      minHeight={'100vh'}
      overflow={'hidden'}
      display={'flex'}
      alignItems={'center'}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        {notes.map(note => (
          <Box
            key={note.id}
            sx={{
              position: 'absolute',
              top: note.top,
              left: note.left,
              fontSize: note.fontSize,
              color: note.color,
              animation: `${floatAnimation} ${note.animationDuration} ${note.animationDelay} infinite linear`,
              opacity: 0, 
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            {note.symbol}
          </Box>
        ))}
      </Box>

      <AppBar position='absolute' sx={{ backgroundColor: 'transparent', boxShadow: 'none', }}>
        <Toolbar sx={{ justifyContent: 'center', gap: 8 }}>
          {['Home', 'About', 'Contact'].map((label) => (
            <Button
              key={label}
              onClick={() => handleNavClick(label)}
              sx={{
                textTransform: 'none',
                borderBottom: '2px solid',
                borderColor: argbToHex(md3Colors.primary),
                color: argbToHex(md3Colors.primary),
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {label}
            </Button>
          ))}
        </Toolbar>
      </AppBar>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}

        slotProps={{
          paper: {
            sx: {
              borderRadius: '1rem',
              backgroundColor: argbToHex(md3Colors.primaryContainer),
              p: 2
            }
          }
        }}
      >
        <DialogTitle>😉😉😉</DialogTitle>
        <DialogContent>
          {dialogContent}
        </DialogContent>
      </Dialog>

      <Container maxWidth='lg' sx={{ pt: isMobile && 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 8,
            mb: 4,
            gap: 6,
          }}
        >
          <Grow in timeout={1000}>
            <Box flex={1} textAlign={isMobile ? 'center' : 'left'}>
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start', alignItems: 'center', gap: 2, mb: 5 }}>
                <img src={logoIcon} alt='Melidify Logo' style={{ width: '40px', height: '40px' }} />
                <Typography variant='h4' fontWeight='bold' color={argbToHex(md3Colors.primary)}>
                  Melidify
                </Typography>
              </Box>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                fontWeight='bold'
                gutterBottom
                color={argbToHex(md3Colors.secondary)}
              >
                Discover Your Sound
              </Typography>
              <Typography
                variant='h6'
                sx={{ color: argbToHex(md3Colors.tertiary), mb: 1, textAlign: isMobile ? 'center' : 'left' }}
              >
                Built for speed and simplicity
              </Typography>
              <Typography
                variant='body1'
                sx={{ color: argbToHex(md3Colors.tertiary), mb: 3, textAlign: isMobile ? 'center' : 'left' }}
              >
                Melidify brings your music to life with an intuitive interface and powerful playback features
                <br /> — all in one beautiful platform.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button
                  variant='contained'
                  size='large'
                  sx={{
                    textTransform: 'none',
                    borderRadius: '24px',
                    backgroundColor: argbToHex(md3Colors.primary),
                    color: argbToHex(md3Colors.onPrimary),
                  }}
                >
                  Start Listening
                </Button>
              </Box>
            </Box>
          </Grow >

          <Slide direction={isMobile ? 'up' : 'left'} in timeout={1000}>
            <Box
              flex={1}
              sx={{
                backgroundColor: isDarkMode
                  ? argbToHex(md3Colors.primaryContainer)
                  : lighten(argbToHex(md3Colors.primaryContainer), 0.5),
                borderRadius: '24px',
                p: isMobile ? 3 : 4,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                maxWidth: 275,
                mx: 'auto',
                width: '100%',
                zIndex: 1
              }}
            >
              <Box
                component='img'
                src={song.imageUri}
                alt={song.title}
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  mb: 2,
                }}
              />
              <Typography variant='h6' fontWeight='bold' textAlign='center' color={argbToHex(md3Colors.primary)}>
                {song.title}
              </Typography>
              <Typography variant='body1' textAlign='center' color={argbToHex(md3Colors.secondary)}>
                {song.artist}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mt: 2 }}>
                <IconButton sx={{ color: argbToHex(md3Colors.secondary) }}>
                  <SkipPreviousIcon />
                </IconButton>
                <IconButton
                  onClick={togglePlayPause}
                  sx={{
                    scale: '1.5',
                    color: argbToHex(md3Colors.primary),
                    animation: !isPlaying && pop ? `${popAnimation} 0.3s ease` : 'none'
                  }}
                >
                  {isPlaying ? <PauseCircleOutlineIcon fontSize='large' /> : <PlayCircleOutlineIcon fontSize='large' />}
                </IconButton>
                <IconButton sx={{ color: argbToHex(md3Colors.secondary) }}>
                  <SkipNextIcon />
                </IconButton>
              </Box>
              <audio ref={audioRef} src={song.audioUri} preload='auto' />
            </Box>
          </Slide >
        </Box >
      </Container >
    </Box >
  )
}

export default LandingScreen