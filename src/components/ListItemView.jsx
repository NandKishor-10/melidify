import { Box, IconButton, lighten, Typography } from "@mui/material"
import { MoreVert } from "@mui/icons-material"
import { argbToHex, isDarkMode, md3Colors } from "./colors";
import { useNavigation } from "./Navigation";

function ListItemView({ song, resetSearch }) {
  const { gotoPlayer } = useNavigation()

  return (
    <Box
      onClick={() => gotoPlayer(song, resetSearch)}
      padding={'1rem'}
      display={'flex'}
      gap={'1rem'}
      boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.20)'}
      backgroundColor={isDarkMode
        ? argbToHex(md3Colors.primaryContainer)
        : lighten(argbToHex(md3Colors.primaryContainer), 0.5)}
      color={argbToHex(md3Colors.onPrimaryContainer)}
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
          {song.title.length <= 25 ? song.title : song.title.slice(0, 25) + '...'}
        </Typography>

        <Typography variant="body2" color={md3Colors.secondary} fontSize={'0.9rem'}>
          {song.artists.length <= 30 ? song.artists : song.artists.slice(0, 30) + '...'}
        </Typography>
      </Box>
      <IconButton
        color={argbToHex(md3Colors.onPrimaryContainer)}
        onClick={() => {
          alert("IconButton clicked!")
        }}
        sx={{ alignSelf: 'center', }}
      >
        <MoreVert />
      </IconButton>
    </Box>
  )
}

export default ListItemView