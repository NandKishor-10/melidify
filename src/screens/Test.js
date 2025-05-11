import { Box, TextField } from '@mui/material'
import React, { useState } from 'react'

function Test() {

  const [search, setSearch] = useState('')

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearch(value)
  };
  
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={'1rem'}
      flexDirection={'column'}
      width={'100vw'}
      height={'100vh'}
    >
      <TextField
      value={search}
      onChange={handleSearchChange}
        label={'Search'}
        variant={'outlined'}
        sx={{
          width: '50%',
        }}
      />

    </Box>
  )
}

export default Test