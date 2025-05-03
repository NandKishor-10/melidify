import { Box, IconButton, lighten } from "@mui/material"
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
            flexDirection={'row'}
            alignItems={'center'}
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
            width={'calc(100vh /2)'}
            borderRadius={'16px'}
            sx={{
                cursor: 'pointer',
            }}
        >
            <img
                src={song.image}
                height={50}
                alt="Image"
                style={{
                    marginRight: '10px',
                    borderRadius: '16px',
                }}
            />

            <Box
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                }}
            >
                <p
                    style={{
                        fontSize: '1.25rem',
                        color: md3Colors.primary,
                        margin: 0
                    }}
                >{song.title}</p>

                <p
                    style={{
                        fontSize: '0.8rem',
                        color: md3Colors.secondary,
                        margin: 0
                    }}
                >{song.artists}</p>
            </Box>
            <IconButton
                sx={{
                    color: argbToHex(md3Colors.onPrimaryContainer),
                }}
                onClick={() => {
                    alert("IconButton clicked!")
                }}
                style={{
                    marginLeft: 'auto',
                }}
            >
                <MoreVert />
            </IconButton>
        </Box>
    )
}

export default ListItemView