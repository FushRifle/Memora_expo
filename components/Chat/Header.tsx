import { XStack, H4, Button, Text } from 'tamagui'
import { ChevronLeft } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

export const ChatHeader = () => {
    const router = useRouter()

    return (
        <XStack
            ai="center"
            jc="space-between"
            p="$3"
            borderBottomWidth={1}
            borderBottomColor="#e0e0e0"
            backgroundColor="white"
            marginTop="$6"
        >
            <Button
                unstyled
                icon={<ChevronLeft size={24} color="#1976d2" />}
                onPress={() => router.back()}
            />
            <H4 color="#1976d2">Memora AI</H4>
            <Button
                unstyled
                opacity={0}
                disabled
            />
        </XStack>
    )
}