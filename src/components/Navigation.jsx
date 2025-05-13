import { useNavigate } from 'react-router-dom'
import { pageStore } from './utils'

export function useNavigation() {
  const navigate = useNavigate()
  const { setCurrentPage } = pageStore()

  const gotoHome = (resetSearch) => {
    if (resetSearch) resetSearch()
    setCurrentPage('home')
    navigate('/home')
    console.log('Navigated to Home')
  }

  const gotoLibrary = (resetSearch) => {
    if (resetSearch) resetSearch()
    setCurrentPage('library')
    navigate('/library')
    console.log('Navigated to Library')
  }

  const gotoSearch = (resetSearch) => {
    if (resetSearch) resetSearch()
    setCurrentPage('search')
    navigate('/search')
    console.log('Navigated to Search')
  }

  const gotoPlayer = (song, resetSearch) => {
    if (resetSearch) resetSearch()
    setCurrentPage('player')
    navigate(`/player/${song.id}`, {
      state: { song }
    })
    console.log('Navigated to Player')
  }

  return {
    gotoHome,
    gotoLibrary,
    gotoSearch,
    gotoPlayer
  }
}
