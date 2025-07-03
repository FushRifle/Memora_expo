import { YStack, XStack, Text, Stack } from 'tamagui'
import { TouchableRipple } from 'react-native-paper'
import {
    BookOpen, FileText, BarChart2, Mic,
    Book, CheckSquare, ChevronRight
} from '@tamagui/lucide-icons'
import { useTheme } from '@/styles/ThemeContext'
import { useNavigation } from '@react-navigation/native'


const actionButtons = [
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen, screen: 'Flashcards' },
    { id: 'documents', label: 'Documents', icon: FileText, screen: 'Documents' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, screen: 'Analytics' },
    { id: 'voice', label: 'Voice Notes', icon: Mic, screen: 'Voice' },
    { id: 'courses', label: 'Courses', icon: Book, screen: 'Courses' },
    { id: 'quiz', label: 'Quiz', icon: CheckSquare, screen: 'Quiz' },
]

export const QuickActions = ({ handleActionPress }: { handleActionPress: (screen: string) => void }) => {
    const { colors } = useTheme()
    const navigation = useNavigation()


    const renderActionRow = (actions: typeof actionButtons) => (
        <XStack space="$3">
            {actions.map(({ id, label, icon: Icon, screen }) => (
                <TouchableRipple
                    key={id}
                    onPress={() => {
                        if (navigation && screen) {
                            navigation.navigate(screen as never)
                        }
                    }}
                    borderless
                    rippleColor={colors.primary}
                    style={{ flex: 1, borderRadius: 12 }}
                >
                    <Stack
                        bg="white"
                        p="$2"
                        borderRadius={12}
                        borderWidth={1}
                        borderColor={colors.primary}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                        style={{
                            shadowColor: '#000',
                            shadowOpacity: 0.08,
                            shadowRadius: 6,
                            shadowOffset: { width: 0, height: 2 },
                        }}
                    >
                        <XStack alignItems="center" space="$2" flexShrink={1}>
                            <Stack
                                width={28}
                                height={28}
                                borderRadius={14}
                                bg={colors.primary}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Icon size={16} color="white" />
                            </Stack>
                            <Text
                                fontSize={13}
                                fontWeight="600"
                                color={colors.primary}
                                numberOfLines={1}
                            >
                                {label}
                            </Text>
                        </XStack>
                        <ChevronRight size={16} color={colors.primary as any} />
                    </Stack>
                </TouchableRipple>
            ))}
        </XStack>
    )

    return (
        <YStack space="$4" padding="$2">
            <Text fontWeight="700" color={colors.primary} fontSize={16}>
                Quick Actions
            </Text>
            {renderActionRow(actionButtons.slice(0, 2))}
            {renderActionRow(actionButtons.slice(2, 4))}
            {renderActionRow(actionButtons.slice(4, 6))}
        </YStack>
    )
}
