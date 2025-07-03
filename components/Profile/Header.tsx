import { XStack, H4, Button, Stack } from 'tamagui'
import { Settings } from '@tamagui/lucide-icons'
import { MotiView } from 'moti'
import * as Haptics from 'expo-haptics'
import { useTheme } from '@/styles/ThemeContext'
import { Alert } from 'react-native'

export function ProfileHeader({ onSettingsPress }: { onSettingsPress: () => void }) {
    const { colors } = useTheme()

    const handlePress = async () => {
        console.log('Settings icon pressed!')

        try {
            // Trigger haptic feedback
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

            // Call the navigation callback
            if (typeof onSettingsPress === 'function') {
                onSettingsPress()
            } else {
                console.warn('onSettingsPress is not a function')
                Alert.alert('Error', 'Navigation not available')
            }
        } catch (error) {
            console.error('Haptic feedback error:', error)
            // Fallback to normal press if haptics fails
            if (typeof onSettingsPress === 'function') {
                onSettingsPress()
            }
        }
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
                <Button
                    onPress={handlePress}
                    backgroundColor="transparent"
                    pressStyle={{ scale: 0.92 }}
                    padding="$2"
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // Makes it easier to press
                >
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