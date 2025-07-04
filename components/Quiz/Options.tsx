import React from 'react'
import { YStack, Button, Text } from 'tamagui'
import { MotiView } from 'moti'
import * as Haptics from 'expo-haptics'
import { CheckIndicator } from '@/components/ui/Check'

type QuizOptionsProps = {
    options: string[]
    correctAnswer: string
    selectedOption: string | null
    onSelect: (option: string) => void
}

export function QuizOptions({ options, correctAnswer, selectedOption, onSelect }: QuizOptionsProps) {
    const getOptionState = (option: string) => {
        if (!selectedOption) return 'default'
        if (option === correctAnswer) return 'correct'
        if (option === selectedOption && option !== correctAnswer) return 'incorrect'
        return 'disabled'
    }

    return (
        <YStack space="$3">
            {options.map((option, index) => {
                const state = getOptionState(option)
                const isSelected = selectedOption === option

                const bgColor =
                    state === 'correct' ? '$green8'
                        : state === 'incorrect' ? '$red8'
                            : isSelected ? '$blue8'
                                : '$gray4'

                const borderColor =
                    state === 'correct' ? '$green10'
                        : state === 'incorrect' ? '$red10'
                            : isSelected ? '$blue10'
                                : '$gray8'

                return (
                    <MotiView
                        key={option}
                        from={{ opacity: 0, translateY: 20 }}
                        animate={{ opacity: 1, translateY: 0 }}
                        transition={{ type: 'spring', delay: index * 50 }}
                    >
                        <Button
                            onPress={() => {
                                if (!selectedOption) {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                                    onSelect(option)
                                }
                            }}
                            disabled={!!selectedOption}
                            bg={bgColor}
                            borderWidth={1}
                            borderColor={borderColor}
                            jc="flex-start"
                            icon={<CheckIndicator checked={isSelected} color="$blue10" />}
                            hoverStyle={{
                                backgroundColor: state === 'default' ? '$gray5' : undefined,
                                borderColor: state === 'default' ? '$gray8' : undefined
                            }}
                            pressStyle={{
                                backgroundColor: state === 'default' ? '$gray6' : undefined,
                                scale: 0.98
                            }}
                        >
                            <Text
                                color={
                                    state === 'correct' || state === 'incorrect' || isSelected
                                        ? 'white'
                                        : '$color12'
                                }
                                fontWeight="500"
                                textAlign="left"
                                flex={1}
                            >
                                {option}
                            </Text>
                        </Button>
                    </MotiView>
                )
            })}
        </YStack>
    )
}
