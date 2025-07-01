import React from 'react'
import { YStack, Text } from 'tamagui'
import { useTheme } from '@/styles/ThemeContext'

export function VoiceAssistantScreen() {
    const { colors } = useTheme()

    return (
        <YStack flex={1} ai="center" jc="center" backgroundColor={colors.background} p="$4">
            <Text fontSize={24} fontWeight="bold" color={colors.text}>
                Voice Assistant Coming Soon!
            </Text>
        </YStack>
    )
}
