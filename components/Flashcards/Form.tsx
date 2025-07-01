import { YStack, Input, Button, XStack, Text, Card } from 'tamagui'
import { Plus, Check, ChevronDown } from '@tamagui/lucide-icons'
import { useState } from 'react'

export const FlashcardForm = ({
    question,
    setQuestion,
    answer,
    setAnswer,
    category,
    setCategory,
    difficulty,
    setDifficulty,
    isEditing,
    addFlashcard,
    updateFlashcard,
    resetForm
}: {
    question: string
    setQuestion: (text: string) => void
    answer: string
    setAnswer: (text: string) => void
    category: string
    setCategory: (text: string) => void
    difficulty: string
    setDifficulty: (text: string) => void
    isEditing: boolean
    addFlashcard: () => void
    updateFlashcard: () => void
    resetForm: () => void
}) => {
    const [showCategories, setShowCategories] = useState(false)
    const categories = ['General', 'Math', 'Science', 'History', 'Language']

    return (
        <Card
            backgroundColor="white"
            p="$4"
            borderWidth={1}
            borderColor="#e0e0e0"
            elevation={1}
        >
            <YStack space="$3">
                <Text fontWeight="600" color="#1976d2">Flashcard Details</Text>

                <Input
                    placeholder="Question"
                    value={question}
                    onChangeText={setQuestion}
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    placeholderTextColor="#9e9e9e"
                />

                <Input
                    placeholder="Answer"
                    value={answer}
                    onChangeText={setAnswer}
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    placeholderTextColor="#9e9e9e"
                    multiline
                    numberOfLines={3}
                />

                <XStack space="$2" ai="center">
                    <Text flex={1} color="#616161">Category:</Text>
                    <Button
                        flex={3}
                        onPress={() => setShowCategories(!showCategories)}
                        iconAfter={<ChevronDown size={16} />}
                        backgroundColor="white"
                        borderWidth={1}
                        borderColor="#e0e0e0"
                    >
                        <Text>{category}</Text>
                    </Button>
                </XStack>

                {showCategories && (
                    <Card backgroundColor="#f5f5f5" p="$2" space="$2">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                onPress={() => {
                                    setCategory(cat)
                                    setShowCategories(false)
                                }}
                                backgroundColor={category === cat ? '#e3f2fd' : 'white'}
                            >
                                <Text color="#1976d2">{cat}</Text>
                            </Button>
                        ))}
                    </Card>
                )}

                <XStack space="$2" ai="center">
                    <Text flex={1} color="#616161">Difficulty:</Text>
                    <XStack flex={3} space="$2">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <Button
                                key={level}
                                flex={1}
                                size="$2"
                                backgroundColor={difficulty === level ? '#1976d2' : '#e3f2fd'}
                                onPress={() => setDifficulty(level)}
                            >
                                <Text
                                    color={difficulty === level ? 'white' : '#1976d2'}
                                    textTransform="capitalize"
                                >
                                    {level}
                                </Text>
                            </Button>
                        ))}
                    </XStack>
                </XStack>

                <XStack jc="flex-end" space="$2">
                    {isEditing && (
                        <Button
                            onPress={resetForm}
                            borderWidth={1}
                            borderColor="#e0e0e0"
                            backgroundColor="white"
                        >
                            <Text color="#1976d2">Cancel</Text>
                        </Button>
                    )}
                    <Button
                        icon={isEditing ? <Check size={16} color="white" /> : <Plus size={16} color="white" />}
                        backgroundColor="#1976d2"
                        disabled={!question.trim() || !answer.trim()}
                        onPress={isEditing ? updateFlashcard : addFlashcard}
                    >
                        <Text color="white">{isEditing ? 'Update' : 'Add'} Flashcard</Text>
                    </Button>
                </XStack>
            </YStack>
        </Card>
    )
}