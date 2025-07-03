import { XStack, H4, Button, Stack } from 'tamagui'
import { Settings } from '@tamagui/lucide-icons'
import { MotiView } from 'moti'
import { useTheme } from '@/styles/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '@/types'

export function ProfileHeader() {
    const { colors } = useTheme()
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handlePress = () => {
        navigation.navigate('Settings')
    }

    return (
        <MotiView
            from={{ opacity: 0, translateY: -10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 100 }}
        >
            <XStack justifyContent="space-between" alignItems="center" mt="$5">
                <H4 fontWeight="800" color={colors.primaryDark}>
                    Profile
                </H4>
                <Button
                    onPress={handlePress}
                    backgroundColor="transparent"
                    pressStyle={{ scale: 0.92 }}
                    padding="$2"
                    hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} // easier to tap
                >
                    <Stack
                        padding="$2.5"
                        backgroundColor={colors.primaryDark}
                        borderRadius="$10"
                        shadowColor={colors.primaryDark}
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
