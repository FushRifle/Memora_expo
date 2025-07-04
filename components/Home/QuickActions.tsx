import { YStack, XStack, Text, Stack, ScrollView } from 'tamagui'
import { TouchableRipple } from 'react-native-paper'
import {
    BookOpen, FileText, BarChart2, Mic,
    Book, CheckSquare
} from '@tamagui/lucide-icons'
import { useTheme } from '@/styles/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { colors } from '@/styles/globalStyles'

const actionButtons = [
    { id: 'flashcards', label: 'Flashcards', icon: BookOpen, screen: 'Flashcards' },
    { id: 'documents', label: 'Documents', icon: FileText, screen: 'Documents' },
    { id: 'analytics', label: 'Analytics', icon: BarChart2, screen: 'Analytics' },
    { id: 'voice', label: 'Voice', icon: Mic, screen: 'Voice' },
    { id: 'courses', label: 'Courses', icon: Book, screen: 'Courses' },
    { id: 'quiz', label: 'Quiz', icon: CheckSquare, screen: 'Quiz' },
]

export const QuickActions = ({ handleActionPress }: { handleActionPress: (screen: string) => void }) => {
    const { isDark } = useTheme()
    const navigation = useNavigation()

    return (
        <YStack space="$3" padding="$2">
            <Text
                fontWeight="700"
                color={isDark ? colors.secondary : '#00394f'}
                fontSize={16}
                paddingHorizontal="$2"
            >
                Quick Actions
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                }}
            >
                <XStack space="$3">
                    {actionButtons.map(({ id, label, icon: Icon, screen }) => (
                        <TouchableRipple
                            key={id}
                            onPress={() => handleActionPress(screen)}
                            borderless
                            rippleColor={colors.primary + '20'}
                            style={{ alignItems: 'center', justifyContent: 'center' }}
                        >
                            <YStack ai="center" space="$1">
                                <Stack
                                    width={48}
                                    height={48}
                                    borderRadius={24}
                                    backgroundColor={isDark ? 'white' : colors.primary + '20'}
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Icon size={25}
                                        color={isDark ? colors.secondary : '#00394f'}
                                    />
                                </Stack>
                                <Text
                                    fontSize={11}
                                    color={isDark ? 'white' : '#00394f'}
                                    numberOfLines={1}
                                >
                                    {label}
                                </Text>
                            </YStack>
                        </TouchableRipple>
                    ))}
                </XStack>
            </ScrollView>
        </YStack >
    )
}
