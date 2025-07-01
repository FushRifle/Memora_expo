import { YStack, XStack, Text, Button, Input, Stack } from 'tamagui'
import { BookOpen, FileText, BarChart2, Mic, ChevronRight, Search } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { TouchableRipple } from 'react-native-paper'
import { useState } from 'react'

const actionButtons = [
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen, route: '/flashcards' },
    { id: 'documents', label: 'Documents', icon: FileText, route: '/documents' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, route: '/analytics' },
    { id: 'voice', label: 'Voice Notes', icon: Mic, route: '/voice' },
]

export const QuickActions = () => {
    const router = useRouter()
    const theme = useTheme()
    const [searchQuery, setSearchQuery] = useState('')

    const renderActionRow = (actions: typeof actionButtons) => (
        <XStack space="$3" marginTop="$2">
            {actions.map(({ id, label, icon: Icon, route }) => (
                <TouchableRipple
                    key={id}
                    onPress={() => router.push(route)}
                    borderless
                    rippleColor={theme.colors.primaryContainer}
                    style={{ borderRadius: 8, flex: 1 }}
                >
                    <Stack
                        bg={theme.colors.surfaceVariant}
                        p="$3"
                        borderRadius={8}
                        borderWidth={1}
                        borderColor={theme.colors.outline}
                    >
                        <XStack space="$2" ai="center">
                            <Icon size={20} color={theme.colors.primary} />
                            <Text
                                fontSize="$3"
                                fontWeight="600"
                                color={theme.colors.primary}
                                flex={1}
                            >
                                {label}
                            </Text>
                            <ChevronRight size={16} color={theme.colors.onSurfaceVariant} />
                        </XStack>
                    </Stack>
                </TouchableRipple>
            ))}
        </XStack>
    )

    return (
        <YStack space="$4" padding="$3">
            {/* Search Bar */}
            <Input
                placeholder="Search notes, flashcards..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderWidth={1}
                borderColor={theme.colors.outline}
                borderRadius={8}
                px="$3"
                py="$2"
                fontSize="$1"
                icon={<Search size={18} color={theme.colors.onSurface} />}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                backgroundColor={theme.colors.surface}
            />

            <Text
                fontWeight="600"
                color={theme.colors.onSurface}
                fontSize="$3"
                marginTop="$2"
            >
                Quick Actions
            </Text>

            {renderActionRow(actionButtons.slice(0, 2))}
            {renderActionRow(actionButtons.slice(2, 4))}
        </YStack>
    )
}