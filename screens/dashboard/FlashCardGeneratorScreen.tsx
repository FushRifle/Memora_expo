import { YStack, XStack, Input, Button, Text, ScrollView, Spinner } from 'tamagui'
import { Plus, ChevronRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { generateFlashcards } from '@/app/services/AIServices'

// ⚡ import correct types
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

// Define the type of params for the stack
type RootStackParamList = {
    FlashcardViewer: { flashcards: string } // we pass flashcards as JSON string
    // add other screens if needed
}

// Get the correct navigation prop
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'FlashcardViewer'>

export function FlashcardGeneratorScreen() {
    const [topic, setTopic] = useState('')
    const [isGenerating, setIsGenerating] = useState(false)
    const [recentTopics, setRecentTopics] = useState<string[]>([])

    const navigation = useNavigation<NavigationProp>()

    const handleGenerate = async () => {
        if (!topic.trim()) return

        setIsGenerating(true)
        try {
            // Call AI service to generate flashcards
            const flashcards = await generateFlashcards(topic)

            // Update recent topics (max 5)
            setRecentTopics(prev => [topic, ...prev.filter(t => t !== topic)].slice(0, 5))

            // Navigate to flashcard viewer screen
            navigation.navigate('FlashcardViewer', { flashcards: JSON.stringify(flashcards) })
        } catch (error) {
            console.error('Failed to generate flashcards:', error)
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <ScrollView p="$4">
            <YStack space="$4">
                <Text fontSize="$8" fontWeight="bold">Flashcard Generator</Text>

                <YStack space="$3">
                    <Text>Enter a topic to generate flashcards:</Text>
                    <XStack space="$3">
                        <Input
                            f={1}
                            placeholder="e.g. Photosynthesis, Calculus Derivatives"
                            value={topic}
                            onChangeText={setTopic}
                        />
                        <Button
                            icon={isGenerating ? <Spinner /> : <Plus />}
                            onPress={handleGenerate}
                            disabled={isGenerating}
                        />
                    </XStack>
                </YStack>

                {recentTopics.length > 0 && (
                    <YStack space="$3">
                        <Text fontSize="$6" color="$color2">Recent Topics</Text>
                        {recentTopics.map((item, index) => (
                            <Button
                                key={index}
                                onPress={() => setTopic(item)}
                                theme="alt2"
                                jc="space-between"
                                iconAfter={<ChevronRight />}
                            >
                                {item}
                            </Button>
                        ))}
                    </YStack>
                )}
            </YStack>
        </ScrollView>
    )
}
