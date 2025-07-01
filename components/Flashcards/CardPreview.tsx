import { YStack, Text, Card, XStack, Button } from 'tamagui'
import { FlipHorizontal, Shuffle } from '@tamagui/lucide-icons'
import { TouchableRipple } from 'react-native-paper'
import { useState } from 'react'

export const FlashcardPreview = () => {
    const [isFlipped, setIsFlipped] = useState(false)
    const mockFlashcards = [
        { id: '1', question: 'What is the capital of France?', answer: 'Paris', category: 'Geography', difficulty: 'easy' },
        { id: '2', question: 'Solve for x: 2x + 5 = 15', answer: 'x = 5', category: 'Math', difficulty: 'medium' },
    ]

    return (
        <YStack space="$4" mt="$4">
            <Text fontWeight="600" color="#1976d2">Flashcard Preview</Text>

            <XStack jc="center">
                <TouchableRipple
                    onPress={() => setIsFlipped(!isFlipped)}
                    borderless
                    style={{ borderRadius: 12, width: '100%' }}
                >
                    <Card
                        width="100%"
                        minHeight={200}
                        ai="center"
                        jc="center"
                        backgroundColor="white"
                        p="$5"
                        borderWidth={1}
                        borderColor="#e0e0e0"
                        elevation={2}
                    >
                        <XStack space="$2" ai="center">
                            <FlipHorizontal size={20} color="#1976d2" />
                            <Text color="#1976d2">Tap to flip</Text>
                        </XStack>
                        <Text mt="$4" fontSize="$6" textAlign="center" color="#212121">
                            {isFlipped ? mockFlashcards[0].answer : mockFlashcards[0].question}
                        </Text>
                    </Card>
                </TouchableRipple>
            </XStack>

            <XStack jc="center" space="$3">
                <Button
                    icon={<Shuffle size={16} color="#1976d2" />}
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    backgroundColor="white"
                >
                    <Text color="#1976d2">Shuffle</Text>
                </Button>
            </XStack>

            <YStack space="$3" mt="$4">
                {mockFlashcards.map((card) => (
                    <Card
                        key={card.id}
                        backgroundColor="white"
                        p="$3"
                        borderWidth={1}
                        borderColor="#e0e0e0"
                        elevation={1}
                    >
                        <YStack space="$2">
                            <XStack jc="space-between">
                                <Text fontWeight="600" color="#1976d2">
                                    {card.category}
                                </Text>
                                <Text fontSize="$1" color="#9e9e9e" textTransform="capitalize">
                                    {card.difficulty}
                                </Text>
                            </XStack>
                            <Text fontWeight="500">Q: {card.question}</Text>
                            <Text color="#616161">A: {card.answer}</Text>
                        </YStack>
                    </Card>
                ))}
            </YStack>
        </YStack>
    )
}