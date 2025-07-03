import {
    Card, H4, Text, Button, YStack, XStack, Stack, Paragraph
} from 'tamagui'
import { useTheme } from '@/styles/ThemeContext'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { TouchableRipple } from 'react-native-paper'
import * as Haptics from 'expo-haptics'
import { SvgXml } from 'react-native-svg'
import { LinearGradient } from 'tamagui/linear-gradient'

const brainSvg = `
<svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 20C45 20 30 35 30 50C30 55 35 65 45 70" stroke="#1976d2" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M90 50C90 35 75 20 60 20C45 20 30 35 30 50C30 65 45 80 60 85V100H75V85C90 80 105 65 105 50C105 35 90 20 60 20Z" stroke="#1976d2" stroke-width="3" stroke-linejoin="round" />
  <path d="M45 70L60 85" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
  <path d="M75 70L60 85" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
  <path d="M60 100V85" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
  <path d="M45 50C45 55 50 60 60 60C70 60 75 55 75 50" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
  <path d="M40 40C40 45 45 50 50 50" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
  <path d="M80 40C80 45 75 50 70 50" stroke="#1976d2" stroke-width="3" stroke-linecap="round" />
</svg>
`

const featureSvgs = {
    ai: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 3V5M15 3V5M9 19V21M15 19V21M5 9H3M5 15H3M21 9H19M21 15H19M7 19H17C18.1046 19 19 18.1046 19 17V7C19 5.89543 18.1046 5 17 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19Z"
        stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
    learning: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 6.253C13.184 5.477 14.647 5 16 5C18.791 5 21 7.209 21 10C21 12.419 19.282 14.435 17 14.9V19H15V14.9C12.718 14.435 11 12.419 11 10C11 8.647 11.477 7.184 12.253 6H12V6.253ZM7 9V19H5V9H7Z"
        stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,
    analytics: `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H5C3.89543 21 3 20.1046 3 19V3M7 17V11M11 17V7M15 17V13M19 17V15"
        stroke="#1976d2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `
}

export const HeroCard = () => {
    const router = useRouter()
    const { isDark } = useTheme()

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
            elevation={4}
            borderRadius={24}
            overflow="hidden"
            mb="$4"
            shadowColor="#000"
            shadowOpacity={0.15}
            shadowRadius={10}
            shadowOffset={{ width: 0, height: 6 }}
        >
            <LinearGradient
                colors={isDark ? ['#2a2a4f', '#555575'] : ['#4B0082', '#42C6A1']}
                start={[0, 0]}
                end={[1, 1]}
                padding="$4"
            >
                <TouchableRipple
                    onPress={handlePress}
                    borderless
                    rippleColor="rgba(255,255,255,0.3)"
                    style={{ borderRadius: 24 }}
                >
                    <YStack space="$3">
                        {/* Top: brain + title */}
                        <XStack ai="center" space="$3">
                            <Stack
                                width={90}
                                height={90}
                                borderRadius={45}
                                bg="white"
                                jc="center"
                                ai="center"
                            >
                                <SvgXml xml={brainSvg} width={70} height={70} />
                            </Stack>
                            <YStack flex={1} space="$2">
                                <H4 fontWeight="700" color="white" fontSize={20}>
                                    Your Learning Companion
                                </H4>
                                <Paragraph color="white" fontSize="$4">
                                    Smart tools to boost focus and track your study progress.
                                </Paragraph>
                            </YStack>
                        </XStack>

                        {/* Features */}
                        <YStack space="$2">
                            {features.map(({ text, svg }, index) => (
                                <XStack key={index} ai="center" space="$2">
                                    <Stack
                                        width={28}
                                        height={28}
                                        borderRadius={14}
                                        bg="white"
                                        jc="center"
                                        ai="center"
                                    >
                                        <SvgXml xml={svg.trim()} width={18} height={18} />
                                    </Stack>
                                    <Text color="white" fontWeight="500" fontSize={14}>
                                        {text}
                                    </Text>
                                </XStack>
                            ))}
                        </YStack>

                        {/* CTA button */}
                        <XStack jc="flex-end" mt="$2">
                            <Button
                                backgroundColor="white"
                                borderRadius={22}
                                height={42}
                                iconAfter={<ChevronRight size={18} color="#4B0082" />}
                                onPress={handlePress}
                                pressStyle={{ backgroundColor: '#f0f0f0' }}
                            >
                                <Text color="#4B0082" fontWeight="600" fontSize={14}>
                                    Chat With Memora
                                </Text>
                            </Button>
                        </XStack>
                    </YStack>
                </TouchableRipple>
            </LinearGradient>
        </Card>
    )
}
