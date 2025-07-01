import { YStack, Text, Card, XStack, Button } from 'tamagui'
import { BookOpen, Edit3, Trash2 } from '@tamagui/lucide-icons'

export const FlashcardList = ({
    flashcards,
    editFlashcard,
    deleteFlashcard
}: {
    flashcards: any[]
    editFlashcard: (card: any) => void
    deleteFlashcard: (id: string) => void
}) => {
    return (
        <YStack space="$3" mt="$4">
            <Text fontWeight="600" color="#1976d2">
                Your Flashcards ({flashcards.length})
            </Text>

            {flashcards.length > 0 ? (
                <YStack space="$2">
                    {flashcards.map((card) => (
                        <Card
                            key={card.id}
                            backgroundColor="white"
                            p="$3"
                            borderWidth={1}
                            borderColor="#e0e0e0"
                            elevation={1}
                        >
                            <YStack space="$2">
                                <XStack jc="space-between" ai="center">
                                    <Text fontWeight="600" color="#1976d2">
                                        {card.category}
                                    </Text>
                                    <XStack space="$2">
                                        <Button
                                            size="$1"
                                            circular
                                            icon={<Edit3 size={14} color="#1976d2" />}
                                            onPress={() => editFlashcard(card)}
                                            backgroundColor="#e3f2fd"
                                        />
                                        <Button
                                            size="$1"
                                            circular
                                            icon={<Trash2 size={14} color="#d32f2f" />}
                                            onPress={() => deleteFlashcard(card.id)}
                                            backgroundColor="#ffebee"
                                        />
                                    </XStack>
                                </XStack>
                                <Text fontWeight="500">Q: {card.question}</Text>
                                <Text color="#616161">A: {card.answer}</Text>
                                <Text fontSize="$1" color="#9e9e9e" textTransform="capitalize">
                                    Difficulty: {card.difficulty}
                                </Text>
                            </YStack>
                        </Card>
                    ))}
                </YStack>
            ) : (
                <Card
                    backgroundColor="#f5f5f5"
                    p="$4"
                    ai="center"
                    jc="center"
                    borderWidth={1}
                    borderColor="#e0e0e0"
                >
                    <BookOpen size={40} color="#9e9e9e" />
                    <Text mt="$2" color="#616161">
                        No flashcards yet. Add your first one!
                    </Text>
                </Card>
            )}
        </YStack>
    )
}