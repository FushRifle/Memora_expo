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
        <YStack space="$4" mt="$4">
            <Text fontWeight="700" fontSize={16} color="#1976d2">
                Your Flashcards ({flashcards.length})
            </Text>

            {flashcards.length > 0 ? (
                <YStack space="$3">
                    {flashcards.map((card) => (
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
                                    <XStack space="$2">
                                        <Button
                                            size="$1"
                                            circular
                                            icon={<Edit3 size={14} color="#1976d2" />}
                                            onPress={() => editFlashcard(card)}
                                            backgroundColor="#e3f2fd"
                                            borderWidth={1}
                                            borderColor="#bbdefb"
                                        />
                                        <Button
                                            size="$1"
                                            circular
                                            icon={<Trash2 size={14} color="#d32f2f" />}
                                            onPress={() => deleteFlashcard(card.id)}
                                            backgroundColor="#ffebee"
                                            borderWidth={1}
                                            borderColor="#ffcdd2"
                                        />
                                    </XStack>
                                </XStack>
                                <Text fontWeight="500">Q: {card.question}</Text>
                                <Text color="#616161">A: {card.answer}</Text>
                                <Text fontSize={12} color="#9e9e9e" textTransform="capitalize">
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
                    borderRadius={10}
                    elevation={1}
                    style={{
                        shadowColor: '#000',
                        shadowOpacity: 0.03,
                        shadowRadius: 3,
                        shadowOffset: { width: 0, height: 1 },
                    }}
                >
                    <BookOpen size={36} color="#9e9e9e" />
                    <Text mt="$2" color="#616161" fontWeight="500">
                        No flashcards yet. Add your first one!
                    </Text>
                </Card>
            )}
        </YStack>
    )
}
