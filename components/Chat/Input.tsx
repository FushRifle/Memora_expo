import { XStack, Input, Button } from 'tamagui'
import { Send, Paperclip } from '@tamagui/lucide-icons'
import { useState } from 'react'

export const ChatInput = ({
    onSend
}: {
    onSend: (message: string) => void
}) => {
    const [input, setInput] = useState('')

    const handleSend = () => {
        if (input.trim()) {
            onSend(input)
            setInput('')
        }
    }

    return (
        <XStack space="$2" ai="center" p="$2" backgroundColor="white">
            <Button
                size="$3"
                circular
                icon={<Paperclip size={18} color="#616161" />}
                backgroundColor="#f5f5f5"
            />
            <Input
                flex={1}
                value={input}
                onChangeText={setInput}
                placeholder="Type your message..."
                backgroundColor="white"
                borderWidth={1}
                borderColor="#e0e0e0"
                color="#212121"
                fontSize="$5"
                placeholderTextColor="#9e9e9e"
                onSubmitEditing={handleSend}
            />
            <Button
                size="$3"
                circular
                icon={<Send size={18} color="white" />}
                backgroundColor="#1976d2"
                onPress={handleSend}
                disabled={!input.trim()}
                opacity={input.trim() ? 1 : 0.5}
            />
        </XStack>
    )
}