import { Card, YStack, Text, Button } from 'tamagui'
import { BookOpen, FilePlus } from '@tamagui/lucide-icons'

export const DocumentEmptyState = ({
    onUpload
}: {
    onUpload: () => void
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
                No documents yet. Upload your first study material!
            </Text>
            <Button
                icon={<FilePlus size={16} color="white" />}
                backgroundColor="#1976d2"
                onPress={onUpload}
                mt="$3"
            >
                <Text color="white">Upload Document</Text>
            </Button>
        </Card>
    )
}