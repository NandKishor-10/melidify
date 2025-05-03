import React, { useEffect, useRef, useState } from 'react'
import { formatTime, useScreenWidth } from '../components/utils'
import { SkipNext, SkipPrevious, PlayArrow, Pause, Shuffle, Repeat } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'
import { Box, darken, IconButton, lighten, Slider, Typography } from '@mui/material'
import { argbToHex, isDarkMode, md3Colors } from '../components/colors'

function PlayerScreen(isPlayingParam = true) {
	const screenWidth = useScreenWidth()
	const isMobile = screenWidth < 800
	const audioRef = useRef(null)
	const [isShuffleEnable, setIsShuffleEnable] = useState(false)
	const [isRepeatEnable, setIsRepeatEnable] = useState(false)
	const [progress, setProgress] = useState(0)
	const [isPlaying, setIsPlaying] = useState(isPlayingParam)
	const [selectedTab, setSelectedTab] = useState('Next Songs')
	const state = useLocation().state
	const song = state.song
	const totalDuration = song?.duration
	const currentTime = (progress / 100) * totalDuration

	// console.log(state)

	const togglePlay = () => {
		const audio = audioRef.current

		if (!audio) return
		if (isPlaying) audio.pause()
		else audio.play()

		setIsPlaying(!isPlaying)
	}

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		const updateProgress = () => {
			const progress = (audio.currentTime / audio.duration) * 100
			setProgress(progress || 0)
		}
		audio.addEventListener('timeupdate', updateProgress)
		return () => audio.removeEventListener('timeupdate', updateProgress)
	}, [])

	useEffect(() => {
		const audio = audioRef.current
		if (audio) {
			audio.play()
			setIsPlaying(true)
		}
	}, [])

	useEffect(() => {
		const handleKeyDown = (event) => {
			const audio = audioRef.current
			if (!audio) return

			const tag = document.activeElement.tagName
			const isTextFieldFocused = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || document.activeElement.isContentEditable

			if (isTextFieldFocused) return

			switch (event.code) {
				case 'Space':
					event.preventDefault()
					togglePlay()
					break
				case 'ArrowRight':
					event.preventDefault()
					audio.currentTime = Math.min(audio.currentTime + 5, audio.duration || 0)
					break
				case 'ArrowLeft':
					event.preventDefault()
					audio.currentTime = Math.max(audio.currentTime - 5, 0)
					break
				default:
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [isPlaying])

	const handleSliderChange = (e, value) => {
		const audio = audioRef.current
		if (!audio) return
		const newTime = (value / 100) * audio.duration
		audio.currentTime = newTime
		setProgress(value)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				width: isMobile ? '95vw' : '98vw',
				height: '100%',
				margin: 'auto',
				padding: isMobile ? '0.2rem' : '0.5rem',
				paddingTop: '1rem',
				paddingBottom: '1rem',
				alignItems: 'center',
				justifyContent: 'space-evenly',
			}}
		>
			<div
				style={{
					width: isMobile ? '100%' : '64%',
					height: isMobile ? '60vh' : '80vh',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: isDarkMode
						? argbToHex(md3Colors.primaryContainer)
						: lighten(argbToHex(md3Colors.primaryContainer), 0.5),
					color: argbToHex(md3Colors.onPrimaryContainer),
					borderRadius: '1rem',
				}}
			>
				<audio
					ref={audioRef}
					src={song?.url}
				/>

				<span
					style={{
						display: 'flex',
						width: '75%',
						flexDirection: isMobile ? 'column' : 'row',
						alignItems: 'center',
						justifyContent: 'center',
						gap: '10%',
					}}
				>
					<img
						src={`${song?.image}`}
						alt='Album Cover'
						style={{
							width: isMobile ? '45vw' : '35vh',
							height: isMobile ? '45vw' : '35vh',
							objectFit: 'fill',
							borderRadius: '2rem',
							boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
							marginBottom: '2rem',
						}}
					/>
					<Box
						textAlign={isMobile ? 'center' : 'start'}
					>
						<Typography variant='h4' fontWeight='bold' gutterBottom>
							{song?.title}
						</Typography>
						<Typography variant='subtitle1' color={argbToHex(md3Colors.secondary)}>
							{song?.artists}
						</Typography>
					</Box>
				</span>


				<Box
					width={isMobile ? '80%' : '70%'}
				>
					<Slider
						value={progress}
						onChange={handleSliderChange}
						onWheel={(e) => {
							e.preventDefault()
							const delta = e.deltaY > 0 ? 1 : -1
							setProgress((prev) => {
								let next = prev + delta * 2
								if (next > 100) next = 100
								if (next < 0) next = 0
								const audio = audioRef.current
								if (audio) {
									const newTime = (next / 100) * audio.duration
									audio.currentTime = newTime
								}
								return next
							})
						}}
						sx={{
							color: `#${md3Colors.primary}`,
							'& .MuiSlider-thumb': {
								width: 14,
								height: 14,
								bgcolor: argbToHex(md3Colors.primary),
								'&:hover': {
									boxShadow: `0 0 0 8px rgba(103, 80, 164, 0.2)`,
								},
								'&.Mui-active': {
									width: 20,
									height: 20,
								},
							},
						}}
					/>
					<span style={{ display: 'flex', justifyContent: 'space-between' }} >
						<Typography variant='caption'>{formatTime(currentTime)}</Typography>
						<Typography variant='caption'>{formatTime(totalDuration)}</Typography>
					</span>
				</Box>
				<Box
					display={'flex'}
					justifyContent={'space-evenly'}
					width={isMobile ? '90%' : '70%'}
					alignItems={'center'}
				>
					<IconButton
						sx={{
							color: isShuffleEnable ? argbToHex(md3Colors.primary) : 'black',
							'@media (hover: hover)': {
								'&:hover': {
									bgcolor: isDarkMode
										? darken(argbToHex(md3Colors.primary), 0.4)
										: lighten(argbToHex(md3Colors.primary), 0.8),
								}
							},
						}}
						onClick={() => setIsShuffleEnable(!isShuffleEnable)}
					> <Shuffle /></IconButton>
					<IconButton
						onClick={() => alert('😝😝😝')}
						sx={{
							color: argbToHex(md3Colors.primary),
							'@media (hover: hover)': {
								'&:hover': {
									bgcolor: isDarkMode
										? darken(argbToHex(md3Colors.primary), 0.4)
										: lighten(argbToHex(md3Colors.primary), 0.8),
								}
							},
						}}
					> <SkipPrevious fontSize='large' /></IconButton>
					<IconButton
						sx={{
							bgcolor: argbToHex(md3Colors.primary),
							color: argbToHex(md3Colors.onPrimary),
							'&:hover': {
								bgcolor: isDarkMode
									? darken(argbToHex(md3Colors.primary), 0.3)
									: lighten(argbToHex(md3Colors.primary), 0.2),
							},
							width: 64,
							height: 64,
							borderRadius: isPlaying ? '1rem' : '50%',
						}}
						onClick={togglePlay}
					>
						{isPlaying ? <Pause fontSize='large' /> : <PlayArrow fontSize='large' />}
					</IconButton>
					<IconButton
						onClick={() => alert('😛😛😛')}
						sx={{
							color: argbToHex(md3Colors.primary),
							'@media (hover: hover)': {
								'&:hover': {
									bgcolor: isDarkMode
										? darken(argbToHex(md3Colors.primary), 0.4)
										: lighten(argbToHex(md3Colors.primary), 0.8),
								}
							},
						}}
					> <SkipNext fontSize='large' /></IconButton>
					<IconButton
						sx={{
							color: isRepeatEnable ? argbToHex(md3Colors.primary) : 'black',
							'@media (hover: hover)': {
								'&:hover': {
									bgcolor: isDarkMode
										? darken(argbToHex(md3Colors.primary), 0.4)
										: lighten(argbToHex(md3Colors.primary), 0.8),
								}
							},
						}}
						onClick={() => setIsRepeatEnable(!isRepeatEnable)}
					> <Repeat /></IconButton>
				</Box>

			</div>

			{isMobile && <div style={{ height: '2vh' }} />}

			<Box
				display={'flex'}
				flexDirection={'column'}
				width={isMobile ? '100%' : '34%'}
				height={isMobile ? '60vh' : '80vh'}
				// pb={1}
				justifyContent={'center'}
				alignItems={'center'}
				backgroundColor={isDarkMode
					? argbToHex(md3Colors.primaryContainer)
					: lighten(argbToHex(md3Colors.primaryContainer), 0.5)}
				color={argbToHex(md3Colors.onSurfaceVariant)}
				borderRadius={'1rem'}
				boxShadow={'0px 10px 30px rgba(0, 0, 0, 0.1)'}
			>
				<Box
					display={'flex'}
					width={'100%'}
					justifyContent={'space-evenly'}
					m={1}
				>
					{['Next Songs', 'Lyrics'].map((tab) => {
						const isActive = selectedTab === tab
						const activeTextColor = argbToHex(md3Colors.primary)
						const activeBgColor = isDarkMode
							? darken(argbToHex(md3Colors.primaryContainer), 0.2)
							: argbToHex(md3Colors.primaryContainer)

						return (
							<Box
								key={tab}
								onClick={() => setSelectedTab(tab)}
								sx={{
									width: '30%',
									textAlign: 'center',
									px: 3,
									py: 1,
									fontWeight: 700,
									borderRadius: '1rem',
									color: isActive ? activeTextColor : argbToHex(md3Colors.onSurfaceVariant),
									backgroundColor: isActive ? activeBgColor : 'transparent',
									transition: 'all 0.5s ease',
									cursor: 'pointer',
									'@media (hover: hover)': {
										'&:hover': {
											backgroundColor: lighten(argbToHex(md3Colors.secondaryContainer), 0.05),
											transform: 'scale(1.15)',
										}
									},
								}}
							>
								{tab}
							</Box>
						)
					})

					}
				</Box>
				<Box
					sx={{
						// flexGrow: 1,
						display: 'flex',
						width: '95%',
						height: '100%',
						mb: '1rem',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: '1rem',
						backgroundColor: argbToHex(md3Colors.surfaceVariant),
						transition: 'all 0.5s ease',
					}}
				>

					{selectedTab === 'Next Songs' && (
						<>
							<Typography variant='h6' fontWeight={600}>
								🎶 Next Songs
							</Typography>
							<Typography variant='body1' mt={2}>
								- Sun Raha Hai <br />
								- Chahun Main Ya Naa <br />
								- Bhula Dena <br />
							</Typography>
						</>
					)}

					{selectedTab === 'Lyrics' && (
						<>
							<Typography variant='h6' fontWeight={600}>
								📝 Lyrics
							</Typography>
							<Typography variant='body2' mt={2} textAlign='center'>
								{song?.lyrics}
							</Typography>
						</>
					)}
				</Box>
			</Box>
		</div >
	)
}

export default PlayerScreen
