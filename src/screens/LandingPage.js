import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, Container, useMediaQuery, useTheme, Grow, Slide, IconButton, lighten, darken } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { keyframes } from '@emotion/react';
import { argbToHex, isDarkMode, md3Colors } from '../components/colors';
import logoIcon from '../assets/logo_icon.png';

const MelidifyLanding = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pop, setPop] = useState(false);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPop(true);
      setTimeout(() => setPop(false), 300);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const popAnimation = keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  `;

  return (
    <Box sx={{
      bgcolor: isDarkMode
        ? darken(argbToHex(md3Colors.primaryContainer), 0.2)
        : lighten(argbToHex(md3Colors.primaryContainer), 0.2),
      minHeight: '100vh', overflow: 'hidden'
    }}>
      <Container maxWidth="lg">
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
            <Box flex={1} textAlign={isMobile ? 'center' : 'left'} >
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mb: 5 }}>
                <img src={logoIcon} alt="Melidify Logo" style={{ width: '40px', height: '40px' }} />
                <Typography variant="h4" fontWeight="bold" color={argbToHex(md3Colors.primary)}>
                  Melidify
                </Typography>
              </Box>
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                fontWeight="bold"
                gutterBottom
                color={argbToHex(md3Colors.secondary)}
              >
                Discover Your Sound
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: argbToHex(md3Colors.tertiary), mb: 1, textAlign: isMobile ? 'center' : 'left' }}
              >
                Built for speed and simplicity
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: argbToHex(md3Colors.tertiary), mb: 3, textAlign: isMobile ? 'center' : 'left' }}
              >
                Melidify brings your music to life with an intuitive interface and powerful playback features
                <br /> — all in one beautiful platform.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                <Button
                  variant="contained"
                  size="large"
                  // color={argbToHex(md3Colors.primary)}
                  sx={{
                    borderRadius: '24px',
                    backgroundColor: argbToHex(md3Colors.primary),
                    color: argbToHex(md3Colors.onPrimary),
                  }}
                >
                  Start Listening
                </Button>
              </Box>
            </Box>
          </Grow>

          <Slide direction="up" in timeout={1000}>
            <Box
              flex={1}
              sx={{
                backgroundColor: isDarkMode
                  ? argbToHex(md3Colors.primaryContainer)
                  : argbToHex(md3Colors.primaryContainer),
                borderRadius: '24px',
                p: 4,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                maxWidth: 350,
                mx: 'auto'
              }}
            >
              <Box
                component="img"
                src="https://c.saavncdn.com/791/Meri-Bheegi-Bheegi-Si-Sanjeev-Kumar-Hindi-2020-20200715162808-500x500.jpg"
                alt="Meri Bheegi Bheegi Si"
                sx={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  objectFit: 'cover',
                  borderRadius: '16px',
                  mb: 2,
                }}
              />
              <Typography variant="h6" fontWeight="bold" textAlign={"center"} color={md3Colors.primary}>
                Meri Bheegi Bheegi Si
              </Typography>
              <Typography variant="body1" textAlign={"center"} color={md3Colors.secondary}>
                Kishore Kumar
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, mt: 2 }}>
                <IconButton
                  sx={{
                    color: argbToHex(md3Colors.secondary),
                  }}
                >
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
                  {isPlaying ? <PauseCircleOutlineIcon fontSize="large" /> : <PlayCircleOutlineIcon fontSize="large" />}
                </IconButton>
                <IconButton
                  sx={{
                    color: argbToHex(md3Colors.secondary),
                  }}
                >
                  <SkipNextIcon />
                </IconButton>
              </Box>
              <audio ref={audioRef} src="https://aac.saavncdn.com/791/c7282bbe7563ea02769d90035ab33705_320.mp4" preload="auto" />
            </Box>
          </Slide>
        </Box>
      </Container>
    </Box>
  );
};

export default MelidifyLanding;
