import { YStack, Text, Card, XStack, H4, Paragraph, Image } from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'

export const AIAssistantCard = () => {
    const router = useRouter()
    const { colors } = useTheme()

    return (
        <YStack space="$3">
            <Text fontWeight="bold" marginTop="$2"
                color={colors.primary}>
                Memora AI Assistant
            </Text>
            <Card bg="$bg2" p="$4" elevate onPress={() => router.push('/assistant')}>
                <XStack space="$3" ai="center">
                    <Image
                        source={require('@/assets/ai-icon.png')}
                        width={48}
                        height={48}
                        borderRadius="$3"
                    />
                    <YStack f={1}>
                        <Paragraph>Need help with your studies?</Paragraph>
                        <Paragraph theme="alt2" mt="$1">
                            Ask me anything about your courses, assignments, or concepts.
                        </Paragraph>
                    </YStack>
                </XStack>
            </Card>
        </YStack>
    )
}