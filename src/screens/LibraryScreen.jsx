import React from 'react'
import { argbToHex, md3Colors } from '../components/colors'

function LibraryScreen() {
  return (

    <div
      style={{
        height: '80%',
        width: '100%',
        color: argbToHex(md3Colors.onPrimaryContainer),
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >

      <h1>LibraryScreen</h1>
    </div>
  )
}

export default LibraryScreen