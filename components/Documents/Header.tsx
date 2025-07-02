import { XStack, H4, Button } from 'tamagui'
import { ChevronLeft, Upload, MoreVertical } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

export const DocumentHeader = () => {
    const router = useRouter()

    return (
        <XStack
            ai="center"
            jc="space-between"
            p="$3"
            mt="$5"
            borderBottomWidth={1}
            borderBottomColor="#e0e0e0"
            backgroundColor="white"
        >
            <Button
                unstyled
                icon={<ChevronLeft size={24} color="#1976d2" />}
                onPress={() => router.back()}
            />
            <H4 color="#1976d2">My Documents</H4>
            <XStack space="$2">
                <Button
                    size="$2"
                    circular
                    icon={<Upload size={16} color="#1976d2" />}
                />
                <Button
                    size="$2"
                    circular
                    icon={<MoreVertical size={16} color="#1976d2" />}
                />
            </XStack>
        </XStack>
    )
}