import { YStack, XStack, Button, Text, Spinner } from 'tamagui'
import { Upload, FileText, BookOpen } from '@tamagui/lucide-icons'
import * as DocumentPicker from 'expo-document-picker'
import { useState } from 'react'
import { analyzeDocument } from '@/app/services/AIServices'
import { uploadToSupabase } from '@/app/services/SupabaseService'
import { useNavigation } from '@react-navigation/native'
import type { DocumentPickerResult } from 'expo-document-picker'

export function DocumentAnalysisScreen() {
    const [isProcessing, setIsProcessing] = useState(false)
    const [recentDocuments, setRecentDocuments] = useState<string[]>([])
    const navigation = useNavigation<any>()

    const handleDocumentPick = async () => {
        try {
            const result: DocumentPickerResult = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'text/plain'],
            })

            if (!result.canceled && result.assets.length > 0) {
                setIsProcessing(true)

                const asset = result.assets[0]

                // Upload file to Supabase Storage
                const downloadUrl = await uploadToSupabase(asset.uri, asset.name)

                // Analyze the document with AI
                const analysis = await analyzeDocument(downloadUrl)

                // Update recent documents
                setRecentDocuments(prev => [asset.name, ...prev.slice(0, 4)])

                // Navigate to result screen
                navigation.navigate('DocumentResult', { analysis })
            }
        } catch (error) {
            console.error('Document picker error:', error)
        } finally {
            setIsProcessing(false)
        }
    }

    return (
        <YStack f={1} p="$4" space="$4">
            <Text fontSize="$8" fontWeight="bold">Document Analysis</Text>

            <YStack space="$3" mt="$4">
                <Text>Upload lecture notes, textbooks, or research papers to get:</Text>
                <YStack ml="$4" space="$2">
                    <XStack space="$2" ai="center">
                        <BookOpen size="$1" />
                        <Text>Key concepts summary</Text>
                    </XStack>
                    <XStack space="$2" ai="center">
                        <FileText size="$1" />
                        <Text>Generated flashcards</Text>
                    </XStack>
                    <XStack space="$2" ai="center">
                        <BookOpen size="$1" />
                        <Text>Practice questions</Text>
                    </XStack>
                </YStack>
            </YStack>

            <Button
                icon={isProcessing ? <Spinner /> : <Upload />}
                onPress={handleDocumentPick}
                disabled={isProcessing}
                theme="accent"
                h="$6"
            >
                {isProcessing ? 'Processing...' : 'Upload Document'}
            </Button>

            {recentDocuments.length > 0 && (
                <YStack space="$3">
                    <Text fontSize="$6" color="$color2">Recent Documents</Text>
                    {recentDocuments.map((doc, index) => (
                        <XStack key={index} space="$2" ai="center">
                            <FileText size="$1" color="$color2" />
                            <Text>{doc}</Text>
                        </XStack>
                    ))}
                </YStack>
            )}
        </YStack>
    )
}
