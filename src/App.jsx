import { darken, lighten } from '@mui/material'
import PlayerScreen from './screens/PlayerScreen'
import Header from './components/Header'
import { argbToHex, isDarkMode, md3Colors } from './components/colors'
import Homescreen from './screens/Homescreen'
import SearchScreen from './screens/SearchScreen'
import { Route, Routes, useLocation } from 'react-router-dom'
import LibraryScreen from './screens/LibraryScreen'
import Test from './screens/Test'
import LandingScreen from './screens/LandingScreen'
import { pageStore } from './components/utils'


function App() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
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
      {!isLandingPage && <Header />}

      <Routes>
        <Route path="/" element={<LandingScreen />} />
        <Route path='/search' element={<SearchScreen />} />
        <Route path="/home" element={<Homescreen />} />
        <Route path="/player/:songId" element={<PlayerScreen isPlaying={true} />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<LandingScreen />} />
      </Routes>

      {/* <Test /> */}
      {/* <LandingScreen /> */}
      {/* <SearchScreen /> */}
      {/* <ListItemView /> */}
      {/* <PlayerScreen /> */}
    </div>
  )
}

export default App