import React, { useState, useEffect } from 'react'
import {
    XStack,
    H4,
    Button,
    Image,
    Stack,
    YStack,
    Text,
    Input,
} from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from 'react-native-paper'
import { Bell, Search } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'

// Example quick action buttons
const actionButtons = [
    { title: 'Notes', onPress: () => { } },
    { title: 'Flashcards', onPress: () => { } },
    { title: 'Quizzes', onPress: () => { } },
    { title: 'Schedules', onPress: () => { } },
    { title: 'Progress', onPress: () => { } },
    { title: 'Settings', onPress: () => { } },
]

export const HomeHeader = () => {
    const router = useRouter()
    const theme = useTheme()
    const [unreadCount, setUnreadCount] = useState(3)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        if (unreadCount > 0) {
            const timer = setTimeout(() => {
                setUnreadCount((prev) => Math.max(0, prev - 1))
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [unreadCount])

    const handleProfilePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        router.push('/profile')
    }

    const handleNotificationPress = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        router.push('/notifications')
    }

    return (
        <YStack
            space="$3"
            padding="$3"
            elevation={10}
            marginTop={20}
            borderRadius={10}
            backgroundColor={theme.colors.background}
        >
            <XStack jc="space-between" ai="center">
                {/* Profile Avatar */}
                <Button
                    unstyled
                    circular
                    onPress={handleProfilePress}
                    pressStyle={{ opacity: 0.8 }}
                >
                    <Image
                        source={require('@/assets/user.png')}
                        width={32}
                        height={32}
                        borderRadius={16}
                        borderWidth={1.5}
                        borderColor={theme.colors.primary}
                    />
                </Button>

                {/* Title */}
                <H4 color={theme.colors.primary} fontWeight="700">
                    Welcome
                </H4>

                {/* Notifications */}
                <Stack position="relative">
                    <Button
                        unstyled
                        circular
                        onPress={handleNotificationPress}
                        pressStyle={{ opacity: 0.8 }}
                    >
                        <Bell size={22} color={theme.colors.onSurfaceVariant} />
                    </Button>

                    {unreadCount > 0 && (
                        <YStack
                            position="absolute"
                            top={-4}
                            right={-4}
                            bg={theme.colors.primary}
                            px={6}
                            py={1}
                            borderRadius={50}
                            jc="center"
                            ai="center"
                            minWidth={18}
                            minHeight={18}
                            overflow="hidden"
                        >
                            <Text
                                fontSize={10}
                                fontWeight="bold"
                                color={theme.colors.background}
                                selectable={false}
                            >
                                {unreadCount > 9 ? '9+' : unreadCount}
                            </Text>
                        </YStack>
                    )}
                </Stack>
            </XStack>

            {/* Search bar */}
            <Input
                placeholder="Search notes, flashcards..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                borderWidth={1}
                borderColor={colors.primary}
                borderRadius={12}
                px="$3"
                py="$2"
                fontSize="$3"
                iconAfter={<Search size={18} color={theme.colors.onSurface as any} />}
                placeholderTextColor={theme.colors.onSurfaceVariant}
                backgroundColor={theme.colors.surface}
                color={theme.colors.onSurface}
            />
        </YStack>
    )
}
