import React, { useEffect } from 'react'
import { YStack, Text, H2, Button, Progress } from 'tamagui'
import { MotiView } from 'moti'
import * as Haptics from 'expo-haptics'
import { CheckCircle, RotateCcw } from '@tamagui/lucide-icons'
import { useTheme } from '@/styles/ThemeContext'

type QuizResultsProps = {
    score: number
    total: number
    onRestart: () => void
}

export function QuizResults({ score, total, onRestart }: QuizResultsProps) {
    const { colors } = useTheme()
    const percentage = Math.round((score / total) * 100)
    const passed = percentage >= 70

    useEffect(() => {
        Haptics.notificationAsync(
            passed ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error
        )
    }, [passed])

    return (
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ flex: 1 }}>
            <YStack f={1} jc="center" ai="center" p="$4" space="$4">
                <MotiView from={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <CheckCircle size={80} color={passed ? colors.success : colors.error as any} />
                </MotiView>

                <H2 color={passed ? colors.success : colors.error}>
                    {passed ? 'Quiz Passed!' : 'Quiz Failed'}
                </H2>

                <Text fontSize="$8" fontWeight="800" color={colors.text}>
                    {score}/{total} correct
                </Text>

                <Text fontSize="$5" color={colors.accent}>
                    ({percentage}%)
                </Text>

                <Progress value={percentage} w="80%" size="$4" mt="$4">
                    <Progress.Indicator bg={passed ? colors.success : colors.error} />
                </Progress>

                <Button
                    mt="$6"
                    icon={<RotateCcw size={16} color="white" />}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        onRestart()
                    }}
                    bg={colors.primary}
                    hoverStyle={{ bg: colors.primaryDark }}
                >
                    <Text color="white">Try Again</Text>
                </Button>

            </YStack>
        </MotiView>
    )
}
