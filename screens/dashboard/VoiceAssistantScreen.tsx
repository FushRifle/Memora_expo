import { YStack, XStack, Button, Text, Spinner, Input, ScrollView } from 'tamagui'
import { Mic, Send, Volume2 } from '@tamagui/lucide-icons'
import { useState, useEffect } from 'react'
import * as Speech from 'expo-speech'
import { Audio } from 'expo-av'
import { useNavigation } from '@react-navigation/native'

export function VoiceAssistantScreen() {
    const [isListening, setIsListening] = useState(false)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [isProcessing, setIsProcessing] = useState(false)
    const [recording, setRecording] = useState<Audio.Recording | null>(null)
    const navigation = useNavigation()

    const startRecording = async () => {
        try {
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            })

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            )
            setRecording(recording)
            setIsListening(true)
        } catch (err) {
            console.error('Failed to start recording', err)
        }
    }

    const stopRecording = async () => {
        setIsListening(false)
        if (!recording) return

        try {
            await recording.stopAndUnloadAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            })

            // Here you would send the recording to your backend for speech-to-text
            // For demo, we'll just simulate it
            setTimeout(() => {
                setQuestion("What's the capital of France?")
            }, 1000)
        } finally {
            setRecording(null)
        }
    }

    const handleSend = async () => {
        if (!question.trim()) return

        setIsProcessing(true)
        try {
            // Simulate AI response
            const response = "The capital of France is Paris."
            setAnswer(response)

            // Speak the answer
            Speech.speak(response, {
                language: 'en-US',
                pitch: 1.0,
                rate: 1.0,
            })
        } finally {
            setIsProcessing(false)
        }
    }

    useEffect(() => {
        return () => {
            if (recording) {
                recording.stopAndUnloadAsync()
            }
            Speech.stop()
        }
    }, [recording])

    return (
        <YStack f={1} p="$4" space="$4">
            <Text fontSize="$8" fontWeight="bold">Voice Assistant</Text>

            <YStack space="$3" f={1}>
                {question && (
                    <YStack bg="$bg2" p="$3" borderRadius="$4">
                        <Text fontWeight="bold">Your question:</Text>
                        <Text>{question}</Text>
                    </YStack>
                )}

                {answer && (
                    <YStack bg="$bg2" p="$3" borderRadius="$4">
                        <Text fontWeight="bold">Memora AI:</Text>
                        <Text>{answer}</Text>
                    </YStack>
                )}
            </YStack>

            <XStack space="$3">
                <Button
                    icon={isListening ? <Spinner /> : <Mic />}
                    circular
                    theme={isListening ? 'red' : 'accent'}
                    onPress={isListening ? stopRecording : startRecording}
                />

                <Input
                    f={1}
                    placeholder="Or type your question..."
                    value={question}
                    onChangeText={setQuestion}
                    onSubmitEditing={handleSend}
                />

                <Button
                    icon={isProcessing ? <Spinner /> : <Send />}
                    circular
                    theme="accent"
                    onPress={handleSend}
                    disabled={isProcessing}
                />
            </XStack>

            <Button
                icon={<Volume2 />}
                onPress={() => answer && Speech.speak(answer)}
                disabled={!answer}
            >
                Repeat Answer
            </Button>
        </YStack>
    )
}