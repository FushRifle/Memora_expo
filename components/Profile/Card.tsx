import { YStack, XStack, H3, Text, Image, Circle, Card } from 'tamagui'
import { LinearGradient } from 'tamagui/linear-gradient'
import { MotiView } from 'moti'
import { useTheme } from '@/styles/ThemeContext'

type StatItem = {
    value: string
    label: string
}

export function ProfileCard({

    name,
    username,
    bio,
}: {
    name: string
    username: string
    bio: string
    stats: StatItem[]
}) {
    const { colors, isDark } = useTheme()


    const stats = [
        { value: '120', label: 'Study Hours' },
        { value: '35', label: 'Quizzes Taken' },
        { value: '12', label: 'Achievements' },
    ]

    return (
        <MotiView
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: 'spring' }}
        >
            <Card elevate size="$4" bordered overflow="hidden" borderRadius="$6">
                <LinearGradient
                    colors={isDark ? ['#1f1c2c', '#928DAB'] : ['#4B0082', '#42C6A1']}
                    start={[0, 0]}
                    end={[1, 1]}
                    padding="$4"
                >
                    <YStack alignItems="center" space="$3">
                        <Circle size="$8" overflow="hidden" borderWidth={2} borderColor="white">
                            <Image
                                source={require('@/assets/user.png')}
                                width="100%"
                                height="100%"
                                resizeMode="cover"
                            />
                        </Circle>

                        <YStack alignItems="center" space="$1">
                            <H3 fontWeight="800" color="white">{name}</H3>
                            <Text color="white" opacity={0.8}>@{username}</Text>
                        </YStack>

                        <Text textAlign="center" color="white" opacity={0.9} fontSize="$3">
                            {bio || "Passionate learner exploring new subjects and mastering skills every day."}
                        </Text>

                        <XStack space="$6" marginTop="$2">
                            {stats.map((stat, index) => (
                                <MotiView
                                    key={stat.label}
                                    from={{ opacity: 0, translateY: 10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    transition={{ type: 'spring', delay: 100 + index * 50 }}
                                >
                                    <YStack alignItems="center">
                                        <Text fontWeight="800" fontSize="$5" color="white">{stat.value}</Text>
                                        <Text color="white" opacity={0.8} fontSize="$2">{stat.label}</Text>
                                    </YStack>
                                </MotiView>
                            ))}
                        </XStack>
                    </YStack>
                </LinearGradient>
            </Card>
        </MotiView>
    )
}
