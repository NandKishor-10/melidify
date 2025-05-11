import { darken, lighten } from '@mui/material'
import PlayerScreen from './screens/PlayerScreen'
import Header from './components/Header'
import { argbToHex, isDarkMode, md3Colors } from './components/colors'
import Homescreen from './screens/Homescreen'
import SearchScreen from './screens/SearchScreen'
import { Route, Routes } from 'react-router-dom'
import LibraryScreen from './screens/LibraryScreen'
import Test from './screens/Test'
import LandingPage from './screens/LandingPage'


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
      {/* <Header />

      <Routes>
        <Route path="/" element={<SearchScreen />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/player/:songId" element={<PlayerScreen isPlaying={true} />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<SearchScreen />} />
      </Routes> */}

      {/* <Test /> */}
      <LandingPage />
      {/* <SearchScreen /> */}
      {/* <ListItemView /> */}
      {/* <PlayerScreen /> */}
    </div>
  )
}

export default App
