import { YStack, Text, H2 } from 'tamagui'
import { MotiView } from 'moti'

type QuizQuestionProps = {
    question: string
    questionNumber: number
}

export function QuizQuestion({ question, questionNumber }: QuizQuestionProps) {
    return (
        <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring', delay: 100 }}
        >
            <YStack mb="$4">
                <Text fontSize="$6" color="$color11" mb="$2">Question #{questionNumber}</Text>
                <H2 fontWeight="600">{question}</H2>
            </YStack>
        </MotiView>
    )
}