// hooks/useSafeTheme.ts
import { useTheme, Theme } from 'tamagui'

export const useSafeTheme = (): Theme => {
    const theme = useTheme()

    if (!theme.accent || !theme.bg || !theme.color) {
        throw new Error(
            'Required theme properties are missing. ' +
            'Make sure your theme defines accent, bg, and color properties.'
        )
    }

    return theme
}
