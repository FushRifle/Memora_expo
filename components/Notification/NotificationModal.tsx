import React from 'react'
import { Sheet, YStack, XStack, Text, H5, Button } from 'tamagui'
import { X, Bell, CheckCircle, MessageSquare } from '@tamagui/lucide-icons'
import * as Haptics from 'expo-haptics'
import { useTheme } from '@/styles/ThemeContext'
import { MotiView } from 'moti'
import { Animated } from 'react-native';


type NotificationModalProps = {
    open: boolean
    onClose: () => void
    notification: {
        title: string
        message?: string
        time: string
        type?: 'system' | 'social' | 'update'
    } | null
}

export const NotificationModal = ({ open, onClose, notification }: NotificationModalProps) => {
    const { colors } = useTheme()

    if (!notification) return null

    const getNotificationIcon = () => {
        switch (notification.type) {
            case 'social':
                return <MessageSquare size={24} color={colors.secondary as any} />
            case 'update':
                return <CheckCircle size={24} color={colors.primary as any} />
            default:
                return <Bell size={24} color={colors.accent as any} />
        }
    }

    return (
        <Sheet
            forceRemoveScrollEnabled
            modal
            open={open}
            onOpenChange={(isOpen: boolean) => {
                if (!isOpen) {
                    Haptics.selectionAsync()
                    onClose()
                }
            }}
            snapPoints={[85]}
            dismissOnSnapToBottom
            animationConfig={{
                type: 'spring',
                damping: 20,
                stiffness: 300,
            }}
        >
            <Sheet.Overlay
                enterStyle={{ opacity: 0 }}
                exitStyle={{ opacity: 0 }}
            />
            <Sheet.Frame
                p="$4"
                backgroundColor={colors.background}
                enterStyle={{ y: 300, opacity: 0 }}
                exitStyle={{ y: 300, opacity: 0 }}
            >
                <MotiView
                    from={{ opacity: 0, translateY: 20 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ type: 'timing', duration: 300 }}
                >
                    <YStack space="$4">
                        <XStack jc="space-between" ai="center">
                            <XStack ai="center" space="$2">
                                {getNotificationIcon()}
                                <H5 fontWeight="600" color={colors.text}>
                                    {notification.title}
                                </H5>
                            </XStack>
                            <Button
                                circular
                                size="$2"
                                icon={<X size={16} color={colors.primary as any} />}
                                onPress={() => {
                                    Haptics.selectionAsync()
                                    onClose()
                                }}
                            />
                        </XStack>

                        {notification.message && (
                            <Text fontSize="$5" color={colors.textSecondary}>
                                {notification.message}
                            </Text>
                        )}

                        <Text fontSize="$2" color={colors.disabled}>
                            {notification.time}
                        </Text>

                        <Button
                            mt="$2"
                            bg={colors.primary}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                                onClose()
                            }}
                            hoverStyle={{ bg: colors.primary }}
                            pressStyle={{ bg: colors.primaryDark }}
                        >
                            <Text color="white">Dismiss</Text>
                        </Button>
                    </YStack>
                </MotiView>
            </Sheet.Frame>
        </Sheet>
    )
}