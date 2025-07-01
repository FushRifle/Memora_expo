import React from 'react'
import {
    YStack,
    XStack,
    Text,
    Card,
    Spinner,
    Button,
    H4,
    Paragraph,
} from 'tamagui'
import {
    BookOpen,
    FileText,
    ChevronRight,
    Clock,
    Plus,
    Activity,
} from '@tamagui/lucide-icons'
import { useRouter } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'
import { ActivityItem } from '@/types'

type RecentActivityProps = {
    loading: boolean
    activities: ActivityItem[]
    refresh?: () => void
}

export const RecentActivity = ({
    loading,
    activities,
    refresh,
}: RecentActivityProps) => {
    const router = useRouter()
    const { colors } = useTheme()

    if (loading) {
        return (
            <YStack ai="center" py="$6" space="$3">
                <Spinner size="large" color={colors.accent} />
                <Text color={colors.primary}>Loading your activity...</Text>
            </YStack>
        )
    }

    if (activities.length === 0) {
        return (
            <Card ai="center" py="$6"
                px="$4" space="$4"
                elevate
            >
                <Activity size={80} color={colors.primary as any} />
                <H4 textAlign="center" color={colors.primary} mt="$2">
                    No Recent Activity
                </H4>
                <Paragraph textAlign="center" color={colors.primary} maxWidth={300}>
                    Your study sessions and document views will appear here
                </Paragraph>
                <XStack space="$3" mt="$3">
                    <Button
                        theme="accent"
                        icon={<Plus size={16} />}
                        borderWidth="$1"
                        borderColor={colors.primary}
                        onPress={() => router.push('/documents/new')}
                    >
                        Add Document
                    </Button>
                    <Button
                        theme="outline"
                        borderWidth="$1"
                        borderColor={colors.primary}
                        icon={<BookOpen size={16} />}
                        onPress={() => router.push('/flashcards/new')}
                    >
                        Create Flashcards
                    </Button>
                </XStack>
            </Card>
        )
    }

    return (
        <YStack space="$3">
            <XStack ai="center" jc="space-between" px="$2">
                <Text fontWeight="600" color={colors.primary}>
                    Recent Activity
                </Text>
                {refresh && (
                    <Button unstyled size="$2" onPress={refresh}>
                        <Text color={colors.accent} fontSize="$1">
                            Refresh
                        </Text>
                    </Button>
                )}
            </XStack>

            <YStack space="$2">
                {activities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        activity={activity}
                        theme={colors.primary as any}
                        onPress={() => {
                            if (activity.type === 'flashcards') {
                                router.push({
                                    pathname: '/flashcardViewer',
                                    params: { deckId: activity.id },
                                })
                            } else if (activity.type === 'document') {
                                router.push({
                                    pathname: '/documentResult',
                                    params: { docId: activity.id },
                                })
                            }
                        }}
                    />
                ))}
            </YStack>
        </YStack>
    )
}

type ActivityCardProps = {
    activity: ActivityItem
    theme: { accent: string; color2: string }
    onPress: () => void
}

const ActivityCard = ({ activity, theme, onPress }: ActivityCardProps) => (
    <Card
        bg="$bg2"
        p="$3"
        onPress={onPress}
        pressStyle={{ bg: '$bg3' }}
        animation="quick"
        elevation="$0.5"
        borderWidth={1}
        borderColor="$borderColor"
    >
        <XStack space="$3" ai="center">
            <YStack
                bg={theme.accent + '20'} // 20% opacity
                p="$2"
                br="$3"
                ai="center"
                jc="center"
                w={36}
                h={36}
            >
                {activity.type === 'flashcards' ? (
                    <BookOpen size={18} color={theme.accent} />
                ) : (
                    <FileText size={18} color={theme.accent} />
                )}
            </YStack>
            <YStack f={1} space="$1">
                <Text fontWeight="600" numberOfLines={1}>
                    {activity.title}
                </Text>
                <XStack space="$2" ai="center">
                    <Clock size={14} color={theme.color2} />
                    <Text color="$color2" fontSize="$1">
                        {activity.time} • {activity.type}
                    </Text>
                </XStack>
            </YStack>
            <ChevronRight size={18} color={theme.color2} />
        </XStack>
    </Card>
)
