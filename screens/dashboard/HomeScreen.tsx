import {
    YStack, XStack, Text, Button, H2,
    Image, ScrollView, Card, Paragraph,
    H4, Spinner,
} from 'tamagui'
import { ChevronRight, BookOpen, FileText, BarChart2, Mic } from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useSafeTheme } from '@/hook/theme/useTheme'
import { useEffect, useState } from 'react'
import { getRecentActivity } from '@/app/services/StudyService'

export default function HomeScreen() {
    const router = useRouter()
    const theme = useSafeTheme()
    const [recentActivity, setRecentActivity] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchActivity = async () => {
            const activity = await getRecentActivity()
            setRecentActivity(activity)
            setLoading(false)
        }
        fetchActivity()
    }, [])

    return (
        <ScrollView>
            <YStack f={1} bg="$bg" p="$4" space="$4">
                {/* Header */}
                <XStack jc="space-between" ai="center">
                    <H2 color="$accent">Memora</H2>
                    <Button circular size="$3" theme="accent" onPress={() => router.push('/profile')}>
                        <Image source={require('@/assets/user.png')} width={24} height={24} />
                    </Button>
                </XStack>

                {/* Hero Section */}
                <Card elevate p="$4" mb="$4">
                    <Card.Header>
                        <H2>Your AI Study Companion</H2>
                        <Paragraph theme="alt2" mt="$2">
                            Personalized learning, smart flashcards, and study analytics powered by AI.
                        </Paragraph>
                    </Card.Header>
                    <Card.Footer>
                        <Button
                            theme="accent"
                            onPress={() => router.push('/assistant')}
                            iconAfter={ChevronRight}
                        >
                            Try AI Assistant
                        </Button>
                    </Card.Footer>
                </Card>

                {/* Quick Actions Grid */}
                <YStack space="$3">
                    <Text fontWeight="bold" color="$color2">
                        Quick Actions
                    </Text>
                    <XStack space="$3">
                        <Button
                            theme="accent"
                            f={1}
                            h="$10"
                            icon={<BookOpen size="$1" />}
                            iconAfter={ChevronRight}
                            onPress={() => router.push('/flashcards')}
                        >
                            Flashcards
                        </Button>
                        <Button
                            theme="accent"
                            f={1}
                            h="$10"
                            icon={<FileText size="$1" />}
                            iconAfter={ChevronRight}
                            onPress={() => router.push('/documents')}
                        >
                            Documents
                        </Button>
                    </XStack>
                    <XStack space="$3">
                        <Button
                            theme="accent"
                            f={1}
                            h="$10"
                            icon={<BarChart2 size="$1" />}
                            iconAfter={ChevronRight}
                            onPress={() => router.push('/analytics')}
                        >
                            Analytics
                        </Button>
                        <Button
                            theme="accent"
                            f={1}
                            h="$10"
                            icon={<Mic size="$1" />}
                            iconAfter={ChevronRight}
                            onPress={() => router.push('/voice')}
                        >
                            Voice
                        </Button>
                    </XStack>
                </YStack>

                {/* Recent Activity */}
                <YStack space="$3" mt="$4">
                    <Text fontWeight="bold" color="$color2">
                        Recent Activity
                    </Text>
                    {loading ? (
                        <YStack ai="center" py="$4">
                            <Spinner size="large" />
                        </YStack>
                    ) : (
                        <YStack space="$2">
                            {recentActivity.map((activity, index) => (
                                <Card
                                    key={index}
                                    bg="$bg2"
                                    p="$3"
                                    onPress={() => {
                                        if (activity.type === 'flashcards') {
                                            router.push({
                                                pathname: '/flashcardViewer',
                                                params: { deckId: activity.id }
                                            })
                                        } else if (activity.type === 'document') {
                                            router.push({
                                                pathname: '/documentResult',
                                                params: { docId: activity.id }
                                            })
                                        }
                                    }}
                                >
                                    <XStack space="$3" ai="center">
                                        {activity.type === 'flashcards' ? (
                                            <BookOpen color={theme.accent.val} />
                                        ) : (
                                            <FileText color={theme.accent.val} />
                                        )}
                                        <YStack f={1}>
                                            <Text fontWeight="bold">{activity.title}</Text>
                                            <Text color="$color2" fontSize="$1">
                                                {activity.time} • {activity.type}
                                            </Text>
                                        </YStack>
                                        <ChevronRight color={theme.color2.val} />
                                    </XStack>
                                </Card>
                            ))}
                        </YStack>
                    )}
                </YStack>

                {/* AI Assistant Card */}
                <YStack space="$3" mt="$4">
                    <Text fontWeight="bold" color="$color2">
                        Memora AI Assistant
                    </Text>
                    <Card
                        bg="$bg2"
                        p="$4"
                        elevate
                        onPress={() => router.push('/assistant')}
                    >
                        <XStack space="$3" ai="center">
                            <Image
                                source={require('@/assets/ai-icon.png')}
                                width={48}
                                height={48}
                                borderRadius="$3"
                            />
                            <YStack f={1}>
                                <H4>Need help with your studies?</H4>
                                <Paragraph theme="alt2" mt="$1">
                                    Ask me anything about your courses, assignments, or concepts.
                                </Paragraph>
                            </YStack>
                        </XStack>
                    </Card>
                </YStack>
            </YStack>
        </ScrollView>
    )
}