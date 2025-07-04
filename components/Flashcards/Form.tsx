import { YStack, Input, Button, XStack, Text, Card, Stack } from 'tamagui'
import { Plus, Check, ChevronDown } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { colors } from '@/styles/globalStyles'
import { useTheme } from '@/styles/ThemeContext'

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
    const { isDark } = useTheme()
    const [showCategories, setShowCategories] = useState(false)
    const categories = ['General', 'Math', 'Science', 'History', 'Language']

    return (
        <Card
            bg="white"
            p="$4"
            elevation={2}
            borderRadius={12}
            style={{
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 6,
                shadowOffset: { width: 0, height: 2 },
            }}
        >
            <YStack space="$3">
                <Text fontWeight="700" fontSize={16} color={colors.primary}>
                    Flashcard Details
                </Text>

                <Input
                    placeholder="Question"
                    value={question}
                    onChangeText={setQuestion}
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor={isDark ? colors.primary : colors.primary}
                    borderRadius={8}
                    placeholderTextColor="#9e9e9e"
                />

                <Input
                    placeholder="Answer"
                    value={answer}
                    onChangeText={setAnswer}
                    backgroundColor="white"
                    borderWidth={1}
                    borderColor={isDark ? colors.primary : colors.primary}
                    borderRadius={8}
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
                        borderColor={isDark ? colors.primary : colors.primary}
                        borderRadius={8}
                        jc="space-between"
                    >
                        <Text color="#1976d2">{category}</Text>
                    </Button>
                </XStack>

                {showCategories && (
                    <YStack bg="#f9f9f9" p="$2" borderRadius={8} space="$2">
                        {categories.map((cat) => (
                            <Button
                                key={cat}
                                onPress={() => {
                                    setCategory(cat)
                                    setShowCategories(false)
                                }}
                                backgroundColor={category === cat ? '#e3f2fd' : 'white'}
                                borderRadius={8}
                                borderWidth={1}
                                borderColor="#e0e0e0"
                            >
                                <Text color="#1976d2">{cat}</Text>
                            </Button>
                        ))}
                    </YStack>
                )}

                <XStack space="$2" ai="center">
                    <Text flex={1} color="#616161">Difficulty:</Text>
                    <XStack flex={3} space="$2">
                        {['easy', 'medium', 'hard'].map((level) => (
                            <Button
                                key={level}
                                flex={1}
                                size="$2"
                                borderRadius={8}
                                backgroundColor={difficulty === level ? colors.primary : colors.secondary}
                                onPress={() => setDifficulty(level)}
                            >
                                <Text
                                    color={difficulty === level ? 'white' : 'white'}
                                    fontSize={12}
                                    fontWeight="600"
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
                            borderRadius={8}
                        >
                            <Text color="#1976d2">Cancel</Text>
                        </Button>
                    )}
                    <Button
                        icon={isEditing ? <Check size={16} color="white" /> : <Plus size={16} color="white" />}
                        backgroundColor={colors.secondary}
                        borderRadius={8}
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
