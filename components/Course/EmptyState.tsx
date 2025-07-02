import { Card, YStack, Text, Button } from 'tamagui'
import { BookOpen, Plus } from '@tamagui/lucide-icons'

export const CourseEmptyState = ({
    onAddCourse
}: {
    onAddCourse: () => void
}) => {
    return (
        <Card
            backgroundColor="white"
            p="$4"
            ai="center"
            jc="center"
            borderWidth={1}
            borderColor="#e0e0e0"
            borderRadius={8}
        >
            <BookOpen size={48} color="#9e9e9e" />
            <Text mt="$3" color="#616161" textAlign="center">
                No courses yet. Add your first course!
            </Text>
            <Button
                icon={<Plus size={16} color="white" />}
                backgroundColor="#1976d2"
                onPress={onAddCourse}
                mt="$3"
            >
                <Text color="white">Add Course</Text>
            </Button>
        </Card>
    )
}