import React, { useState } from 'react'
import {
    ScrollView,
    YStack,
    XStack,
    Stack,
    Text,
    Button,
    Checkbox,
    H4,
    H6,
    Separator,
    useTheme,
    Spinner,
    AnimatePresence
} from 'tamagui'
import { RefreshControl } from 'react-native-gesture-handler'
import { Trash2, CheckCircle, Bell, Archive, Settings } from '@tamagui/lucide-icons'
import { LinearGradient } from 'tamagui/linear-gradient'
import { MotiView } from 'moti'
import { useTheme as useAppTheme } from '@/styles/ThemeContext'
import * as Haptics from 'expo-haptics'
import { NotificationModal } from '@/components/Notification/NotificationModal'

type Notification = {
    id: string
    title: string
    message?: string
    time: string
    read: boolean
    type?: 'system' | 'social' | 'update'
}

export function NotificationScreen() {
    const { isDark, colors } = useAppTheme()
    const [selected, setSelected] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
    const [modalVisible, setModalVisible] = useState(false)

    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New flashcard deck available',
            message: 'The "Advanced Biology" deck is now available in your library',
            time: '2h ago',
            read: false,
            type: 'update'
        },
        {
            id: '2',
            title: 'Weekly progress report ready',
            message: 'You completed 85% of your study goals this week',
            time: '1d ago',
            read: true,
            type: 'system'
        },
        {
            id: '3',
            title: 'Your note got 5 new likes',
            message: '@user1 and 4 others liked your "Chemistry Basics" note',
            time: '3d ago',
            read: false,
            type: 'social'
        },
        {
            id: '4',
            title: 'Your note got 5 new likes',
            message: '@user1 and 4 others liked your "Chemistry Basics" note',
            time: '3d ago',
            read: false,
            type: 'social'
        },
        {
            id: '5',
            title: 'Your note got 5 new likes',
            message: '@user1 and 4 others liked your "Chemistry Basics" note',
            time: '3d ago',
            read: false,
            type: 'social'
        },
        {
            id: '6',
            title: 'Your note got 5 new likes',
            message: '@user1 and 4 others liked your "Chemistry Basics" note',
            time: '3d ago',
            read: false,
            type: 'social'
        },
    ])

    const toggleSelect = (id: string) => {
        Haptics.selectionAsync()
        setSelected(prev =>
            prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
        )
    }


    const handleNotificationPress = (notification: Notification) => {
        Haptics.selectionAsync()
        setSelectedNotification(notification)
        setModalVisible(true)
        // Mark as read when opened
        setNotifications(prev =>
            prev.map(n => n.id === notification.id ? { ...n, read: true } : n)
        )
    }

    const markAllAsRead = async () => {
        setIsLoading(true)
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
        setIsLoading(false)
    }

    const deleteSelected = async () => {
        setIsLoading(true)
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        setNotifications(prev => prev.filter(n => !selected.includes(n.id)))
        setSelected([])
        setIsLoading(false)
    }

    const handleRefresh = async () => {
        setRefreshing(true)
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 1000))
        setRefreshing(false)
    }

    const getNotificationIcon = (type?: string) => {
        switch (type) {
            case 'social': return <Bell size={16} color="#42C6A1" />
            case 'update': return <CheckCircle size={16} color="#4A90E2" />
            default: return <Settings size={16} color="#888" />
        }
    }

    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={isDark ? colors.primary : colors.primaryDark}
                    />
                }
            >
                <LinearGradient
                    colors={isDark ? ['#0D1117', '#161B22'] : ['#F5F7FA', '#E8EBF0']}
                    start={[0, 0]}
                    end={[0, 1]}
                    padding="$4"
                    flex={1}
                >
                    <YStack space="$3" mt="$5">
                        {/* Header with actions */}
                        <XStack jc="space-between" ai="center">
                            <H4 fontWeight="700" color={isDark ? 'white' : colors.primaryDark}>
                                Notifications
                            </H4>

                            <XStack space="$2">
                                <Button
                                    size="$2"
                                    borderRadius={20}
                                    backgroundColor={colors.primary}
                                    iconAfter={
                                        isLoading
                                            ? <Spinner size="small" color="white" />
                                            : <CheckCircle size={14} color="white" />
                                    }
                                    onPress={markAllAsRead}
                                    disabled={isLoading}
                                >
                                    <Text color="white" fontSize="$3">Mark all</Text>
                                </Button>

                                <Button
                                    size="$2"
                                    borderRadius={20}
                                    backgroundColor={colors.secondary}
                                    iconAfter={<Archive size={14} color={colors.primary as any} />}
                                    onPress={() => console.log('Archive pressed')}
                                >
                                    <Text color={colors.primary} fontSize="$3">Archive</Text>
                                </Button>
                            </XStack>
                        </XStack>

                        <Separator />

                        {/* Bulk actions when items are selected */}
                        <AnimatePresence>
                            {selected.length > 0 && (
                                <MotiView
                                    from={{ opacity: 0, translateY: -10 }}
                                    animate={{ opacity: 1, translateY: 0 }}
                                    exit={{ opacity: 0, translateY: -10 }}
                                    transition={{ type: 'spring' }}
                                >
                                    <XStack
                                        jc="space-between"
                                        ai="center"
                                        bg={isDark ? '#30363D' : '#EDF2F7'}
                                        p="$3"
                                        borderRadius={12}
                                    >
                                        <Text color={isDark ? 'white' : colors.primaryDark}>
                                            {selected.length} selected
                                        </Text>
                                        <Button
                                            size="$2"
                                            borderRadius={20}
                                            backgroundColor="crimson"
                                            iconAfter={
                                                isLoading
                                                    ? <Spinner size="small" color="white" />
                                                    : <Trash2 size={14} color="white" />
                                            }
                                            onPress={deleteSelected}
                                            disabled={isLoading}
                                        >
                                            <Text color="white" fontSize="$3">Delete</Text>
                                        </Button>
                                    </XStack>
                                </MotiView>
                            )}
                        </AnimatePresence>

                        {/* Notifications list */}
                        <YStack space="$3">
                            <AnimatePresence>
                                {notifications.map((notif) => (
                                    <MotiView
                                        key={notif.id}
                                        from={{ opacity: 0, translateY: 10 }}
                                        animate={{ opacity: 1, translateY: 0 }}
                                        exit={{ opacity: 0, translateX: -50 }}
                                        transition={{ type: 'timing', duration: 300 }}
                                    >
                                        <XStack
                                            space="$3"
                                            ai="flex-start"
                                            borderRadius={12}
                                            bg={
                                                notif.read
                                                    ? (isDark ? '#21262D' : '#F8F9FA')
                                                    : (isDark ? '#30363D' : 'white')
                                            }
                                            p="$3"
                                            pressStyle={{ opacity: 0.9, bg: isDark ? '#3B4048' : '#F1F5F9' }}
                                            onPress={() => handleNotificationPress(notif)}
                                            borderWidth={1}
                                            borderColor={isDark ? '#444' : '#E2E8F0'}
                                            elevation={!notif.read ? 5 : 0}
                                        >
                                            <Checkbox
                                                checked={selected.includes(notif.id)}
                                                onCheckedChange={() => toggleSelect(notif.id)}
                                                size="$4"
                                            >
                                                <Checkbox.Indicator />
                                            </Checkbox>

                                            <YStack flex={1} space="$1">
                                                <XStack ai="center" space="$2">
                                                    {getNotificationIcon(notif.type)}
                                                    <Text fontWeight="600" color={isDark ? 'white' : colors.primaryDark}>
                                                        {notif.title}
                                                    </Text>
                                                </XStack>

                                                {notif.message && (
                                                    <Text fontSize="$2" color={isDark ? '#AAA' : '#666'}>
                                                        {notif.message}
                                                    </Text>
                                                )}

                                                <Text fontSize="$1" color={isDark ? '#777' : '#999'} mt="$1">
                                                    {notif.time}
                                                </Text>
                                            </YStack>

                                            {!notif.read && (
                                                <Stack width={8} height={8} borderRadius={4} bg={colors.primary} />
                                            )}
                                        </XStack>
                                    </MotiView>
                                ))}
                            </AnimatePresence>
                        </YStack>

                        {notifications.length === 0 && (
                            <YStack ai="center" jc="center" mt="$8" space="$3">
                                <Bell size={40} color={isDark ? '#444' : '#CCC'} opacity={0.5} />
                                <H6 color={isDark ? '#666' : '#999'}>No notifications yet</H6>
                                <Text color={isDark ? '#555' : '#AAA'} textAlign="center" maxWidth="80%">
                                    When you get notifications, they'll appear here
                                </Text>
                            </YStack>
                        )}
                    </YStack>
                </LinearGradient>
            </ScrollView>

            <NotificationModal
                open={modalVisible}
                onClose={() => setModalVisible(false)}
                notification={selectedNotification}
            />
        </>
    )

}