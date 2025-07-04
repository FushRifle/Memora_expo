import { YStack, Text, Card, XStack, Button, Stack } from 'tamagui'
import { FlipHorizontal, Shuffle } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useTheme } from '@/styles/ThemeContext'
import { colors } from '@/styles/globalStyles'

export const FlashcardStudy = ({ flashcards }: { flashcards: any[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const { isDark } = useTheme()

    const mockFlashcards = [
        { id: '1', question: 'What is the capital of France?', answer: 'Paris' },
        { id: '2', question: 'Solve for x: 2x + 5 = 15', answer: 'x = 5' },
    ]

    const currentCard = flashcards.length ? flashcards[currentIndex] : mockFlashcards[currentIndex]

    return (
        <YStack space="$4" marginBottom="$9">
            <Text fontWeight="700" fontSize={16}
                color={isDark ? 'white' : '#00394f'}
            >
                Study Mode
            </Text>

            <Card
                backgroundColor="white"
                p="$4"
                borderWidth={1}
                borderColor="#e0e0e0"
                borderRadius={12}
                elevation={2}
                style={{
                    shadowColor: '#000',
                    shadowOpacity: 0.05,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                }}
            >
                <YStack space="$4" ai="center">
                    <Text fontSize={16} fontWeight="700" color={isDark ? 'white' : '#00394f'}>
                        Flashcard {currentIndex + 1}/{flashcards.length || mockFlashcards.length}
                    </Text>

                    <Card
                        width="100%"
                        minHeight={250}
                        ai="center"
                        jc="center"
                        backgroundColor="#e3f2fd"
                        borderRadius={10}
                        p="$5"
                        borderWidth={1}
                        borderColor="#bbdefb"
                        onPress={() => setIsFlipped(!isFlipped)}
                        elevation={1}
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.04,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <Text fontSize={18} textAlign="center" color={isDark ? 'white' : '#00394f'} fontWeight="600">
                            {isFlipped ? currentCard.answer : currentCard.question}
                        </Text>
                    </Card>

                    <XStack space="$3">
                        <Button
                            icon={<Shuffle size={16} color={isDark ? 'white' : '#00394f'} />}
                            borderWidth={1}
                            borderColor="#e0e0e0"
                            backgroundColor="white"
                            borderRadius={8}
                        >
                            <Text color={isDark ? 'white' : '#00394f'} fontWeight="600">Shuffle</Text>
                        </Button>
                        <Button
                            icon={<FlipHorizontal size={16} color={isDark ? 'white' : '#00394f'} />}
                            borderWidth={1}
                            borderColor="#e0e0e0"
                            backgroundColor="white"
                            borderRadius={8}
                            onPress={() => setIsFlipped(!isFlipped)}
                        >
                            <Text color={isDark ? 'white' : '#00394f'} fontWeight="600">Flip</Text>
                        </Button>
                    </XStack>

                    <XStack space="$3">
                        <Button
                            backgroundColor="#f44336"
                            borderRadius={8}
                            flex={1}
                        >
                            <Text color="white" fontWeight="600">Incorrect</Text>
                        </Button>
                        <Button
                            backgroundColor="#4caf50"
                            borderRadius={8}
                            flex={1}
                        >
                            <Text color="white" fontWeight="600">Correct</Text>
                        </Button>
                    </XStack>
                </YStack>
            </Card>

            <YStack space="$3" mt="$4">
                <Text fontWeight="700" fontSize={15} color={isDark ? 'white' : '#00394f'}>
                    Study Progress
                </Text>
                <Card
                    backgroundColor="white"
                    p="$4"
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    borderRadius={10}
                    elevation={10}
                    style={{
                        shadowColor: '#000',
                        shadowOpacity: 0.03,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 1 },
                    }}
                >
                    <YStack space="$2">
                        <XStack jc="space-between">
                            <Text color="#616161">Mastered</Text>
                            <Text fontWeight="600">0% (0/0)</Text>
                        </XStack>
                        <Stack height={8} backgroundColor="#e0e0e0" borderRadius={4}>
                            <Stack width="0%" height={8} backgroundColor="#4caf50" borderRadius={4} />
                        </Stack>
                    </YStack>
                </Card>
            </YStack>
        </YStack>
    )
}
