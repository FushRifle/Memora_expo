import { XStack, H2, Button, Stack, H4 } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { useTheme } from '@/styles/ThemeContext'

export function SettingsHeader({ onBack }: { onBack: () => void }) {
    const { colors } = useTheme()

    const handleBack = async () => {
        try {
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        } catch (e) {
            console.warn('Haptics error:', e)
        }
        onBack()
    }

    return (
        <XStack alignItems="center" space="$3" mt="$5" mb="$2">
            <Button
                unstyled
                onPress={handleBack}
                pressStyle={{ scale: 0.92 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Stack
                    backgroundColor={colors.primary}
                    padding="$2"
                    borderRadius="$10"
                    shadowColor="#42C6A1"
                    shadowRadius={6}
                    shadowOpacity={0.2}
                    shadowOffset={{ width: 0, height: 3 }}
                >
                    <ChevronLeft size={22} color="white" />
                </Stack>
            </Button>

            <H4 fontWeight="800" color={colors.primary}>
                Settings
            </H4>
        </XStack>
    )
}
