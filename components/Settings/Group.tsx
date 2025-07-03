import { YStack, Text, Stack } from 'tamagui'
import { MotiView } from 'moti'
import { useTheme } from '@/styles/ThemeContext'
import { color } from '@tamagui/themes'
export function SettingsGroup({
    title,
    children,
    index
}: {
    title: string
    children: React.ReactNode
    index: number
}) {
    const { colors } = useTheme()

    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: index * 60 }}
        >
            <YStack space="$2" marginBottom="$6">
                <Text
                    fontWeight="700"
                    fontSize="$4"
                    color={colors.primaryDark}
                    letterSpacing={0.3}
                >
                    {title}
                </Text>

                <Stack
                    borderRadius="$4"
                    overflow="hidden"
                    borderWidth={1}
                    borderColor={colors.border as any}
                    backgroundColor={colors.background}
                    shadowColor={colors.accent as any}
                    shadowOpacity={0.05}
                    shadowRadius={4}
                    shadowOffset={{ width: 0, height: 2 }}
                >
                    {children}
                </Stack>
            </YStack>
        </MotiView>
    )
}
