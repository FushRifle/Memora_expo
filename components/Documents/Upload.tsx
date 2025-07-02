import { Card, YStack, XStack, Text, Button } from 'tamagui'
import { Upload, FilePlus } from '@tamagui/lucide-icons'

export const DocumentUpload = ({
    onUpload
}: {
    onUpload: () => void
}) => {
    return (
        <Card
            backgroundColor="#e3f2fd"
            p="$4"
            mb="$3"
            borderWidth={1}
            borderColor="#bbdefb"
            borderRadius={8}
        >
            <YStack space="$3" ai="center">
                <Upload size={40} color="#1976d2" />
                <Text fontWeight="600" color="#0d47a1" textAlign="center">
                    Upload Study Materials
                </Text>
                <Text color="#1976d2" textAlign="center" fontSize="$2">
                    PDFs, Word docs, or text files
                </Text>
                <Button
                    icon={<FilePlus size={16} color="white" />}
                    backgroundColor="#1976d2"
                    onPress={onUpload}
                    mt="$2"
                >
                    <Text color="white">Add Document</Text>
                </Button>
            </YStack>
        </Card>
    )
}