import { darken, lighten } from '@mui/material'
import PlayerScreen from './screens/PlayerScreen'
import ListItemView from './components/ListItemView'
import Header from './components/Header'
import { argbToHex, isDarkMode, md3Colors } from './components/colors'
import Homescreen from './screens/Homescreen'
import SearchScreen from './screens/SearchScreen'
import { Route, Routes } from 'react-router-dom'
import { MusicNote } from '@mui/icons-material'
import LibraryScreen from './screens/LibraryScreen'
import Test from './screens/Test'


function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        height: '100%',
        width: '100vw',
        backgroundColor: isDarkMode
          ? darken(argbToHex(md3Colors.primaryContainer), 0.2)
          : lighten(argbToHex(md3Colors.primaryContainer), 0.2),
        color: argbToHex(md3Colors.onPrimaryContainer),
        cursor: isDarkMode ? 'url(/cursor_white.png), auto' : 'url(/cursor_black.png), auto',
      }}
    >
      <Header />
      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/player/:songId" element={<PlayerScreen />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<SearchScreen />} />
      </Routes>
      {/* <SearchScreen /> */}
      {/* <ListItemView /> */}
      {/* <PlayerScreen /> */}
    </div>
  )
}

export default App
