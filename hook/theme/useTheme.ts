// hooks/useSafeTheme.ts (now uses your custom ThemeProvider)
import { useTheme as useAppTheme } from '@/styles/ThemeContext'

export const useSafeTheme = () => {
    const theme = useAppTheme()

    if (!theme?.colors || !theme?.colors.primary || !theme?.colors.background) {
        throw new Error(
            'Missing theme colors. Make sure ThemeProvider is mounted properly.'
        )
    }

    return theme
}
