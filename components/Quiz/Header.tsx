import { XStack, Text, H4 } from 'tamagui'
import { CustomBadge } from '@/components/ui/Badge'

type QuizHeaderProps = {
    current: number
    total: number
    difficulty: 'easy' | 'medium' | 'hard'
}

export function QuizHeader({ current, total, difficulty }: QuizHeaderProps) {
    const difficultyColor: string = (() => {
        switch (difficulty) {
            case 'easy':
                return '$green10'
            case 'medium':
                return '$yellow10'
            case 'hard':
                return '$red10'
            default:
                return '$gray10'
        }
    })()

    return (
        <XStack justifyContent="space-between" alignItems="center">
            <H4>
                Question {current}/{total}
            </H4>
            <CustomBadge color={difficultyColor}>
                <Text textTransform="capitalize" color="white">
                    {difficulty}
                </Text>
            </CustomBadge>
        </XStack>
    )
}
