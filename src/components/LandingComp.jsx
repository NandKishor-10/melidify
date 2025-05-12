import { Instagram, Twitter } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"
import { argbToHex, md3Colors } from "./colors"

function LandingHome() {
  return (
    <Typography color={argbToHex(md3Colors.onPrimaryContainer)} gap={1}>
      Yeha toh kuch hai hii nhi dekhne ke liye
    </Typography>
  )
}

function LandingAbout() {
  return (
    <Typography color={argbToHex(md3Colors.onPrimaryContainer)} gap={1}>
      Contact pe click karo shayad kuch mil jaye
    </Typography>
  )
}

function LandingContact() {
  return (
    <Box>
      <Typography display={'flex'} alignItems={'center'} color={argbToHex(md3Colors.onPrimaryContainer)} gap={1}>
        <Twitter /> Twitter: <a href='https://x.com/nandkishor_10' target='_blank' rel='noopener noreferrer'
          style={{ color: argbToHex(md3Colors.primary) }}>View Profile</a>
      </Typography>
      <Typography display={'flex'} alignItems={'center'} color={argbToHex(md3Colors.onPrimaryContainer)} gap={1} mt={2}>
        <Instagram /> Instagram: <a href='https://www.instagram.com/nandkishor.ig' target='_blank' rel='noopener noreferrer'
          style={{ color: argbToHex(md3Colors.primary) }}>View Profile</a>
      </Typography>
    </Box>
  )
}

export { LandingContact, LandingAbout, LandingHome }