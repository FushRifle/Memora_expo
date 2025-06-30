import React, { useEffect, useState } from 'react'
import {
    YStack,
    XStack,
    Text,
    ScrollView,
    Button,
    Spinner,
    Separator,
    Card,
} from 'tamagui'
import {
    ChevronLeft,
    BookOpen,
    FileText,
    Clipboard as ClipboardIcon,
    Check,
    Share2,
    ChevronRight,
} from '@tamagui/lucide-icons'
import { useRouter, useLocalSearchParams } from 'expo-router'
import { getDocumentAnalysis } from '@/app/services/AIServices'
import * as Clipboard from 'expo-clipboard'
import { Share } from 'react-native'

type DocumentAnalysis = {
    id: string
    title: string
    summary: string
    keyPoints: string[]
    flashcards: {
        question: string
        answer: string
    }[]
    quizzes: {
        question: string
        options: string[]
        answer: string
    }[]
}

export default function DocumentResultScreen() {
    const router = useRouter()
    const { docId } = useLocalSearchParams<{ docId: string }>()
    const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null)
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'summary' | 'flashcards' | 'quizzes'>('summary')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const fetchAnalysis = async () => {
            try {
                // In a real app, fetch by docId
                const data = await getDocumentAnalysis()
                setAnalysis(data as any)
            } catch (error) {
                console.error('Failed to fetch analysis:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchAnalysis()
    }, [docId])

    const handleCopy = async (text: string) => {
        await Clipboard.setStringAsync(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const handleShare = async () => {
        try {
            await Share.share({
                title: analysis?.title || 'Document Analysis',
                message: `Check out this analysis from Memora:\n\n${analysis?.summary}`,
            })
        } catch (error) {
            console.error('Sharing failed:', error)
        }
    }

    if (loading) {
        return (
            <YStack f={1} ai="center" jc="center">
                <Spinner size="large" />
            </YStack>
        )
    }

    if (!analysis) {
        return (
            <YStack f={1} ai="center" jc="center" p="$4">
                <Text>Failed to load document analysis</Text>
                <Button onPress={() => router.back()} mt="$4">
                    Go Back
                </Button>
            </YStack>
        )
    }

    return (
        <YStack f={1} bg="$bg">
            {/* Header */}
            <XStack p="$4" ai="center" space="$3" bg="$bg2">
                <Button
                    icon={ChevronLeft}
                    circular
                    size="$3"
                    onPress={() => router.back()}
                />
                <Text fontWeight="bold" f={1} numberOfLines={1}>
                    {analysis.title}
                </Text>
                <Button
                    icon={Share2}
                    circular
                    size="$3"
                    onPress={handleShare}
                />
            </XStack>

            {/* Tabs */}
            <XStack borderBottomWidth={1} borderBottomColor="$borderColor">
                <Button
                    f={1}
                    theme={activeTab === 'summary' ? 'accent' : undefined}
                    borderRadius={0}
                    onPress={() => setActiveTab('summary')}
                >
                    Summary
                </Button>
                <Button
                    f={1}
                    theme={activeTab === 'flashcards' ? 'accent' : undefined}
                    borderRadius={0}
                    onPress={() => setActiveTab('flashcards')}
                >
                    Flashcards
                </Button>
                <Button
                    f={1}
                    theme={activeTab === 'quizzes' ? 'accent' : undefined}
                    borderRadius={0}
                    onPress={() => setActiveTab('quizzes')}
                >
                    Quizzes
                </Button>
            </XStack>

            {/* Content */}
            <ScrollView p="$4">
                {activeTab === 'summary' && (
                    <YStack space="$4">
                        <YStack space="$3">
                            <XStack ai="center" space="$2">
                                <FileText size="$1" color="$accent" />
                                <Text fontSize="$6" fontWeight="bold">
                                    Document Summary
                                </Text>
                            </XStack>
                            <Card bg="$bg2" p="$4">
                                <Text>{analysis.summary}</Text>
                            </Card>
                            <Button
                                icon={copied ? <Check size="$1" /> : <ClipboardIcon size="$1" />}
                                onPress={() => handleCopy(analysis.summary)}
                            >
                                {copied ? 'Copied!' : 'Copy Summary'}
                            </Button>
                        </YStack>

                        <YStack space="$3">
                            <XStack ai="center" space="$2">
                                <BookOpen size="$1" color="$accent" />
                                <Text fontSize="$6" fontWeight="bold">
                                    Key Points
                                </Text>
                            </XStack>
                            <YStack space="$2">
                                {analysis.keyPoints.map((point, index) => (
                                    <XStack key={index} space="$2" ai="flex-start">
                                        <Text color="$accent">•</Text>
                                        <Text f={1}>{point}</Text>
                                    </XStack>
                                ))}
                            </YStack>
                        </YStack>
                    </YStack>
                )}

                {activeTab === 'flashcards' && (
                    <YStack space="$4">
                        <Text fontSize="$6" fontWeight="bold" mb="$2">
                            Generated Flashcards ({analysis.flashcards.length})
                        </Text>
                        <YStack space="$3">
                            {analysis.flashcards.map((card, index) => (
                                <Card key={index} bg="$bg2" p="$4">
                                    <YStack space="$3">
                                        <Text fontWeight="bold">Q: {card.question}</Text>
                                        <Separator />
                                        <Text>A: {card.answer}</Text>
                                    </YStack>
                                    <Button
                                        size="$2"
                                        mt="$3"
                                        icon={<ClipboardIcon size="$1" />}
                                        onPress={() => handleCopy(`${card.question}\n\n${card.answer}`)}
                                    >
                                        Copy Flashcard
                                    </Button>
                                </Card>
                            ))}
                        </YStack>
                        <Button
                            theme="accent"
                            iconAfter={<ChevronRight />}
                            onPress={() =>
                                router.push({
                                    pathname: '/flashcardViewer',
                                    params: { flashcards: JSON.stringify(analysis.flashcards) },
                                })
                            }
                        >
                            Study Flashcards
                        </Button>
                    </YStack>
                )}

                {activeTab === 'quizzes' && (
                    <YStack space="$4">
                        <Text fontSize="$6" fontWeight="bold" mb="$2">
                            Practice Quizzes ({analysis.quizzes.length})
                        </Text>
                        <YStack space="$3">
                            {analysis.quizzes.map((quiz, index) => (
                                <Card key={index} bg="$bg2" p="$4">
                                    <YStack space="$2">
                                        <Text fontWeight="bold">Q: {quiz.question}</Text>
                                        <Separator />
                                        <YStack space="$2" mt="$2">
                                            {quiz.options.map((option, optIndex) => (
                                                <Text
                                                    key={optIndex}
                                                    color={option === quiz.answer ? '$accent' : '$color'}
                                                >
                                                    {String.fromCharCode(65 + optIndex)}. {option}
                                                </Text>
                                            ))}
                                        </YStack>
                                    </YStack>
                                </Card>
                            ))}
                        </YStack>
                    </YStack>
                )}
            </ScrollView>
        </YStack>
    )
}
