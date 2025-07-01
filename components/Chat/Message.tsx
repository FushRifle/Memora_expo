import { XStack, Card, Text } from 'tamagui'
import { User, Bot } from '@tamagui/lucide-icons'

export const ChatMessage = ({
    text,
    fromAI,
}: {
    text: string
    fromAI: boolean
}) => {
    return (
        <XStack
            jc={fromAI ? 'flex-start' : 'flex-end'}
            mb="$2"
            px="$2"
        >
            <Card
                backgroundColor={fromAI ? '#e3f2fd' : '#1976d2'}
                p="$3"
                borderRadius={12}
                maxWidth="80%"
                elevation={1}
                borderWidth={0}
            >
                <XStack space="$2" ai="center">
                    {fromAI ? (
                        <Bot size={18} color="#0d47a1" />
                    ) : (
                        <User size={18} color="white" />
                    )}
                    <Text
                        color={fromAI ? '#0d47a1' : 'white'}
                        fontSize="$4"
                        lineHeight="$6"
                        flexShrink={1}
                    >
                        {text}
                    </Text>
                </XStack>
            </Card>
        </XStack>
    )
}
