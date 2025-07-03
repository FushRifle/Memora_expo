import { XStack, Text, Button, Stack } from 'tamagui'
import { ChevronRight } from '@tamagui/lucide-icons'
import { ComponentType } from 'react'
import { LinearGradient } from 'tamagui/linear-gradient'
import { useTheme } from '@/styles/ThemeContext'
import { color } from '@tamagui/themes'

type IconProps = { size?: number | string; color?: string }

export function SettingsItem({
    icon: Icon,
    label,
    onPress,
    children
}: {
    icon: ComponentType<IconProps>
    label: string
    onPress?: () => void
    children?: React.ReactNode
}) {
    const { colors } = useTheme()

    return (
        <Button
            unstyled
            onPress={onPress}
            padding="$4"
            pressStyle={{ backgroundColor: colors.background }}
        >
            <XStack alignItems="center" space="$3" flex={1}>
                <LinearGradient
                    colors={['#4B0082', '#42C6A1']}
                    start={[0, 0]}
                    end={[1, 1]}
                    borderRadius="$3"
                    padding="$2"
                    justifyContent="center"
                    alignItems="center"
                    shadowColor="#000"
                    shadowOpacity={0.1}
                    shadowRadius={3}
                    shadowOffset={{ width: 0, height: 1 }}
                >
                    <Icon size={18} color="white" />
                </LinearGradient>
                <Text flex={1} fontWeight="500" color='white'>
                    {label}
                </Text>
                {children || <ChevronRight size={20} color='white' />}
            </XStack>
        </Button>
    )
}
