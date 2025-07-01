import React from 'react'
import { YStack, Text, Button } from 'tamagui'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { useTheme } from '@/styles/ThemeContext'

export default function DocumentResultScreen() {
    const { colors } = useTheme()
    const router = useRouter()
    const params = useLocalSearchParams()
    const docId = params.docId as string | undefined

    return (
        <YStack flex={1} p="$4" backgroundColor={colors.background} space="$4" >
            <Text fontWeight="bold" fontSize={24} color={colors.text} >
                Document Result
            </Text>
            < Text color={colors.textSecondary} >
                Document ID: {docId ?? 'No document selected'}
            </Text>

            < Button theme="accent" onPress={() => router.back()
            }>
                Go Back
            </Button>
        </YStack>
    )
}
