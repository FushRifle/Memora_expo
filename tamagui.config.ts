// tamagui.config.ts
import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/themes'

// Only load the weights you actually use:
const headingFont = createInterFont({
    size: {
        4: 14,
        5: 16,
        6: 20,
        7: 24,
        8: 32,
        9: 48,
    },
    weight: {
        4: '400',
        7: '700',
    },
})

const bodyFont = createInterFont({
    size: {
        4: 14,
        5: 16,
        6: 18,
    },
    weight: {
        4: '400',
    },
})

const config = createTamagui({
    themes: {
        ...themes,
        memoradark: {
            bg: '#0f172a',
            bg2: '#1e293b',
            color: '#e2e8f0',
            color2: '#94a3b8',
            accent: '#6366f1',
            accent2: '#818cf8',
        },
        memoradark_blue: {
            bg: '#0f172a',
            bg2: '#1e293b',
            color: '#e2e8f0',
            color2: '#94a3b8',
            accent: '#3b82f6',
            accent2: '#60a5fa',
        },
    },
    tokens,
    shorthands,
    fonts: {
        heading: headingFont,
        body: bodyFont,
    },
})

export type AppConfig = typeof config
declare module 'tamagui' {
    interface TamaguiCustomConfig extends AppConfig { }
}

export default config
