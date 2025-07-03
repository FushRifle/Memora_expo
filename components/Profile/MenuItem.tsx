import { XStack, Text, Button, Stack } from 'tamagui'
import { MotiView } from 'moti'
import { ChevronRight } from '@tamagui/lucide-icons'
import { ComponentType } from 'react'
import { useTheme } from '@/styles/ThemeContext'

type IconProps = {
    size?: number | string
    color?: string
}

export function ProfileMenuItem({
    icon: Icon,
    label,
    onPress,
    delay = 0
}: {
    icon: ComponentType<IconProps>
    label: string
    onPress: () => void
    delay?: number
}) {
    const { colors } = useTheme()

    return (
        <MotiView
            from={{ opacity: 0, translateX: -15 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ type: 'spring', delay }}
        >
            <Button
                unstyled
                onPress={onPress}
                paddingVertical="$3.5"
                paddingHorizontal="$4"
                borderRadius="$4"
                pressStyle={{ backgroundColor: colors.background }}
                hoverStyle={{ backgroundColor: colors.background }}
                animation="unset"
            >
                <XStack alignItems="center" space="$4" flex={1}>
                    <Stack
                        backgroundColor={colors.primary}
                        padding="$2"
                        borderRadius="$3"
                        shadowColor={colors.primary}
                        shadowOpacity={0.2}
                        shadowRadius={4}
                        shadowOffset={{ width: 0, height: 2 }}
                    >
                        <Icon size={20} color="white" />
                    </Stack>
                    <Text flex={1} fontWeight="600" color={colors.primary}>
                        {label}
                    </Text>
                    <ChevronRight size={20} color={colors.primary as any} />
                </XStack>
            </Button>
        </MotiView>
    )
}
