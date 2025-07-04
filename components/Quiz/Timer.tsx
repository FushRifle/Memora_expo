import { XStack, Text, Progress } from 'tamagui'
import { MotiView } from 'moti'

type QuizTimerProps = {
    timeRemaining: number
}

export function QuizTimer({ timeRemaining }: QuizTimerProps) {
    const progress = (timeRemaining / 60) * 100
    const getTimerColor = () => {
        if (timeRemaining > 30) return '$green10'
        if (timeRemaining > 10) return '$yellow10'
        return '$red10'
    }

    return (
        <MotiView
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: 'timing', duration: 300 }}
        >
            <XStack ai="center" space="$2" mb="$3">
                <Text fontSize="$3" color="$color10">Time remaining:</Text>
                <Text fontWeight="700" color={getTimerColor()}>
                    {timeRemaining}s
                </Text>
            </XStack>
            <Progress value={progress} size="$1">
                <Progress.Indicator bg={getTimerColor()} />
            </Progress>
        </MotiView>
    )
}