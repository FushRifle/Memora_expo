import { Card, XStack, YStack, Text, Stack, Button } from 'tamagui'
import { BookOpen, Clock, Users, ChevronRight } from '@tamagui/lucide-icons'

export const CourseCard = ({
    title,
    instructor,
    progress,
    duration,
    students,
    onPress
}: {
    title: string
    instructor: string
    progress: number
    duration: string
    students: number
    onPress: () => void
}) => {
    return (
        <Card
            backgroundColor="white"
            p="$3"
            mb="$3"
            borderWidth={1}
            borderColor="#e0e0e0"
            borderRadius={8}
            onPress={onPress}
            pressStyle={{ backgroundColor: '#f5f5f5' }}
        >
            <YStack space="$2">
                <Text fontWeight="600" color="#1976d2" fontSize="$5">
                    {title}
                </Text>
                <Text color="#616161">Instructor: {instructor}</Text>

                <XStack space="$2" ai="center">
                    <Stack flex={1} height={6} backgroundColor="#e0e0e0" borderRadius={3}>
                        <Stack
                            width={`${progress}%`}
                            height={6}
                            backgroundColor="#1976d2"
                            borderRadius={3}
                        />
                    </Stack>
                    <Text fontSize="$1" color="#757575">{progress}%</Text>
                </XStack>

                <XStack space="$3" mt="$2">
                    <XStack space="$1" ai="center">
                        <Clock size={14} color="#757575" />
                        <Text fontSize="$1" color="#757575">{duration}</Text>
                    </XStack>
                    <XStack space="$1" ai="center">
                        <Users size={14} color="#757575" />
                        <Text fontSize="$1" color="#757575">{students} students</Text>
                    </XStack>
                </XStack>
            </YStack>
        </Card>
    )
}