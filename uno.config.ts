import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'
import { createLocalFontProcessor } from '@unocss/preset-web-fonts/local'

export default defineConfig({
  shortcuts: {
    'b-base': 'border-#aaa3 rounded',
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'Outfit',
        serif: 'DM Serif Display',
        mono: 'Fira Mono',
      },
      processors: createLocalFontProcessor(),
    }),
  ],
})
