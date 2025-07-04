import { YStack, Text, Card, XStack, Button } from 'tamagui'
import { FlipHorizontal, Shuffle } from '@tamagui/lucide-icons'
import { TouchableRipple } from 'react-native-paper'
import { useState } from 'react'
import { useTheme } from '@/styles/ThemeContext'
import { colors } from '@/styles/globalStyles'

export const FlashcardPreview = () => {
    const { isDark } = useTheme()
    const [isFlipped, setIsFlipped] = useState(false)
    const mockFlashcards = [
        { id: '1', question: 'What is the capital of France?', answer: 'Paris', category: 'Geography', difficulty: 'easy' },
        { id: '2', question: 'Solve for x: 2x + 5 = 15', answer: 'x = 5', category: 'Math', difficulty: 'medium' },
    ]

    return (
        <YStack space="$4" mt="$4">
            <Text fontWeight="700" fontSize={16} color={isDark ? 'white' : '#00394f'}
            >
                Flashcard Preview
            </Text>

            <XStack jc="center">
                <TouchableRipple
                    onPress={() => setIsFlipped(!isFlipped)}
                    borderless
                    rippleColor="#1976d2"
                    style={{ borderRadius: 12, width: '100%' }}
                >
                    <Card
                        width="100%"
                        minHeight={200}
                        ai="center"
                        jc="center"
                        backgroundColor="white"
                        p="$5"
                        elevate
                        borderRadius={12}
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <XStack space="$2" ai="center">
                            <FlipHorizontal size={20} color="#1976d2" />
                            <Text color={isDark ? 'white' : '#00394f'}
                                fontWeight="600">Tap to flip</Text
                            >
                        </XStack>
                        <Text mt="$4" fontSize={18} textAlign="center" color={isDark ? 'white' : '#00394f'}>
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
                    borderRadius={8}
                    elevate
                >
                    <Text color={isDark ? 'white' : '#00394f'} fontWeight="600">Shuffle</Text>
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
                        borderRadius={10}
                        elevation={2}
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.04,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <YStack space="$2">
                            <XStack jc="space-between" ai="center">
                                <Text fontWeight="600" color="#1976d2">
                                    {card.category}
                                </Text>
                                <Text fontSize={12} color="#9e9e9e" textTransform="capitalize">
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
