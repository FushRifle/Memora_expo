import { XStack, H4, Button } from 'tamagui'
import { ChevronLeft, MoreVertical } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

export const CourseHeader = ({ title }: { title: string }) => {
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
            <H4 color="#1976d2" numberOfLines={1} flex={1} mx="$2" ta="center">
                {title}
            </H4>
            <Button
                size="$2"
                circular
                icon={<MoreVertical size={16} color="#1976d2" />}
            />
        </XStack>
    )
}