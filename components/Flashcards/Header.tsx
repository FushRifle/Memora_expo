import { XStack, H3, Button, Text } from 'tamagui'
import { FileText } from '@tamagui/lucide-icons'
import { useTheme } from 'react-native-paper'

export const FlashcardHeader = () => {
    const theme = useTheme()

    return (
        <XStack
            ai="center"
            jc="space-between"
            p="$4"
            borderBottomWidth={1}
            borderBottomColor="#e0e0e0"
            backgroundColor="white"
            marginTop="$6"
        >
            <H3 color="#1976d2">Flashcard Generator</H3>
            <Button
                size="$2"
                icon={<FileText size={16} color="white" />}
                backgroundColor="#1976d2"
            >
                <Text color="white">Export</Text>
            </Button>
        </XStack>
    )
}