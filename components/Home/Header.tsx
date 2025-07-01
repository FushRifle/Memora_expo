import React, { useState, useEffect } from 'react'
import {
    XStack,
    H4,
    Button,
    Image,
    YStack,
    Text,
    AnimatePresence,
    Stack,
} from 'tamagui'
import { useRouter } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'
import {
    ChevronDown,
    Bell,
    Settings,
    LogOut,
    Sun,
    Moon,
} from '@tamagui/lucide-icons'
import { TouchableOpacity } from 'react-native'
import * as Haptics from 'expo-haptics'

type ProfileMenuOption = {
    label: string
    icon: React.ComponentType<any>
    action: () => void
    danger?: boolean
}

export const HomeHeader = () => {
    const router = useRouter()
    const { colors, spacing, toggleTheme, isDark } = useTheme()
    const [menuOpen, setMenuOpen] = useState(false)
    const [unreadCount, setUnreadCount] = useState(3)

    // Decrease unread count by 1 every 10 seconds, min 0
    useEffect(() => {
        if (unreadCount > 0) {
            const timer = setTimeout(() => {
                setUnreadCount((prev) => Math.max(0, prev - 1))
            }, 10000)
            return () => clearTimeout(timer)
        }
    }, [unreadCount])

    const profileMenuOptions: ProfileMenuOption[] = [
        {
            label: 'Profile Settings',
            icon: Settings,
            action: () => router.push('/profile/settings'),
        },
        {
            label: isDark ? 'Light Mode' : 'Dark Mode',
            icon: isDark ? Sun : Moon,
            action: () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                toggleTheme()
            },
        },
        {
            label: 'Sign Out',
            icon: LogOut,
            action: () => router.push('/auth/signout'),
            danger: true,
        },
    ]

    const handleProfilePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        setMenuOpen(!menuOpen)
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
            marginTop="$5"
        >
            {/* Profile Menu */}
            <Stack position="relative">
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
                        width={28}
                        height={28}
                        borderRadius={14}
                        borderWidth={1.5}
                        borderColor={menuOpen ? colors.accent : colors.border}
                        unstyled
                    />
                </Button>

                <AnimatePresence>
                    {menuOpen && (
                        <YStack
                            position="absolute"
                            right={0}
                            top={40}
                            minWidth={160}
                            bg={colors.cardBackground}
                            borderRadius="$2"
                            borderWidth={1}
                            borderColor={colors.border}
                            elevation={8}
                            shadowColor="#000"
                            shadowOpacity={0.05}
                            shadowRadius={8}
                            shadowOffset={{ width: 0, height: 2 }}
                            overflow="hidden"
                            enterStyle={{ y: -8, opacity: 0 }}
                            exitStyle={{ y: -8, opacity: 0 }}
                            animation="quick"
                            zIndex={1000}
                        >
                            {profileMenuOptions.map((option, index) => (
                                <TouchableOpacity
                                    key={option.label}
                                    activeOpacity={0.6}
                                    onPress={() => {
                                        option.action()
                                        setMenuOpen(false)
                                    }}
                                >
                                    <XStack
                                        px={spacing.md}
                                        py={spacing.sm}
                                        ai="center"
                                        space={spacing.sm}
                                        bg={colors.cardBackground}
                                        hoverStyle={{ bg: colors.card }}
                                        borderTopWidth={index > 0 ? 1 : 0}
                                        borderTopColor={colors.border}
                                    >
                                        <option.icon
                                            size={16}
                                            color={option.danger ? colors.error : colors.textSecondary}
                                        />
                                        <Text
                                            fontSize="$1"
                                            color={option.danger ? colors.error : colors.text}
                                            fontWeight="500"
                                        >
                                            {option.label}
                                        </Text>
                                    </XStack>
                                </TouchableOpacity>
                            ))}
                        </YStack>
                    )}
                </AnimatePresence>
            </Stack>

            {/* Welcome Title */}
            <TouchableOpacity activeOpacity={0.7} onPress={() => router.push('/')}>
                <H4 color={colors.primary} pressStyle={{ scale: 0.98 }} animation="quick">
                    Welcome
                </H4>
            </TouchableOpacity>

            {/* Notifications */}
            <XStack ai="center" space={spacing.sm}>
                <Stack position="relative">
                    <Button
                        unstyled
                        circular
                        onPress={handleNotificationPress}
                        pressStyle={{ opacity: 0.8 }}
                        animation="quick"
                        padding={spacing.xs}
                    >
                        <Bell size={20} color={colors.textSecondary} />
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
        </XStack>
    )
}
