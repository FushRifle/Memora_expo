import { Card, XStack, Text, Stack, Button, YStack } from 'tamagui'
import { FileText, BookOpen, Trash2, Eye } from '@tamagui/lucide-icons'

export const DocumentCard = ({
    title,
    type,
    date,
    size,
    onView,
    onDelete
}: {
    title: string
    type: string
    date: string
    size: string
    onView: () => void
    onDelete: () => void
}) => {
    const getIcon = () => {
        switch (type.toLowerCase()) {
            case 'pdf':
                return <FileText size={20} color="#d32f2f" />
            case 'text':
            case 'txt':
                return <FileText size={20} color="#1976d2" />
            default:
                return <FileText size={20} color="#616161" />
        }
    }

    return (
        <Card
            backgroundColor="white"
            p="$3"
            mb="$3"
            borderWidth={1}
            borderColor="#e0e0e0"
            borderRadius={8}
            elevation={1}
        >
            <XStack space="$3" ai="center">
                <Stack p="$2" backgroundColor="#e3f2fd" borderRadius={8}>
                    {getIcon()}
                </Stack>
                <YStack flex={1} space="$1">
                    <Text fontWeight="600" color="#212121" numberOfLines={1}>
                        {title}
                    </Text>
                    <XStack space="$2" ai="center">
                        <Text fontSize="$1" color="#757575">{type.toUpperCase()}</Text>
                        <Text fontSize="$1" color="#757575">•</Text>
                        <Text fontSize="$1" color="#757575">{size}</Text>
                        <Text fontSize="$1" color="#757575">•</Text>
                        <Text fontSize="$1" color="#757575">{date}</Text>
                    </XStack>
                </YStack>
                <XStack space="$2">
                    <Button
                        size="$1"
                        circular
                        icon={<Eye size={16} color="#1976d2" />}
                        onPress={onView}
                    />
                    <Button
                        size="$1"
                        circular
                        icon={<Trash2 size={16} color="#d32f2f" />}
                        onPress={onDelete}
                    />
                </XStack>
            </XStack>
        </Card>
    )
}