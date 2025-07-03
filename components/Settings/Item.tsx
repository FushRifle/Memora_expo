import { XStack, Text, Button, Stack, useTheme } from 'tamagui'
import { ChevronRight } from '@tamagui/lucide-icons'
import { ComponentType } from 'react'

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
    const theme = useTheme()

    return (
        <Button
            unstyled
            onPress={onPress}
            padding="$4"
            pressStyle={{ backgroundColor: theme.backgroundHover }}
        >
            <XStack alignItems="center" space="$4" flex={1}>
                <Stack padding="$2" borderRadius="$3">
                    <Icon size={20} color={theme.color.get()} />
                </Stack>
                <Text flex={1} fontWeight="500">{label}</Text>
                {children || <ChevronRight size={20} color={theme.colorHover} />}
            </XStack>
        </Button>
    )
}