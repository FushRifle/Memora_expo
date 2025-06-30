import { YStack, XStack, Text, Button, Card, Spinner } from 'tamagui'
import { Check, X, RotateCw } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { GestureDetector, Gesture } from 'react-native-gesture-handler'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { RouteProp } from '@react-navigation/native'


type Flashcard = {
    id: string
    question: string
    answer: string
    difficulty: number
    nextReview: Date
}

type FlashcardViewerRouteParams = {
    flashcards: {
        id: string
        question: string
        answer: string
        difficulty: number
        nextReview: Date
    }[]
}

export function FlashcardViewerScreen() {
    const route = useRoute<RouteProp<Record<string, FlashcardViewerRouteParams>, string>>()
    const [cards, setCards] = useState<Flashcard[]>(route.params?.flashcards || [])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isFlipped, setIsFlipped] = useState(false)
    const [isLoading] = useState(false)

    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotate: `${translateX.value / 20}deg` }
        ]
    }))

    const handleSwipe = (direction: 'left' | 'right') => {
        const updatedCards = [...cards]
        const card = updatedCards[currentIndex]

        if (direction === 'right') {
            card.difficulty = Math.max(1, card.difficulty - 0.2)
        } else {
            card.difficulty = Math.min(5, card.difficulty + 0.5)
        }

        const daysToAdd = direction === 'right'
            ? card.difficulty * 2
            : card.difficulty * 0.5
        card.nextReview = new Date(Date.now() + daysToAdd * 24 * 60 * 60 * 1000)

        setCards(updatedCards)
        goToNextCard()
    }

    const goToNextCard = () => {
        setIsFlipped(false)
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
        translateX.value = 0
        translateY.value = 0
    }

    // 🌀 New Gesture using Gesture.Pan()
    const pan = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = event.translationX
            translateY.value = event.translationY / 2
        })
        .onEnd((event) => {
            if (event.translationX > 100) {
                handleSwipe('right')
            } else if (event.translationX < -100) {
                handleSwipe('left')
            } else {
                translateX.value = withSpring(0)
                translateY.value = withSpring(0)
            }
        })

    return (
        <YStack f={1} ai="center" jc="center" p="$4" space="$4">
            {isLoading ? (
                <Spinner size="large" />
            ) : cards.length === 0 ? (
                <Text>No flashcards available</Text>
            ) : (
                <>
                    <Text>Card {currentIndex + 1} of {cards.length}</Text>

                    <GestureDetector gesture={pan}>
                        <Animated.View style={animatedStyle}>
                            <Card
                                elevate
                                size="$8"
                                w={300}
                                h={400}
                                onPress={() => setIsFlipped(!isFlipped)}
                            >
                                <Card.Header padded>
                                    <Text fontSize="$6" textAlign="center">
                                        {isFlipped ? 'Answer' : 'Question'}
                                    </Text>
                                </Card.Header>
                                <Card.Footer padded>
                                    <Text fontSize="$5" textAlign="center" mt="$4">
                                        {isFlipped
                                            ? cards[currentIndex].answer
                                            : cards[currentIndex].question}
                                    </Text>
                                </Card.Footer>
                            </Card>
                        </Animated.View>
                    </GestureDetector>

                    <XStack space="$4">
                        <Button
                            icon={<X size="$2" />}
                            circular
                            theme="red"
                            onPress={() => handleSwipe('left')}
                        />
                        <Button
                            icon={<RotateCw size="$2" />}
                            circular
                            onPress={() => setIsFlipped(!isFlipped)}
                        />
                        <Button
                            icon={<Check size="$2" />}
                            circular
                            theme="green"
                            onPress={() => handleSwipe('right')}
                        />
                    </XStack>
                </>
            )}
        </YStack>
    )
}
