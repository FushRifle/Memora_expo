import { YStack, Text, XStack, Button, H2, Image, ScrollView } from 'tamagui'
import { ChevronRight } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'

export default function HomeScreen() {
    const router = useRouter()

    return (
        <ScrollView>
        <YStack f= { 1} bg = "$bg" p = "$4" space = "$4" >
            {/* Header */ }
            < XStack jc = "space-between" ai = "center" >
                <H2 color="$accent" > Memora </H2>
                    < Button circular size = "$3" theme = "accent" >
                        <Image source={ require('../assets/user.png') } width = { 24} height = { 24} />
                            </Button>
                            </XStack>

    {/* Hero Section */ }
    <YStack space="$3" mt = "$4" >
        <H2>Your AI Study Companion </H2>
            < Text color = "$color2" >
                Personalized learning, smart flashcards, and study analytics powered by AI.
          </Text>
                    </YStack>

    {/* Quick Actions */ }
    <YStack space="$3" mt = "$6" >
        <Text fontWeight="bold" color = "$color2" >
            Quick Actions
                </Text>
                < XStack space = "$3" >
                    <Button
              theme="accent"
    f = { 1}
    h = "$10"
    iconAfter = { ChevronRight }
    onPress = {() => router.push('/generate')
}
            >
    Generate Content
        </Button>
        < Button
theme = "accent"
f = { 1}
h = "$10"
iconAfter = { ChevronRight }
onPress = {() => router.push('/flashcards')}
            >
    Flashcards
    </Button>
    </XStack>
    </YStack>

{/* Recent Activity */ }
<YStack space="$3" mt = "$6" >
    <Text fontWeight="bold" color = "$color2" >
        Recent Activity
            </Text>
            < YStack space = "$2" >
            {
                ['Biology 101', 'Calculus Review', 'History Essay'].map((item) => (
                    <Button
                key= { item }
                bg = "$bg2"
                jc = "flex-start"
                h = "$8"
                iconAfter = { ChevronRight }
                    >
                    { item }
                    </Button>
                ))
            }
                </YStack>
                </YStack>

{/* AI Assistant */ }
<YStack space="$3" mt = "$6" >
    <Text fontWeight="bold" color = "$color2" >
        Memora AI Assistant
            </Text>
            < Button
bg = "$bg2"
h = "$16"
borderRadius = "$4"
onPress = {() => router.push('/assistant')}
          >
    <YStack ai="center" space = "$2" >
        <Image source={ require('../assets/ai-icon.png') } width = { 40} height = { 40} />
            <Text>Ask me anything about your studies...</Text>
                </YStack>
                </Button>
                </YStack>
                </YStack>
                </ScrollView>
  )
}