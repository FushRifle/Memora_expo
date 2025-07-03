import { XStack, H2, Button, useTheme } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'

export function SettingsHeader({ onBack }: { onBack: () => void }) {
    const theme = useTheme()

    return (
        <XStack alignItems="center" space="$4">
            <Button
                unstyled
                onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                    onBack()
                }}
                pressStyle={{ scale: 0.95 }}
            >
                <ChevronLeft size={28} color={theme.color.get()} />
            </Button>
            <H2 fontWeight="800">Settings</H2>
        </XStack>
    )
}