import { Box, IconButton, lighten, Typography } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { argbToHex, isDarkMode, md3Colors } from "./colors";
import { useNavigate } from "react-router-dom";
import { pageStore } from "./utils";

function ListItemView({ song, resetSearch }) {
  const navigate = useNavigate()
  const { currentPage, setCurrentPage } = pageStore()
  const handleClick = () => {
    if (resetSearch) resetSearch()
    setCurrentPage('player')

    console.log('Navigating to player')

    navigate(`/player/${song.id}`, {
      state: { song }
    })

  }
  return (
    <Box
      onClick={handleClick}
      padding={'1rem'}
      display={'flex'}
      // flexDirection={'row'}
      // alignItems={'center'}
      // alignSelf={'center'}
      // alignContent={'center'}
      // justifyContent={'space-between'}
      gap={'1rem'}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.20)'}
      backgroundColor={isDarkMode
        ? argbToHex(md3Colors.primaryContainer)
        : lighten(argbToHex(md3Colors.primaryContainer), 0.5)}
      color={argbToHex(md3Colors.onPrimaryContainer)}
      // width={'30%'}
      width={'auto'}
      borderRadius={'1rem'}
      sx={{
        cursor: 'pointer',
      }}
    >
      <img
        src={song.image}
        height={60}
        alt="Image"
        style={{
          marginRight: '10px',
          borderRadius: '1rem',
        }}
      />

      <Box
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
      >
        <Typography variant="h6" fontWeight={500} color={md3Colors.primary}>
          {song.title}
        </Typography>

        <Typography variant="body2" color={md3Colors.secondary} fontSize={'0.9rem'}>
          {song.artists}
        </Typography>
      </Box>
      <IconButton
        color={argbToHex(md3Colors.onPrimaryContainer)}
        onClick={() => {
          alert("IconButton clicked!")
        }}
      >
        <MoreVert />
      </IconButton>
    </Box>
  )
}

export default ListItemView