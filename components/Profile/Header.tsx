import { XStack, H4, Button, Stack } from 'tamagui'
import { Settings } from '@tamagui/lucide-icons'
import { MotiView } from 'moti'
import * as Haptics from 'expo-haptics'
import { useTheme } from '@/styles/ThemeContext'

export function ProfileHeader({ onSettingsPress }: { onSettingsPress: () => void }) {
    const { colors } = useTheme()

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        onSettingsPress()
    }

    return (
        <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 100 }}
        >
            <XStack justifyContent="space-between" alignItems="center" mt="$5">
                <H4 fontWeight="800" color={colors.primary}>
                    Profile
                </H4>
                <Button unstyled onPress={handlePress} pressStyle={{ scale: 0.92 }}>
                    <Stack
                        padding="$2.5"
                        backgroundColor={colors.primary}
                        borderRadius="$10"
                        shadowColor={colors.primary}
                        shadowRadius={6}
                        shadowOpacity={0.15}
                        shadowOffset={{ width: 0, height: 3 }}
                    >
                        <Settings size={22} color="white" />
                    </Stack>
                </Button>
            </XStack>
        </MotiView>
    )
}
