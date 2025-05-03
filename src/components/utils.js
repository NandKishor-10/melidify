import { Album, Lyrics } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import { create } from 'zustand'

function useScreenWidth() {
    const [width, setWidth] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return width
}

function useScreenHeight() {
    const [height, setHeight] = useState(window.innerHeight)

    useEffect(() => {
        const handleResize = () => setHeight(window.innerHeight)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    })
    return height
}

const MockSong = {
    title: "Kho Gaye Hum Kahan",
    artists: "Jasleen Royal, Prateek Kuhad",
    image: "https://c.saavncdn.com/279/Baar-Baar-Dekho-Hindi-2016-20181205114400-500x500.jpg",
    url: "https://aac.saavncdn.com/279/08e6c65833feac95d6571abeee02023e_320.mp4",
    duration: "213",
    lyrics: "Rooh se behti hui dhun ye ishaare de\nKuch mere raaz, tere raaz aawara se\nKho gaye hum kahan\nRangon sa yeh jahaan\nKho gaye hum kahan\nRangon sa yeh jahaan\nTedhe-medhe raaste hai, jaadui imaaratein hai\nMain bhi hoon, tu bhi hai yahan\nKhoyi soyi sadko pe, sitaron ke kandhon pe\nHum nachte udte hain yahan\nKho gaye hum kahan\nRangon sa yeh jahaan\nKho gaye hum kahan\nRangon sa yeh jahaan\nSo gayi hai ye saansein sabhi\nAdhoori si hai kahani meri\nPhisal jaaye bhi to darr na koi\nRuk jane ki zaroorat nahin\nKaagaz ke parde hain tale hain darwaazon pe\nPaani mein doobe huye khwab alfaazon ke\nKho gaye hum kahan\nRangon sa yeh jahaan\nKho gaye hum kahan\nRangon sa yeh jahaan\nTedhe-medhe raaste hai, jaadui imaaratein hai\nMain bhi hoon, tu bhi hai yahan\nKhoyi soyi sadko pe, sitaron ke kandhon pe\nHum nachte udte hain yahan\n\n",
    albumId: "2480284"
}

const pageStore = create((set) => ({
    currentPage: 'home',
    setCurrentPage: (page) => set({ currentPage: page })
}))

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
}

export { useScreenWidth, useScreenHeight, formatTime, MockSong, pageStore }