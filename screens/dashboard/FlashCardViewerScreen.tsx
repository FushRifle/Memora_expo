import React from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'

export function FlashcardViewerScreen() {
    const { colors } = useTheme()
    const router = useRouter()
    const params = useLocalSearchParams()
    const deckId = params.deckId as string | undefined

    return (
        <YStack flex={1} p="$4" backgroundColor={colors.background} space="$4">
            <Text fontWeight="bold" fontSize={24} color={colors.text}>
                Flashcard Viewer
            </Text>
            <Text color={colors.textSecondary}>Deck ID: {deckId ?? 'No deck selected'}</Text>

            <Button theme="accent" onPress={() => router.back()}>
                Go Back
            </Button>
        </YStack>
    )
}
