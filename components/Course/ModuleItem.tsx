import { XStack, YStack, Text, Stack, Button } from 'tamagui'
import { CheckCircle, PlayCircle, Lock, ChevronRight } from '@tamagui/lucide-icons'

export const ModuleItem = ({
    title,
    duration,
    completed,
    locked,
    onPress
}: {
    title: string
    duration: string
    completed: boolean
    locked: boolean
    onPress: () => void
}) => {
    return (
        <XStack
            ai="center"
            jc="space-between"
            p="$3"
            backgroundColor="white"
            borderWidth={1}
            borderColor="#e0e0e0"
            borderRadius={8}
            mb="$2"
            onPress={onPress}
            pressStyle={{ backgroundColor: '#f5f5f5' }}
            disabled={locked}
            opacity={locked ? 0.6 : 1}
        >
            <XStack space="$3" ai="center" flex={1}>
                {locked ? (
                    <Lock size={20} color="#757575" />
                ) : completed ? (
                    <CheckCircle size={20} color="#4caf50" />
                ) : (
                    <PlayCircle size={20} color="#1976d2" />
                )}
                <YStack flex={1}>
                    <Text fontWeight={completed ? "600" : "500"} color={locked ? "#757575" : "#212121"}>
                        {title}
                    </Text>
                    <Text fontSize="$1" color="#757575">{duration}</Text>
                </YStack>
            </XStack>
            {!locked && <ChevronRight size={20} color="#757575" />}
        </XStack>
    )
}