import { YStack, XStack, Text, Input, Stack } from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { TouchableRipple } from 'react-native-paper'
import { useState } from 'react'
import {
    BookOpen, FileText, BarChart2, Mic,
    Book, CheckSquare, ChevronRight, Search
} from '@tamagui/lucide-icons'

const actionButtons = [
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen, route: '/flashcards' },
    { id: 'documents', label: 'Documents', icon: FileText, route: '/documents' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, route: '/analytics' },
    { id: 'voice', label: 'Voice Notes', icon: Mic, route: '/voice' },
    { id: 'courses', label: 'Courses', icon: Book, route: '/courses' },
    { id: 'quiz', label: 'Quiz', icon: CheckSquare, route: '/quiz' },
]

export const QuickActions = () => {
    const router = useRouter()
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = useState('')

    // Helper: render horizontal row of buttons
    const renderActionRow = (actions: typeof actionButtons) => (
        <XStack space="$3">
            {actions.map(({ id, label, icon: Icon, route }) => (
                <TouchableRipple
                    key={id}
                    onPress={() => router.push(route)}
                    borderless
                    rippleColor={theme.colors.primary}
                    style={{ flex: 1, borderRadius: 12 }}
                >
                    <Stack
                        bg={theme.colors.surface}
                        p="$2"
                        borderRadius={12}
                        borderWidth={1}
                        borderColor={theme.colors.outline}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.05,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <XStack alignItems="center" space="$2" flexShrink={1}>
                            <Stack
                                width={28}
                                height={28}
                                borderRadius={14}
                                bg={theme.colors.primary}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Icon size={16} color="white" />
                            </Stack>
                            <Text
                                fontSize={13}
                                fontWeight="600"
                                color={theme.colors.onSurface}
                                numberOfLines={1}
                            >
                                {label}
                            </Text>
                        </XStack>
                        <ChevronRight size={16} color={theme.colors.onSurfaceVariant} />
                    </Stack>
                </TouchableRipple>
            ))}
        </XStack>
    )

    return (
        <YStack space="$4" padding="$2">
            {/* Search bar */}
            <Input
                placeholder="Search notes, flashcards..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderWidth={1}
                borderColor={theme.colors.outline}
                borderRadius={12}
                px="$3"
                py="$2"
                fontSize="$3"
                icon={<Search size={18} color={theme.colors.onSurfaceVariant} />}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                backgroundColor={theme.colors.surface}
                color={theme.colors.onSurface}
            />

            <Text fontWeight="700" color={theme.colors.onSurface} fontSize={16}>
                Quick Actions
            </Text>

            {/* Actions: 3 rows of 2 */}
            {renderActionRow(actionButtons.slice(0, 2))}
            {renderActionRow(actionButtons.slice(2, 4))}
            {renderActionRow(actionButtons.slice(4, 6))}
        </YStack>
    )
}
