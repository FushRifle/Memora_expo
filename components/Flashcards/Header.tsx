import { XStack, YStack, Button, Text, Card, Input, H4 } from 'tamagui'
import { FileText, Search } from '@tamagui/lucide-icons'
import { useTheme } from 'react-native-paper'
import { useState } from 'react'

export const FlashcardHeader = () => {
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <Card
            backgroundColor="white"
            p="$4"
            borderRadius={10}
            elevation={10}
            mt="$6"
            style={{
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
            }}
        >
            <YStack space="$3">
                <XStack ai="center" jc="space-between">
                    <H4 color="#1976d2" fontWeight="700">
                        Flashcard Generator
                    </H4>
                    <Button
                        size="$2"
                        icon={<FileText size={16} color="white" />}
                        backgroundColor="#1976d2"
                        borderRadius={8}
                        px="$3"
                    >
                        <Text color="white" fontWeight="600">Export</Text>
                    </Button>
                </XStack>

                <Input
                    placeholder="Search flashcards..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    borderWidth={1}
                    borderColor="#e0e0e0"
                    borderRadius={8}
                    px="$3"
                    py="$2"
                    backgroundColor="white"
                    placeholderTextColor="#9e9e9e"
                    color="#212121"
                    icon={<Search size={18} color="#9e9e9e" />}
                />
            </YStack>
        </Card>
    )
}
