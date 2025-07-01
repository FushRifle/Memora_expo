import {
    Card,
    H4,
    Text,
    Button,
    YStack,
    XStack,
    Stack,
    Paragraph,
} from 'tamagui'
import { useTheme } from 'react-native-paper'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { TouchableRipple } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import { SvgXml } from 'react-native-svg'

// Enhanced Brain SVG with more detail
const brainSvg = `
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 20C45 20 30 35 30 50C30 55 35 65 45 70" stroke="#3f51b5" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M90 50C90 35 75 20 60 20C45 20 30 35 30 50C30 65 45 80 60 85V100H75V85C90 80 105 65 105 50C105 35 90 20 60 20Z" stroke="#3f51b5" stroke-width="3" stroke-linejoin="round"/>
  <path d="M45 70L60 85" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
  <path d="M75 70L60 85" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
  <path d="M60 100V85" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
  <path d="M45 50C45 55 50 60 60 60C70 60 75 55 75 50" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
  <path d="M40 40C40 45 45 50 50 50" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
  <path d="M80 40C80 45 75 50 70 50" stroke="#3f51b5" stroke-width="3" stroke-linecap="round"/>
</svg>
`

const featureSvgs = {
    ai: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z" stroke="#3f51b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    learning: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.253C13.184 5.477 14.647 5 16 5C18.791 5 21 7.209 21 10C21 12.419 19.282 14.435 17 14.9V19H15V14.9C12.718 14.435 11 12.419 11 10C11 8.647 11.477 7.184 12.253 6H12V6.253ZM7 9V19H5V9H7Z" stroke="#3f51b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
    analytics: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H5C3.89543 21 3 20.1046 3 19V3M7 17V11M11 17V7M15 17V13M19 17V15" stroke="#3f51b5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,
}

export const HeroCard = () => {
    const router = useRouter()
    const paperTheme = useTheme()

    const features = [
        { text: 'AI-powered explanations', svg: featureSvgs.ai },
        { text: 'Personalized learning paths', svg: featureSvgs.learning },
        { text: 'Progress analytics', svg: featureSvgs.analytics },
    ]

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        router.push('/assistant')
    }

    return (
        <Card
            elevation={5}
            borderRadius={20}
            backgroundColor={paperTheme.colors.surface}
            padding={0}
            overflow="hidden"
            style={{
                marginBottom: 20,
                shadowColor: '#000',
                shadowOpacity: 0.1,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
            }}
        >
            <TouchableRipple
                onPress={handlePress}
                borderless
                rippleColor={paperTheme.colors.primaryContainer}
                style={{ borderRadius: 20 }}
            >
                <YStack>
                    {/* Gradient Background */}
                    <Stack
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        backgroundColor={paperTheme.colors.primary + '08'} // subtle tint
                    />

                    {/* Content */}
                    <XStack padding="$5" alignItems="center">
                        {/* Brain Illustration Container */}
                        <Stack
                            width={120}
                            height={120}
                            borderRadius={60}
                            backgroundColor={paperTheme.colors.primary + '10'} // very subtle background
                            justifyContent="center"
                            alignItems="center"
                            marginRight="$4"
                            style={{
                                borderWidth: 1,
                                borderColor: paperTheme.colors.primary + '20',
                            }}
                        >
                            <SvgXml
                                xml={brainSvg}
                                width={100}
                                height={100}
                            />
                        </Stack>

                        {/* Text Content */}
                        <YStack flex={1} space="$3">
                            <H4
                                fontWeight="700"
                                color={paperTheme.colors.onSurface}
                                style={{ fontSize: 22, lineHeight: 28 }}
                            >
                                Your Learning Companion
                            </H4>

                            <Paragraph
                                color={paperTheme.colors.onSurfaceVariant}
                                style={{ fontSize: 16, lineHeight: 24 }}
                                numberOfLines={3}
                            >
                                Smart tools to enhance your study sessions and track progress.
                            </Paragraph>

                            <YStack space="$2" marginTop="$3">
                                {features.map(({ text, svg }, index) => (
                                    <XStack
                                        key={index}
                                        alignItems="center"
                                        space="$2"
                                        paddingVertical="$1.5"
                                    >
                                        <Stack
                                            width={28}
                                            height={28}
                                            borderRadius={14}
                                            backgroundColor={paperTheme.colors.primary + '10'}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <SvgXml xml={svg} width={18} height={18} />
                                        </Stack>
                                        <Text
                                            fontWeight="500"
                                            color={paperTheme.colors.onSurface}
                                            style={{ fontSize: 14, lineHeight: 20 }}
                                        >
                                            {text}
                                        </Text>
                                    </XStack>
                                ))}
                            </YStack>
                        </YStack>
                    </XStack>

                    {/* Action Button */}
                    <XStack
                        justifyContent="flex-end"
                        paddingHorizontal="$5"
                        paddingBottom="$5"
                    >
                        <Button
                            height={48}
                            borderRadius={24}
                            iconAfter={<ChevronRight size={20} color="white" />}
                            onPress={handlePress}
                            backgroundColor={paperTheme.colors.primary}
                            pressStyle={{
                                backgroundColor: paperTheme.colors.primary,
                            }}
                            minWidth={160}
                            paddingHorizontal="$4"
                        >
                            <Text
                                color={paperTheme.colors.onPrimary}
                                fontWeight="600"
                                style={{ fontSize: 16 }}
                            >
                                Explore Features
                            </Text>
                        </Button>
                    </XStack>
                </YStack>
            </TouchableRipple>
        </Card>
    )
}