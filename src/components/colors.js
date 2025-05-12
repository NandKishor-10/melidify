import { themeFromSourceColor } from '@material/material-color-utilities';


const isDarkMode = false
const seedColorHex = '#80DEEA'

function hexToArgb(hex) {
  const cleanHex = hex.replace('#', '')
  return parseInt(`0xFF${cleanHex}`, 16)
}

function argbToHex(argb) {
  const r = (argb >> 16) & 0xFF
  const g = (argb >> 8) & 0xFF
  const b = argb & 0xFF
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase()}`
}

const dynamicTheme = themeFromSourceColor(hexToArgb(seedColorHex))
const md3Colors = isDarkMode ? dynamicTheme.schemes.dark : dynamicTheme.schemes.light

export { argbToHex, isDarkMode, md3Colors }
