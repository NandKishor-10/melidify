import React, { useEffect, useRef, useState } from 'react'
import { Box, darken, IconButton, lighten, Slider, Typography } from '@mui/material'
import { SkipNext, SkipPrevious, PlayArrow, Pause, Shuffle, Repeat } from '@mui/icons-material'
import { MockSong, useScreenWidth } from '../components/utils'
import { argbToHex, isDarkMode, md3Colors } from '../components/colors';
import { useLocation, useParams } from 'react-router-dom';


const Test = ({
  isPlayingParam = true
}) => {
  const screenWidth = useScreenWidth()
  const isMobile = screenWidth < 800
  const audioRef = useRef(null)
  const [isShuffleEnable, setIsShuffleEnable] = useState(false)
  const [isRepeatEnable, setIsRepeatEnable] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(isPlayingParam)
  const [selectedTab, setSelectedTab] = useState('Next Songs')
  // const state = useLocation().state
  // const song = state.song
  const song = MockSong
  const totalDuration = song?.duration;
  const currentTime = (progress / 100) * totalDuration

  // console.log(state)


  const togglePlay = () => {
    const audio = audioRef.current

    if (!audio) return
    if (isPlaying) audio.pause()
    else audio.play()

    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100
      setProgress(progress || 0)
    }
    audio.addEventListener('timeupdate', updateProgress)
    return () => audio.removeEventListener('timeupdate', updateProgress)
  }, [])

  // useEffect(() => {
  //     const audio = audioRef.current
  //     if (audio) {
  //         audio.play()
  //         setIsPlaying(true)
  //     }
  // }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      const audio = audioRef.current
      if (!audio) return

      const tag = document.activeElement.tagName
      const isTextFieldFocused = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement.isContentEditable

      if (isTextFieldFocused) return

      switch (event.code) {
        case 'Space':
          event.preventDefault()
          togglePlay()
          break
        case 'ArrowRight':
          event.preventDefault()
          audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0)
          break
        case 'ArrowLeft':
          event.preventDefault()
          audio.currentTime = Math.max(audio.currentTime - 5, 0)
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying])

  const handleSliderChange = (e, value) => {
    const audio = audioRef.current
    if (!audio) return
    const newTime = (value / 100) * audio.duration
    audio.currentTime = newTime
    setProgress(value)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }


  return (
    <Box
      width={'100%'}
      display={'flex'}
      flexDirection={isMobile ? 'column' : 'row'}
    >
      <audio
        ref={audioRef}
        src={song?.url}
      />

      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={isMobile ? 'column' : 'row'}
        height={isMobile ? 'auto' : '81vh'}
        width={isMobile ? 'auto' : '70%'}
        p={2}
        flexGrow={1}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'95%'}
          width={isMobile ? '80%' : '70%'}
          backgroundColor={isDarkMode
            ? argbToHex(md3Colors.primaryContainer)
            : lighten(argbToHex(md3Colors.primaryContainer), 0.5)}
          color={argbToHex(md3Colors.onPrimaryContainer)}
          borderRadius={'2rem'}
          margin={'0 auto'}
          p={isMobile ? 5 : 2}
          boxShadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'}
          flexGrow={1}
        >

          <Box
            width={'70%'}
            display={'flex'}
            flexDirection={isMobile ? 'column' : 'row'}
            alignItems={'center'}
            justifyContent={'center'}
            gap={'10%'}
          >
            <img
              src={`${song?.image}`}
              // height={isMobile ? 150 : 200}
              // width={isMobile ? 150 : 200}
              alt='Album Cover'
              style={{
                width: isMobile ? '45vw' : '15vw',
                height: isMobile ? '45vw' : '15vw',
                objectFit: 'fill',
                borderRadius: '2rem',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                marginBottom: '2rem',
              }}
            />

            <Box
              textAlign={isMobile ? 'center' : 'start'}
            >
              <Typography variant='h4' fontWeight={600} gutterBottom>
                {song?.title}
              </Typography>
              <Typography variant='subtitle1' color={argbToHex(md3Colors.secondary)}>
                {song?.artists}
              </Typography>
            </Box>
          </Box>

          <Box
            width={isMobile ? '100%' : '70%'}
            mt={4}
          >
            <Slider
              value={progress}
              onChange={handleSliderChange}
              onWheel={(e) => {
                e.preventDefault()
                const delta = e.deltaY < 0 ? 1 : -1
                setProgress((prev) => {
                  let next = prev + delta * 2
                  if (next > 100) next = 100
                  if (next < 0) next = 0
                  const audio = audioRef.current
                  if (audio) {
                    const newTime = (next / 100) * audio.duration
                    audio.currentTime = newTime
                  }
                  return next
                })
              }}
              sx={{
                color: `#${md3Colors.primary}`,
                '& .MuiSlider-thumb': {
                  width: 14,
                  height: 14,
                  bgcolor: argbToHex(md3Colors.primary),
                  '&:hover': {
                    boxShadow: `0 0 0 8px rgba(103, 80, 164, 0.2)`,
                  },
                  '&.Mui-active': {
                    width: 20,
                    height: 20,
                  },
                },
              }}
            />
            <Box display='flex' justifyContent='space-between' >
              <Typography variant='caption'>{formatTime(currentTime)}</Typography>
              <Typography variant='caption'>{formatTime(totalDuration)}</Typography>
            </Box>
          </Box>

          <Box
            display={'flex'}
            justifyContent={'space-evenly'}
            width={isMobile ? '100%' : '70%'}
            alignItems={'center'}
            mt={2}
          >
            <IconButton
              sx={{
                color: isShuffleEnable ? argbToHex(md3Colors.primary) : 'black',
                '&:hover': {
                  bgcolor: isDarkMode
                    ? darken(argbToHex(md3Colors.primary), 0.4)
                    : lighten(argbToHex(md3Colors.primary), 0.8),
                },
              }}
              onClick={() => setIsShuffleEnable(!isShuffleEnable)}
            > <Shuffle /></IconButton>
            <IconButton
              onClick={() => alert('😝😝😝')}
              sx={{
                color: argbToHex(md3Colors.primary),
                '&:hover': {
                  bgcolor: isDarkMode
                    ? darken(argbToHex(md3Colors.primary), 0.4)
                    : lighten(argbToHex(md3Colors.primary), 0.8),
                },
              }}
            > <SkipPrevious fontSize='large' /></IconButton>
            <IconButton
              sx={{
                bgcolor: argbToHex(md3Colors.primary),
                color: argbToHex(md3Colors.onPrimary),
                '&:hover': {
                  bgcolor: isDarkMode
                    ? darken(argbToHex(md3Colors.primary), 0.3)
                    : lighten(argbToHex(md3Colors.primary), 0.2),
                },
                width: 64,
                height: 64,
                borderRadius: isPlaying ? '1rem' : '50%',
              }}
              onClick={togglePlay}
            >
              {isPlaying ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}
            </IconButton>
            <IconButton
              onClick={() => alert('😛😛😛')}
              sx={{
                color: argbToHex(md3Colors.primary),
                '&: hover': {
                  bgcolor: isDarkMode
                    ? darken(argbToHex(md3Colors.primary), 0.4)
                    : lighten(argbToHex(md3Colors.primary), 0.8),

                },
              }}
            > <SkipNext fontSize='large' /></IconButton>
            <IconButton
              sx={{
                color: isRepeatEnable ? argbToHex(md3Colors.primary) : 'black',
                '&:hover': {
                  bgcolor: isDarkMode
                    ? darken(argbToHex(md3Colors.primary), 0.4)
                    : lighten(argbToHex(md3Colors.primary), 0.8),
                },
              }}
              onClick={() => setIsRepeatEnable(!isRepeatEnable)}
            > <Repeat /></IconButton>
          </Box>
        </Box>
      </Box>

      <Box
        display={'flex'}
        flexDirection={'column'}
        // justifyContent={'space-evenly'}
        width={isMobile ? '90%' : '30%'}
        height={'77vh'}
        backgroundColor={isDarkMode
          ? argbToHex(md3Colors.primaryContainer)
          : lighten(argbToHex(md3Colors.primaryContainer), 0.5)
        }
        color={argbToHex(md3Colors.onSurfaceVariant)}
        borderRadius={'2rem'}
        mt={2}
        mr={1}
        p={2}
        boxShadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'}
      >
        <Box display={'flex'} justifyContent={'space-evenly'} mb={1} >
          {['Next Songs', 'Lyrics'].map((tab) => {
            const isActive = selectedTab === tab;
            const activeTextColor = argbToHex(md3Colors.primary)
            const activeBgColor = isDarkMode
              ? darken(argbToHex(md3Colors.primaryContainer), 0.2)
              : argbToHex(md3Colors.primaryContainer)

            return (
              <Box
                key={tab}
                onClick={() => setSelectedTab(tab)}
                sx={{
                  cursor: 'pointer',
                  px: 3,
                  py: 1,
                  fontWeight: 700,
                  borderRadius: '1rem',
                  color: isActive ? activeTextColor : argbToHex(md3Colors.onSurfaceVariant),
                  backgroundColor: isActive ? activeBgColor : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: lighten(argbToHex(md3Colors.secondaryContainer), 0.1),
                    transform: 'scale(1.2)',
                  },
                }}
              >
                {tab}
              </Box>
            )
          })}
        </Box>

        <Box
          flexGrow={1}
          p={2}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          borderRadius='1rem'
          backgroundColor={argbToHex(md3Colors.surfaceVariant)}
          sx={{
            transition: 'all 0.3s ease',
          }}
        >
          {selectedTab === 'Next Songs' && (
            <>
              <Typography variant='h6' fontWeight={600}>
                🎶 Next Songs
              </Typography>
              <Typography variant='body1' mt={2}>
                - Sun Raha Hai <br />
                - Chahun Main Ya Naa <br />
                - Bhula Dena <br />
              </Typography>
            </>
          )}
          {selectedTab === 'Lyrics' && (
            <>
              <Typography variant='h6' fontWeight={600}>
                📝 Lyrics
              </Typography>
              <Typography variant='body2' mt={2} textAlign='center'>
                {song?.lyrics}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box >
  );
};

export default Test