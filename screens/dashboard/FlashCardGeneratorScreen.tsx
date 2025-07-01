import React, { useState } from 'react'
import { YStack, Text, Input, Button, ScrollView } from 'tamagui'
import { useTheme } from '@/styles/ThemeContext'

export function FlashcardGeneratorScreen() {
    const { colors } = useTheme()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [flashcards, setFlashcards] = useState<{ question: string; answer: string }[]>([])

    const addFlashcard = () => {
        if (question.trim() && answer.trim()) {
            setFlashcards((prev) => [...prev, { question, answer }])
            setQuestion('')
            setAnswer('')
        }
    }

    return (
        <YStack flex={1} p="$4" space="$4" backgroundColor={colors.background}>
            <Text fontWeight="bold" fontSize={20} color={colors.text}>
                Create Flashcards
            </Text>

            <Input
                placeholder="Enter question"
                value={question}
                onChangeText={setQuestion}
                backgroundColor={colors.inputBackground}
                color={colors.text}
            />
            <Input
                placeholder="Enter answer"
                value={answer}
                onChangeText={setAnswer}
                backgroundColor={colors.inputBackground}
                color={colors.text}
            />
            <Button theme="accent" onPress={addFlashcard}>
                Add Flashcard
            </Button>

            <ScrollView>
                {flashcards.map((card, index) => (
                    <YStack
                        key={index}
                        backgroundColor={colors.cardBackground}
                        borderRadius={8}
                        padding="$3"
                        marginBottom="$3"
                    >
                        <Text fontWeight="700" color={colors.accent}>
                            Q: {card.question}
                        </Text>
                        <Text color={colors.textSecondary}>A: {card.answer}</Text>
                    </YStack>
                ))}
            </ScrollView>
        </YStack>
    )
}
