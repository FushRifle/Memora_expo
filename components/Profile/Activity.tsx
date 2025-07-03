import { XStack, YStack, Text, Circle, Separator } from 'tamagui'
import { MotiView } from 'moti'
import { useTheme } from '@/styles/ThemeContext'

type ActivityItemProps = {
    title: string
    time: string
    isLast?: boolean
}

export function ActivityItem({ title, time, isLast = false }: ActivityItemProps) {
    const { colors } = useTheme()

    return (
        <>
            <MotiView
                from={{ opacity: 0, translateY: 6 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', damping: 15 }}
            >
                <XStack alignItems="center" space="$3" paddingVertical="$2.5" paddingHorizontal="$3">
                    <Circle size="$3" backgroundColor={colors.primary} />
                    <YStack flex={1}>
                        <Text fontWeight="500" fontSize="$4" color={colors.primary}>
                            {title}
                        </Text>
                        <Text fontSize="$2" color={colors.accent}>
                            {time}
                        </Text>
                    </YStack>
                </XStack>
            </MotiView>
            {!isLast && <Separator marginHorizontal="$3" />}
        </>
    )
}
