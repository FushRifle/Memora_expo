import React, { useState } from 'react'
import { YStack, Text, Button, TextArea, ScrollView } from 'tamagui'
import { useTheme } from '@/styles/ThemeContext'

export function DocumentAnalysisScreen() {
    const { colors } = useTheme()
    const [documentText, setDocumentText] = useState('')
    const [analysisResult, setAnalysisResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const analyzeDocument = () => {
        if (!documentText.trim()) return
        setLoading(true)
        // Mock analysis — replace with real AI call
        setTimeout(() => {
            setAnalysisResult(`Analyzed text length: ${documentText.length} characters.`)
            setLoading(false)
        }, 1500)
    }

    return (
        <YStack flex={1} p="$4" backgroundColor={colors.background}>
            <Text fontWeight="bold" fontSize={20} color={colors.text} mb="$3">
                Document Analysis
            </Text>

            <TextArea
                placeholder="Paste or write your document text here"
                value={documentText}
                onChangeText={setDocumentText}
                height={150}
                backgroundColor={colors.inputBackground}
                color={colors.text}
                borderRadius={8}
                padding="$3"
            />

            <Button theme="accent" mt="$3" onPress={analyzeDocument} disabled={loading}>
                {loading ? 'Analyzing...' : 'Analyze Document'}
            </Button>

            <ScrollView mt="$4" flex={1}>
                {analysisResult && (
                    <Text color={colors.text} fontSize={16}>
                        {analysisResult}
                    </Text>
                )}
            </ScrollView>
        </YStack>
    )
}
