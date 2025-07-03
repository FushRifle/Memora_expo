import { YStack, Text, Stack, Separator, useTheme } from 'tamagui'
import { MotiView } from 'moti'

export function SettingsGroup({
    title,
    children,
    index
}: {
    title: string
    children: React.ReactNode
    index: number
}) {
    const theme = useTheme()

    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: index * 50 }}
        >
            <YStack space="$3" marginBottom="$6">
                <Text color={theme.colorHover} fontWeight="600">{title}</Text>
                <Stack borderRadius="$4" overflow="hidden" borderWidth={1} borderColor={theme.border}>
                    {children}
                </Stack>
            </YStack>
        </MotiView>
    )
}