import { YStack, XStack, Text, Input, Stack } from 'tamagui'
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

    // Helper: render horizontal row of buttons
    const renderActionRow = (actions: typeof actionButtons) => (
        <XStack space="$3" marginTop="$2">
            {actions.map(({ id, label, icon: Icon, route }) => (
                <TouchableRipple
                    key={id}
                    onPress={() => router.push(route)}
                    borderless
                    rippleColor={'#1976d2' + '22'}
                    style={{ flex: 1, borderRadius: 12 }}
                >
                    <Stack
                        bg="white"
                        p="$2"
                        borderRadius={12}
                        borderWidth={1}
                        borderColor="#e0e0e0"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.06,
                            shadowRadius: 4,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <XStack alignItems="center" space="$2" flexShrink={1}>
                            <Stack
                                width={28}
                                height={28}
                                borderRadius={14}
                                bg="#1976d2"
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
        <YStack space="$4" padding="$3">
            {/* Search bar */}
            <Input
                placeholder="Search notes, flashcards..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderWidth={1}
                borderColor="#e0e0e0"
                borderRadius={12}
                px="$3"
                py="$2"
                fontSize="$3"
                icon={<Search size={18} color={theme.colors.onSurfaceVariant} />}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                backgroundColor="white"
            />

            <Text fontWeight="700" color={theme.colors.onSurface} fontSize={16}>
                Quick Actions
            </Text>

            {/* Actions: split into 2 rows */}
            {renderActionRow(actionButtons.slice(0, 2))}
            {renderActionRow(actionButtons.slice(2, 4))}
        </YStack>
    )
}
