import React, { useState, useEffect } from 'react'
import {
    XStack,
    H4,
    Button,
    Image,
    Stack,
    YStack,
    Text,
} from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'
import { Bell } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'

export const HomeHeader = () => {
    const router = useRouter()
    const { colors, spacing } = useTheme()
    const [unreadCount, setUnreadCount] = useState(3)

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
        <XStack
            jc="space-between"
            ai="center"
            px={spacing.md}
            py={spacing.sm}
            bg={colors.background}
            mt="$5"
        >
            {/* Profile Avatar */}
            <Button
                unstyled
                circular
                onPress={handleProfilePress}
                pressStyle={{ opacity: 0.8 }}
                animation="quick"
                padding={spacing.xs}
            >
                <Image
                    source={require('@/assets/user.png')}
                    width={32}
                    height={32}
                    borderRadius={16}
                    borderWidth={1.5}
                    borderColor={colors.primary}
                    unstyled
                />
            </Button>

            {/* Title */}
            <H4
                color={colors.primary}
                fontWeight="700"
                pressStyle={{ scale: 0.97 }}
                animation="quick"
            >
                Welcome
            </H4>

            {/* Notifications */}
            <Stack position="relative">
                <Button
                    unstyled
                    circular
                    onPress={handleNotificationPress}
                    pressStyle={{ opacity: 0.8 }}
                    animation="quick"
                    padding={spacing.xs}
                >
                    <Bell size={22} color={colors.textSecondary} />
                </Button>

                {unreadCount > 0 && (
                    <YStack
                        position="absolute"
                        top={-4}
                        right={-4}
                        bg={colors.notification}
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
                            color={colors.background}
                            selectable={false}
                        >
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </Text>
                    </YStack>
                )}
            </Stack>
        </XStack>
    )
}
