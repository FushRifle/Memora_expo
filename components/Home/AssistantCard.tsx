import { YStack, Text, Card, XStack, Paragraph } from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import Svg, { Rect, Circle, Path } from 'react-native-svg'

export const AIAssistantCard = () => {
    const router = useRouter()
    const theme = useTheme()

    return (
        <YStack space="$3">
            <Text fontWeight="700" fontSize="$5" color={theme.colors.primary}>
                Memora AI Assistant
            </Text>
            <Card
                backgroundColor={theme.colors.background}
                borderRadius={12}
                borderWidth={1}
                borderColor={theme.colors.outline}
                p="$4"
                elevate
                onPress={() => router.push('/assistant')}
                pressStyle={{ backgroundColor: theme.colors.primary + '10%', scale: 0.98 }}
                animation="quick"
            >
                <XStack ai="center" space="$3">
                    <Svg width={48} height={48} viewBox="0 0 48 48">
                        {/* AI Robot face */}
                        <Rect
                            x="8" y="12" width="32" height="24"
                            rx="6" ry="6"
                            fill={theme.colors.primary + '20'}
                            stroke={theme.colors.primary}
                            strokeWidth={2}
                        />
                        <Circle cx="18" cy="24" r="3" fill={theme.colors.primary} />
                        <Circle cx="30" cy="24" r="3" fill={theme.colors.primary} />
                        <Path
                            d="M18 30c2 2 10 2 12 0"
                            stroke={theme.colors.primary}
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                    </Svg>

                    <YStack f={1}>
                        <Paragraph fontWeight="600" color={theme.colors.primary}>
                            Need help with your studies?
                        </Paragraph>
                        <Paragraph color={theme.colors.onSurface} mt="$1">
                            Ask me anything about your courses, assignments, or concepts.
                        </Paragraph>
                    </YStack>
                </XStack>
            </Card>
        </YStack>
    )
}
